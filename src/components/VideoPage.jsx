import React from 'react'
import {Fragment} from 'react'
import videojs from 'video.js'
import awsvideoconfig from '../aws-video-exports'
import 'video.js/dist/video-js.css'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import videoFile from "../assets/videos/160825_05_Sunflowers3_1080p.mp4"
import ClientPendingBanner from '../components/ClientPendingBanner'
import FakeChat from './FakeChat'


class VideoPlayer extends React.Component {
    componentDidMount() {
      this.player = videojs(this.videoNode, this.props)
    }
  
    componentWillUnmount() {
      if (this.player) {
        this.player.dispose()
      }
    }
  
    render() {
      return (
        <div className="video-player">

          <div  data-vjs-player style={{
            width: 1080
          }}>
            <video ref={(node) => { this.videoNode = node; }} className="video-js" />
          </div>
        
          </div>
      );
    }
  }
  
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    loop: true,
    sources: [{
      src: "https://i.imgur.com/Vw4qKin.mp4"
      // src: awsvideoconfig.awsOutputLiveLL,
    }]
  }
  
  function VideoPage() {
    return (
      <div>

        <div className="grid-container" style={{paddingTop: "5vh", paddingLeft: "15vh"}}>
            {/* <img className="img-fresh-logo" src={freshLogo}/> */}
            <img className="grid-heading" style={{width: "6vw"}} src={freshLogo}/>
            <h2 className="registration-heading-grid">under one sky</h2>

            <div className="video-row" style={{padding: "3vh"}}>
              {/* <div className="chat-area">Test</div> */}
              <VideoPlayer { ...videoJsOptions }/>
              <FakeChat/>
            
            </div>
        </div>

        <ClientPendingBanner subject="event"/>

      </div>
    );
  }
  
  
  export default VideoPage