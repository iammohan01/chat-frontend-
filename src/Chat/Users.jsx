import React from "react";
export default function Users({className ,user ,setSelectedUser}){

    let [sec,setSec] = React.useState(Math.ceil((Date.now() - Number(user.time))/1000))
    let interval = 1000 ;


    let x
    React.useEffect(()=>{
        clearInterval(x)
        setSec(Math.ceil((Date.now() - Number(user.time))/1000))
    },[user.Message])
    React.useEffect(()=>{
        sec = Math.ceil((Date.now() - Number(user.time))/1000)
    if(sec < 60){
        interval = 1000
    }
    else if((sec / 60) < 60){
        interval = 1000 * 60
    }
    else{
        interval = 1000 * 60 *60
    }
        x = setInterval(()=>{setSec(Math.ceil((Date.now() - Number(user.time))/1000))},interval)
    },[sec])


    return (
        <div className={`user--chat--box ${className}`}
            onClick={()=>{
                setSelectedUser(user)
            }}
            >
            <div className='user--image'>
                <img src={'https://secure.gravatar.com/avatar/84da92f298e5b124d92fb581b82cfdf4?s=1200&d=retro&r=pg'}  alt={''}/>
            </div>
            <div className="chats">
                <div className="user">
                    <p className="user--name">
                        {user.name}
                     
                    </p>
                    <p className="messaged--time">
                        {sec < 60 ? `${sec}s` : (sec / 60) < 60 ? `${Math.ceil(sec/60)}m ` :   sec/(60*60) < 24 ? `${Math.ceil(sec/(60*60))}h ` :`${Math.ceil(sec/(60*60*24))}d`  }
                    </p>

                </div>
                <span className="user--list--user--name">
                        @{user['userName']}
                        </span>
                <p className="message">
                    {CryptoJS.AES.decrypt(user.Message, user.time).toString(CryptoJS.enc.Utf8)}

                    {/* todo : i think some problems here*/}
                    {user.isByMe === '1' ? <i className="bi arrow bi-arrow-down"></i> :<i className="bi arrow bi-arrow-up"></i>  }

                </p>
            </div>
        </div>
    )

}