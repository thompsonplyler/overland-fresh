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
import Iframe from 'react-iframe'
import { Player, BigPlayButton } from 'video-react';
import '../video-react.css'
import poster from '../assets/images/blue_sky.jpeg'
import HLSSource from './HLSSource';

function VideoPageSawdust(props) {
  let [stateWidth, setWidth] = useState(window.innerWidth)


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
        src="https://b1ec00ae2bfa.us-east-1.playback.live-video.net/api/video/v1/us-east-1.023900886900.channel.k2VuaaM6o9yb.m3u8"
        />
      <BigPlayButton position="center"></BigPlayButton>
    </Player>
        <div className="button-video-return">
        <Link to={AGENDA_URL}><button style={{width: "200px"}}>Return to Main Page</button></Link>
        </div>
      </div>
      
        <img className="grid-heading" style={{ width: "6vw" }} src={freshLogo} />
    </div>

    </div>
  );
}


export default VideoPageSawdust