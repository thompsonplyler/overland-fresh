import React from 'react'
import {Fragment, useState, useEffect} from 'react'
import videojs from 'video.js'
import awsvideoconfig from '../aws-video-exports'
import 'video.js/dist/video-js.css'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import videoFile from "../assets/videos/160825_05_Sunflowers3_1080p.mp4"
import ClientPendingBanner from '../components/ClientPendingBanner'
import FakeChat from './FakeChat'
import { registerIVSTech } from 'amazon-ivs-player';
// import { setupForm, getFormStream } from '../components/common/form-control'

const videoJsOptions = {
  autoplay: true,
  controls: true,
  loop: true,
  muted: true,
  sources: [{
    // src: "https://i.imgur.com/8kDpUiB.mp4"
    src: awsvideoconfig.awsOutputLiveLL,
  }]
}
registerIVSTech(videojs, videoJsOptions);
  
  function VideoPage() {

    class VideoPlayer extends React.Component {
      constructor(props) {
        super(props);
       
       
        }
    
      // console.log(props)
    
        componentDidMount(props) {
        //   const player = videojs('videojs-player', {
        //     techOrder: ["AmazonIVS"]
        // });
          this.player = videojs(this.videoNode, this.props)

        }
      
        componentWillUnmount() {
          if (this.player) {
            this.player.dispose()
          }
        }
    
        render() {
          let {windowHeight, windowWidth} = this.props
          let newWidth = windowWidth *.60
          let newHeight = newWidth * .5625
          console.log("props are:", this.props)

          let PLAYBACK_URL = '';
          registerIVSTech(videojs)
          
          // let newPlayer = videojs('amazon-ivs-videojs',{
          //   techOrder:['AmazonIVS']
          // }, ()=>{
          //   console.log("Player is ready to use!")
          //   newPlayer.src(PLAYBACK_URL);
          // })
          // console.log(this)
          return (
            <div className="video-player">
    
              <div  data-vjs-player style={{
                width: newWidth,
                height: newHeight
              }}>
                <video ref={(node) => { this.videoNode = node; }} className="video-js" />
              </div>
            
              </div>
          );
        }
      }

    let windowSize = {}
    let [stateWidth, setWidth] = useState(window.innerWidth)
    let [stateHeight, setHeight] = useState(window.innerHeight)

    window.addEventListener('resize',()=>{
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
    })

    return (
    <div className="grid-container">
      <h2 className="registration-heading-grid">under one sky</h2>
      <div className="src-input"></div>
        <div className="video-row">
          <VideoPlayer windowHeight={stateHeight} windowWidth={stateWidth}{ ...videoJsOptions }/>
          </div>
        <img className="grid-heading" style={{width: "6vw"}} src={freshLogo}/>
    </div>


    );
  }
  
  
  export default VideoPage