// import alert from "../../Scripts/alert.js";

export function reqCurrentUserChats(CurrentUser, setAllUsersChat ,allUsersChats) {


    if (!Object.keys(allUsersChats).includes(CurrentUser.userName)){
        const xhr = new XMLHttpRequest();
        xhr.open("GET",`http://localhost:8080/demo2_war_exploded/getChats?targetId=${CurrentUser.userName}&reqId=${localStorage.getItem("uid")}`);
        // xhr.open("GET",`/getChats?targetId=${username.userName}&reqId=${localStorage.getItem("uid")}`);
        xhr.onreadystatechange = function (){
            xhr.onloadend = function (){
                if (xhr.status === 200){
                    let res = JSON.parse(xhr.responseText);
                    setAllUsersChat((prevAllUsersChat)=>{
                        return {...prevAllUsersChat , CurrentUser : res}
                    })
                }
            }
        }
        return;
    }

    else{
        alert('we cant find user chats, reqChat.js line 24')
    }
    return;







    // alert(`requesting user chats of ${requestingUser.userName}`)
    if (userChatList && userChatList.chats[requestingUser.userName]) {
        // console.warn("getting chats form local base");
        // alert('getting in side of req')
        // console.log(userChatList.chats[requestingUser.userName]);
        return
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET",`http://localhost:8080/demo2_war_exploded/getChats?targetId=${requestingUser.userName}&reqId=${localStorage.getItem("uid")}`);
    // xhr.open("GET",`/getChats?targetId=${username.userName}&reqId=${localStorage.getItem("uid")}`);
    xhr.onreadystatechange = () => {
        xhr.onloadend = () => {
            if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                // console.log(res);
                setCurrentUserChatList(res);
                userChatList.setChats((prevState) => {
                    // console.log(prevState)
                    return { ...prevState, [requestingUser.userName]: res };
                });
                // console.log(userChatList.chats)
            }
        };
    };
    if (requestingUser.userName) {
        xhr.send();
    }
}