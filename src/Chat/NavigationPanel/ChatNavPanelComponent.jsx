import React from "react";
import {Settings} from "./SettingsComponent.jsx";
import {NavBar} from "./NavigationComponect.jsx";

export function ChatNavPanelComponent() {

    return (
        <div className="side--nav--bar">
            <NavBar />
            <Settings />
        </div>
    )

}