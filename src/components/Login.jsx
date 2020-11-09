import '../App.css';
import {Fragment} from 'react'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link, 
  Redirect,
  withRouter
} from "react-router-dom";
import ClientPendingBanner from '../components/ClientPendingBanner'
import LoginInputBox from '../components/LoginInputBox'
import queryString from 'query-string'
import Logout from "../components/Logout"



function Login(props) {
  // console.log(queryString.parse(props.location.search))

  
  const handleLogin = (e) => {
    console.log("Data returned from the Rails server to parse: ",e)
    props.topLevelLogin(e)
    // let {topLevelLogin} = props
    
    // console.log(topLevelLogin)

    // if (e.data.logged_in){
    //   localStorage.setItem("loggedIn", "true")
    // }

    // if (e.data.user.confirm_token){
    //   localStorage.setItem("confirm_token", `${e.data.user.confirm_token}`)
    // }
    
    // topLevelLogin()
    // return props.history.push({pathname:"/confirmation", state: {loggedIn: true}})
    
    // Use this history
    props.history.push("/confirmation")
  }

return(
<Fragment>
    <div className="container">
          
          <img className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          
          <p className="para1">November 17, 2020</p>
          
          <div className="login-grid-row">
            <LoginInputBox handleLogin={handleLogin} />          
          </div>
    
    </div>
            
            <Logout />
            <ClientPendingBanner subject="login"/>
    </Fragment>
    )
}

export default withRouter(Login);