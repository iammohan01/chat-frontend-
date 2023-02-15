export default function Users({className ,user ,setSelectedUser}){



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
                        12s
                    </p>
                    
                </div>
                <span className="user--list--user--name">
                        @{user.userName}
                        </span>
                <p className="message">
                    Chat 00
                </p>
            </div>
        </div>
    )

}