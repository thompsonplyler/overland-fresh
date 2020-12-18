import React, { useEffect, useState, Fragment } from "react";
import 'video.js/dist/video-js.css'
import '../App.css';
import {
  withRouter
} from "react-router-dom";
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'
import AddToCalendar from '../components/AddToCalendar'
import BackToLogin from '../components/BackToLogin'
// import {checkUserCreds} from '../components/checkUserCreds'



function UserExists(props) {

    return(

      
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          <h2 className="registration-heading-1">under one sky</h2>
          <Fragment><p className="para1">This e-mail has already registered.</p>
          <p className="para1">Please return to the login page and use your password to access the event.</p>
          <div style={{paddingTop: "3vh"}}></div>
          <BackToLogin />
          </Fragment>

    </div>
    )
  }
  
  export default withRouter(UserExists);