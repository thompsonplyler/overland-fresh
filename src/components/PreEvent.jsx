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
import {checkUserCreds} from '../components/checkUserCreds'



function PreEvent(props) {

  useEffect(() => {
    const user = checkUserCreds(props.user);
    if (!user) {
      props.history.push('/login');
    }
  }, [])
  
  let loggedIn = props?.location?.state?.loggedIn;
  const hidden = loggedIn? "auto" : "none"

    return(

      
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          {props.user.firstname || localStorage.email?
          <Fragment><p className="para1" style={{textTransform: "capitalize"}}>Dear {props.user.firstname || localStorage.firstname}</p>
          <p className="para1">This is a confirmation that you have successfully registered for <i>fresh</i>’s global meeting: Under One Sky. </p><p className="para1">We look forward to the <i>fresh</i> family coming together on Tuesday, November 17 at 8:00am Eastern Daylight Time.</p>
          
          </Fragment>
          :<Fragment><p className="para1">Oops, sorry we couldn’t find your email.</p>
          <p className="para1">Please contact <a className="pretty-link" href="mailto:knewton@fresh.com">knewton@fresh.com</a> to notify them of the issue.</p><div style={{paddingTop: "vh"}}></div><BackToLogin /></Fragment>}
          <div style={{paddingTop: "2vh"}}></div>
          <div style={{display: hidden}}><AddToCalendar /></div>
      
            <div>
          {/* <ClientPendingBanner subject="confirmation"/> */}
            </div> 
    </div>
    )
  }
  
  export default withRouter(PreEvent);