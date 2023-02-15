import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput.jsx";
import { ThreeDotMenu } from "./ThreeDotMenu.jsx";
import { UserHead } from "./ChatPanel/UserHead.jsx";
import { sendMessage } from "./ChatReqRes/SendMessage.js";
import { reqCurrentUserChats } from "./ChatReqRes/ReqChat.js";
import { socketOnMessage } from "./ChatReqRes/SocketForMessageTransfer.js";
import alert from "../Scripts/alert.js";

export function ChatPanel({ CurrentUser, setAllUsersChat, allUsersChats }) {


  //when user changed, request new chat list from server
  useEffect(() => {
    alert('user changed')

    // current user to check , if current user data were not in allUsersChat then request from server and
    // update through setAllUsersChat as a key value key : username and value : chat details array
    CurrentUser && reqCurrentUserChats(CurrentUser, setAllUsersChat ,allUsersChats);
  }, [CurrentUser]);

    console.log(CurrentUser.userName)

  //when current user chat changed in allUsersChats re-render chats
  useEffect(()=>{
      alert('current user changed');
    //chat component should be rendered here
    },
      [allUsersChats[CurrentUser]])

    useEffect(()=>{
        alert('all users chat changed');
        console.log(allUsersChats)
    },[allUsersChats])



    return <div className="chat--panel">
              <UserHead user={CurrentUser} />


              // it would be good if we update current user chat list in on chat input component
              <ChatInput user={CurrentUser} setAllUsersChat={setAllUsersChat} />
          </div>

}
