import React, { useEffect, useState, Fragment } from "react";
import 'video.js/dist/video-js.css'
import '../App.css';
import {
  withRouter
} from "react-router-dom";
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'
import BackToLogin from './BackToLogin'
// import {checkUserCreds} from '../components/checkUserCreds'



function UnregisteredError(props) {

    return(

      
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          <h2 className="registration-heading-1">under one sky</h2>
          <Fragment><p className="para1">Oops! This e-mail has not yet registered for the event! </p>
          <div style={{paddingTop: "3vh"}}></div>
          <BackToLogin />
          </Fragment>

    </div>
    )
  }
  
  export default withRouter(UnregisteredError);