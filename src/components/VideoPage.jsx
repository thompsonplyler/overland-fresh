import React from 'react'
import {useState, useEffect} from 'react'
import videojs from 'video.js'
import awsvideoconfig from '../aws-video-exports'
import 'video.js/dist/video-js.css'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'
import FakeChat from './FakeChat'
import {checkUserCreds} from '../components/checkUserCreds'

  
const videoJsOptions = {
    autoplay: true,
    controls: true,
    loop: true,
    responsive: true,
    poster: "https://i.imgur.com/Aaog0bm.png",
    sources: [{
      // src: "https://i.imgur.com/8kDpUiB.mp4",
      src: awsvideoconfig.awsOutputLiveLL,
      poster: "https://i.imgur.com/Aaog0bm.png"
    }]
  }
  





  function VideoPage(props) {

    // useEffect(() => {
    //   const user = checkUserCreds(props.user);
    //   if (!user) {
    //     props.history.push('/login');
    //   }
    // }, [])

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
          // console.log("rendering:", this)
    
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

    let [stateWidth, setWidth] = useState(window.innerWidth)
    let [stateHeight, setHeight] = useState(window.innerHeight)



    return (
              <div className="grid-container">
            {/* <img className="img-fresh-logo" src={freshLogo}/> */}
            
            <h2 className="registration-heading-grid">under one sky</h2>

            <div className="video-row" style={{padding: "3vh"}}>
              {/* <div className="chat-area">Test</div> */}
              <VideoPlayer windowHeight={stateHeight} windowWidth={stateWidth}{ ...videoJsOptions }/>
            
            </div>
              <FakeChat windowHeight={stateHeight} windowWidth={stateWidth}/>
            <img className="grid-heading" style={{width: "6vw"}} src={freshLogo}/>
            {/* <ClientPendingBanner subject="event"/> */}
            {/* <div className="heads-up">This is a staging page for testing purposes only.</div> */}
        </div>


    );
  }
  
  
  export default VideoPage