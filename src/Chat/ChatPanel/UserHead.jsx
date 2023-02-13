import React from "react";

export function UserHead({ user }) {
    return (
        <div className="UserHead">
            <div className="userImg"></div>
            <div className="userDetail">
                <p className="chat--user--name">{user.name}</p>
                <p>@{user.userName}</p>
            </div>
            <div className="moreFunctions"></div>
        </div>
    );
}