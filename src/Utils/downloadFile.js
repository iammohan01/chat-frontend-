import alert from "../Scripts/alert.js";
import {useContext} from "react";
import context from "../context.jsx";

export function downloadFile(file,fileName,download,blobs){

    const {blobUrls,setBlobUrls} =  blobs

    console.log(file,fileName)

    if(Object.keys(blobUrls).includes(fileName)){
        let downEle = document.createElement('a');
        downEle.href = blobUrls[fileName]
        downEle.download = fileName ;
        if(download){
            downEle.click()
            console.log()
            console.log(downEle)
        }
        return
    }


    let form = new FormData();
    form.set('id',file)

    let xhr = new XMLHttpRequest();
    xhr.open("POST",`${endURL}/GetFile`,true)
    xhr.responseType = "blob";
    xhr.onreadystatechange = ()=>{

        xhr.onloadend =()=>{
            const blob = xhr.response;
            // var blob = new Blob([arrayBuffer]);
            console.log(blob)
            const url = URL.createObjectURL(blob);
            console.log(url)

            let downEle = document.createElement('a');
            downEle.href = url
            downEle.download = fileName ;
            console.log(downEle)
            setBlobUrls(prev=>{
                console.log(blobUrls)
                return {...prev,[fileName] : url}
            })
            if(download){
                console.log('download')
                downEle.click()
            }
        }

    }
    xhr.onprogress =(progress)=>{

        let loaded = Math.floor((progress.loaded/progress.total)*100)
        if(loaded === 100){
            alert("success",`${Math.floor((progress.loaded/progress.total)*100)}% downloaded`)
        }
    }
    xhr.send(form)

}