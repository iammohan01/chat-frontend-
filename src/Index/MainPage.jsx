import "../Styles/MainPage.css"
import "../Styles/Auth.css"
import SignIn from "../Index/Auth.jsx";
import {SignUp} from "./SignUp.jsx";
import React from "react"


function MainPage(){
    let [sign , setSign ] = React.useState(1);
    let Page =()=>{
        if (sign === 1){
            return <SignUp sign={setSign}  />
        }
        else if (sign === 2){
            return <SignIn sign={setSign}  />
        }
        
    }
   
    return(
        <div className="main--page">
            <div className="imageView">

            </div>
            <div className="auth--window">
                <Page />
            </div>
        </div>
    )
}
export default MainPage