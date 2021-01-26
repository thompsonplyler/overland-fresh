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
import NewWindow from 'react-new-window'

function VideoPage(props) {

  const [chatButtonPressed, setChatButtonPressed] = useState(false)
  const [popOut,setPopOut] = useState(false)
  let [stateWidth, setWidth] = useState(window.innerWidth)
  let [firstName, setFirstName] = useState("Unknown")
  let [lastName,setLastName] = useState("User")
  
  


// must re-add this when bringing code into final
  useEffect(() => {
    const checkLogin = async () => {
    document.body.classList.add('sawdust-body')
    
    let user = await checkUserCreds(props.user);
    
    if (user == false) {
  
      props.history.push(LOGIN_URL);
    }
  }
  checkLogin()
  }, [])

useEffect(()=>{
  if (document.getElementsByClassName("ps__rail-x")){
    let kill = document.getElementsByClassName("ps__rail-x")
    console.log(kill)
    kill = Array.from(kill)
    kill.forEach(item=>item.remove())
    kill = document.getElementsByClassName("ps__thumb-x")
    kill = Array.from(kill)
    kill.forEach(item=>item.remove())
    console.log(kill)
    console.log("I ran the thing...")
  }
},chatButtonPressed)
  
    //activate and deactivate chat 
    const chatToggle = (e) => {
      e.preventDefault()
      setChatButtonPressed(!chatButtonPressed)
      setPopOut(false)
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

    const popOutToggle = () =>{
      setPopOut(!popOut)
      setChatButtonPressed(!chatButtonPressed)
    }

    const popOutUnloader = () => {
      console.log("You have unloaded the popout chat!")
    }

 

    useEffect(()=>{

    },[])



    const popItOut = () => {
      return (<div><NewWindow copystyles="true" 
      name="popout-chat" 
      title="fresh - Under One Sky 2021 Chat">
        <Iframe url={`https://www.deadsimplechat.com/CHsOaJ9WD?username=${firstName}%20${lastName}`}
        width="100%"
        height="100%"
  className="chat-box" 
  display="flex" id="newWindowId"
  />
  </NewWindow></div>)
    }
  

  firstName = JSON.parse(localStorage.getItem('user')).firstname
  lastName = JSON.parse(localStorage.getItem('user')).lastname
  return (
    <div>
    <div className="flex-container-video">
      {/* <img className="img-fresh-logo" src={freshLogo}/> */}
      <h2 className="event-heading-1">under one sky</h2>  
      <h3 className="event-video-title">Part 2: Under One Sky Meeting</h3>
      <div className="video-row">
        {/* <div style={{width:"100px"}}> */}
    {popOut?popItOut():null}
    {/* </div> */}
      <Player fluid={false} width={stateWidth*.55} playsInline poster={poster} autoplay={true}>
      <HLSSource
      isVideoChild
      src="https://liminal-push.ccsupport.cn/live/UMkMlXOwRgJSzPgXxQyw1w/playlist.m3u8"
      />
      <BigPlayButton position="center"></BigPlayButton>
    </Player>
        <div className="button-video-return">
          <Link to={AGENDA_URL}><button style={{width: "200px"}}>Return to Main Page</button></Link>
        </div>
      </div>
      
        <img className="grid-heading" style={{ width: "6vw" }} src={freshLogo} />
    </div>
    <img onClick={popOutToggle} className={chatButtonPressed?'popout-icon-active':'popout-icon-inactive'} src='./popout_icon.png'></img>
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


export default VideoPage