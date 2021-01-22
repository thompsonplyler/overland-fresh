import '../App.css';
import { useEffect, useState, Fragment } from 'react'
import freshLogo from '../assets/images/frshlogo.svg'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
  } from "react-router-dom";
  import { createBrowserHistory } from 'history'
import ClientPendingBanner from '../components/ClientPendingBanner'
import RegistrationInput from '../components/RegistrationInput'
import LoginInput from '../components/LoginInput'
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL, LOGIN_FAILED_URL, ALREADY_REGISTERED, WRONG_PASSWORD_URL, AGENDA_URL} from '../urls'

import axios from 'axios'
import styled from 'styled-components';
import {request} from '../components/request'
import {emailConfirmSend} from '../components/emailConfirmSend'
import {checkUserCreds} from '../components/checkUserCreds'

const TestButton = (props) => {
  console.log("Props from Test Button: ",props)
    return(
      
        <div className="test-section">
            {/* <h3 style={{fontFamily: "sans-serif", color: "red", marginBottom: "5px"}}>For Testing Purposes Only:</h3>
        <Link to={LOGIN_URL}><button onClick={props.handleLogout} className="test-logout-button" >Logout and Return to Login</button></Link>
        <Link to={AGENDA_URL}><button user={props.user} className="test-logout-button" >Proceed to Agenda</button></Link>
        <a href="/agenda"><button className="test-logout-button">View Agenda Page</button></a> */}
        </div>
        
    )
  };

export default withRouter(TestButton)

