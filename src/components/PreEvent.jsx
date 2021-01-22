import React, { useEffect, useState, Fragment } from "react";
import 'video.js/dist/video-js.css'
import '../App.css';
import {
  withRouter, Link
} from "react-router-dom";
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'
import BackToLogin from './BackToLogin'
import {checkUserCreds} from '../components/checkUserCreds'
import TestButton from '../components/TestButton'
import { AGENDA_URL, LOGIN_URL } from '../urls';


// const logout = (props) =>{
//   localStorage.clear()
//   props.handleLogout()
// }

function PreEvent(props) {
const {handleLogout, user} = props
console.log("Props from PreEvent page: ", props)

useEffect(() => {
  const checkLogin = async () => {
  document.body.classList.remove('sawdust-body')
  console.log("Props from Login: ", props)
  let user = await checkUserCreds(props.user);
  console.log("User result from checkUserCreds: ",user)
  if (user == false) {

    props.history.push(LOGIN_URL);
  }
}
checkLogin()
}, [])

    return(

      
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          {props.user.firstname || localStorage.email?
          <Fragment><p className="para1">Congratulations {props.user.firstname.charAt(0).toUpperCase()+props.user.firstname.slice(1) 
          || localStorage.firstname.charAt(0).toUpperCase()+localStorage.firstname.slice(1)}, you have successfully registered.</p>
          <p className="para1">We look forward to coming together again.</p>
          <p className="para1">Please return to freshunderonesky.com on January 27th, 7:45am ET, and login using the email/password combination you just created.</p>
          <p className="para1">Please be sure to tune in via your <strong>laptop</strong> for optimal viewing using <strong>Google Chrome</strong>.</p>
          </Fragment>
          :<Fragment></Fragment>}
      
            <div>
              <TestButton user={user} handleLogout={handleLogout} />
          {/* <ClientPendingBanner subject="confirmation"/> */}
            </div> 
          
    </div>
    )
  }
  
  export default withRouter(PreEvent);