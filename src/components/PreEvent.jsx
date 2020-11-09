import React, { useEffect, useState, Fragment } from "react";
import 'video.js/dist/video-js.css'
import '../App.css';
import {
  withRouter
} from "react-router-dom";
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'


function PreEvent(props) {
  console.log("Pre-event props: ", props)
  console.log("History item: ", props.history)

// const redirect =()=>props.history.push("/login")
// if (!props.isLoggedIn)return <Fragment>  {redirect()}</Fragment>

    return(
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          {props.user.firstname || localStorage.email?
          <Fragment><p className="para1" style={{textTransform: "capitalize"}}>Welcome, {props.user.firstname || localStorage.firstname}</p>
          <p className="para1">We look forward to seeing you on</p><p className="para1"> November 17, 2020</p></Fragment>:<Fragment><p className="para1">Oops, sorry we couldn’t find your email.</p>
          <p className="para1">Please contact</p> <p className="para1"><a className="pretty-link" href="mailto:knewton@fresh.com">knewton@fresh.com</a></p><p className="para1">to notify them of the issue.</p></Fragment>}
          
      
            <div>
          {/* <ClientPendingBanner subject="confirmation"/> */}
            </div> 
    </div>
    )
  }
  
  export default withRouter(PreEvent);
  
  {/* {timerComponents.length ? timerComponents : <span>Time's up!</span>} */}
  
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`11/17/${year}`) - +new Date();
    let timeLeft = {};
    
  if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24)+7,
        // minutes: Math.floor((difference / 1000 / 60) % 60)+30,
        // seconds: Math.floor((difference / 1000) % 60)
      };
  }

  return timeLeft

};
//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

// useEffect(() => {
//   const timer = setTimeout(() => {
//     setTimeLeft(calculateTimeLeft());
//   }, 1000);


  
//   return () => clearTimeout(timer);


// });

// const timerComponents = [];

// Object.keys(timeLeft).forEach((interval) => {
//   if (!timeLeft[interval]) {
//     return;
//   }

//   timerComponents.push(
//     <span className="timer-component">
//       {timeLeft[interval]} {interval}{" "}
//     </span>
//   );
// });