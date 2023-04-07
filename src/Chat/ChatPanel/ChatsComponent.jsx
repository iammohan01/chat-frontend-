import {useContext, useEffect, useRef, useState} from "react";
import {ThreeDotMenu} from "../ThreeDotMenu.jsx";
import alert from "../../Scripts/alert.js";
import {Tooltip} from "antd";
import LinkPreview from "./LinkPreview.jsx";
import context from "../../context.jsx";
import VoicePlayer from "../../Utils/AudioPlayer.jsx";
import {downloadFile} from "../../Utils/downloadFile.js";
import ImageViewer from "./ImageViewer.jsx";
import ReactMarkdown from 'react-markdown'

let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function ChatsComponent( chats ) {


    let s
        if (chats) {
             s = chats.map((val, index, arr) =><LoadChat val={val}/>);
        }


    // console.log(s)

    return s ;
    // return <div className="chat--list">{s}</div>;
}
function LoadChat({val}){


        const {blobs,selectedUserState} =  useContext(context);
        const {blobUrls,setBlobUrls} =  blobs
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'ico', 'webp', 'avif', 'jfif']


    let time = new Date(Number(val.time))
        let hours = `${time.getHours()%12}:${time.getMinutes()} ${time.getHours() > 11? 'PM' : 'AM'}`
        let message = val.message.trim()

        message.replaceAll('\n','<br>')

        let temp = message[0];
        for (let i = 1 ; i < message.length ; i++){
            if(i%80 === 0){
                temp+=`<br>${message[i]}`
            }
            else{
                temp += message[i]
            }
        }

        function validateUrl(value) {
            return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
        }
        function downloadFileMain(fileInfo){
                // console.log(selectedUserState.selectedUser.userName);
            let link = `${endURL}/files/${val.isSentByMe?localStorage.userName:selectedUserState.selectedUser.userName}/${val.message}`;
            let a = document.createElement("a");
            a.href = link;
            a.click();
                // `${endURL}/files/${val.isSentByMe?localStorage.userName:selectedUserState.selectedUser.userName}/${val.message}`
        }

        let fileExtension = val.message.split(".")
        fileExtension = fileExtension[fileExtension.length - 1]

        // console.log(val)
        return (
            <div key={val.time} className={`${val.isSentByMe ? "end" : ""} msg`}>
                {val.isSentByMe && <ThreeDotMenu key={val.time}  isByMe={1} chatDetails={val} />   }
                {val.isSentByMe && <span className={'time--in--msg'}>{month[time.getMonth()]} {time.getDate()} {hours}</span>}
                {/*{val['type'] === 'file' && <> </>}*/}

                {val['type'] === 'chat' &&
                    <div className={`msg`} >
                        {validateUrl(message)  ? <LinkPreview  url={message} message={temp}  />
                            : <ReactMarkdown>{temp}</ReactMarkdown> }
                        {/*{<span dangerouslySetInnerHTML={{ __html: temp}}>*/}
                                {/*{val.message}*/}
                                {/*</span>}*/}

                        {/*    {str}*/}
                    </div>}

                {val['type'] === 'file' &&
                    <div className={'file msg'} style={{
                        width : val.message.toLowerCase().endsWith('.webm') || val.message.toLowerCase().endsWith('.mp3') || val.message.toLowerCase().endsWith('.ogg') || imageExtensions.includes(fileExtension) ? '30%' : 'unset',
                        aspectRatio :   imageExtensions.includes(fileExtension) ? '5/3' : 'unset'
                    }} >
                        {(val.message.toLowerCase().endsWith('.webm') || val.message.toLowerCase().endsWith('.mp3') || val.message.toLowerCase().endsWith('.ogg'))  && <VoicePlayer  color={val.isSentByMe ? "#fff" : "#000"} audioSrc={val}/>}
                        {imageExtensions.includes(fileExtension) && <ImageViewer src={val} />}

                        <div style={{
                            display: "flex",
                            alignItems : "center",
                            justifyContent : 'space-between'
                        }}>
                        <p className={'file--name'}>
                            {val.message}
                        </p>
                        <Tooltip title={`Download file`} >
                            {/*<i onClick={()=>{downloadFile(val.ency,val.message,true,blobs)}} className="download bi bi-cloud-arrow-down-fill"></i>*/}
                            <svg onClick={()=>{downloadFileMain(val)}} className={'download'} width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5" stroke={val.isSentByMe ? "#fff" : "#000"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </Tooltip>
                        </div>
                    </div>}

                {!val.isSentByMe && <span className={'time--in--msg'}>{month[time.getMonth()]} {time.getDate()} {hours}</span>}
                {!val.isSentByMe && <ThreeDotMenu key={val.time} chatDetails={val}/>}

            </div>
        );

}