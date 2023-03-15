import {useContext, useEffect, useState} from "react";
import context from "../../context.jsx";

export default function LinkPreview({url,message}){

    let {url_History} = useContext(context)
    const [urlInfo,setUrlInfo] = useState({})
    let  {urlHistory,setUrlHistory} = url_History


   useEffect(()=>{

       if(Object.keys(urlHistory).includes(url)){
           setUrlInfo(urlHistory[url])
       }
       else{
           let xhr = new XMLHttpRequest();
           let data = new FormData()
           data.set("url",url)
           xhr.open("POST",`${endURL}/getUrlInfo`)
           xhr.onloadend =()=>{
               setUrlHistory(prev=>{
                   return {...prev , [url] : JSON.parse(xhr.responseText)}
               })
               setUrlInfo(JSON.parse(xhr.responseText))
           }
           xhr.send(data)
       }



   },[])


    let title =  urlInfo['title'] && urlInfo['title'].length > 25 ? urlInfo['title'].substring(0,25) + '...' : urlInfo['title']
    let description = urlInfo['description']&&urlInfo['description'].length > 130 ? urlInfo['description'].substring(0,130)  + '...' : urlInfo['description']



    return (
        <>

            {urlInfo['title'] ?
                <a className={'link-preview-wrapper'} target={"_blank"} href={url}>
                    <div>
                        <p>{title}</p>
                        <img className={'url-image'} src={urlInfo['image'] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Q6XcKFoQyHEadD_6nOv2QAQE9lA8e54bjDOsEBAoJQ&s'} alt={''}></img>
                        {description&&<p>{description}</p>}
                    </div>

                {/*{urlInfo}*/}
                <a href={url}  target={"_blank"} dangerouslySetInnerHTML={{ __html: message}} ></a>
            </a> : <a href={url} target={"_blank"} dangerouslySetInnerHTML={{__html: message}}></a> }

        </>

    )
}