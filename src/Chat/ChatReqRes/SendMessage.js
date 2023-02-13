export  function sendMessage(userNameOfOtherSideUser , MessageToSend , ChatInputBoxState , setChats) {
    let time = Date.now();
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
            let o = {
                ...prevState,
                [userNameOfOtherSideUser]: [...prevState[userNameOfOtherSideUser], objectForUpdatingLocalPreviousChats],
            };
            console.log(o);
            return o;
        });

        socketa.send(JSON.stringify(objectForServerToProcessChat));
    }
}