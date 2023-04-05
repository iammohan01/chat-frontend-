import {useContext, useEffect, useState} from "react";
import Lottie from "react-lottie-player";
import {waveData} from "../../public/wave.js";
import {loadAnimation} from "../assets/LoadAnimation.js";
import context from "../context.jsx";

export default function VoicePlayer({ audioSrc ,color}) {
    const [audio, setAudio] = useState("");
    const [audioEle,setAudioEle] = useState(new Audio(''))
    const [playingStatus,setPlayingStatus] = useState(0) //pause : 0 , playing : 1 , load : 2
    const [played,setPlayed] = useState(0)
    const [duration,setDuration] = useState(0)
    const {blobs,selectedUserState} =  useContext(context);




    useEffect(()=>{

    },[audioEle])




    useEffect(()=>{
        if(playingStatus === 0){
            audioEle.pause()
        }
        else if(playingStatus === 1){
            audioEle.play()

        }

    },[playingStatus])




    audioEle.onended =()=>{
        setPlayingStatus(0)
    }
    audioEle.ontimeupdate =()=>{
        setPlayed(audioEle.currentTime)
    }

  function loadAudio(){

          let downEle = document.createElement('a');
          let val = audioSrc
          let link = `${endURL}/files/${val.isSentByMe?localStorage.userName:selectedUserState.selectedUser.userName}/${val.message}`;
          let audio = new Audio(link)
          audio.setAttribute("preload", "metadata")
          audio.onloadedmetadata = function() {
              function getDuration() {
                  audio.currentTime = 0
                  audio.removeEventListener('timeupdate', getDuration)
                  setDuration(audio.duration)
              }
              setDuration(Math.floor(audio.duration))
              if (audio.duration === Infinity) {
                  audio.currentTime = 1e101
                  audio.addEventListener('timeupdate', getDuration)
              }
          };
          setAudioEle(audio)
          setPlayingStatus(1)


  }

    let elapsedSec = Math.floor(played%60) ;
    elapsedSec = elapsedSec < 10 ? '0'+elapsedSec : elapsedSec
    let elapsedMin = Math.floor(played/60) ;
    elapsedMin = elapsedMin < 10 ? '0'+elapsedMin : elapsedMin
    let totalSec = Math.floor(duration%60) ;
    totalSec = totalSec < 10 ? '0'+totalSec : totalSec
    let totalMin = Math.floor(duration/60)  ;
    totalMin = totalMin < 10 ?'0'+totalMin : totalMin

  return (
    <div className={"voice-player"}>
      <div>
        {/*play*/}
          {playingStatus === 0 && <svg
              className={"play"}
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
              onClick={() => {
                      loadAudio()
              }
              }
          >
              <path
                  d="M6.906 4.537A.6.6 0 006 5.053v13.894a.6.6 0 00.906.516l11.723-6.947a.6.6 0 000-1.032L6.906 4.537z"
                  stroke={color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              ></path>
          </svg>}



          {/*Load*/}
          {playingStatus === 2 &&
          <Lottie
              loop
              animationData={loadAnimation}
              play
              style={{ width: 50, height: 50 }}

          />
          }
        {/*pause*/}
          {playingStatus === 1 &&
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
          onClick={()=>{
              setPlayingStatus(0)
              }
          }
        >
          <path
            d="M6 18.4V5.6a.6.6 0 01.6-.6h2.8a.6.6 0 01.6.6v12.8a.6.6 0 01-.6.6H6.6a.6.6 0 01-.6-.6zM14 18.4V5.6a.6.6 0 01.6-.6h2.8a.6.6 0 01.6.6v12.8a.6.6 0 01-.6.6h-2.8a.6.6 0 01-.6-.6z"
            stroke={color}
            strokeWidth="1.5"
          ></path>
        </svg>
          }
      </div>
      <div>{elapsedMin}:{elapsedSec}</div>
      <input
        min={0}
        max={duration * 10}
        step={1}
        value={played*10}
        onChange={(e) => {
            audioEle.currentTime = Number(e.target.value)/10
            audioEle.play();
            setPlayingStatus(1)
          console.log(e.target.value);
        }}
        type={"range"}
      />
      <div>{totalMin}:{totalSec }</div>
    </div>
  );
}
