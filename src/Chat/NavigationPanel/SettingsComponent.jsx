import React, {useContext} from "react";
import {svg_path} from "./NavigationComponect.jsx";
import context from "../../context.jsx";


export function  Settings(){
    const {focusState} = useContext(context);

    console.log(focusState)
    return (
        <div className="settings"  >
            <svg onClick={()=>{focusState.setFocus('settings')}}  fill={focusState.focus === "settings" ? "#615EF0":"none"}  className="setting-icon" width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{__html:svg_path.settings}}></svg>
        </div>
    )
}