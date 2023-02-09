
import React, { useEffect } from "react";
import ChatInput from "./ChatInput.jsx";
export function ChatPanel({userName}){


    const [chats,setChats] = React.useState([]);
    const [chatInput,setChatInput] = React.useState("");


    function reqChats(username){

        const xhr = new XMLHttpRequest();
        xhr.open("GET",`http://localhost:8080/demo2_war_exploded/getChats?targetId=${username.userName}&reqId=${localStorage.getItem("uid")}`)
        xhr.onreadystatechange =()=>{
            xhr.onloadend = ()=>{
                if(xhr.status === 200){
                    let res = JSON.parse(xhr.responseText)
                    setChats(res)
                }
            }
        }
        if (username.userName){
            xhr.send()
        }
    }

    function sendMessage(){

        let ch = {
            type:"chat",
            from : localStorage.getItem("uid"),
            to: userName.userName,
            message : chatInput,
            time : Date.now()
        }
        if (chatInput && userName.userName){
            console.log(JSON.stringify(ch))
            socket.send(JSON.stringify(ch))
        }

    }


    useEffect(() => {
        reqChats(userName)
    }, [userName])
    

    return (
        <div className="chat--pannel"> 
            <UserHead user={userName} />
            <Chats  chats={chats} />
            <ChatInput onSend={sendMessage} chatInput={chatInput} setChatInput={setChatInput} />
        </div>
    )
}

function UserHead({user}){
    return(
        <div className="UserHead">
        <div className="userImg"></div>
        <div className="userDetail">
            <p className="chat--user--name">{user.name}</p>
            <p>@{user.userName}</p>
        </div>
        <div className="moreFunctions"></div>
        </div>
    )

}


function Chats({chats}){

    



   let c 
     c = chats.map((val)=>{
        return <p key={val.time} className="end"><span className="msg">{val.message}</span></p>
       })

    return(
        <div className="chat--list">


        {c}
           
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">en{"\n"}d</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">start</span></p>
            <p className="end"><span className="msg">end</span></p>
            <p className="start"><span className="msg">{`staa\nsdfbkashdfkjhasdkjfhaksjdhfrt`}</span></p>

        </div>
    )

}
