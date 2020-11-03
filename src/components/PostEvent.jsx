import React from 'react'
import videojs from 'video.js'
import awsvideoconfig from '../aws-video-exports'
import 'video.js/dist/video-js.css'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'



function PostEvent() {
    return(
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          {/* <h2 style={{color: "white", fontFamily: "PTSerif"}}>Worldwide Meeting 2020</h2>  */}
          <h2 className="registration-heading-1">under one sky</h2>
          <p className="para1">Thank you for coming!</p>
    <ClientPendingBanner subject="post-event"/>

    </div>
    )
}

export default PostEvent;