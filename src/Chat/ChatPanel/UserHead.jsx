import React, {useEffect} from "react";
import alert from "../../Scripts/alert.js";

export function UserHead({ user }) {


    useEffect(()=>{

            connectionSocket.send(user['userName'])

    },[user.userName])

    console.log(user)
    return (
        <div className="UserHead">
            <div className="userImg">
                <img src={'https://secure.gravatar.com/avatar/84da92f298e5b124d92fb581b82cfdf4?s=1200&d=retro&r=pg'}  alt={''}/>
            </div>
            <div className="userDetail">
                <p className="chat--user--name">{user.name}
                    {user['Status'] === 1 && <span className={'connection online'}>Online </span>}
                    {user['Status'] === 2 && <span className={'connection last--seen'}>Last Seen {Math.ceil((Date.now() - Number(user['lastOnline']))/(1000 * 60))} mins ago</span>}
                    {user['Status'] === -1 && <span className={'connection offline'}>Offline</span>}
                </p>
                <p>@{user.userName}</p>
            </div>
            <div className="moreFunctions"></div>
        </div>
    );
}