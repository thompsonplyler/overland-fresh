import React from 'react'
import {useState} from 'react'
import videojs from 'video.js'
import awsvideoconfig from '../aws-video-exports'
import 'video.js/dist/video-js.css'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'
import FakeChat from './FakeChat'
  
const videoJsOptions = {
    autoplay: true,
    controls: true,
    loop: true,
    poster: "https://i.imgur.com/Aaog0bm.png",
    sources: [{
      src: "https://i.imgur.com/8kDpUiB.mp4",
      // src: awsvideoconfig.awsOutputLiveLL,
      poster: "https://i.imgur.com/Aaog0bm.png"
    }]
  }
  
  function VideoPage() {

    class VideoPlayer extends React.Component {

    
      // console.log(props)
    
        componentDidMount(props) {
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
          console.log("rendering:", this)
    
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

    // let windowSize = {}
    let [stateWidth, setWidth] = useState(window.innerWidth)
    let [stateHeight, setHeight] = useState(window.innerHeight)

    window.addEventListener('resize',()=>{
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
      console.log(stateWidth, stateHeight)
    })

    return (
              <div className="grid-container">
            {/* <img className="img-fresh-logo" src={freshLogo}/> */}
            
            <h2 className="registration-heading-grid">under one sky</h2>

            <div className="video-row" style={{padding: "3vh"}}>
              {/* <div className="chat-area">Test</div> */}
              <VideoPlayer windowHeight={stateHeight} windowWidth={stateWidth}{ ...videoJsOptions }/>
              <FakeChat windowHeight={stateHeight} windowWidth={stateWidth}/>
            
            </div>
            <img className="grid-heading" style={{width: "6vw"}} src={freshLogo}/>
            <ClientPendingBanner subject="event"/>
        </div>


    );
  }
  
  
  export default VideoPage