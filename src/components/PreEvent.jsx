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
          <Fragment><p className="para3" style={{textTransform: "capitalize"}}>Congratulations {props.user.firstname || localStorage.firstname}!</p>
          <p className="para1">You have successfully registered for <i>fresh</i>'s Under One Sky. We look forward to coming
together on November 17, 2020. Please be sure to tune in via your laptop for optimal
viewing by clicking the link in your calendar invitation.</p>
          
          </Fragment>
          :<Fragment></Fragment>}
          {/* <div style={{paddingTop: "2vh"}}></div>
          <div style={{display: hidden}}><AddToCalendar /></div> */}
      
            <div>
          {/* <ClientPendingBanner subject="confirmation"/> */}
            </div> 
    </div>
    )
  }
  
  export default withRouter(PreEvent);