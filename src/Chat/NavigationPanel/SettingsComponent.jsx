import React, {useContext} from "react";
import {svg_path} from "./NavigationComponect.jsx";
import context from "../../context.jsx";
import alert from "../../Scripts/alert.js";


export function  Settings(){
    const {focusState} = useContext(context);
    function delete_cookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    return (
        <div className="settings"  >
            {/*<svg onClick={()=>/!*focusState.setFocus('settings')*!/}  fill={focusState.focus === "settings" ? "#615EF0":"none"}  className="setting-icon" width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{__html:svg_path.settings}}></svg>*/}
            <svg
                className="setting-icon"
                onClick={()=>{
                delete_cookie('uid');
                alert("success","Signed Out");
                setTimeout(()=>{
                    window.location.reload()
                },500)
            }} width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
    )
}