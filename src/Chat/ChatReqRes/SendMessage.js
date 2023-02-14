import {socketForMessageTransfer} from "./SocketForMessageTransfer.js";

export  function sendMessage(userNameOfOtherSideUser , MessageToSend , ChatInputBoxState , setChats, time) {
    let objectForServerToProcessChat = {
        type: "chat",
        from: localStorage.getItem("uid"),
        to: userNameOfOtherSideUser,
        message: MessageToSend,
        time: time,
    };
    if (!MessageToSend) {
        // todo: it's for testing purpose i will remove it later
        ChatInputBoxState(`${Date.now()}`);
    }
    if (MessageToSend && userNameOfOtherSideUser) {
        console.log(JSON.stringify(objectForServerToProcessChat));
        setChats((prevState) => {
            console.warn(prevState);
            let objectForUpdatingLocalPreviousChats = {
                isSentByMe: true,
                time: time,
                message: MessageToSend,
                from: userNameOfOtherSideUser,
            };
            // let o = {
            //     ...prevState,
            //     [userNameOfOtherSideUser]: [...prevState[userNameOfOtherSideUser], objectForUpdatingLocalPreviousChats],
            // };

            let o = prevState || []
            o.push(objectForUpdatingLocalPreviousChats)
            console.log(o);
            return o.slice();
        });
        console.log("sending messages to server")
        socketForMessageTransfer.send(JSON.stringify(objectForServerToProcessChat));
    }
}

