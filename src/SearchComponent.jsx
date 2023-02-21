import {useContext, useEffect, useState} from "react";
import context from "./context.jsx";

export  function SearchComponent(){


    // change selected user , chat window

    const {changeSearch} =useContext(context);


    const [input , setInput] = useState("")
    const [usersList,setUsersList] = useState([])
    let [usersComp,setUsersComp] = useState([])

    let changeUser = changeSearch['setSelectedUser']
    let changeFocus = changeSearch['setFocus']

    function startChat(user) {


        let x ={
            "Status": -1,
            "Message": "",
            "isByMe": "",
            "name": user.name,
            "lastOnline": "Offline",
            "time": '',
            "userName": user.userName
        }
        changeUser(x)
        changeFocus('chat')
    }

    useEffect(()=>{

        let x = usersList.map((userObj)=>{
            if(userObj.userName !== localStorage.getItem('userName')) {
                return (
                    <div key={userObj['userName']} className={'search--user'}>
                        <img className={'profile--img'} src={'./profile-test.svg'} alt={'user image'}/>
                        <div className={'details--section'}>
                            <p>{userObj.name}</p>
                            <p>@{userObj['userName']}</p>
                        </div>
                        <div className={'start--message'} onClick={() => {
                            startChat(userObj)
                        }}>
                            <i className="bi bi-send-fill"></i>
                        </div>
                        {/*{JSON.stringify(userObj)}*/}
                    </div>
                )
            }
        })
        setUsersComp(x)

    },[usersList])
    function reqUsers(){
        if (!input.trim()) return
        let xhr = new XMLHttpRequest();
        let end = `${endURL}/GetUserList?userKey=${input}`
        xhr.open("GET",end)
        xhr.onreadystatechange =()=>{
            xhr.onloadend = ()=>{
                let res = JSON.parse(xhr.responseText)
                setUsersList(res['userList'])
                console.log(res)
            }
        }
        xhr.send()

    }

    useEffect(()=>{
        reqUsers()
    },[input])
    return (
        <div className={'search--component'}>
            <div className={'search--area'}>
                <input
                    type={"text"}
                    className={'search--box'}
                    autoFocus={true}
                    placeholder={'Search Users / Messages '}
                    value={input}
                    onChange={(event)=>{
                        setInput(event.target.value)
                        }
                    }
                />
            </div>
            <div className={'result--area'}>
                <div className={'users--area'}>
                    {usersComp}
                </div>
            </div>
        </div>
    )

}