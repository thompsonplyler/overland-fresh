import React from 'react'
import {Fragment} from 'react'
import videojs from 'video.js'
import awsvideoconfig from '../aws-video-exports'
import 'video.js/dist/video-js.css'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'

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
        <>
          <div data-vjs-player style={{
              width: 960, height: 540
            }}>
            <video  ref={(node) => { this.videoNode = node; }} className="video-js" />
          </div>
        </>
      );
    }
  }
  
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: awsvideoconfig.awsOutputLiveLL,
    }]
  }
  
  function VideoPage() {
    return (
      <div className="grid-container" style={{marginTop: "5vh"}}>
          {/* <img className="img-fresh-logo" src={freshLogo}/> */}
          <img className="grid-heading" style={{width: "10vw"}} src={freshLogo}/>
          <h2 className="registration-heading-2">under one sky</h2>
          <div style={{padding: "3vh"}}>
          {/* <div className="chat-area">Test</div> */}
          <VideoPlayer { ...videoJsOptions } />
        </div>
      </div>
    );
  }
  
  
  export default VideoPage