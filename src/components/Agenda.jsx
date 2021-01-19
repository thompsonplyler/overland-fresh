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
useEffect(()=>{
  document.body.classList.remove('sawdust-body')
},[])


  useEffect(() => {
    console.log("Agenda props: ",props)
    console.log("Agenda local storage: ", localStorage)
    const user = checkUserCreds(props.user);
    // console.log(localStorage.user)
    if (!user) {
      props.history.push(LOGIN_URL);
    }
    // if (user || localStorage.user) {
    //   props.history.push(CONFIRMATION_URL)
    // }
  }, [])
  // console.log(queryString.parse(props.location.search))

  const handleLogin = async (userData) => {
    // console.log("Data returned from the Rails server to parse: ", email);
    let email = userData.email.toLowerCase()
    let password = userData.password
    const user = await request(userData)
    console.log(user.error_code)

    if (user.error_code == "009"){
      props.history.push(LOGIN_URL)
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
        pathname: LOGIN_FAILED_URL,
        state: {loggedIn: false}
      })
      localStorage.clear()
    }
  };

const padding = 3
const border = 1

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
                    {// <Tooltip message={tooltip_data.tooltip} position={'right'}>{tooltip_data.buttonText}</Tooltip>
}
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
    <TestButton style={{paddingRight: "200px"}}handleLogout={props.handleLogout}/>
        </Fragment>
    )
}

export default withRouter(Agenda);