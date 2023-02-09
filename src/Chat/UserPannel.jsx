import { Input } from 'antd';
import { useState } from 'react';
import Users from './Users' ;

export function UserPannel({selectedUser,setSelectedUser}){

    const [userSearch , seUserSearch]  =  useState("");
    const [users,setUsers] = useState([])
    let usersList = users.map((val)=>{
        return <Users user={selectedUser} setUser={setSelectedUser} userL={val} name={val.name} username={val.userName} key={val.userName} />
    })

    function getuserDetails(){
        
        let reqUserList = new XMLHttpRequest();
        let end  = `http://localhost:8080/demo2_war_exploded/GetUserList?userKey=${userSearch}`
        console.log(end)
        reqUserList.open("GET",end)
        reqUserList.onreadystatechange = ()=>{
            if (reqUserList.status === 200){
                let UserListResponse  = reqUserList.response
                if (UserListResponse){
                    UserListResponse = JSON.parse(UserListResponse)
                setUsers(UserListResponse.userList)
                }

            }
        }
        reqUserList.send(JSON.stringify({userKey:userSearch}))

    }

    return (
        <div className="user--pannel">
            <Head />
            <Input 
                placeholder="Search Users" 
                onChange={(e)=>{
                seUserSearch(e.target.value)
                }} 
                onKeyDown={(e)=>{
                    if (e.code === "Enter"){
                        getuserDetails()
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
            <h1>Messages</h1>
        </div>
    )
}
