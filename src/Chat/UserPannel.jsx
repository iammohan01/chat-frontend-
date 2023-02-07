import { Input } from 'antd';
import { useState } from 'react';
import Users from './Users' ;

export function UserPannel({selectedUser,setSelectedUser}){
    const [userSearch , seUserSearch]  =  useState("");
    const [users,setUsers] = useState([])

    let usersList = users.map((val)=>{
        return <Users user={selectedUser} setUser={setSelectedUser} name={val.name} username={val.userName} key={val.userName} />
    })

    function getuserDetails(){
        if (userSearch.length < 3) {
            // return
        }
        let reqUserList = new XMLHttpRequest();
        reqUserList.open("GET",`http://localhost:8080/demo2_war_exploded/GetUserList?userKey=${userSearch}`)
        reqUserList.onreadystatechange = ()=>{
           

            if (reqUserList.status === 200){
                let res = JSON.parse(reqUserList.response);
                console.log(res)
                setUsers(res.userList)
                console.log(reqUserList.response);

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
                        console.log(e.code);
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
