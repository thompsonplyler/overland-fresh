import '../App.css';
import { useEffect, useState, Fragment } from 'react'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link, 
  Redirect,
  withRouter
} from "react-router-dom";

import {LOGIN_URL, EVENT_URL, AGENDA, CONFIRMATION_URL, NS_EVENT_URL, POST_EVENT_URL, LOGIN_FAILED_URL, ALREADY_REGISTERED} from '../urls'


import {request} from '../components/request'
import {emailConfirmSend} from '../components/emailConfirmSend'
import {checkUserCreds} from '../components/checkUserCreds'
import Tooltip from '../components/Tooltip'
import TestButton from '../components/TestButton'



function Agenda(props) {

useEffect(() => {
  const checkLogin = async () => {
  document.body.classList.remove('sawdust-body')
  // console.log("Props from Login: ", props)
  let user = await checkUserCreds(props.user);
  // console.log("User result from checkUserCreds: ",user)
  if (user == false) {

    props.history.push(LOGIN_URL);
  }
}
checkLogin()
}

, [])

const tooltip_data ={"name":"test1","buttonText": "Click to Watch", "tooltip":"This button has been deactivated for testing purposes."}

return(
<Fragment>
    <div className="container">
          
          <img className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          <div className="agenda-grid">
          <div className="agenda-grid-item">
              <h3>Part 1: Interactive Welcome Session</h3>
              <h3>8:00 AM - 8:15 AM EST</h3>
                  <a href="https://spatial.chat/s/freshunderonesky?sp=fresh007" target="_blank">
                    <button className="agenda-button">Click to Watch</button></a>
          </div>
          <div className="agenda-grid-item">
          <h3>Part 2: Under One Sky Meeting</h3>
              <h3>8:20 AM - 9:05 AM EST</h3>
                  <Link to={EVENT_URL}><button className="agenda-button">Click To Watch</button></Link>
          </div>
          <div className="agenda-grid-item">
          <h3>Part 3: Purpose Experience</h3>
              <h3>9:20 AM - 10:05 AM EST</h3>
                  <a href={NS_EVENT_URL}><button className="agenda-button">Click To Watch</button></a>
          </div>
          </div>
    </div>
    </Fragment>
    )
}

export default withRouter(Agenda);