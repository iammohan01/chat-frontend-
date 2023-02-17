import React from "react";



export function NavBar(){

    const [focus,setFocus] = React.useState("chat");

    function changeFocus(event){
        setFocus(event.target.dataset.name);

    }
    function changeProfileImg(file){

        const formData = new FormData();
        formData.append('name', "file");
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        // xhr.open('POST', 'http://localhost:8080/demo2_war_exploded/set-profile', true);
        xhr.open('POST', '/set-profile', true);
        xhr.send(formData);



    }




    return <div className="nav-bar-items">

        <img
            className="profile-img"
            src="/profile-test.svg"
            onClick={()=>{
                const input = document.createElement('input');
                input.type = 'file';
                input.click();
                input.onchange = ()=>{
                    console.log(input.files[0]);
                    changeProfileImg(input.files[0])
                    getProfile()
                }
            }}
            alt="profile-img"/>


        <div className="iconsList">
            <svg width="24" height="24" viewBox="0 0 24 24" onClick={changeFocus} data-name="home" fill={focus === "home" ? "#615EF0":"none"} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{__html:svg_path.home}}></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" onClick={changeFocus} data-name="chat" fill={focus === "chat" ? "#615EF0":"none"} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{__html:svg_path.chat}}></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" onClick={changeFocus} data-name="search" fill={focus === "search" ? "#615EF0":"none"} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{__html:svg_path.search}}></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" onClick={changeFocus} data-name="date" fill={focus === "date" ? "#615EF0":"none"} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{__html:svg_path.date}}></svg>

        </div>
    </div>

}

export const svg_path = {
    chat:`<path data-name="chat" stroke-opacity="0.5" d="M9.69928 19.039L9.69931 19.039L9.69564 19.0343C9.55281 18.8494 9.35354 18.7065 9.16111 18.6103C8.96956 18.5145 8.73469 18.44 8.5 18.44H7C4.51418 18.44 2.5 16.4319 2.5 13.96V6.98C2.5 4.5081 4.51418 2.5 7 2.5H17C19.4858 2.5 21.5 4.5081 21.5 6.98V13.96C21.5 16.4319 19.4858 18.44 17 18.44H15.5C15.0314 18.44 14.585 18.6649 14.3019 19.0375L14.3007 19.039L12.8007 21.029L12.8 21.03C12.5506 21.3626 12.2559 21.49 12 21.49C11.7441 21.49 11.4494 21.3626 11.2 21.03L11.1993 21.029L9.69928 19.039ZM6.5 11C6.5 11.8229 7.1606 12.5 8 12.5C8.8394 12.5 9.5 11.8229 9.5 11C9.5 10.1739 8.82614 9.5 8 9.5C7.17386 9.5 6.5 10.1739 6.5 11ZM10.5 11C10.5 11.8229 11.1606 12.5 12 12.5C12.8394 12.5 13.5 11.8229 13.5 11C13.5 10.1739 12.8261 9.5 12 9.5C11.1739 9.5 10.5 10.1739 10.5 11ZM14.5 11C14.5 11.8229 15.1606 12.5 16 12.5C16.8394 12.5 17.5 11.8229 17.5 11C17.5 10.1739 16.8261 9.5 16 9.5C15.1739 9.5 14.5 10.1739 14.5 11Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>`,
    home:`<path data-name="home" stroke-opacity="0.5"  d="M12 17.99V14.99M9.02 2.84001L3.63 7.04001C2.73 7.74001 2 9.23001 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29001 21.19 7.74001 20.2 7.05001L14.02 2.72001C12.62 1.74001 10.37 1.79001 9.02 2.84001Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    search:`<path data-name="search" stroke-opacity="0.5" d="M22 22L20 20M11.5 21C12.7476 21 13.9829 20.7543 15.1355 20.2769C16.2881 19.7994 17.3354 19.0997 18.2175 18.2175C19.0997 17.3354 19.7994 16.2881 20.2769 15.1355C20.7543 13.9829 21 12.7476 21 11.5C21 10.2524 20.7543 9.0171 20.2769 7.86451C19.7994 6.71191 19.0997 5.66464 18.2175 4.78249C17.3354 3.90033 16.2881 3.20056 15.1355 2.72314C13.9829 2.24572 12.7476 2 11.5 2C8.98044 2 6.56408 3.00089 4.78249 4.78249C3.00089 6.56408 2 8.98044 2 11.5C2 14.0196 3.00089 16.4359 4.78249 18.2175C6.56408 19.9991 8.98044 21 11.5 21V21Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    date:`<path data-name="date" stroke-opacity="0.5" d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.995 13.7H12.005M8.29401 13.7H8.30401M8.29401 16.7H8.30401" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    settings:`<path stroke-opacity="0.5" d="M12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15V15Z" stroke="black"  stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.8041 19.969 5.48558 19.5553 5.35435 19.0698C5.22311 18.5842 5.28988 18.0664 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88V12.88Z" stroke="${focus == "settings" ? "none" : "black"}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>`
}