import React from 'react'
import { useState, Fragment, useEffect } from 'react'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import { checkUserCreds } from '../components/checkUserCreds'
import {
  BrowserRouter as Router,
  Link, 
} from "react-router-dom";
import { AGENDA_URL, LOGIN_URL } from '../urls';
// import Dat from './Dat'
import Iframe from 'react-iframe'
import { Player, BigPlayButton } from 'video-react';
import '../video-react.css'
import poster from '../assets/images/blue_sky.jpeg'
import HLSSource from './HLSSource';
import { ROW_NS_VIDEO } from '../video_sources';

function VideoPageSawdust(props) {
  let [stateWidth, setWidth] = useState(window.innerWidth)
    const [chatButtonPressed, setChatButtonPressed] = useState(false)
    let [firstName, setFirstName] = useState("Unknown")
    let [lastName,setLastName] = useState("User")



  useEffect (()=>{
  document.body.classList.add('sawdust-body')
  },[])

  useEffect(() => {
    const checkLogin = async () => {
    document.body.classList.add('sawdust-body')
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
    window.addEventListener('onfullscreenchange',()=>{
    console.log("I've been resized!")
    console.log(window)
    })
  }

  )

  const chatToggle = (e) => {
    e.preventDefault()
    setChatButtonPressed(!chatButtonPressed)

  }

  firstName = JSON.parse(localStorage.getItem('user')).firstname
  lastName = JSON.parse(localStorage.getItem('user')).lastname

  return (
    <div className="sawdust-div">
    <div className="flex-container-video">
      {/* <img className="img-fresh-logo" src={freshLogo}/> */}
      <h2 className="event-heading-1">under one sky</h2>  
      <h3 className="event-video-title">Part 3: Purpose Experience</h3>
      <div className="video-row">
      <Player fluid={false} width={stateWidth*.55} playsInline poster={poster} autoplay={true}>
      <HLSSource
        isVideoChild
        src={ROW_NS_VIDEO}
        />
      <BigPlayButton position="center"></BigPlayButton>
    </Player>
        <div className="button-video-return">
        <Link to={AGENDA_URL}><button style={{width: "200px"}}>Return to Main Page</button></Link>
        </div>
      </div>
      
        <img className="grid-heading" style={{ width: "6vw" }} src={freshLogo} />
    </div>
    <img onClick={chatToggle} className={chatButtonPressed?'chat-icon-active':'chat-icon-inactive'} src='./chat_icon.png'></img>
    {chatButtonPressed?<Iframe url={`https://www.deadsimplechat.com/CHsOaJ9WD?username=${firstName}%20${lastName}`}
    width="21%"
    height="500px"
    id="myId"
    className="chat-box"
    display="initial"
    position="absolute"/>
    :<Iframe url={`https://www.deadsimplechat.com/CHsOaJ9WD?username=${firstName}%20${lastName}`}
    width="21%"
    height="500px"
    id="myId"
    className="chat-box"
    display="none"
    position="absolute"/>
    }
    </div>
  );
}


export default VideoPageSawdust