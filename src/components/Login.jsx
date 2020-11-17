import '../App.css';
import {Fragment} from 'react'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link, 
  Redirect,
  withRouter
} from "react-router-dom";
import ClientPendingBanner from '../components/ClientPendingBanner'
import LoginInputBox from '../components/LoginInputBox'
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL, LOGIN_FAILED_URL} from '../urls'

import axios from 'axios'
import styled from 'styled-components';
import {request} from '../components/request'
import {emailConfirmSend} from '../components/emailConfirmSend'


function Login(props) {
  // console.log(queryString.parse(props.location.search))

  const handleLogin = async (email) => {
    // console.log("Data returned from the Rails server to parse: ", email);
    email = email.toLowerCase()
    console.log(email)
    
    const user = await request(email)
    console.log(user)
    

    if (user.email) {
      const emailConfirm = await emailConfirmSend(user)

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

      let startTime = 1605612000
      console.log ("right now", new Date().toUTCString())
      console.log("start time", startTime)

      if (new Date().toUTCString() < startTime){
      props.history.push({
        pathname: CONFIRMATION_URL,
        state: { loggedIn: true },
      });
    }
    else {
      props.history.push({
        pathname: EVENT_URL,
        state: { loggedIn: true },
      });

    }
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
          
          <p className="para1">November 17, 2020</p>
          
          <div className="login-grid-row">
            <LoginInputBox handleLogin={handleLogin} />          
          </div>
    </div>
    </Fragment>
    )
}

export default withRouter(Login);