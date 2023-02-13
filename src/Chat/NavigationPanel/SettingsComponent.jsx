import React from "react";
import {svg_path} from "./NavigationComponect.jsx";


export function  Settings(){
    return (
        <div className="settings" >
            <svg className="setting-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{__html:svg_path.settings}}></svg>
        </div>
    )
}