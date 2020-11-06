import '../App.css';
import {Fragment, useState, useEffect} from 'react'
import Button from './SubmitButton'
import InputField from '../components/InputField'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import ClientPendingBanner from '../components/ClientPendingBanner'
import LoginInputBox from '../components/LoginInputBox'
import RegisterButton from './RegisterSubmitButton'
import RegisterLinkButton from '../components/RegisterLinkButton'


function Login() {

  const [inputBox, setInputBoxState] = useState("signin")

return(
<Fragment>
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          {/* <h2 style={{color: "white", fontFamily: "PTSerif"}}>Worldwide Meeting 2020</h2>  */}
          <h2 className="registration-heading-1">under one sky</h2>
            <ClientPendingBanner subject="login"/>
          <p className="para1">November 17, 2020</p>
            <div className="login-grid-row">
          <LoginInputBox />
          <div className="heading-login-selecter">
            <h3 >or</h3>
          </div>
          <div className="register-button">
          <RegisterLinkButton className="register-button"/>
            </div>
          </div>
    </div>
    </Fragment>
    )
}

export default Login;