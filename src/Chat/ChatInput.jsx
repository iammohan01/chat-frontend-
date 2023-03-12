import React, {useContext, useEffect, useState} from "react";
import alert from "../Scripts/alert.js";
import context from "../context.jsx";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Lottie from 'react-lottie-player'
import {waveData} from "../../public/wave.js";
import useRecorder from "../Recorder.jsx";

export default function ChatInput({user,setAllUsersChat}){

    const [input,setInput] = useState('')
    const [emojiVisibility,setEmojiVisibility] = useState(false)
    const [isRecordingStarted,setRecording]=useState(false)
    const [audioURL,audioBLOB, isRecording, startRecording, stopRecording] = useRecorder();

    //update into setAllUsers current users
    function updateAllUsersChat(){

        let time = Date.now()

        let encryptedMessage = CryptoJS.AES.encrypt(input,time+'').toString()

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


        let obj = {
            type : 'chat',
            from : localStorage.getItem('uid'),
            to : user.userName,
            time : UpdateObject.time,
            message :encryptedMessage,

        }

        socket.send(JSON.stringify(obj))
        updateRecentChats(encryptedMessage,UpdateObject.time)



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

    function recordAudio(event){
        console.log(isRecording)
        setRecording(!isRecordingStarted)
        if(!isRecording ) {
            startRecording()
            console.log('recording started')
        } else{
            stopRecording()
            console.log('recording stopped')
            console.log(audioBLOB)
            console.log(audioURL)
        }

    }


    return (
        <div className="chat--input">
            <svg
                onClick={uploadFile}
                className="chat--input-icons"
                width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21.438 11.662l-9.19 9.19a6.003 6.003 0 11-8.49-8.49l9.19-9.19a4.002 4.002 0 015.66 5.66l-9.2 9.19a2.001 2.001 0 11-2.83-2.83l8.49-8.48" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

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
                        setInput(''.trim())
                        if(input.trim()){
                            updateAllUsersChat()
                        }
                    }
                }}
            />


            <div className={'recording'}

                 style={ {
                     display : isRecordingStarted ? "flex" : "none"
                 } }
            >

                <Lottie
                    loop
                    animationData={waveData}
                    play
                    style={{ width: 50, height: 50 }}

                />
                Recording Audio
            </div>

            {input &&<svg
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
                width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M22 12L3 20l3.563-8L3 4l19 8zM6.5 12H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            }


            {(!input && !isRecordingStarted) &&
                <svg
                    onClick={recordAudio}
                    className="chat--input-icons" id="micButton"
                    width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><rect x="9" y="2" width="6" height="12" rx="3" stroke="#000000" stroke-width="1.5"></rect><path d="M5 10v1a7 7 0 007 7v0a7 7 0 007-7v-1M12 18v4m0 0H9m3 0h3" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>}

            {!input && isRecordingStarted &&
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red"
                     className="chat--input-icons" viewBox="0 0 16 16"
                     onClick={recordAudio}
                    style={
                        {
                            border : "1px solid ",
                            margin : "20px",
                            padding : '5px',
                            borderRadius : '50%'
                        }
                    }>
                    <path
                        d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                </svg>}
        </div>
    )

}














//                   You can Feel it . When it's Going to break
























