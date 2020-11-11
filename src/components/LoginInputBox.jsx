import React from 'react'
import {Component} from 'react'
// import {useState} from 'react'
import axios from 'axios'
import '../App.css';
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";
//   import Button from './SubmitButton'
// import { isCompositeComponent } from 'react-dom/test-utils';
// import RegisterButton from './RegisterSubmitButton'
import LoginSubmitButton from '../components/LoginSubmitButton'
import { createImportSpecifier } from 'typescript';
// import data from "../assets/json/authenticated_roster.json"

class LoginInputBox extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          email: '',
          errors: ''
         };
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
  const {decideTopLevelLogin} = this.props
  
  let user = {
    email: email
    }

    var inputData = {"user":{"email":`${email}`}};

    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/v1/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : inputData
    };

    fetch(config.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
    .then (r=>r.json())
    .then(r=>{
      console.log("1. After submission, acquire response from Rails server: ", r)
      decideTopLevelLogin(r)

    })
    .catch(e=>console.log(e))
    
    // axios(config)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    // let personData = JSON.stringify({"name":"login",
    //   "data":{
    //   "recipient":"thompson@thompsonplyler.com"
    
    // }});
    

    // axios(config)
    // .then(function (response) {
    
    // data variable refers to exposed JSON data
    // let personData = data.find(userA => userA.email == user.email.toLowerCase())
      

      // if (personData){

      // let config = {
      //   method: 'post',
      //   mode: 'cors',
      //   headers: { 'Access-Control-Allow': 'CORS' },
      //   url: `https://fresh-under-one-sky-email-api.herokuapp.com/api/v1/person?email=${personData.email}&first_name=${personData.firstname}&last_name=${personData.lastname}&company=${personData.company}`,
      //   data : personData
      // };

    //   axios(config)
    //   .then(function (response){})
    //   .catch(function (error){})
   
    // }
      // this.props.handleLogin(personData)



  
  
        
  // axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
  //   .then(response => {
  //     if (response.data.logged_in) {
  //       this.props.handleLogin(response)
  //     } else {
  //       this.setState({
  //         errors: response.data.errors
  //       })
  //       }
  //   })
  //   .catch(error => console.log('api errors:', error))
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

    handleErrors = () => {
        return (
          <div className="error-div">
            <ul>
            {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
              })}
            </ul>
          </div>
        )
      }
      
    
    render(props){
    const {email} = this.state
    // console.log("Process ENV: ", process.env)
    
    
    return(
        <div className="form-grid-container">
            <div className="login-heading">
                <h3 data-name="login">Register</h3>
            </div>
            <form className="form-grid" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} type="text" name="email" value={email} placeholder="E-mail"></input>
            <LoginSubmitButton placeholder="submit" type="submit" handleSubmit={this.handleSubmit} className="login-submit-button"/>
            <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
          </div>
        </form>
    
 
    </div>
    )}
}

export default withRouter(LoginInputBox);