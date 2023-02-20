import { Input } from 'antd';
import { useState } from 'react';
import Users from './Users' ;

export function UserPanel({selectedUser,setSelectedUser}){

    // console.log(setSelectedUser)
    // alert(JSON.stringify(selectedUser))
    const [userSearch , seUserSearch]  =  useState("");
    const [users,setUsers] = useState([]);
    const [recentChats,setRecentChats] = useState();
    let usersList = users.map((val)=>{
        return (  val.userName !== localStorage.getItem("userName") && <Users key={val.userName} className={selectedUser.userName === val.userName ? 'selected--user':""} user={val} setSelectedUser={setSelectedUser} />)
    })

    function getRecentUserDetails(){

        let reqUserList = new XMLHttpRequest();
        // let end = `http://localhost:8080/demo2_war_exploded/GetUserList?userKey=${userSearch}`
        // let end = `${endURL}/GetUserList?userKey=${userSearch}`

        // let end = `http://localhost:8080/demo2_war_exploded/GetUserList?userKey=${userSearch}`
        let end = `${endURL}/RecentChats?userId=${localStorage.getItem("userName")}`

        reqUserList.open("GET",end)
        reqUserList.onreadystatechange = ()=>{
            if (reqUserList.status === 200){
                let UserListResponse  = reqUserList.response

                if (UserListResponse){
                    UserListResponse = JSON.parse(UserListResponse)
                    console.log(UserListResponse)
                setUsers(UserListResponse["userList"])
                }

            }
        }
        reqUserList.send(JSON.stringify({userKey:userSearch}))

    }

    getRecentUserDetails()
    return (
        <div className="user--panel">
            <Head />
            {/*<Input*/}
            {/*    placeholder="Search Users"*/}
            {/*    onChange={(e)=>{*/}
            {/*    seUserSearch(e.target.value)*/}
            {/*    }}*/}
            {/*    }*/}
            {/*    value={userSearch}*/}
            {/*/>*/}
            <input placeholder="Search Users" type={"text"} className={'userSearch'} onChange={(e)=>{
                seUserSearch(e.target.value)
                getRecentUserDetails()
            }} />
             {usersList}
        </div>
    )
}


function Head(){
    return(
        <div>
            <h1 className={'app--title'}>Hello 👋🏻</h1>
        </div>
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
