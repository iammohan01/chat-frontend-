import { Input } from 'antd';
import { useState } from 'react';
import Users from './Users' ;

export function UserPanel({selectedUser,setSelectedUser}){

    // console.log(setSelectedUser)
    // alert(JSON.stringify(selectedUser))
    const [userSearch , seUserSearch]  =  useState("");
    const [users,setUsers] = useState([])
    let usersList = users.map((val)=>{
        return (  val.userName !== localStorage.getItem("userName") && <Users className={selectedUser.userName === val.userName ? 'selected--user':""} user={val} setSelectedUser={setSelectedUser} />)
    })

    function getUserDetails(){

        // console.error('in get user Details component')
        
        let reqUserList = new XMLHttpRequest();
        // let end = `http://localhost:8080/demo2_war_exploded/GetUserList?userKey=${userSearch}`
        let end = `${endURL}/GetUserList?userKey=${userSearch}`
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
                getUserDetails()
            }} />
             {usersList}
        </div>
    )
}


function Head(){
    return(
        <div>
            <h1 className={'app--title'}>ChripChat</h1>
        </div>
    )
}
