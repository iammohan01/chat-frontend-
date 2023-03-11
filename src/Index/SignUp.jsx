import alert from "../Scripts/alert.js";
import React from "react";
import {changeSign} from "./changeSign.js";



export function SignUp ({sign}) {

    const [values, setValues] = React.useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        time : Date.now()

    })
    let [isOtpSent,setOtpSent] = React.useState(false)


    function updateInputs(event) {
        setValues(prevValues => {
            return {...prevValues, [event.target.name]: event.target.value  }
        })

    }
    // React.useEffect(success,[values.value])

    function reqSignUp(event) {
        event.preventDefault();
        

        

        let strength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\d!@#$%^&*()_+{}|:"<>?,.\/';\\])[A-Za-z\d!@#$%^&*()_+{}|:"<>?,.\/';\\]{6,}$/
        let passwordStrength = values.password.length  > 6 ;// strength.test(values.password);
        let xhr = new XMLHttpRequest();

        xhr.open("POST", `${endURL}/signUp`,true);
        // xhr.open("POST", "http://localhost:8080/demo2_war_exploded/signUp",true);
        // xhr.open("POST", `/signUp`,true);
        xhr.onreadystatechange = function() {
            if (this.status === 200) {
                xhr.onloadend = ()=>{
                    let res = JSON.parse(this.responseText)
                    console.log(res)
                    if(res.status === 1){
                        alert("success","OTP Sent to your Email please verify.");
                        // changeSign(sign)
                        setOtpSent(true)
                    }
                    else if(res.status === 2){
                        alert("success","Account Verified");
                        changeSign(sign,2)
                    }
                    else if (res.status === -1) {
                        alert("error","Email already used")
                    }
                    else if(res.status === - 2){
                        alert("warning","User name already taken")
                    }
                    else {
                        alert("error","Something went wrong please try again later")
                    }
                }
            }
            
        };

        if (values.password === values.confirmPassword ){
            if (passwordStrength){
                xhr.send(JSON.stringify({...values , password : hash(values.password) , confirmPassword :""  , time : Date.now()}));
            }
            else{
                alert("warning","Weak password..! Make sure your password has one special character, number , upper and lower case letters with min of 6 characters")
            }

        }


        else if (values.password !== values.confirmPassword){
            alert("warning","password mismatching");

        }
        

    }

    return (
        <>

            <h1>Sign Up</h1>
            <p>Already Have an account ? <a onClick={() => {
                changeSign(sign,2)
            }} >Sign in</a></p>
            <form action="" className="input--forms" onSubmit={reqSignUp}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={updateInputs}
                    autoComplete="off"
                    value={values.name}
                    required
                    disabled = {isOtpSent}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your UserName"
                    onChange={updateInputs}
                    value={values.username}
                    disabled = {isOtpSent}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={updateInputs}
                    value={values.email}
                    disabled = {isOtpSent}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={updateInputs}
                    value={values.password}
                    disabled = {isOtpSent}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    onChange={updateInputs}
                    value={values.confirmPassword}
                    disabled = {isOtpSent}
                    required
                />
                <input 
                    type="text"
                    name="otp"
                    placeholder="verify your otp"
                    onChange={updateInputs}
                    value={values.otp}
                    disabled = {!isOtpSent}
                    style ={ {visibility : isOtpSent ? "visible" : "hidden"}}
                />
                <button>
                    Sign Up
                </button>
            </form>
        </>
    )
}



export function hash(str){
    return CryptoJS.SHA3(str, { outputLength: 512 }).toString();
}