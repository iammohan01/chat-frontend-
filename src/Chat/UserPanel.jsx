import { Input } from 'antd';
import { useState } from 'react';
import Users from './Users' ;

export function UserPanel({selectedUser,setSelectedUser}){

    // console.error('User Panel Component')

    const [userSearch , seUserSearch]  =  useState("");
    const [users,setUsers] = useState([])
    let usersList = users.map((val)=>{
        return (  val.userName !== localStorage.getItem("userName") && <Users user={selectedUser} setUser={setSelectedUser} userL={val} name={val.name} username={val.userName} key={val.userName} />)
    })

    function getUserDetails(){

        // console.error('in get user Details component')
        
        let reqUserList = new XMLHttpRequest();
        let end = `http://localhost:8080/demo2_war_exploded/GetUserList?userKey=${userSearch}`
        // let end = `/GetUserList?userKey=${userSearch}`
        reqUserList.open("GET",end)
        reqUserList.onreadystatechange = ()=>{
            if (reqUserList.status === 200){
                let UserListResponse  = reqUserList.response
                if (UserListResponse){
                    UserListResponse = JSON.parse(UserListResponse)
                setUsers(UserListResponse["userList"])
                }

            }
        }
        reqUserList.send(JSON.stringify({userKey:userSearch}))

    }

    return (
        <div className="user--panel">
            <Head />
            <Input 
                placeholder="Search Users" 
                onChange={(e)=>{
                seUserSearch(e.target.value)
                }} 
                onKeyDown={(e)=>{
                    if (e.code === "Enter"){
                        getUserDetails()
                    }
                }
                }
                value={userSearch}
            />
            
             {usersList}
        </div>
    )
}


function Head(){
    return(
        <div>
            <h1>{localStorage.getItem("user")}</h1>
        </div>
    )
}
