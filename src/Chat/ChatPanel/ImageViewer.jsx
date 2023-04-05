import {useContext} from "react";
import context from "../../context.jsx";

export default function ImageViewer({src}){
    const {selectedUserState} =  useContext(context);
    let val = src
    let link = `${endURL}/files/${val.isSentByMe?localStorage.userName:selectedUserState.selectedUser.userName}/${val.message}`;
    return (


    <div className={'image'}>

        <img src={link} alt={""}/>
     </div>
    )
}