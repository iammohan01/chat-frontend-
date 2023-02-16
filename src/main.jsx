import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './Styles/index.css'
import ChatComponent from './Chat/chatComponent.jsx'
import  {ContextProvider} from "./context.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
      {getCookie("uid") ? <ChatComponent/> : <App/>}
    </ContextProvider>
)



function getCookie(cname) {
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