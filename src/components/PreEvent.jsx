import React, { useEffect, useState, Fragment } from "react";
import "video.js/dist/video-js.css";
import "../App.css";
import { withRouter } from "react-router-dom";
import freshLogo from "../assets/images/frshlogo.svg";

function PreEvent(props) {
  console.log("Pre-event props: ", props);
  console.log("History item: ", props.history);

  let loggedIn = props?.location?.state?.loggedIn;

  return (
    <div className="container">
      <img className="img-fresh-logo" src={freshLogo} />

      <h2 className="registration-heading-1">under one sky</h2>
      {props.user.firstname || localStorage.email ? (
        <>
          <p className="para1" style={{ textTransform: "capitalize" }}>
            Welcome, {props.user.firstname || localStorage.firstname}
          </p>
          <p className="para1">
            We look forward to seeing you on November 17, 2020
          </p>
        </>
      ) : (
        <>
          <p className="para1">
            Unfortunately, we don't have user with your e-mail address.{" "}
          </p>
          <p className="para1">
            If you feel you have reached this message in error, please contact
          </p>{" "}
          <p className="para1">
            <a
              className="pretty-link"
              href="mailto:thompson@thompsonplyler.com"
            >
              thompson@thompsonplyler.com
            </a>
          </p>
        </>
      )}

    </div>
  );
}

export default withRouter(PreEvent);

/* {timerComponents.length ? timerComponents : <span>Time's up!</span>} */

const calculateTimeLeft = () => {
  let year = new Date().getFullYear();
  const difference = +new Date(`11/17/${year}`) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24) + 7,
      // minutes: Math.floor((difference / 1000 / 60) % 60)+30,
      // seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
};