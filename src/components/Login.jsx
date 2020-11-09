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
import axios from 'axios'


function Login(props) {
  // console.log(queryString.parse(props.location.search))

  
  const handleLogin = (e) => {
    console.log(props)
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

const customerIoSend = (data) =>{

  
  let userData = JSON.stringify({"name":"login",
  "data":{
  "recipient": `${data.email}`,
  "firstname": `${data.firstname}`

}});

var config = {
  method: 'post',
  url: 'https://track.customer.io/api/v1/events',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Basic MmY3Y2IzZDVmM2RlZjFkNjlhY2Q6ZTRhM2U2Yjk3OTFmMTg5MTZmMDU='
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
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
            
            {/* <Logout /> */}
            {/* <ClientPendingBanner subject="login"/> */}
    </Fragment>
    )
}

export default withRouter(Login);