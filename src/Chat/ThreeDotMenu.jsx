import {Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import React, {useContext} from "react";
import alert from "../Scripts/alert.js";
import Context from "../context.jsx";
import {reqCurrentUserChats} from "./ChatReqRes/ReqChat.jsx";

export function  ThreeDotMenu({chatDetails,isByMe}){


    let {selectedUserState, allUsersState} = useContext(Context);
    function deleteMessage(){
        let delReqJson = {

            time : `${chatDetails.time}`,
            msg : chatDetails.message,
            user : localStorage.getItem("userName"),
            fromUser : selectedUserState.selectedUser.userName
        }
        console.log(JSON.stringify(delReqJson))
        let xhr = new XMLHttpRequest()
        let end = `${endURL}/delete`
        xhr.open("POST",end)
        xhr.onreadystatechange = ()=>{
            xhr.onloadend =()=>{
                console.log("res from server")
                console.log(xhr.responseText)
                if(xhr.status === 200){
                    alert('success','Message deleted');
                    console.log(selectedUserState.selectedUser.userName, allUsersState.setAllUsersChats ,allUsersState.AllUsersChats)
                    // reqCurrentUserChats(selectedUserState.selectedUser.userName, allUsersState.setAllUsersChat ,allUsersState.allUsersChats)
                    allUsersState.setAllUsersChats((prev)=>{
                        let temp = prev
                        if(delete  temp[delReqJson.fromUser]){
                            return temp;
                        }
                        else {
                            return prev ;
                        }
                    })
                    reqCurrentUserChats(selectedUserState.selectedUser, allUsersState.setAllUsersChats ,allUsersState.AllUsersChats)
                }
            }
        }
        xhr.send(JSON.stringify(delReqJson));
    }
    return <Menu
        outline={'none'} p={0} m={0} maxW={'15px'}
    >
        <MenuButton p={0} m={5} maxW={'15px'} className='three--dot' >
            ...
        </MenuButton>
        <MenuList zIndex={1}>
            <MenuItem
                style={{
                    backgroundColor : '#F1F1F1'
                }
                }
                _hover={
                    {
                        outline: 'none'
                    }
                }
                _focus={
                    {
                        outline: 'none',
                    }
                }
                onClick={()=>{
                        copyText(chatDetails.message)
                }

            }>Copy Text

            </MenuItem>

            {isByMe === 1 && <MenuItem
                mt={'10px'}
                _hover={{
                    outline: 'none'
                }}
                _focus={
                    {
                        outline: 'none'
                    }
                }
                onClick={deleteMessage}
            >
                Unsend
            </MenuItem>}
        </MenuList>
    </Menu>
}

function copyText(text){
    navigator.clipboard.writeText(text)
    alert('success','Copied to ClipBoard.')
}
