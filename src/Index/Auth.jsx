import React from "react"
import alert from "../Scripts/alert"
import {changeSign} from "./changeSign.js";


export default function SignIn ({sign,auth}) {
    const [values, setValues] = React.useState({
        email: "",
        password: ""

    })

   
    

    function updateInputs(event) {
        console.log(event.target.name)
        setValues(prevValues => {
            return {...prevValues, [event.target.name]: event.target.value}
        })
    }

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

    function reqSignIn(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest()
        xhr.open("POST","http://localhost:8080/demo2_war_exploded/SignIn",true);
        xhr.onreadystatechange = function(){
            xhr.onloadend = ()=>{
                console.log(this.response)
                let res = JSON.parse(this.responseText)

                if(xhr.status === 200 ){
                    console.log(res);
                    if (res.uid ){
                        alert("success","login successfully")
                        setCookie("uid",res.uid,10);
                        localStorage.setItem("uid",res.uid);
                        // window.location.href = window.location.href;
                        console.log(res);
                        localStorage.setItem("user",res.name)
                        localStorage.setItem("userName",res.username)
                        
                        setTimeout(()=>{
                            window.location.reload();
                        },1000)
                    }
                    else{
                        alert("error","please check email and password")
                    }
                }
            }
        }
        xhr.send(JSON.stringify({...values, password : hash(values.password)}))
        

    }

        return (
            <>
                <h1>Sign In</h1>
                <p>New to Messenger ? <a onClick={() => {
                    changeSign(sign,1)
                }} href="#">Sign Up</a></p>
                <form action="src" className="input--forms" onSubmit={reqSignIn}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter your Email"
                        value={values.email}
                        onChange={updateInputs}
                        autoComplete="on"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={updateInputs}
                        autoComplete="off"
                    />
                    <button>Sign In</button>
                </form>
            </>
        )

}


function hash(str){
    return CryptoJS.SHA3(str, { outputLength: 512 }).toString();
}


