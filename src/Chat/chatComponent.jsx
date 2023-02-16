import React, {useContext, useEffect} from "react";
import '../Styles/Chat.css';
import '../Styles/index.css';
import '../Styles/message.css';
import { ChatPanel } from "./ChatPanel/MessagePannel.jsx";
import { UserPanel } from "./UserPanel.jsx";
import { useState } from "react";
import {ChatNavPanelComponent} from "./NavigationPanel/ChatNavPanelComponent.jsx";
import alert from "../Scripts/alert.js";
import useWebSocket , {ReadyState } from "react-use-websocket";
import context from "../context.jsx";




export  default  function ChatComponent(){

    let {selectedUserState,allUsersState} = useContext(context)
    const {selectedUser, setSelectedUser}= selectedUserState //   useState({});
    const {AllUsersChats,setAllUsersChats} =allUsersState // useState([]);



    useEffect(()=>{
        // alert('success','all users changed')
    },[AllUsersChats])
    console.log(AllUsersChats)


    useEffect(()=>{
        // alert('error','selected user changed')
    },[selectedUser])

    console.log(selectedUser)

    return(
        <div className="Chat--window">
            <ChatNavPanelComponent />
            <UserPanel setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
            <ChatPanel allUsersChats={AllUsersChats} setAllUsersChat={setAllUsersChats} selectedUser={selectedUser}/>
        </div>
    )
}






let svg_path ;