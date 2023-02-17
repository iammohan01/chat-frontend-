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
import {setCookie} from "../Index/Auth.jsx";
import {getCookie} from "../main.jsx";




export  default  function ChatComponent(){

    let {selectedUserState,allUsersState} = useContext(context)
    const {selectedUser, setSelectedUser}= selectedUserState //   useState({});
    const {AllUsersChats,setAllUsersChats} =allUsersState // useState([]);


    useEffect(()=>{
     verifyUser()
    },[true])

    useEffect(()=>{
        // alert('success','all users changed')
    },[AllUsersChats])
    // console.log(AllUsersChats)


    useEffect(()=>{
        // alert('error','selected user changed')
    },[selectedUser])

    // console.log(selectedUser)

    return(
        <div className="Chat--window">
            <ChatNavPanelComponent />
            <UserPanel setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
            {selectedUser['userName'] && <ChatPanel allUsersChats={AllUsersChats} setAllUsersChat={setAllUsersChats} selectedUser={selectedUser}/> }
            {!selectedUser['userName'] && <EmptyPanel /> }
        </div>
    )
}






let svg_path ;
function EmptyPanel(){
    return <div className={'empty--panel'}>

    </div>
}
function verifyUser(){
    let uid = getCookie('uid');
    let xhr =  new XMLHttpRequest();
    // xhr.open("GET", `/verifyUser?id=${uid}`,true);
    xhr.open("GET", `${endURL}/verifyUser?id=${uid}`,true);

    xhr.send()
    xhr.onreadystatechange = ()=>{
        xhr.onloadend = ()=>{
            let res = JSON.parse(xhr.responseText)
            console.log(res)
            if (res['status'] === 1){
            }
            else{
                setCookie('uid','123',-7)
                localStorage.clear()
            }
        }
    }

}

