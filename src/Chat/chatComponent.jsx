import React, {useEffect} from "react";
import '../Styles/Chat.css';
import '../Styles/index.css';
import '../Styles/message.css';
import { ChatPanel } from "./MessagePannel";
import { UserPanel } from "./UserPanel.jsx";
import { useState } from "react";
import {ChatNavPanelComponent} from "./NavigationPanel/ChatNavPanelComponent.jsx";




export  default  function ChatComponent(){
    const [selectedUser, setSelectedUser]= useState("");
    const [AllUsersChats,setAllUsersChats] = useState({});
    

    return(
        <div className="Chat--window">
            <ChatNavPanelComponent />
            <UserPanel setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
            <ChatPanel userChatList={{chats : AllUsersChats , setChats:setAllUsersChats}} CurrentUser={selectedUser}/>

        </div>
    )
}






let svg_path ;