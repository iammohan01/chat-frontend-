import React, {useEffect, useRef, useState} from "react";
import ChatInput from "./ChatInput.jsx";
export function ChatPanel({ userName, userChatList }) {
  const [chats, setChats] = React.useState([]);
  const [chatInput, setChatInput] = React.useState("");

  // console.log(chats)
  useEffect(() => {
    socketa.onmessage = (message) => {
      console.log(userChatList.chats);
      console.log(message.data);

      message = JSON.parse(message.data);
      if (message) {
        console.log(message);
        if (Object.keys(userChatList.chats).includes(message.from)) {
          userChatList.setChats((prevState) => {
            return {
              ...prevState,
              [prevState[message.from]]: [
                prevState[message.from].push(message),
              ],
            };
          });
        } else {
          let user = {};
          user.userName = message.from;
          console.log(message.data);
          reqChats(user);
        }
      }
    };
  }, []);

  function reqChats(username) {
    if (userChatList.chats[username.userName]) {
      console.warn("getting chats form userBase");
      console.log(userChatList.chats[username.userName]);
    } else {
      console.error("cant find chats");
    }

    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `http://localhost:8080/demo2_war_exploded/getChats?targetId=${
        username.userName
      }&reqId=${localStorage.getItem("uid")}`
    );
    xhr.onreadystatechange = () => {
      xhr.onloadend = () => {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.responseText);
          console.log(res);
          setChats(res);
          userChatList.setChats((prevState) => {
            return { ...prevState, [username.userName]: res };
          });
          // console.log(userChatList.chats)
        }
      };
    };
    if (username.userName) {
      xhr.send();
    }
  }

  function sendMessage() {
    let time = Date.now();
    let ch = {
      type: "chat",
      from: localStorage.getItem("uid"),
      to: userName.userName,
      message: chatInput,
      time: time,
    };
    if (!chatInput) {
      setChatInput(`${Date.now()}`);
    }
    if (chatInput && userName.userName) {
      console.log(JSON.stringify(ch));
      userChatList.setChats((prevState) => {
        console.warn(prevState);
        let obj = {
          isSentByMe: true,
          time: time,
          message: chatInput,
          from: userName.userName,
        };
        let o = {
          ...prevState,
          [userName.userName]: [...prevState[userName.userName], obj],
        };
        console.log(o);
        return o;
      });

      socketa.send(JSON.stringify(ch));
    }
  }

  useEffect(() => {
    reqChats(userName);
  }, [userName]);

  const [chatsComponent,setChatsComponent] = useState(<></>) //= <Chats chats={chats} />;
  useEffect(() => {
    console.warn("something changing");
    setChatsComponent(<Chats chats={userChatList.chats[userName.userName]} />)
  }, [userChatList.chats[userName.userName]]);

  return (
    <div className="chat--pannel">
      <UserHead user={userName} />
      {chatsComponent}
      <ChatInput
        onSend={sendMessage}
        chatInput={chatInput}
        setChatInput={setChatInput}
      />
    </div>
  );
}

function UserHead({ user }) {
  return (
    <div className="UserHead">
      <div className="userImg"></div>
      <div className="userDetail">
        <p className="chat--user--name">{user.name}</p>
        <p>@{user.userName}</p>
      </div>
      <div className="moreFunctions"></div>
    </div>
  );
}

function Chats({ chats}) {
  console.log(chats);
  const [chatsStateHolder,setChatsStateHolder] = useState([]);

  useEffect(() => {
  if (chats){
     let s = chats.map((val) => {
      return (
          <p key={val.time} className={val.isSentByMe ? "end" : ""}>
            <span className="msg">{val.message}</span>
          </p>
      );
    });
     setChatsStateHolder(s)
  }
  }, [chats]);



  console.log(chatsStateHolder)
  return (
    <div className="chat--list">
      {chatsStateHolder}
      <ScrollToBottomMessage />
    </div>
  );
}
function ScrollToBottomMessage(){
  const scrollToRef = useRef();
  return <div ref={scrollToRef} onLoad={() => scrollToRef.current.scrollIntoView()}></div>
}