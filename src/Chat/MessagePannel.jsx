import React, {useEffect, useRef, useState} from "react";
import ChatInput from "./ChatInput.jsx";
import {ThreeDotMenu} from "./ThreeDotMenu.jsx";
import {UserHead} from "./ChatPanel/UserHead.jsx";
import {sendMessage} from "./ChatReqRes/SendMessage.js";
import {reqCurrentUserChats} from "./ChatReqRes/ReqChat.js";

export function ChatPanel({ CurrentUser, userChatList }) {
  const [currentUserChatList, setCurrentUserChatList] = React.useState([]);

  const [chatInput, setChatInput] = React.useState("");


  useEffect(() => {
    socketa.onmessage = (message) => {
    console.log("socket message")

      console.log(userChatList.chats);
      console.log(message?.data);

      message = JSON.parse(message.data);
      if (message) {
        console.log(message);
        console.log(userChatList.chats)
        console.log(Object.keys(userChatList.chats))
        if (Object.keys(userChatList.chats).includes(message.from)) {
          console.log('in line 22')
          userChatList.setChats((prevState) => {
            console.log(prevState)
            return {
              // ...prevState,
              [prevState[message.from]]: [
                prevState[message.from].push(message),
              ],
            };
          });
          console.log(currentUserChatList)
        } else {
          let user = {};
          user.userName = message.from;
          console.log(message)
          console.log(message.data);
          reqCurrentUserChats(user);
        }
      }
    };
  }, []);


  useEffect(() => {
    reqCurrentUserChats(CurrentUser , userChatList ,setCurrentUserChatList);
  }, [CurrentUser]);

  const [chatsComponent,setChatsComponent] = useState(<></>) //= <Chats chats={chats} />;
  useEffect(() => {
    console.warn("something changing");
    setChatsComponent(<Chats chats={userChatList.chats[CurrentUser.userName]} />)
  }, [userChatList.chats[CurrentUser.userName]]);

  return (
    <div className="chat--panel">
      <UserHead user={CurrentUser} />
      {chatsComponent}
      <ChatInput
        onSend={()=>{sendMessage(CurrentUser.userName,chatInput,setChatInput,setCurrentUserChatList)}}
        chatInput={chatInput}
        setChatInput={setChatInput}
      />
    </div>
  );
}



function Chats({ chats}) {

  const [chatsListElement,setChatsListElement] = useState([]);

  useEffect(() => {
  if (chats){
     let s = chats.map((val,index,arr) => {

      return (
          <p
              key={val.time}
              className={`${val.isSentByMe ? "end" : ""} msg`}
          >
            {val.isSentByMe && <ThreeDotMenu chatDetails={val}  /> }
            <span
                className="msg"
            >
              {val.message}
            </span>

            {!val.isSentByMe && <ThreeDotMenu chatDetails={val} /> }

          </p>

      );
    });

    // for last element to scroll
     s.push(<div ref={scrollToRef}></div>)
     setChatsListElement(s)
  }
  }, [chats]);
  const scrollToRef = useRef(null);

    if (scrollToRef.current){
      scrollToRef.current.scrollIntoView()
    }

  return (
    <div className="chat--list">
      {chatsListElement}
    </div>
  );
}
