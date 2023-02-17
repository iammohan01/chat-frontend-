import {useEffect, useState} from "react";
import {ThreeDotMenu} from "../ThreeDotMenu.jsx";

export function ChatsComponent( chats ) {

    let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let s
        if (chats) {
             s = chats.map((val, index, arr) => {
                 let time = new Date(Number(val.time))
                 let hours = `${time.getHours()%12}:${time.getMinutes()} ${time.getHours() > 11? 'PM' : 'AM'}`
                return (
                    <p key={val.time} className={`${val.isSentByMe ? "end" : ""} msg`}>
                        {val.isSentByMe && <ThreeDotMenu key={val.time}  isByMe={1} chatDetails={val}/>  }
                        {val.isSentByMe && <span className={'time--in--msg'}>{month[time.getMonth()]} {time.getDate()} {hours}</span>}
                        <span className="msg">
                            {val.message}

                        </span>
                        {!val.isSentByMe && <span className={'time--in--msg'}>{month[time.getMonth()]} {time.getDate()} {hours}</span>}
                        {!val.isSentByMe && <ThreeDotMenu key={val.time} chatDetails={val}/>}

                    </p>
                );
            });
        }


    // console.log(s)

    return s ;
    // return <div className="chat--list">{s}</div>;
}
