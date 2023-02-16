import alert from "../../Scripts/alert.js";

export function reqCurrentUserChats(CurrentUser, setAllUsersChat ,allUsersChats) {


    if (!Object.keys(allUsersChats).includes(CurrentUser.userName)){
        // alert('success','Requesting chats from server')
        const xhr = new XMLHttpRequest();
        xhr.open("GET",`http://localhost:8080/demo2_war_exploded/getChats?targetId=${CurrentUser.userName}&reqId=${localStorage.getItem("uid")}`);
        // console.log(xhr.responseURL)
        // xhr.open("GET",`/getChats?targetId=${username.userName}&reqId=${localStorage.getItem("uid")}`);
        xhr.onreadystatechange = function (){
            xhr.onloadend = function (){
                if (xhr.status === 200){
                    let encryptedRes = JSON.parse(xhr.responseText);

                    let decryptedRes = encryptedRes.map((val)=>{
                        console.log(CryptoJS.AES.decrypt(val.message,val.time).toString(CryptoJS.enc.Utf8))
                        return {...val ,message :CryptoJS.AES.decrypt(val.message,val.time).toString(CryptoJS.enc.Utf8) }
                    })

                    let res = [] ;
                    setAllUsersChat((prevAllUsersChat)=>{
                        return {...prevAllUsersChat , [CurrentUser.userName] : decryptedRes}
                    })
                }
            }
        }
        xhr.send()
    }

    else{
        alert('success','getting chats from local base, reqChat.js line 24')
    }
}