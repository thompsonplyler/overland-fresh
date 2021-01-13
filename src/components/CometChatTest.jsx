// import '../App.css';
import { useEffect, useState, Fragment } from 'react'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link, 
  Redirect,
  withRouter
} from "react-router-dom";
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL, LOGIN_FAILED_URL} from '../urls'
import {CometChat} from '@cometchat-pro/chat'
import {CometChatUnified} from '../CometChat'

function CometChatTest(props) {

    useEffect(() => {

}, [])

const [messageFieldContent, setMessageFieldContent] = useState('')
const [email, setEmail] = useState('')
const [code, setCode] = useState('')
const [challengeState,setChallengeState] = useState('initial')
const [password,setPassword] = useState('')
const [passwordConfirm,setPasswordConfirm] = useState('')
const [errors,setErrors] = useState([])
  // console.log(queryString.parse(props.location.search))
  const appID = "278123ef32b5443";
  const region = "us";
  const authKey = "b31b73c3a10f3209c0f39c04488933d99da36641"
  const uid = "thompson"
  const receiverID = "SUPERHERO2";
  const messageText = "Hello";
  const receiverType = CometChat.RECEIVER_TYPE.USER;
  const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
  const textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);
  const listenerID = "UNIQUE_LISTENER_ID";



  
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      // You can now call login function.
    },
    error => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );

  CometChat.login(uid, authKey).then(
      user => {
          console.log("Login successful", {user});
      },
      error => {
          console.log("Login failed with exception:", {error})
      }

  )

  CometChat.sendMessage(textMessage).then(
    message => {
      console.log("Message sent successfully:", message);
      // Do something with message
    },
    error => {
      console.log("Message sending failed with error:", error);
      // Handle any error
    }
  );

  CometChat.addMessageListener(
    listenerID, 
    new CometChat.MessageListener({
      onTextMessageReceived: message => {
        console.log("Message received successfully:", message);
        // Handle text message
      }
    })
   );

const onKeyPress=(event)=> {
    if (event.keyCode === 13) {
        console.log('enter')
        handleSubmit(event)
    }
}

const handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  const handleSubmit = (e) => {
      e.preventDefault()
      console.log("Submission sent.")
  }




return(
<Fragment>
    <div className="container">
          
          <img className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          <p className="para1">Test</p>
          <div className="chat-box" style={{backgroundColor:"red", height:"500px"}}></div>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="type your message here" onKeyDown={(e) => onKeyPress(e) }></input>
              <button type="submit">Send</button>
          </form>
    </div>
    </Fragment>
    )
}

export default withRouter(CometChatTest);