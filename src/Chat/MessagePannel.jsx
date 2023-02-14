import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput.jsx";
import { ThreeDotMenu } from "./ThreeDotMenu.jsx";
import { UserHead } from "./ChatPanel/UserHead.jsx";
import { sendMessage } from "./ChatReqRes/SendMessage.js";
import { reqCurrentUserChats } from "./ChatReqRes/ReqChat.js";
import { socketOnMessage } from "./ChatReqRes/SocketForMessageTransfer.js";

export function ChatPanel({ CurrentUser, allUsersChatList, allUsersChats }) {
  const [currentUserChatList, setCurrentUserChatList] = React.useState([]);
  useEffect(()=>{
    alert(`changing current user state ${currentUserChatList.length}`)
    setCurrentUserChatList(allUsersChatList.chats[CurrentUser.userName] || [])
  },[CurrentUser])



  const [chatInput, setChatInput] = React.useState("");

  // console.error("in Chat Panel");
  // console.log(currentUserChatList);

  useEffect(() => {
    console.log(allUsersChatList)
    socketOnMessage(allUsersChatList, CurrentUser, setCurrentUserChatList);
  }, []);


  // console.log(CurrentUser)
  useEffect(() => {
    // alert('user changed')
    CurrentUser &&
      reqCurrentUserChats(
        CurrentUser,
        allUsersChatList,
        setCurrentUserChatList
      );
  }, [CurrentUser]);

  const [chatsComponent, setChatsComponent] = useState(<></>);

  useEffect(() => {
    // console.error("something changing");

    // alert("crating chats elements");
    //todo:here is the problem store this to parent then everything will work : fixed
    allUsersChatList.chats[CurrentUser.userName] && allUsersChatList.setChats((prevChats)=>{
      // console.log(prevChats)
      //todo : spread and insert

      let hh = [CurrentUser.userName]
      // console.log(hh)
      let obj ={

      }
      return {...prevChats ,[CurrentUser.userName]:currentUserChatList }
    })

    allUsersChatList.chats[CurrentUser.userName] &&
      setChatsComponent(<Chats chats={currentUserChatList} />);
  }, [currentUserChatList]);
  useEffect(()=>{

    // alert(`all users chat list chat changed`)
    setChatsComponent(<Chats chats={currentUserChatList} />);

  },[allUsersChatList.chats])



  return (
    <div className="chat--panel">
      <UserHead user={CurrentUser} />
      {chatsComponent}
      <ChatInput
        onSend={() => {
          sendMessage(
            CurrentUser.userName,
            chatInput,
            setChatInput,
            setCurrentUserChatList,
            Date.now() + ""
          );
        }}
        chatInput={chatInput}
        setChatInput={setChatInput}
        currentUserChatList={currentUserChatList}
        setCurrentUserChatList={setCurrentUserChatList}
      />
    </div>
  );
}

function Chats({ chats }) {
  // console.log(chats);
  // console.error("in chat element function");
  const [chatsListElement, setChatsListElement] = useState([]);

  useEffect(() => {
    if (chats) {
      let s = chats.map((val, index, arr) => {
        return (
          <p key={val.time} className={`${val.isSentByMe ? "end" : ""} msg`}>
            {val.isSentByMe && <ThreeDotMenu key={val.time} chatDetails={val} />}
            <span className="msg">{val.message}</span>

            {!val.isSentByMe && <ThreeDotMenu key={val.time} chatDetails={val} />}
          </p>
        );
      });

      // for last element to scroll
      s.push(<div ref={scrollToRef}></div>);
      setChatsListElement(s);
    }
  }, [chats]);
  const scrollToRef = useRef(null);

  if (scrollToRef.current) {
    scrollToRef.current.scrollIntoView();
  }

  return <div className="chat--list">{chatsListElement}</div>;
}
