import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './Styles/index.css'
import ChatComponent from './Chat/chatComponent.jsx'
import  {ContextProvider} from "./context.jsx";
import {setCookie} from "./Index/Auth.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
      <RenderPage/>
    </ContextProvider>
)

function RenderPage(){
  let [verifyUserState,setVerifyUser] = useState(false);
  function verifyUser(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",`${endURL}/verify?uid=${getCookie("uid")}`)
    xhr.onreadystatechange =()=>{
      xhr.onloadend = ()=>{
        console.log(xhr.response)
        let resJSON = JSON.parse(xhr.response);
        setVerifyUser(resJSON.verify)
      }
    }
    xhr.send()
  }
  useEffect(()=>{
    verifyUser()
  },[])


  return  <>
    {verifyUserState &&  <ChatComponent/> }
    {!verifyUserState && <App/>}
  </>

}





export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}