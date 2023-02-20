import {useEffect, useState} from "react";
import {ThreeDotMenu} from "../ThreeDotMenu.jsx";
import alert from "../../Scripts/alert.js";

export function ChatsComponent( chats ) {

    let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let s
        if (chats) {
             s = chats.map((val, index, arr) => {
                 let time = new Date(Number(val.time))
                 let hours = `${time.getHours()%12}:${time.getMinutes()} ${time.getHours() > 11? 'PM' : 'AM'}`
                 // console.log(val)
                return (
                    <div key={val.time} className={`${val.isSentByMe ? "end" : ""} msg`}>
                        {val.isSentByMe && <ThreeDotMenu key={val.time}  isByMe={1} chatDetails={val}/>  }
                        {val.isSentByMe && <span className={'time--in--msg'}>{month[time.getMonth()]} {time.getDate()} {hours}</span>}
                        {/*{val['type'] === 'file' && <> </>}*/}

                        {val['type'] === 'chat' &&
                            <span className={`msg`}>
                            {val.message}
                        </span>}

                        {val['type'] === 'file' &&
                            <div className={'file msg'}>
                                <p className={'file--name'}>
                                    {val.message}
                                </p>

                            <i onClick={()=>{downloadFile(val.ency,val.message)}} className="bi bi-cloud-arrow-down-fill"></i>
                        </div>}

                        {!val.isSentByMe && <span className={'time--in--msg'}>{month[time.getMonth()]} {time.getDate()} {hours}</span>}
                        {!val.isSentByMe && <ThreeDotMenu key={val.time} chatDetails={val}/>}

                    </div>
                );
            });
        }


    // console.log(s)

    return s ;
    // return <div className="chat--list">{s}</div>;
}
function downloadFile(file,fileName){
    console.log(file)


    let form = new FormData();
    form.set('id',file)

    let xhr = new XMLHttpRequest();
    xhr.open("POST",`${endURL}/GetFile`,true)
    xhr.responseType = "blob";
    xhr.onreadystatechange = ()=>{
        xhr.onprogress =(progress)=>{

            console.log(Math.floor((progress.loaded/progress.total)*100))
            alert("success",`${Math.floor((progress.loaded/progress.total)*100)}% downloaded`)
        }
        xhr.onloadend =()=>{
            var blob = xhr.response;
            // var blob = new Blob([arrayBuffer]);
            console.log(blob)
            var url = URL.createObjectURL(blob);
            console.log(url)

            let downEle = document.createElement('a');
            downEle.href = url
            downEle.download = fileName ;
            console.log(downEle)
            downEle.click()
        }

    }
    xhr.send(form)

}