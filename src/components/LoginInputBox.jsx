import React from 'react'
import {Component} from 'react'
// import {useState} from 'react'
import '../App.css';
// import {
//     BrowserRouter as Router,
//     Link,
//     Redirect
//   } from "react-router-dom";
//   import Button from './SubmitButton'
// import { isCompositeComponent } from 'react-dom/test-utils';
// import RegisterButton from './RegisterSubmitButton'
import LoginSubmitButton from '../components/LoginSubmitButton'
import axios from 'axios'

class LoginInputBox extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          email: '',
          password: '',
          errors: ''
         };
      }
    
    inputDetermine = () => {

  
        return
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
          [name]: value
        })
      };

handleSubmit = (event) => {
  event.preventDefault()
  const {email} = this.state
  let user = {
    email: email
    }
        
  axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
        }
    })
    .catch(error => console.log('api errors:', error))
};

/*
/////
SEND TO CUSTOMER.IO
GENERATED BY POSTMAN FROM CUSTOMER.IO CURL LINK
///
var axios = require('axios');
var data = JSON.stringify({"name":"login",
  "data":{
  "recipient":"thompson@thompsonplyler.com",
  "token": "sdkjfsljdfsl;jdfks;lfdjksfldk;j"

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

*/

    redirect = () => {
        this.props.history.push('/')
      }

    handleErrors = () => {
        return (
          <div>
            <ul>
            {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
              })}
            </ul>
          </div>
        )
      }
      
    
    render(){
        const {email} = this.state

    return(
        <div className="form-grid-container">
            <div className="login-heading">
                <h3 data-name="login">Log In</h3>
            </div>
            <form className="form-grid" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} type="text" name="email" value={email} placeholder="E-mail"></input>
            <LoginSubmitButton placeholder="submit" type="submit" handleSubmit={this.handleSubmit} className="login-submit-button"/>
            {/* <Link to="/event"><Button type="submit" link="event" submitHandler={this.submitHandler}/></Link> */}
        </form>
    
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
    </div>
    )}
}

export default LoginInputBox;