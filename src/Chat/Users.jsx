export default function Users({user,userL, name ,setUser,username}){




    return (
        <div className='user--chat--box'
            onClick={()=>{
                setUser(username ? userL : "")
            }}


            style={{backgroundColor : user.userName === username ? "purple" : ""}}
            >
            <div className='user--image'></div>
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