import React from "react";
import {Settings} from "./SettingsComponent.jsx";
import {NavBar} from "./NavigationComponect.jsx";

export function ChatNavPanelComponent() {

    // console.error('Chat Nav Panel Component')
    return (
        <div className="side--nav--bar">
            <NavBar />
            <Settings />
        </div>
    )

}