import "../Styles/MainPage.css"
import "../Styles/Auth.css"
import SignIn from "../Index/Auth.jsx";
import {hash, SignUp} from "./SignUp.jsx";
import React, {useState} from "react"
import {changeSign} from "./changeSign.js";
import alert from "../Scripts/alert.js";


function MainPage(){
    let [sign , setSign ] = React.useState(1);
    let Page =()=>{
        if (sign === 1){
            return <SignUp sign={setSign}  />
        }
        else if (sign === 2){
            return <SignIn sign={setSign}  />
        }
        else if(sign === 3){
            return <Reset sign={setSign} />
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


function Reset({sign}) {

    const [email,setEmail] = useState("");
    const[reset,setReset] = useState("mail");
    const [otp,setOtp] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [code,setCode] = useState("")
    function getReset(event){

        event.preventDefault();
        let x = {
            email : email
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST",`${endURL}/reset`);
        xhr.onreadystatechange =()=>{
            xhr.onloadend = ()=>{
                console.log(xhr.responseText)
                alert("success","response from server for reset")
                if(xhr.status === 200){
                    setReset("otp")
                    console.log("res from server ")
                }
            }
        }
        xhr.send(JSON.stringify(x));

    }
    function confirmReset(event){
        event.preventDefault();

        if(password === confirmPassword && password.length > 6){
            let xhr = new XMLHttpRequest();
            xhr.open("POST",`${endURL}/confirmReset`)
            xhr.onreadystatechange =()=>{
                xhr.onloadend = ()=>{
                    let response = JSON.parse(xhr.responseText);
                    if(xhr.status === 200 && response.status === 1){
                        alert("success","password changed")
                        sign(2)
                    }
                    else {
                        alert("error","Something went wrong")
                    }
                }
            }
            let obj = {
                email : email,
                otp : otp,
                password : hash(password)
            }
            xhr.send(JSON.stringify(obj))
        }
        else if (password !== confirmPassword){
            alert("warning","Password mismatching");
        }
        else if(password.length < 6){
            alert("warning","Weak password..! Make sure your password has one special character, number , upper and lower case letters with min of 6 characters")
        }



    }
    function getOTPVerify(event){
        event.preventDefault()
        let xhr = new XMLHttpRequest();
        xhr.open("POST",`${endURL}/getOtpVerify`)
        xhr.onreadystatechange = ()=>{
            xhr.onloadend =()=>{
                let res = JSON.parse(xhr.responseText);
                if(res['status']===1){
                    setReset("confirmReset");
                    alert("success","otp verified")
                }
            }
        }
        let objToSend = {
            email : email ,
            otp : otp
        }
        xhr.send(JSON.stringify(objToSend))

    }

    return (
    <>
        <h1>Reset Password</h1>
        <p>New to Messenger ? <a onClick={() => {
            sign(1)
        }} href="#">Sign Up</a></p>
        <p>Already Have an account ? <a onClick={() => {
            sign(2)
        }} href="#">Sign in</a></p>
        {reset==="mail" &&
        <form className="input--forms" onSubmit={getReset}>
            <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value)
                }}
                autoComplete="on"
            />
            <button>Get Code</button>
        </form>
}
        {reset === "otp" &&  <form className="input--forms" onSubmit={getOTPVerify}>

            <input
                type="email"
                name="email"

                value={email}
                disabled={true}
            />
            <input
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(event) => {
                    setOtp(event.target.value)
                }}
                autoComplete="on"
            />
            <button>Verify OTP</button>
        </form> }
        {
            reset === "confirmReset" &&
            <form className="input--forms" onSubmit={confirmReset}>
                <input
                    name="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                <input
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value)
                    }}
                />
                <button>Get Code</button>
            </form>


        }
    </>

    )

}
export default MainPage