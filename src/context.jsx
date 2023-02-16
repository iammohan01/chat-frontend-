import {createContext, useEffect, useState} from "react";
import alert from "./Scripts/alert.js";

const Context = createContext({});



const ContextProvider = ({ children }) => {
    const socket = new WebSocket(`ws://localhost:8080/demo2_war_exploded/chat/${localStorage.getItem("uid")}`)
    const [selectedUser, setSelectedUser]= useState({});
    const [AllUsersChats,setAllUsersChats] = useState([]);

    const selectedUserState = {selectedUser,setSelectedUser}
    const allUsersState = {AllUsersChats,setAllUsersChats}
    useEffect(()=>{

    socket.onopen =()=>{
        alert('success','Socket Opened')
    }
    socket.onmessage = (message)=>{
        alert('success',`Message from server ${message.data}`)

        let fromUserData = JSON.parse(message.data)
        let fromUser = fromUserData['from']


        // send notification
        new Notification('Hey , You got new message',{
            body: `from : ${fromUser}`,
            icon: './vite.svg'
        });

        setAllUsersChats((prevAllUsersChat)=>{

            let fromUserPrevData = prevAllUsersChat[fromUser]
            console.log(fromUserPrevData)
            fromUserPrevData.push(fromUserData)
            console.log(fromUserPrevData)
            return {
                ...prevAllUsersChat ,
                [fromUser] : fromUserPrevData
            }
        })
    }
    },[true])
    return (
        <Context.Provider value={{socket,selectedUserState,allUsersState}}>
            { children }
        </Context.Provider>
    )


}

export default Context;
export { ContextProvider }


