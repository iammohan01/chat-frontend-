export default function Users({user,userL ,setUser}){


    console.log(userL)
    console.log(user)
    console.log(setUser)
    console.log(username)
    return (
        <div className={`user--chat--box ${user.userName === username ? 'selected--user' : ''}`}
            onClick={()=>{
                setUser(username ? userL : "")
            }}
            
    
            // style={{backgroundColor : user.userName === username ? "purple" : ""}}
            >
            <div className='user--image'>
                <img src={'https://secure.gravatar.com/avatar/84da92f298e5b124d92fb581b82cfdf4?s=1200&d=retro&r=pg'}  alt={''}/>
            </div>
            <div className="chats">
                <div className="user">
                    <p className="user--name">
                        {name}
                     
                    </p>
                    <p className="messaged--time">
                        12s
                    </p>
                    
                </div>
                <span className="user--list--user--name">
                        @{username}
                        </span>
                <p className="message">
                    Chat 00
                </p>
            </div>
        </div>
    )

}