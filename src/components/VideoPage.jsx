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





const videoJsOptions = {
  autoplay: true,
  controls: true,
  loop: true,
  responsive: true,
  mute: true,
  poster: "https://i.imgur.com/Aaog0bm.png",
  sources: [{
    src: tempVideo,
    // src: "https://b1ec00ae2bfa.us-east-1.playback.live-video.net/api/video/v1/us-east-1.023900886900.channel.rXLMiU83NvaX.m3u8",
    poster: "https://i.imgur.com/Aaog0bm.png"
  }]
}






function VideoPage(props) {
  const [chatButtonPressed, setChatButtonPressed] = useState(false)

  useEffect(() => {
    const checkLogin = async () => {
    document.body.classList.remove('sawdust-body')
    console.log("Props from Login: ", props)
    let user = await checkUserCreds(props.user);
    console.log("User result from checkUserCreds: ",user)
    if (user == false) {
  
      props.history.push(LOGIN_URL);
    }
  }
  checkLogin()
  }
  
  , [])

  useEffect(()=>{
    window.addEventListener('onfullscreenchange',()=>{
      console.log("I've been resized!")
      console.log(window)
    })
  })

  const chatToggle = (e) => {
    e.preventDefault()
    setChatButtonPressed(!chatButtonPressed)

  }


  class VideoPlayer extends React.Component {


    // console.log(props)

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


  let firstName = JSON.parse(localStorage.getItem('user')).firstname
  let lastName = JSON.parse(localStorage.getItem('user')).lastname
  return (
    <div>
    <div className="flex-container-video">
      {/* <img className="img-fresh-logo" src={freshLogo}/> */}
      <h2 className="event-heading-1">under one sky</h2>  
      <h3 className="event-video-title">Part 2: Under One Sky Meeting</h3>
      <div className="video-row">
        {/* <div className="chat-area">Test</div> */}
        <VideoPlayer windowHeight={stateHeight} windowWidth={stateWidth}{...videoJsOptions} />
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
    {/* <Chat windowHeight={stateHeight} windowWidth={stateWidth} /> */}
    <TestButton style={{paddingRight: "200px"}} handleLogout={props.handleLogout}/>
    {/* <ClientPendingBanner subject="event"/> */}
    {/* <div className="heads-up">This is a staging page for testing purposes only.</div> */}
    </div>



  );
}


export default VideoPage