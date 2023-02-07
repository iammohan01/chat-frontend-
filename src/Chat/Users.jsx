export default function Users({user, name ,setUser,username}){




    return (
        <div className='user--chat--box'
            onClick={()=>{
                setUser(username ? username : "a")
            }}

            style={{backgroundColor : user === username ? "purple" : ""}}
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
                <p className="message">
                    Chat 00
                </p>
            </div>
        </div>
    )

}