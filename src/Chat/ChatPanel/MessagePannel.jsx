import React, {useContext, useEffect, useRef, useState} from "react";
import ChatInput from "../ChatInput.jsx";
import { ThreeDotMenu } from "../ThreeDotMenu.jsx";
import { UserHead } from "./UserHead.jsx";
import { reqCurrentUserChats } from "../ChatReqRes/ReqChat.jsx";
import alert from "../../Scripts/alert.js";
import {ChatsComponent} from "./ChatsComponent.jsx";
import Context from "../../context.jsx";
import EmojiPicker from "emoji-picker-react";


export function ChatPanel({ selectedUser, setAllUsersChat, allUsersChats }) {


    let [chatsComponent,setChatsComponent] = useState([])
    const element = useRef();

    useEffect(() => {
        element.current.scrollIntoView()//{behavior: "smooth"});
    })


    //when user changed, request new chat list from server
    useEffect(() => {
        // alert('warning','user changed')

        // current user to check , if current user data were not in allUsersChat then request from server and
        // update through setAllUsersChat as a key value key : username and value : chat details array
        selectedUser && reqCurrentUserChats(selectedUser, setAllUsersChat ,allUsersChats);
        setChatsComponent(ChatsComponent(allUsersChats[selectedUser.userName]))

    }, [selectedUser]);





    //when current user chat changed in allUsersChats re-render chats
    useEffect(()=>{
            // alert('error','current user chat changed');
            //chat component should be rendered here
            setChatsComponent(ChatsComponent(allUsersChats[selectedUser.userName]))
        },
        [allUsersChats])



    return <div className="chat--panel">


        <UserHead user={selectedUser} />
        <div className="chat--list">
            {chatsComponent}
            <div>

            </div>
            <div ref={element}></div>
        </div>
        <ChatInput user={selectedUser} setAllUsersChat={setAllUsersChat} />
    </div>

}
