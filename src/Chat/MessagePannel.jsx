
import React, { useEffect } from "react";
export function ChatPannel({userName}){


    const [chats,setChats] = React.useState([]);



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



    useEffect(() => {
        reqChats(userName)
    }, [userName])
    

    return (
        <div className="chat--pannel"> 
            <UserHead user={userName} />
            <Chats  chats={chats} />
            <ChatInput />
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
function ChatInput(){

    let enter = false ;

    const [chatInput , setChatinput] = React.useState("");

    return (
        <div className="chat--input">
            <svg className="chat--input-icons" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.97 12V15.5C11.97 17.43 13.54 19 15.47 19C17.4 19 18.97 17.43 18.97 15.5V10C18.97 6.13 15.84 3 11.97 3C8.1 3 4.97 6.13 4.97 10V16C4.97 19.31 7.66 22 10.97 22" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeinejoin="round"/>
            </svg>

            <input 
                type="text" 
                id="chat--input--box"
                placeholder="Type a message"
                value={chatInput}
                onChange={(event)=>{
                    // console.log(event.target.value);
                    setChatinput(event.target.value)
                }}
                onKeyDown={(event)=>{
                    // console.log(event.code);
                    if(event.code == "Enter"){
                        // alert(chatInput)
                        socket.send(chatInput)
                        enter = true ;

                    }


                }}
                onKeyUp={(event)=>{
                    // console.log(enter)
                    if(event.code === "Enter"){
                        enter = false ;
                    }
                    // console.log(event);
                }}
            />
            <svg className="chat--input-icons" id="sendButton" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.14 2.96001L7.11 5.96001C1.04 7.99001 1.04 11.3 7.11 13.32L9.79 14.21L10.68 16.89C12.7 22.96 16.02 22.96 18.04 16.89L21.05 7.87001C22.39 3.82001 20.19 1.61001 16.14 2.96001ZM16.46 8.34001L12.66 12.16C12.51 12.31 12.32 12.38 12.13 12.38C11.94 12.38 11.75 12.31 11.6 12.16C11.4605 12.0189 11.3823 11.8284 11.3823 11.63C11.3823 11.4316 11.4605 11.2412 11.6 11.1L15.4 7.28001C15.69 6.99001 16.17 6.99001 16.46 7.28001C16.75 7.57001 16.75 8.05001 16.46 8.34001Z" fill="#615EF0"/>
            </svg>

        </div>
    )

}

