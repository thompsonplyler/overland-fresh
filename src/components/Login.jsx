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


import axios from 'axios'
import styled from 'styled-components';
import {request} from '../components/request'
import {emailConfirmSend} from '../components/emailConfirmSend'


function Login(props) {
  // console.log(queryString.parse(props.location.search))

  const handleLogin = async (email) => {
    console.log("Data returned from the Rails server to parse: ", email);
    console.log(props);

    const user = await request(email)
    

    if (user.email) {
      // const emailConfirm = await emailConfirmSend(user)
      console.log("we got a match IN LOGIN");
      let userInfo = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        company: user.company
      }

      props.handleLogin(userInfo);
      props.history.push({
        pathname: "/confirmation",
        state: { loggedIn: true },
      });
    } else {
      props.history.push({
        pathname: "/loginfailed",
        state: {loggedIn: false}
      })
    }
  };

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
    </Fragment>
    )
}

export default withRouter(Login);