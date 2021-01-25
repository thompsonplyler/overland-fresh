import React from 'react'
import { useState, Fragment, useEffect } from 'react'



import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'


import { checkUserCreds } from '../components/checkUserCreds'

import {
  BrowserRouter as Router,
  Link, 
} from "react-router-dom";
import TestButton from '../components/TestButton'
import Login from './Login';
import { AGENDA_URL, LOGIN_URL } from '../urls';
// import Dat from './Dat'







function Admin(props) {
  

  
  return (
    <div>
    <div className="flex-container-video">
      {/* <img className="img-fresh-logo" src={freshLogo}/> */}
      <h2 className="event-heading-1">under one sky</h2>  
      <h3 className="event-video-title">Part 2: Under One Sky Meeting</h3>
      <div className="video-row">
        {/* <div className="chat-area">Test</div> */}
        <div className="button-video-return">
          <a href={AGENDA_URL}><button style={{width: "200px"}}>Return to Main Page</button></a>
        </div>
      </div>
      
        <img className="grid-heading" style={{ width: "6vw" }} src={freshLogo} />
    </div>
  
    </div>



  );
}


export default Admin