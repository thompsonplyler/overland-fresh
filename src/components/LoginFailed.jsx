import React, { useEffect, useState, Fragment } from "react";
import 'video.js/dist/video-js.css'
import '../App.css';
import {
  withRouter
} from "react-router-dom";
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'
import BackToLogin from './dead-components-delete-soon/BackToLogin'
// import {checkUserCreds} from '../components/checkUserCreds'



function LoginFailed(props) {

    return(

      
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          <h2 className="registration-heading-1">under one sky</h2>
          <Fragment><p className="para1">Oops, sorry we couldn’t find your email.</p>
          <p className="para1">Please contact <a className="pretty-link" href="mailto:knewton@fresh.com">knewton@fresh.com</a> to notify them of the issue.</p>
          <div style={{paddingTop: "3vh"}}></div>
          <BackToLogin />
          </Fragment>

    </div>
    )
  }
  
  export default withRouter(LoginFailed);