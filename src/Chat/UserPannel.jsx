import { Input } from 'antd';
import { useState } from 'react';

export function UserPannel({selectedUser,setSelectedUser}){
    const [userSearch , seUserSearch]  =  useState("");
    const [users,setUsers] = useState([])
    // console.log(users);



    let usersList = users.map((val)=>{
        // console.log(val)
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
        // console.log("asdfas")
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
function Users({user, name ,setUser,username}){





    return (
        <div className='user--chat--box'
            onClick={()=>{
                setUser(username ? username : "a")
            }}

            style={{backgroundColor : user === username ? "purple" : ""}}
            >
            <div className='user--image'></div>
            <div className="chats">
                <div className="user">
                    <p className="user--name">
                        {name}
                    </p>
                    <p className="messaged--time">
                        12s
                    </p>
                    
                </div>
                <p className="message">
                    Chat 00
                </p>
            </div>
        </div>
    )

}