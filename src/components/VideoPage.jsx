import React from 'react'
import { useState, Fragment, useEffect } from 'react'
import videojs from 'video.js'
import awsvideoconfig from '../aws-video-exports'
// import 'video.js/dist/video-js.css'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'
import Chat from './Chat'
import { checkUserCreds } from '../components/checkUserCreds'
import tempVideo from '../assets/videos/temp_video.mp4'
import {
  BrowserRouter as Router,
  Link, 
} from "react-router-dom";
import TestButton from '../components/TestButton'
import Login from './Login';
import { AGENDA_URL, LOGIN_URL } from '../urls';
// import Dat from './Dat'
import { Player, BigPlayButton } from 'video-react';
import '../video-react.css'
import Iframe from 'react-iframe'
import poster from '../assets/images/blue_sky.jpeg'
import HLSSource from './HLSSource';

function VideoPage(props) {
  // actual normal feed
  // const normalStreamURL = "https://b1ec00ae2bfa.us-east-1.playback.live-video.net/api/video/v1/us-east-1.023900886900.channel.rXLMiU83NvaX.m3u8"
  // actual China feed with base64 hash as stream key
  const chinaURL = "http://fresh-play.ccsupport.cn/live/67a4c84cb83788005285d9c9e6f6d6c046b4c39e/playlist.m3u8"
  // NS feed for testing
  // const usURL = "https://b1ec00ae2bfa.us-east-1.playback.live-video.net/api/video/v1/us-east-1.023900886900.channel.k2VuaaM6o9yb.m3u8"
  const [chatButtonPressed, setChatButtonPressed] = useState(false)
  let [stateWidth, setWidth] = useState(window.innerWidth)
  let [firstName, setFirstName] = useState("Unknown")
  let [lastName,setLastName] = useState("User")
  let [location,setLocation] = useState(["elsewhere"])
  // let [streamURL, setStreamURL] = useState(normalStreamURL)
  let [isChina,setChina] = useState(false)
  let [isUS, setUS] = useState(false)

  console.log("Video Page props: ",props.user)



  // useEffect(() => {
  //   const user = checkUserCreds(props.user);
  //   if (!user) {
  //     props.history.push(LOGIN_URL);
  //   }
  // }, [])

  //resize handling
  useEffect(()=>{

  function handleResize(){
    console.log("I've been resized!")
    setWidth(window.innerWidth)
  }
    
    
  window.addEventListener('resize',handleResize)


  })

  //activate and deactivate chat 
  const chatToggle = (e) => {
    e.preventDefault()
    setChatButtonPressed(!chatButtonPressed)

  }

  useEffect(()=>{
    console.log("User props: ",props.user)
    if (props.user.firstname) setFirstName(props.user.firstname)
    if (props.user.lastname) setLastName(props.user.lastname)
    if (localStorage.user) {
      let parsed = JSON.parse(localStorage.user)
      console.log("Parsed stuff: ",parsed)
      setFirstName(parsed.firstname)
      setLastName(parsed.lastname)
    }

  },[])

// useEffect(()=>{
//     fetch('https://extreme-ip-lookup.com/json/')
// .then( res => res.json())
// .then(response => {
//     console.log("Country: ", response.country);
//     if (response.country == "China"){
//       setChina(true)
//     }
//     if (response.country == "United States"){
//       setUS(true)
//     }
//  })
//  .catch((data, status) => {
//     console.log('Request failed');
//  })
// },[])

console.log(location)

  return (
    <div>
    <div className="flex-container-video">
      
      <h2 className="event-heading-1">under one sky</h2>  
      <h3 className="event-video-title">Part 2: Under One Sky Meeting</h3>
      <div className="video-row">

        
        
      <Player fluid={false} width={stateWidth*.55} playsInline poster={poster} autoplay={true}>
      <HLSSource
      isVideoChild
      src={chinaURL}
      />
      <BigPlayButton position="center"></BigPlayButton>
    </Player>

        
        
        
        {//return button}
}
        <div className="button-video-return">
          <a href={AGENDA_URL}><button style={{width: "200px"}}>Return to Main Page</button></a>
        </div>
      </div>
      
        <img className="grid-heading" style={{ width: "6vw" }} src={freshLogo} />
    </div>

    {// button to activate chat; clicking goes to chatToggle}
}
    <img onClick={chatToggle} className={chatButtonPressed?'chat-icon-active':'chat-icon-inactive'} src='./chat_icon.png'></img>
    
    {// checks state and renders deadsimple chat widget accordingingly in iFrame}
}
    <Iframe url={`https://www.deadsimplechat.com/CHsOaJ9WD?username=${firstName}%20${lastName}`}
    width="21%"
    height="500px"
    id="myId"
    className="chat-box"
    display={chatButtonPressed?"initial":"none"}
    position="absolute"/>
 </div>



  );
}


export default VideoPage