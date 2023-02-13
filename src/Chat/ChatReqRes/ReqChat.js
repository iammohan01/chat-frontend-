export function reqCurrentUserChats(username, userChatList, setChats) {
    if (userChatList.chats[username.userName]) {
        console.warn("getting chats form userBase");
        console.log(userChatList.chats[username.userName]);
        return
    } else {
        console.error("cant find chats");
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET",`http://localhost:8080/demo2_war_exploded/getChats?targetId=${username.userName}&reqId=${localStorage.getItem("uid")}`);
    // xhr.open("GET",`/getChats?targetId=${username.userName}&reqId=${localStorage.getItem("uid")}`);
    xhr.onreadystatechange = () => {
        xhr.onloadend = () => {
            if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                console.log(res);
                setChats(res);
                userChatList.setChats((prevState) => {
                    return { ...prevState, [username.userName]: res };
                });
                // console.log(userChatList.chats)
            }
        };
    };
    if (username.userName) {
        xhr.send();
    }
}