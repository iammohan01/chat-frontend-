import React, {useEffect} from "react";
import '../Styles/Chat.css';
import '../Styles/index.css';
import '../Styles/message.css';
import { ChatPanel } from "./ChatPanel/MessagePannel.jsx";
import { UserPanel } from "./UserPanel.jsx";
import { useState } from "react";
import {ChatNavPanelComponent} from "./NavigationPanel/ChatNavPanelComponent.jsx";
import alert from "../Scripts/alert.js";
import {socketForMessageTransfer} from "./ChatReqRes/SocketForMessageTransfer.js";
import useWebSocket , {ReadyState } from "react-use-websocket";




export  default  function ChatComponent(){
    const [selectedUser, setSelectedUser]= useState({});
    const [AllUsersChats,setAllUsersChats] = useState([]);
    // const socket = useWebSocket(`ws://localhost:8080/demo2_war_exploded/chat/${localStorage.getItem("uid")}`,
    //     {onOpen: (d)=>{
    //             alert('success','Socket Opened')
    //     },
    //             onClose:()=>{
    //         alert('error','Socket Connection Closed')
    //             }
    //     })



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