import alert from "../Scripts/alert.js";

export default  function sendFile(file,filename,updateRecentChats,setAllUsersChat,user){
    let timeNow = Date.now()
    let objForSocket = {
        type : 'file',
        from : localStorage.getItem('uid'),
        to : user.userName,
        time : timeNow,
        message : "",
    }

    console.log(file)
    if (file.size > 973741824){
        alert('warning','File Size Should be less than 1GB')
        return
    }


    let ency = CryptoJS.AES.encrypt(filename, timeNow + '').toString()
    console.log(ency)
    objForSocket.message = ency


    const formData = new FormData();
    formData.append('name', ency);
    formData.append('by',localStorage.getItem('uid'))
    formData.append('file', file);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${endURL}/LoadFile`, true);

    // xhr.send(formData);

    xhr.onreadystatechange = ()=>{
        xhr.onloadend =()=>{
            console.warn(xhr.responseText)
            let res = JSON.parse(xhr.responseText)
            if(res['status'] ===1 ){
                socket.send(JSON.stringify(objForSocket))
                updateRecentChats(ency,timeNow)
                let UpdateObject = {
                    fromUser : '' ,
                    toUser : user.userName,
                    message : filename,
                    time : timeNow ,
                    isSentByMe : true,
                    type :'file',
                    ency : ency

                }

                setAllUsersChat((prevChats)=>{
                    let readyToUpdateInLocalBase = prevChats[user.userName] || []
                    readyToUpdateInLocalBase.push(UpdateObject)
                    return {...prevChats , [user.userName] : readyToUpdateInLocalBase}
                })
            }
            else{
                alert('error','failed to send file')
            }

        }

    }
    xhr.upload.onprogress =(progress)=>{
        console.log(Math.floor((progress.loaded/progress.total)*100))
    }
    xhr.send(formData);


}