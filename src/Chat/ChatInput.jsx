import {useContext, useState} from "react";
import alert from "../Scripts/alert.js";
import context from "../context.jsx";
// import {sendMessage, socketForMessageTransfer} from "./ChatReqRes/SocketForMessageTransfer.js";

export default function ChatInput({user,setAllUsersChat}){

    const [input,setInput] = useState('')

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
        console.log(recentArrayToChange)
        let x = recentArrayToChange.sort((a, b) =>{
            let c = Number(b['time']) - Number(a['time'])
            console.log(a,b)
            return c
        });
        console.log(x)
        setRecentUsers(recentArrayToChange)
    }








    return (
        <div className="chat--input">
            <svg onClick={uploadFile}
                className="chat--input-icons" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.97 12V15.5C11.97 17.43 13.54 19 15.47 19C17.4 19 18.97 17.43 18.97 15.5V10C18.97 6.13 15.84 3 11.97 3C8.1 3 4.97 6.13 4.97 10V16C4.97 19.31 7.66 22 10.97 22" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeinejoin="round"/>
            </svg>

            <input
                autoFocus={true}
                type="text"
                id="chat--input--box"
                placeholder="Type a message"
                value={input}
                onChange={(event)=>{
                    setInput(event.target.value)
                }}
                onKeyDown={(event)=>{

                    if(event.code === "Enter"){
                        setInput('')
                        if(input){
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
                    setInput('')
                    if(input){
                        updateAllUsersChat()
                    }
                    else{
                        // setInput(Date.now()+'')
                    }
                    setInput('')
                }
            } className="chat--input-icons" id="sendButton" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.14 2.96001L7.11 5.96001C1.04 7.99001 1.04 11.3 7.11 13.32L9.79 14.21L10.68 16.89C12.7 22.96 16.02 22.96 18.04 16.89L21.05 7.87001C22.39 3.82001 20.19 1.61001 16.14 2.96001ZM16.46 8.34001L12.66 12.16C12.51 12.31 12.32 12.38 12.13 12.38C11.94 12.38 11.75 12.31 11.6 12.16C11.4605 12.0189 11.3823 11.8284 11.3823 11.63C11.3823 11.4316 11.4605 11.2412 11.6 11.1L15.4 7.28001C15.69 6.99001 16.17 6.99001 16.46 7.28001C16.75 7.57001 16.75 8.05001 16.46 8.34001Z" fill="#615EF0"/>
            </svg>

        </div>
    )

}














//                   You can Feel it . When it's Going to break
























