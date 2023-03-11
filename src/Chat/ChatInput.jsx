import React, {useContext, useState} from "react";
import alert from "../Scripts/alert.js";
import context from "../context.jsx";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import EmojiPicker from "emoji-picker-react";
// import {sendMessage, socketForMessageTransfer} from "./ChatReqRes/SocketForMessageTransfer.js";

export default function ChatInput({user,setAllUsersChat}){

    const [input,setInput] = useState('')
    const [emojiVisibility,setEmojiVisibility] = useState(false)

    //update into setAllUsers current users
    function updateAllUsersChat(){

        let time = Date.now()
        // console.log(time,input)

        let encryptedMessage = CryptoJS.AES.encrypt(input,time+'').toString()
        // console.log(encryptedMessage)
        // console.log(encryptedMessage.toString())

        let UpdateObject = {
            fromUser : '' ,
            toUser : user.userName,
            message : input,
            time : time ,
            isSentByMe : true,
            type :'chat',
            ency : encryptedMessage
        }

        setAllUsersChat((prevChats)=>{
            let readyToUpdateInLocalBase = prevChats[user.userName] || []
            readyToUpdateInLocalBase.push(UpdateObject)
            return {...prevChats , [user.userName] : readyToUpdateInLocalBase}
        })


        //send data to server


        let obj = {
            type : 'chat',
            from : localStorage.getItem('uid'),
            to : user.userName,
            time : UpdateObject.time,
            message :encryptedMessage,

        }

        socket.send(JSON.stringify(obj))
        updateRecentChats(encryptedMessage,UpdateObject.time)




        // sendMessage(UpdateObject)
        // socketForMessageTransfer.send('Hello');
    }


    function uploadFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.click();


        let timeNow = Date.now()
        let objForSocket = {
            type : 'file',
            from : localStorage.getItem('uid'),
            to : user.userName,
            time : timeNow,
            message : "",
        }
        input.onchange = ()=>{

            console.log(input.files[0].size)
            if (input.files[0].size > 973741824){
                alert('warning','File Size Should be less than 1GB')
                return
            }
            // alert(input.files[0].size / 1024 ** 2)
            console.log(input.files[0].name)


                let ency = CryptoJS.AES.encrypt(input.files[0].name, timeNow + '').toString()
                objForSocket.message = ency
                console.log(JSON.stringify(objForSocket))



                const formData = new FormData();
                formData.append('name', ency);
                formData.append('by',localStorage.getItem('uid'))
                formData.append('file', input.files[0]);
                const xhr = new XMLHttpRequest();
                xhr.open('POST', `${endURL}/LoadFile`, true);
                xhr.onreadystatechange = ()=>{
                    xhr.onloadend =()=>{
                        console.warn(xhr.responseText)
                        let res = JSON.parse(xhr.responseText)
                        if(res['status'] ===1 ){
                            socket.send(JSON.stringify(objForSocket))
                            updateRecentChats(ency,timeNow)
                        }
                        else{
                            alert('error','failed to send file')
                        }

                    }

                }
                xhr.onprogress =(progress)=>{
                    console.log(Math.floor((progress.loaded/progress.total)*100))
                }
                xhr.send(formData);



            let UpdateObject = {
                fromUser : '' ,
                toUser : user.userName,
                message : input.files[0].name,
                time : timeNow ,
                isSentByMe : true,
                type :'file',
                ency : ency
            }

            setAllUsersChat((prevChats)=>{
                let readyToUpdateInLocalBase = prevChats[user.userName] || []
                readyToUpdateInLocalBase.push(UpdateObject)
                return {...prevChats , [user.userName] : readyToUpdateInLocalBase}
            })


        }

        // var reader = new FileReader(input.files[0]);
    }
    const {recentUsersState}= useContext(context)
    const {recentUsers,setRecentUsers} = recentUsersState ;

    function updateRecentChats(message,time){
        let recentArrayToChange = []
        for (let i of recentUsers){
            if(user['userName'] === i['userName']){
                recentArrayToChange.push({...i , Message : message , time :time+'' , isByMe : 'true'})
            }
            else {
                recentArrayToChange.push(i)
            }

        }
        // console.log(recentArrayToChange)
        let x = recentArrayToChange.sort((a, b) =>{
            let c = Number(b['time']) - Number(a['time'])
            return c
        });
        // console.log(x)
        setRecentUsers(recentArrayToChange)
    }


    window.addEventListener("keydown",(event)=>{
        if(event.code === "Escape"){
            setEmojiVisibility(false)
        }
    })


    return (
        <div className="chat--input">
            <svg onClick={uploadFile}
                className="chat--input-icons" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.97 12V15.5C11.97 17.43 13.54 19 15.47 19C17.4 19 18.97 17.43 18.97 15.5V10C18.97 6.13 15.84 3 11.97 3C8.1 3 4.97 6.13 4.97 10V16C4.97 19.31 7.66 22 10.97 22" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeinejoin="round"/>
            </svg>

            <div
                className={emojiVisibility ?' emoji-icon select' :'emoji-icon'}
                 onClick={()=>{
                setEmojiVisibility(!emojiVisibility)
            }}
            >
                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.5 14.5s-1.5 2-4.5 2-4.5-2-4.5-2" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.5 9a.5.5 0 110-1 .5.5 0 010 1zM8.5 9a.5.5 0 110-1 .5.5 0 010 1z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>

            <div className={ emojiVisibility ? "emoji-visible emoji-list":"emoji-list"}>
                <Picker
                    theme={"light"}
                    onClickOutside={(event)=>{
                        // console.log(event)
                        // setEmojiVisibility(!emojiVisibility)
                        }
                }
                    icons={"outline"}
                    data={data}
                    onEmojiSelect={(event)=>{
                        setInput(input+event.native)
                    }}

                />
            </div>

            <textarea
                autoFocus={true}
                id="chat--input--box"
                placeholder="Type a message"
                value={input}
                onChange={(event)=>{
                    setInput(event.target.value)
                }}
                onKeyDown={(event)=>{

                    if(event.code === "Enter"){
                        setEmojiVisibility(false)
                        setInput('')
                        if(input.trim()){
                            updateAllUsersChat()
                        }
                        else{
                            // setInput(Date.now()+'')
                        }
                        // console.log(Boolean(input))
                        //call send message to server function
                    }
                }}
            />

            <svg
                onClick={()=>{
                    //call send message to server function
                    setEmojiVisibility(false)

                    setInput('')
                    if(input){
                        updateAllUsersChat()
                    }
                    else{
                        // setInput(Date.now()+'')
                    }
                    setInput('')
                }
                }
                className="chat--input-icons" id="sendButton"
                width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M22 12L3 20l3.563-8L3 4l19 8zM6.5 12H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

        </div>
    )

}














//                   You can Feel it . When it's Going to break
























