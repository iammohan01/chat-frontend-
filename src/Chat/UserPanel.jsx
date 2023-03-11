import {useContext, useEffect, useState} from 'react';
import Users from './Users';
import context from "../context.jsx";

export function UserPanel({selectedUser,setSelectedUser}){



    const {recentUsersState,focusState}= useContext(context)

    const [userSearch , seUserSearch]  =  useState("");
    const [users,setUsers] = useState([]);
    // console.log(recentUsersState)
    const {recentUsers,setRecentUsers} = recentUsersState ;
    let usersList = recentUsers.map((val)=>{
        return (  val.userName !== localStorage.getItem("userName") && <Users key={val.userName} className={selectedUser.userName === val.userName ? 'selected--user':""} user={val} setSelectedUser={setSelectedUser} />)
    })

    function getRecentUserDetails(){

        let reqUserList = new XMLHttpRequest();
        let end = `${endURL}/RecentChats?userId=${localStorage.getItem("userName")}`

        // console.log(selectedUser)
        reqUserList.open("GET",end)
        reqUserList.onreadystatechange = ()=>{
            if (reqUserList.status === 200){
                let UserListResponse  = reqUserList.response

                if (UserListResponse){
                    UserListResponse = JSON.parse(UserListResponse)
                    // console.log(UserListResponse)
                    UserListResponse["userList"].sort((a, b) =>{
                        return Number(b['time']) - Number(a['time'])
                    });
                    setRecentUsers(UserListResponse["userList"])
                    setUsers(UserListResponse["userList"])
                }

            }
        }
        reqUserList.send(JSON.stringify({userKey:userSearch}))

    }
    useEffect(()=>{
        getRecentUserDetails()

    },[])
    return (
        <div className="user--panel">
            <div className={'user--panel--header'}>

            <Head />
            <input placeholder="Search for chats, users…"
                   type={"text"} className={'userSearch'} onClick={()=>{
                focusState.setFocus('search')
            }} onChange={(e)=>{
                seUserSearch(e.target.value)

            }} />
            </div>
             {usersList}
        </div>
    )
}


function Head(){
    return(
        // <div>
            <h1 className={'app--title'}>Chats</h1>
        // </div>
    )
}


function getRecentChatsList(){
    let xhr = new XMLHttpRequest();
    let end = `${endURL}/RecentUsers?userId=${localStorage.getItem('userName')}`
    console.log(end)
    xhr.open('GET',end)
    xhr.onreadystatechange =()=>{
        xhr.onloadend =()=>{
            console.log(xhr.response)
        }
    }
    xhr.send();
}
