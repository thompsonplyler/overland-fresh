import '../App.css';
import { useEffect, useState, Fragment } from 'react'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link, 
  Redirect,
  withRouter
} from "react-router-dom";
import ClientPendingBanner from '../components/ClientPendingBanner'
import LoginInputBox from '../components/LoginInputBox'
import RealLoginInputBox from '../components/RealLoginInputBox'
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL, LOGIN_FAILED_URL, ALREADY_REGISTERED} from '../urls'

import axios from 'axios'
import styled from 'styled-components';
import {request} from '../components/request'
import {emailConfirmSend} from '../components/emailConfirmSend'
import {checkUserCreds} from '../components/checkUserCreds'



function Login(props) {

  useEffect(() => {
    const user = checkUserCreds(props.user);
    console.log(localStorage.user)
    if (!user) {
      props.history.push('/login');
    }
    if (user || localStorage.user) {
      props.history.push(CONFIRMATION_URL)
    }
  }, [])
  // console.log(queryString.parse(props.location.search))

  const handleLogin = async (userData) => {
    // console.log("Data returned from the Rails server to parse: ", email);
    let email = userData.email.toLowerCase()
    let password = userData.password
    const user = await request(userData)
    console.log(user.error_code)

    if (user.error_code == "009"){
      props.history.push(ALREADY_REGISTERED)
      return
    }
    

    if (user.email) {
      // const emailConfirm = await emailConfirmSend(user)

      // if (emailConfirm) console.log("This is what was sent back from Customer.io", emailConfirm)
      // if (!emailConfirm) console.log("Nothing sent to customer.io because user.registered ==", user.registered)
      // console.log("we got a match IN LOGIN");
      let userInfo = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        company: user.company,
      }
      props.handleLogin(userInfo);

      props.history.push({
        pathname: CONFIRMATION_URL,
        state: { loggedIn: true },
      });
    } else {
      props.history.push({
        pathname: "/loginfailed",
        state: {loggedIn: false}
      })
      localStorage.clear()
    }
  };

return(
<Fragment>
    <div className="container">
          
          <img className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          
          <p className="para1">January 27, 2020</p>
          
          <div className="login-grid-row">
            <LoginInputBox handleLogin={handleLogin} />    
            <RealLoginInputBox handleLogin={handleLogin} />      
          </div>
          <div className="test-logout-button" onClick={props.handleLogout}> LOG OUT (FOR TESTING ONLY)</div>
    </div>
    </Fragment>
    )
}

export default withRouter(Login);