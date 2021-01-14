import '../App.css';
import { useEffect, useState, Fragment } from 'react'
import freshLogo from '../assets/images/frshlogo.svg'

import {
  BrowserRouter as Router,
  Link, 
  Redirect,
  withRouter
} from "react-router-dom";

import {checkUserCreds} from '../components/checkUserCreds'
import {emailPasswordChallenge} from '../components/emailPasswordChallenge'
import {sendChallengeCode} from '../components/sendChallengeCode'
import {sendNewPassword} from '../components/sendNewPassword'
import TestButton from '../components/TestButton'
import { LOGIN_URL } from '../urls';

function LostPassword(props) {

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [challengeState,setChallengeState] = useState('initial')
  const [password,setPassword] = useState('')
  const [passwordConfirm,setPasswordConfirm] = useState('')
  const [errors,setErrors] = useState([])

  useEffect(() => {
    const user = checkUserCreds(props.user);
    console.log(localStorage.user)
    // if (!user) {
    //   props.history.push('/login');
    // }
    // if (user || localStorage.user) {
    //   props.history.push(CONFIRMATION_URL)
    // }
  }, [])
  // console.log(queryString.parse(props.location.search))

const handleSubmit = async(event) => {
  event.preventDefault()
  console.log("Information passed to submission:", email)
  localStorage.setItem("challenge_email", email)

  const challengeSent = await emailPasswordChallenge(email)
  console.log(challengeSent)

  if (challengeSent.emptyEvent){
    console.log("Nothing here.")
    setErrors(["No e-mail entered."])
    console.log(errors)
    return
  }

  if (challengeSent.reply.challenge_sent==true) {
   setChallengeState("challenged")
  }





}

const onKeyPress = (event) => {
  if (event.keyCode === 13) {
    console.log('enter')
    handleSubmit(event)
  }
}

const onKeyPressCode = (event) => {
  if (event.keyCode === 13) {
    console.log('enter')
    sendCode(code)
  }
}

const onKeyPressPassword = (event) => {
  if (event.keyCode === 13) {
    console.log('enter')
    sendPassword(event)
  }
}

const emailChange = (event) => {
setEmail(event.target.value)
};

const codeChange = (event) => {
  setCode(event.target.value)
  };

const passwordChange = (event) => {
  setPassword(event.target.value)
  };

const passwordConfirmChange = (event) => {
  setPasswordConfirm(event.target.value)
  };

const lostPasswordInitial = () => {
  return(
    <div className="login-heading login-heading-password">
              
      <h3 data-name="login">Please enter your e-mail</h3>
      <form className="form-grid" onSubmit={handleSubmit}>
        <input style={{width: "350px"}}onKeyDown={(e)=>onKeyPress(e)} onChange={emailChange} type="text" name="email" value={email} placeholder="E-mail"></input>
        <button placeholder="submit" type="submit" className="login-submit-button">Submit</button>
        <div>
            {
              (errors.length > 0) ? handleErrors() : null
            }
          </div>
      </form>
    </div>
  )
}

const sendCode = async(event) => {
  console.log(event)
  event.preventDefault()
  console.log("Challenge code sent to Rails server:", code)
  let data = {"email": localStorage.challenge_email, "code": code}
  const sendingCode = await sendChallengeCode(data)
  console.log(sendingCode)
  if (sendingCode.reply.challenge_accepted == true) {
    setChallengeState("challenge_accepted")
  }
  if (sendingCode.reply.challenge_accepted == false) {
    setChallengeState("challenge_refused")
  }
  

}

const sendPassword = async(event) => {
  event.preventDefault()
  // console.log("Password sent to Rails server:", password)
  if (password === passwordConfirm){
    setErrors([])
  let data = {"email": localStorage.challenge_email, "password": password}
  const passwordSuccess = await sendNewPassword(data)
  console.log(passwordSuccess)
  if (passwordSuccess.status === "password changed") {
    props.history.push(LOGIN_URL)
  }
  
}

  if (password !== passwordConfirm){
    setErrors(["Your passwords do not match."])
  }
  

}

const handleErrors = () => {
  return (
    <div className="error-div">
      <ul className="ul-error">
        {errors.map(error => {
          return <li className="li-error" key={error}>{error}</li>
        })}
      </ul>
    </div>
  )
}

const emailChallenged = () => {
  return(
    <div className="login-heading">
              
      <h3 data-name="login">Please enter the code from your e-mail:</h3>
      <form className="form-grid" onSubmit={sendCode}>
        <input style={{width: "175px"}}onKeyDown={(e)=>onKeyPressCode(e)} onChange={codeChange} type="text" name="code" value={code} placeholder="Enter Code"></input>
        <button placeholder="submit" type="submit" className="login-submit-button">Submit</button>
      </form>
    </div>
  )
}

const challengeAccepted = () =>{
return (  <div className="login-heading">
              
  <p style={{marginTop: "50px"}}className="para4">E-mail Verified</p>
  <p className="para4">Enter new password below:</p>
  <form className="form-grid" onSubmit={sendPassword}>
    <input style={{width: "200px"}} onKeyDown={(e)=>onKeyPressPassword(e)} onChange={passwordChange} type="text" name="password" value={password} placeholder="Enter New Password"></input>
    <input style={{width: "200px"}} onKeyDown={(e)=>onKeyPressPassword(e)} onChange={passwordConfirmChange} type="text" name="passwordConfirm" value={passwordConfirm} placeholder="Confirm New Password"></input>
    <button style={{width: "200px"}}placeholder="submit" type="submit" className="login-submit-button">Submit and Return to Login</button>
    <div>
            {
              (errors.length > 0) ? handleErrors() : null
            }
          </div>
  </form>
</div>)
}

const challengeRefused = ()=>{
  return (<div className="login-heading">
              
  <h3 data-name="login">Incorrect code entered</h3>
  <form className="form-grid" onSubmit={sendCode}>
    <input onKeyDown={(e)=>onKeyPressCode(e)} onChange={codeChange} type="text" name="code" value={code} placeholder="Enter Code"></input>
    <button placeholder="submit" type="submit" className="login-submit-button">Submit</button>
  </form>
</div>)
}

return(
<Fragment>
    <div className="container">
          
          <Link to="/"><img className="img-fresh-logo" src={freshLogo}/></Link>
          
          <h2 className="registration-heading-1">under one sky</h2>
          
          {challengeState == "initial"? lostPasswordInitial():null}
          {challengeState == "challenged"? emailChallenged():null}
          {challengeState == "challenge_accepted"? challengeAccepted():null}
          {challengeState == "challenge_refused"? challengeRefused():null}

          
         
    </div>
    
    </Fragment>
    )
}

export default withRouter(LostPassword);