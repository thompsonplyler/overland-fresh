import React, { useEffect, useState } from "react";
import videojs from 'video.js'
import awsvideoconfig from '../aws-video-exports'
import 'video.js/dist/video-js.css'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'
import Moment from 'react-moment';

const dateToFormat = '2020-11-17T09:00-0500'
const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`11/17/${year}`) - +new Date();
    let timeLeft = {};
    
    if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24)+7,
          minutes: Math.floor((difference / 1000 / 60) % 60)+30,
          seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft

};



console.log(calculateTimeLeft())

function PreEvent() {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

useEffect(() => {
  const timer = setTimeout(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);


  
  return () => clearTimeout(timer);


});

const timerComponents = [];

Object.keys(timeLeft).forEach((interval) => {
  if (!timeLeft[interval]) {
    return;
  }

  timerComponents.push(
    <span className="timer-component">
      {timeLeft[interval]} {interval}{" "}
    </span>
  );
});

    return(
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          <h2 style={{color: "white", fontFamily: "PTSerif"}}>Worldwide Meeting 2020</h2> 
          <h2 className="registration-heading-1">under one sky</h2>
          <ClientPendingBanner subject="pre-event"/>
          <p className="para1">November 17, 2020</p>
          <div>
    {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </div> 
    </div>
    )
}

export default PreEvent;