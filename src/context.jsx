import {createContext, useEffect, useState} from "react";
import alert from "./Scripts/alert.js";
import {reqCurrentUserChats} from "./Chat/ChatReqRes/ReqChat.jsx";

const Context = createContext({});



const ContextProvider = ({ children }) => {


    const [selectedUser, setSelectedUser]= useState({});
    const [AllUsersChats,setAllUsersChats] = useState({});
    const [recentUsers,setRecentUsers] = useState([]);
    const [focus,setFocus] = useState('chat');

    const selectedUserState = {selectedUser,setSelectedUser}
    const allUsersState = {AllUsersChats,setAllUsersChats}
    const recentUsersState = {recentUsers,setRecentUsers}
    const focusState = {focus,setFocus}

    //for selected search user
    const changeSearch = {setSelectedUser,setFocus}

    useEffect(()=>{
        console.log(recentUsers)
    },[recentUsers])

    useEffect(()=>{
        // alert("success",selectedUser)
    },[AllUsersChats])
    // let socket = new WebSocket(`ws://${window.location.host}/chat/${localStorage.getItem("uid")}`)

    // let [socket,setSocket] = useState(new WebSocket(`ws://${window.location.host}/chat/${localStorage.getItem("uid")}`)) ;
    useEffect(()=>{

        connectionSocket.onmessage = (message)=>{
            // alert('warning','Message from server')
            let res = JSON.parse(message.data);
            setSelectedUser((prev)=>{
                return {...prev,Status : res['Status'] , lastOnline : res['lastOnline']}
            })}
    // const socket = new WebSocket(`ws://localhost:8080/demo2_war_exploded/chat/${localStorage.getItem("uid")}`)
     // socket = new WebSocket(`ws://${window.location.host}/chat/${localStorage.getItem("uid")}`)

    socket.onopen =()=>{
        // alert('success','Socket Opened')
        // console.log('Connection Open')
    }
    socket.onmessage = (message)=> {
        // console.log(message.data)


        let fromUserData = JSON.parse(message.data)

        let EncryptMessage = fromUserData['message']


        if (fromUserData['type'] === 'chat') {
            fromUserData['message'] = CryptoJS.AES.decrypt(fromUserData['message'], fromUserData['time']).toString(CryptoJS.enc.Utf8)
            let fromUser = fromUserData['from']

        // send notification
        new Notification(`Hey , You got new message from  ${fromUser}`);


        setAllUsersChats((prevAllUsersChat) => {
            if (!prevAllUsersChat[fromUser]) {
                // alert('warning','get a request from server')
                return {}
            }

            let fromUserPrevData = prevAllUsersChat[fromUser]
            // console.log(fromUserPrevData)
            fromUserPrevData.push(fromUserData)
            // console.log(fromUserPrevData)
            return {
                ...prevAllUsersChat,
                [fromUser]: fromUserPrevData
            }
        })

            // console.log(recentUsers)
        if(fromUserData['type'] === 'delete'){
            console.log(fromUserData)
            setAllUsersChats((prev)=>{
                let temp = prev
                // console.log(temp)
                delete temp[fromUserData['from']]
                // console.log(temp)
                return temp

            })
            console.log({userName:fromUserData['from']},setAllUsersChats,AllUsersChats)
            reqCurrentUserChats({userName:fromUserData['from']},setAllUsersChats,AllUsersChats)
        }
            setRecentUsers((prev)=>{
                // console.log(prev)

                let x = []
                let isFound = false
                for(let i of prev){

                    if(fromUserData['from'] === i['userName']){

                        isFound = true ;
                        i['Message'] = EncryptMessage
                        i['time'] = fromUserData['time']
                        i['isByMe'] = fromUserData['isSentByMe']
                    }
                    x.push(i)
                }

                if(!isFound){
                    let temp =  {
                        Status: -1,
                        Message: EncryptMessage,
                        isByMe: fromUserData['isSentByMe'].toString(),
                        name: fromUserData['from'],
                        lastOnline: "Offline",
                        time: fromUserData['time'],
                        userName: fromUserData['from']
                    }
                    x.push(temp)
                }
                return x
            })
    }

    }
    },[true])



    return (
        <Context.Provider value={{socket,selectedUserState,allUsersState,recentUsersState,focusState,changeSearch}}>
            { children }
        </Context.Provider>
    )


}

export default Context;
export { ContextProvider }



//todo : i should update values in other user machines to0....

