import {createContext, useEffect, useState} from "react";
import alert from "./Scripts/alert.js";
import {reqCurrentUserChats} from "./Chat/ChatReqRes/ReqChat.jsx";

const Context = createContext({});



const ContextProvider = ({ children }) => {


    const [selectedUser, setSelectedUser]= useState({});
    const [AllUsersChats,setAllUsersChats] = useState({});
    const [recentUsers,setRecentUsers] = useState([]);
    const [focus,setFocus] = useState('chat');
    const [urlHistory,setUrlHistory] = useState({})
    const [blobUrls,setBlobUrls] = useState({})

    const selectedUserState = {selectedUser,setSelectedUser}
    const allUsersState = {AllUsersChats,setAllUsersChats}
    const recentUsersState = {recentUsers,setRecentUsers}
    const focusState = {focus,setFocus}
    const  url_History = {urlHistory,setUrlHistory}
    const blobs = {blobUrls,setBlobUrls}

    //for selected search user
    const changeSearch = {setSelectedUser,setFocus}

    useEffect(()=>{
        // console.log(recentUsers)
    },[recentUsers])

    useEffect(()=>{
        // console.log(selectedUser)
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

    socket.onopen =()=>{
        console.log('Connection Open')
    }
    socket.onmessage = (message)=> {
        // console.log(message.data)


        let fromUserData = JSON.parse(message.data)

        let EncryptMessage = fromUserData['message']


        if (fromUserData['type'] === 'chat' || fromUserData['type'] === 'file') {
            fromUserData['message'] = CryptoJS.AES.decrypt(fromUserData['message'], fromUserData['time']).toString(CryptoJS.enc.Utf8)
            let fromUser = fromUserData['from']

            // send notification
            let greeting = new Notification(`Hey , You got new message from  ${fromUser}`);
            greeting.onclick = () => {
                window.parent.focus();
                greeting.close();
                setSelectedUser(prev=>{

                })
            }


            setAllUsersChats((prevAllUsersChat) => {
                if (!prevAllUsersChat[fromUser]) {
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
            setRecentUsers((prev)=>{
                // console.log(AllUsersChats)

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
                        Message: EncryptMessage,
                        isByMe: fromUserData['isSentByMe'].toString(),
                        name: fromUserData['from'],
                        time: fromUserData['time'],
                        userName: fromUserData['from']
                    }
                    x.push(temp)
                }
                return x
            })

        }
        if(fromUserData['type'] === 'delete'){
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


    }

    },[true])



    return (
        <Context.Provider value={{socket,blobs,url_History,selectedUserState,allUsersState,recentUsersState,focusState,changeSearch}}>
            { children }
        </Context.Provider>
    )


}

export default Context;
export { ContextProvider }



//todo : i should update values in other user machines to0....

