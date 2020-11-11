import React from "react";
import { Component } from "react";
// import {useState} from 'react'
import "../App.css";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter,
} from "react-router-dom";
import axios from "axios";
import { createImportSpecifier } from "typescript";
// import data from "../assets/json/authenticated_roster.json";
import StyledButton from './buttons/StyledButton';
import styled from 'styled-components';

class LoginInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: "",
    };
  }

  inputDetermine = () => {
    return;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  

  handleSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;

    this.props.handleLogin(email);

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
          {this.state.errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };

  render(props) {
    const { email } = this.state;

    return (
      <div className="form-grid-container">
        <div className="login-heading">
          <h3 data-name="login">Log In</h3>
        </div>
        <form className="form-grid" onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            type="text"
            name="email"
            value={email}
            placeholder="E-mail"
            onFocus={this.props.focusHandler}
          ></Input>
          <StyledButton
            placeholder="submit"
            type="submit"
            handleSubmit={this.handleSubmit}
          />
          <div>{this.state.errors ? this.handleErrors() : null}</div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginInputBox);

const Input = styled.input`
  width: 300px;
  max-width: 90vw; 
  font-size: 20px; 
  padding: 5px 10px; 
  height: 40px; 
  margin-top: 20px;
  outline: none; 
  font-size: 18px;
  display: flex; 
  align-items: flex-end;
  border-radius: 4px;
  outline: none;
  border: 0;

  :focus {
    outline: 1px solid cornflowerblue;
  }

`
