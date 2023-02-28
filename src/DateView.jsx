import {Calendar} from "antd";
import '../src/Styles/DateView.css'
import dayjs from "dayjs";
import {useContext, useEffect, useState} from "react";
import Context from "./context.jsx";
export default function DateView(){


    const [chat,setChat] = useState([])
    const [chatComps,setChatComps] = useState([])
    const {selectedUserState,focusState} = useContext(Context);

    function change(value){
        let date = new Date(value.format('YYYY-MM-DD'))
        date = date.getTime()
        console.log(date)
        let user = localStorage.getItem('uid')

        let xhr = new XMLHttpRequest();
        xhr.open('GET',`${endURL}/getChatOfDate?date=${date}&user=${user}`)


        xhr.onreadystatechange =()=>{
            xhr.onloadend =()=>{
                console.log(JSON.parse(xhr.response)[0]);
                setChat(JSON.parse(xhr.responseText))
            }

        }
        xhr.send();

    }
    useEffect(()=>{
        console.log(selectedUserState)
        console.log(focusState)
        let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let x = chat.map((chat)=>{
            let time = new Date(Number(chat.time)) ;
            let hours = `${time.getHours()%12}:${time.getMinutes()} ${time.getHours() > 11? 'PM' : 'AM'}`
            let decryMessage = CryptoJS.AES.decrypt(chat['message'],chat['time']).toString(CryptoJS.enc.Utf8)
            return (
            <div className={'filtered-message'} onClick={()=>{
                selectedUserState.setSelectedUser({
                    "Status": -1,
                    "Message": chat.Message,
                    "isByMe": chat.isSentByMe,
                    "name": chat.isSentByMe ? chat['toUser-name'] : chat['fromUser-name'],
                    "lastOnline": "Offline",
                    "time": chat.time,
                    "userName": chat.isSentByMe ? chat.toUser : chat.fromUser
                })
                focusState.setFocus('chat')
                console.log(chat)
                console.log()
            }}>
                <img className={'filtered-message-dp'}  src={'https://secure.gravatar.com/avatar/84da92f298e5b124d92fb581b82cfdf4?s=1200&d=retro&r=pg'} alt={''}/>
                <div className={'filtered-message-details'}>
                    <div>
                        <p className={'name'}>{chat.isSentByMe ? chat['toUser-name'] : chat['fromUser-name']}</p>
                        <p className={'userName'}>@{chat.isSentByMe ? chat.toUser : chat.fromUser}</p>
                    </div>
                    <div className={'message'}>
                        <span>{decryMessage.length < 20 ? decryMessage : decryMessage.slice(0,20) + '...'}</span>
                        <span className={'time'}>{time.getDate() } {month[time.getMonth()]} {hours}</span>

                    </div>
                </div>
            </div>
            )
        })

        setChatComps(x)
    },[chat])




    function Chat(user){
        return <div className={'filtered-message'}>
            <img className={'filtered-message-dp'} src={'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'70\' height=\'70\' fill=\'none\' viewBox=\'0 0 70 70\'%3E%3Cdefs%3E%3ClinearGradient id=\'intellij-idea_svg__a\' x1=\'5.174\' x2=\'40.014\' y1=\'39.889\' y2=\'38.123\' gradientUnits=\'userSpaceOnUse\'%3E%3Cstop offset=\'.091\' stop-color=\'%23FC801D\'/%3E%3Cstop offset=\'.231\' stop-color=\'%23B07F61\'/%3E%3Cstop offset=\'.409\' stop-color=\'%23577DB3\'/%3E%3Cstop offset=\'.533\' stop-color=\'%231E7CE6\'/%3E%3Cstop offset=\'.593\' stop-color=\'%23087CFA\'/%3E%3C/linearGradient%3E%3ClinearGradient id=\'intellij-idea_svg__b\' x1=\'61.991\' x2=\'50.158\' y1=\'36.915\' y2=\'1.557\' gradientUnits=\'userSpaceOnUse\'%3E%3Cstop offset=\'0\' stop-color=\'%23FE2857\'/%3E%3Cstop offset=\'.078\' stop-color=\'%23CB3979\'/%3E%3Cstop offset=\'.16\' stop-color=\'%239E4997\'/%3E%3Cstop offset=\'.247\' stop-color=\'%237557B2\'/%3E%3Cstop offset=\'.339\' stop-color=\'%235362C8\'/%3E%3Cstop offset=\'.436\' stop-color=\'%23386CDA\'/%3E%3Cstop offset=\'.541\' stop-color=\'%232373E8\'/%3E%3Cstop offset=\'.658\' stop-color=\'%231478F2\'/%3E%3Cstop offset=\'.794\' stop-color=\'%230B7BF8\'/%3E%3Cstop offset=\'1\' stop-color=\'%23087CFA\'/%3E%3C/linearGradient%3E%3ClinearGradient id=\'intellij-idea_svg__c\' x1=\'10.066\' x2=\'53.876\' y1=\'16.495\' y2=\'88.96\' gradientUnits=\'userSpaceOnUse\'%3E%3Cstop offset=\'0\' stop-color=\'%23FE2857\'/%3E%3Cstop offset=\'.08\' stop-color=\'%23FE295F\'/%3E%3Cstop offset=\'.206\' stop-color=\'%23FF2D76\'/%3E%3Cstop offset=\'.303\' stop-color=\'%23FF318C\'/%3E%3Cstop offset=\'.385\' stop-color=\'%23EA3896\'/%3E%3Cstop offset=\'.553\' stop-color=\'%23B248AE\'/%3E%3Cstop offset=\'.792\' stop-color=\'%235A63D6\'/%3E%3Cstop offset=\'1\' stop-color=\'%23087CFA\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill=\'url(%23intellij-idea_svg__a)\' d=\'M11.2 49.4668L0.699951 41.3001L9 26L18.5 33.5L11.2 49.4668Z\'/%3E%3Cpath fill=\'%23087CFA\' d=\'M69.9999 18.6666L68.8333 59.2666L41.7666 70L27.0666 60.4333L41.7666 37.5L69.9999 18.6666Z\'/%3E%3Cpath fill=\'url(%23intellij-idea_svg__b)\' d=\'M70 18.6666L55.5 33L37 15L48.0666 1.16663L70 18.6666Z\'/%3E%3Cpath fill=\'url(%23intellij-idea_svg__c)\' d=\'M27.0667 60.4333L5.6 68.3667L10.0333 52.5L15.8667 33.1333L0 27.7667L10.0333 0L33.1333 2.8L54.5 31L55.5 33L27.0667 60.4333Z\'/%3E%3Cpath fill=\'%23000\' d=\'M56 14H14V56H56V14Z\'/%3E%3Cg fill=\'%23FFF\'%3E%3Cpath d=\'M27.1366 22.1433V19.25H19.2733V22.1433H21.4666V32.1067H19.2733V34.9767H27.1366V32.1067H24.92V22.1433H27.1366Z\'/%3E%3Cpath d=\'M34.6967 35.21C33.46 35.21 32.4334 34.9767 31.6167 34.51C30.7767 34.0433 30.1 33.4833 29.5634 32.8533L31.7334 30.4267C32.1767 30.9167 32.6434 31.3133 33.0867 31.5933C33.5534 31.8733 34.0434 32.0133 34.6034 32.0133C35.2567 32.0133 35.77 31.8033 36.1434 31.3833C36.5167 30.9633 36.7034 30.31 36.7034 29.4V19.2733H40.25V29.5633C40.25 30.4967 40.1334 31.3133 39.8767 32.0133C39.62 32.7133 39.2467 33.2967 38.78 33.7633C38.29 34.2533 37.7067 34.6033 37.0067 34.86C36.3067 35.0933 35.5367 35.21 34.6967 35.21Z\'/%3E%3Cpath d=\'M34.4166 48.6499H18.6666V51.3332H34.4166V48.6499Z\'/%3E%3C/g%3E%3C/svg%3E'} alt={''}/>
            <div className={'filtered-message-details'}>
                <div>
                    <p className={'name'}>User00</p>
                    <p className={'userName'}>@username</p>
                </div>
                <div className={'message'}>
                    <span>Message</span> <span>10:99 AM</span>
                </div>
            </div>
        </div>
    }
    return(
    <div className={'date-view'}>
        <div className={'calender'} >
            <Calendar mode={'month'} onChange={change} validRange={[dayjs(new Date(2000,11,31)),dayjs()]} />
        </div>
        <div className={'calender-messages'} >

            {chatComps}



        </div>
    </div>
    )


    // return <Calendar />;
}