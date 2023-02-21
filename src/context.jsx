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
        console.log(selectedUser)
    },[selectedUser])
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
        console.log('Connection Open')
    }
    socket.onmessage = (message)=>{
        // alert('success',`Message from server ${message.data}`)

        let fromUserData = JSON.parse(message.data)
        fromUserData['message'] = CryptoJS.AES.decrypt(fromUserData['message'],fromUserData['time']).toString(CryptoJS.enc.Utf8)
        let fromUser = fromUserData['from']


        // send notification
        new Notification(`Hey , You got new message from  ${fromUser}`);



        setAllUsersChats((prevAllUsersChat)=>{
            if(!prevAllUsersChat[fromUser]){
                // alert('warning','get a request from server')
                return {}
            }

            let fromUserPrevData = prevAllUsersChat[fromUser]
            // console.log(fromUserPrevData)
            fromUserPrevData.push(fromUserData)
            // console.log(fromUserPrevData)
            return {
                ...prevAllUsersChat ,
                [fromUser] : fromUserPrevData
            }
        })
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

