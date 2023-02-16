import {useEffect, useState} from "react";
import {ThreeDotMenu} from "../ThreeDotMenu.jsx";

export function ChatsComponent( chats ) {

    let s
        if (chats) {
             s = chats.map((val, index, arr) => {
                return (
                    <p key={val.time} className={`${val.isSentByMe ? "end" : ""} msg`}>
                        {val.isSentByMe && <ThreeDotMenu key={val.time} chatDetails={val}/>}
                        <span className="msg">{val.message}</span>
                        {!val.isSentByMe && <ThreeDotMenu key={val.time} chatDetails={val}/>}
                    </p>
                );
            });
        }


    console.log(s)

    return s ;
    // return <div className="chat--list">{s}</div>;
}
