import React, {useContext, useEffect} from "react";
import { ChatPanel } from "./ChatPanel/MessagePannel.jsx";
import { UserPanel } from "./UserPanel.jsx";
import {ChatNavPanelComponent} from "./NavigationPanel/ChatNavPanelComponent.jsx";
import context from "../context.jsx";
import {setCookie} from "../Index/Auth.jsx";
import {getCookie} from "../main.jsx";
import {SearchComponent} from "../SearchComponent.jsx";
import DateView from "../DateView.jsx";




export  default  function ChatComponent(){

    let {selectedUserState,allUsersState} = useContext(context)
    const {selectedUser, setSelectedUser}= selectedUserState //   useState({});
    const {AllUsersChats,setAllUsersChats} =allUsersState // useState([]);

    const {focusState} = useContext(context);

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


    return(
        <div className="Chat--window">
            <ChatNavPanelComponent />
            {focusState['focus'] === 'search' && <SearchComponent />}
            { focusState['focus'] === 'chat' && <UserPanel setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>}
            {focusState['focus'] === 'chat' &&selectedUser['userName'] && <ChatPanel allUsersChats={AllUsersChats} setAllUsersChat={setAllUsersChats} selectedUser={selectedUser}/>}
            {focusState['focus'] === 'chat' &&!selectedUser['userName'] && <EmptyPanel />}
            {focusState['focus'] === 'date' && <DateView /> }
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
    if(!uid) return
    let xhr =  new XMLHttpRequest();
    // xhr.open("GET", `/verifyUser?id=${uid}`,true);
    xhr.open("GET", `${endURL}/verifyUser?id=${uid}`,true);

    xhr.send()
    xhr.onreadystatechange = ()=>{
        xhr.onloadend = ()=>{
            let res = JSON.parse(xhr.responseText)
            // console.log(res)
            if (res['status'] === 1){
            }
            else{
                setCookie('uid','123',-7)
                localStorage.clear()
            }
        }
    }

}

