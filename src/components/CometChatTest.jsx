import '../App.css';
import { useEffect, useState, Fragment } from 'react'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link, 
  Redirect,
  withRouter
} from "react-router-dom";
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL, LOGIN_FAILED_URL} from '../urls'
import {CometChat} from '@cometchat-pro/chat'
import {CometChatUnified} from '../CometChat'




function CometChatTest(props) {

  useEffect(() => {

  }, [])
  // console.log(queryString.parse(props.location.search))
  const appID = "278123ef32b5443";
  const region = "us";
  const authKey = "b31b73c3a10f3209c0f39c04488933d99da36641"
  const uid = "thompson"
  const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      // You can now call login function.
    },
    error => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );

  CometChat.login(uid, authKey).then(
      user => {
          console.log("Login successful", {user});
      },
      error => {
          console.log("Login failed with exception:", {error})
      }

  )




return(
<Fragment>
    <div className="container">
          
          <img className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          <p className="para1">Test</p>
          <CometChatUnified />
    </div>
    </Fragment>
    )
}

export default withRouter(CometChatTest);