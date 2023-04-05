import React from "react";
export default function Users({className ,user ,setSelectedUser}){

    let [sec,setSec] = React.useState(Math.ceil((Date.now() - Number(user.time))/1000))
    let interval = 5000 ;


    let x
    React.useEffect(()=>{
        clearInterval(x)
        setSec(Math.ceil((Date.now() - Number(user.time))/1000))
    },[user.Message])
    React.useEffect(()=>{
        sec = Math.ceil((Date.now() - Number(user.time))/1000)
    if(sec < 60){
        interval = 5000
    }
    else if((sec / 60) < 60){
        interval = 1000 * 60
    }
    else{
        interval = 1000 * 60 *60
    }
        x = setInterval(()=>{setSec(Math.ceil((Date.now() - Number(user.time))/1000))},interval)
    },[sec])

    let message = CryptoJS.AES.decrypt(user.Message, user.time).toString(CryptoJS.enc.Utf8) ;

    return (
        <>
        <div className={`user--chat--box ${className}`}
            onClick={()=>{
                setSelectedUser(user)
                document.getElementById("chat--input--box").focus()
            }}
            >
            <div className='user--image'>
                <img src={'https://cdn.iconscout.com/icon/free/png-256/profile-1754134-1493247.png'}  alt={''}/>
            </div>
            <div className="chats">
                <div className="user">
                    <p className="user--name">
                        {user.name.length > 15 ? user.name.slice(0,14)+'...' : user.name}
                     
                    </p>
                    <p className="messaged--time">
                        {sec < 60 ? `${sec}s` : (sec / 60) < 60 ? `${Math.ceil(sec/60)}m ` :   sec/(60*60) < 24 ? `${Math.ceil(sec/(60*60))}h ` :`${Math.ceil(sec/(60*60*24))}d`  }
                    </p>

                </div>
                <span className="user--list--user--name">
                        @{user['userName']}
                        </span>
                <p className="message">
                    {message.length > 15 ? message.slice(0,14)+'...':message}
                    {/* todo : i think some problems here*/}
                    {/*{user.isByMe === '1' ? <i className="bi arrow bi-arrow-down"></i> :<i className="bi arrow bi-arrow-up"></i>  }*/}

                </p>
            </div>

        </div>
        </>
    )

}