import React from 'react'
import { useState, Fragment, useEffect } from 'react'

import {usePortal} from 'react-dom'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import { checkUserCreds } from '../components/checkUserCreds'
import {
  BrowserRouter as Router,
  Link, 
} from "react-router-dom";
import { AGENDA_URL, LOGIN_URL } from '../urls';
import Iframe from 'react-iframe'
import { Player, BigPlayButton } from 'video-react';
import '../video-react.css'
import poster from '../assets/images/blue_sky.jpeg'
import HLSSource from './HLSSource';
import {CHINA_VIDEO} from '../video_sources'

function VideoPage(props) {
 
  const [chatButtonPressed, setChatButtonPressed] = useState(false)
  let [stateWidth, setWidth] = useState(window.innerWidth)
  let [firstName, setFirstName] = useState("Unknown")
  let [lastName,setLastName] = useState("User")

  // console.log("Video Page props: ",props.user)

  useEffect(() => {
    const checkLogin = async () => {
    document.body.classList.remove('sawdust-body')
    // console.log("Props from Login: ", props)
    let user = await checkUserCreds(props.user);
    // console.log("User result from checkUserCreds: ",user)
    if (user == false) {
  
      props.history.push(LOGIN_URL);
    }
  }
  checkLogin()
  }, [])

  useEffect(()=>{

    function handleResize(){
      console.log("I've been resized!")
      setWidth(window.innerWidth)
    }
      
      
    window.addEventListener('resize',handleResize)
  
  
    },[])
  
    //activate and deactivate chat 
    const chatToggle = (e) => {
      e.preventDefault()
      setChatButtonPressed(!chatButtonPressed)
  
    }
  
    useEffect(()=>{
      // console.log("User props: ",props.user)
      if (props.user.firstname) setFirstName(props.user.firstname)
      if (props.user.lastname) setLastName(props.user.lastname)
      if (localStorage.user) {
        let parsed = JSON.parse(localStorage.user)
        // console.log("Parsed stuff: ",parsed)
        setFirstName(parsed.firstname)
        setLastName(parsed.lastname)
      }
  
    },[])

  firstName = JSON.parse(localStorage.getItem('user')).firstname
  lastName = JSON.parse(localStorage.getItem('user')).lastname
  return (
    <div>
    <div className="flex-container-video">
      
      <h2 className="event-heading-1">under one sky</h2>  
      <h3 className="event-video-title">Part 2: Under One Sky Meeting</h3>
      <div className="video-row">
      <Player fluid={false} width={stateWidth*.55} playsInline poster={poster} autoplay={true}>
      <HLSSource
      isVideoChild
      src={CHINA_VIDEO}
      />
      <BigPlayButton position="center"></BigPlayButton>
    </Player>
        <div className="button-video-return">
          <Link to={AGENDA_URL}><button style={{width: "200px"}}>Return to Main Page</button></Link>
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
    }

    </div>


 </div>


  );
}


export default VideoPage