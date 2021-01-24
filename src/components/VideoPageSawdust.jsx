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


function VideoPageSawdust(props) {
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

useEffect (()=>{
document.body.classList.add('sawdust-body')
},[])

useEffect(() => {
  const user = checkUserCreds(props.user);
  if (!user) {
    props.history.push(LOGIN_URL);
  }
}, [])

  useEffect(()=>{
    window.addEventListener('onfullscreenchange',()=>{
      console.log("I've been resized!")
      console.log(window)
    })
  }

  )
  class VideoPlayer extends React.Component {

    componentDidMount(props) {
      this.player = videojs(this.videoNode, this.props)
    }

    componentWillUnmount() {
      if (this.player) {
        this.player.dispose()
      }
    }


    handleFullScreen =(thing)=>{
      console.log("Finding thing",thing)
      }
    
    render() {

      let { windowHeight, windowWidth } = this.props
      let newWidth = windowWidth * .55
      // let newWidth = windowWidth * .40
      let newHeight = newWidth * .5625
      // console.log("rendering:", this)
      
      return (
        <div className="video-player">
          
          
          <div data-vjs-player style={{
            width: newWidth,
            height: newHeight
          }}>
            <video ref={(node) => { this.videoNode = node; }} className="video-js" />
          </div>

        </div>
      );
    }
  }

  let [stateWidth, setWidth] = useState(window.innerWidth)
  let [stateHeight, setHeight] = useState(window.innerHeight)



  return (
    <div className="sawdust-div">
    <div className="flex-container-video">
      {/* <img className="img-fresh-logo" src={freshLogo}/> */}
      <h2 className="event-heading-1">under one sky</h2>  
      <h3 className="event-video-title">Part 3: Purpose Experience</h3>
      <div className="video-row">
        {/* <div className="chat-area">Test</div> */}
        <VideoPlayer windowHeight={stateHeight} windowWidth={stateWidth}{...videoJsOptions} />
        <div className="button-video-return">
        <a href={AGENDA_URL}><button style={{width: "200px"}}>Return to Main Page</button></a>
        </div>
      </div>
      
        <img className="grid-heading" style={{ width: "6vw" }} src={freshLogo} />
    </div>

    
    {/* <Chat windowHeight={stateHeight} windowWidth={stateWidth} /> */}
    <TestButton style={{paddingRight: "200px"}}handleLogout={props.handleLogout}/>
    {/* <ClientPendingBanner subject="event"/> */}
    {/* <div className="heads-up">This is a staging page for testing purposes only.</div> */}
    </div>



  );
}


export default VideoPageSawdust