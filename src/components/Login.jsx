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
import RegistrationInput from '../components/RegistrationInput'
import LoginInput from '../components/LoginInput'
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL, LOGIN_FAILED_URL, ALREADY_REGISTERED, WRONG_PASSWORD_URL} from '../urls'

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
    let email = userData.email.toLowerCase()
    console.log("Data returned from the Rails server to parse: ", email);
    let password = userData.password
    const user = await request(userData)
    console.log(user.error_code)

    if (user.error_code == "009"){
      props.history.push(ALREADY_REGISTERED)
      return
    }

    if (user.error_code == "008"){
      props.history.push(WRONG_PASSWORD_URL)
      return
    }

    console.log("User from registration: ",user)
    

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
        state: {loggedIn: false, reason: "password"}
      })
      localStorage.clear()
    }
  };

const padding = 3
const border = 1

return(
<Fragment>
    <div className="container">
          
          <img className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          
          <div className="login-grid-row">
            <RegistrationInput padding={padding} border={border} handleLogin={handleLogin} />    
            <LoginInput border={border} padding={padding} handleLogin={handleLogin} />      
          </div>
          <div className="test-logout-button" onClick={props.handleLogout}> LOG OUT (FOR TESTING ONLY)</div>
    </div>
    </Fragment>
    )
}

export default withRouter(Login);