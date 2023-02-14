import React from "react";

export function UserHead({ user }) {
    return (
        <div className="UserHead">
            <div className="userImg">
                <img src={'https://secure.gravatar.com/avatar/84da92f298e5b124d92fb581b82cfdf4?s=1200&d=retro&r=pg'}  alt={''}/>
            </div>
            <div className="userDetail">
                <p className="chat--user--name">{user.name}</p>
                <p>@{user.userName}</p>
            </div>
            <div className="moreFunctions"></div>
        </div>
    );
}