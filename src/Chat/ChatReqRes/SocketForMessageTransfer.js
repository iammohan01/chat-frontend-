import {reqCurrentUserChats} from "./ReqChat.js";

export let socketForMessageTransfer = new WebSocket(`ws://localhost:8080/demo2_war_exploded/chat/${localStorage.getItem("uid")}`)
// let socketForMessageTransfer = new WebSocket(`ws://${end}/demo2_war_exploded/chat/${localStorage.getItem("uid")}`))
socketForMessageTransfer.open = ()=>{
    console.log("socket opened");
    alert('connection open')
}
socketForMessageTransfer.onclose =()=>{
    alert('Connection closed')
}


export function socketOnMessage(userChatList,CurrentUser,setCurrentUserChatList){
    socketForMessageTransfer.onmessage = (message) => {
        console.log("socket OnMessage")

        message = JSON.parse(message.data);
        console.log(message);
        if (message) {
            console.log(message);
            console.log(userChatList.chats)
            console.log(Object.keys(userChatList.chats))
            // if (Object.keys(userChatList.chats).includes(message.from)) {
                console.log(userChatList)
                userChatList.setChats((prevState) => {
                    console.log(prevState)
                    prevState[message.from].push(message)
                    return {
                        ...prevState
                    };
                });

            // } else {
            //     let user = {};
            //     user.userName = message.from;
            //     console.log(message)
            //     console.log(message.message);
            //     reqCurrentUserChats(CurrentUser , userChatList ,setCurrentUserChatList);
            }
        // }
    };
}