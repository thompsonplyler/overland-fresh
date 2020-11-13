// import 'core-js/array/includes';
import 'core-js/es/symbol';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/date';
import 'core-js/es/array';
import 'core-js/es/regexp';
import 'core-js/es/map';
import 'core-js/es/weak-map';
import 'core-js/es/set';
import 'core-js/es/array';
import React from 'react'
import {Component} from 'react'
import axios from 'axios'
import '../App.css';
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";
import LoginSubmitButton from '../components/LoginSubmitButton'
// import StyledButton from './buttons/StyledButton';
import styled from 'styled-components';

class LoginInputBox extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          email: '',
          password: '',
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
  
  let user = {
    email: email
    }

this.props.handleLogin(email)

};

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
   
    return(
        <div className="form-grid-container">
            <div className="login-heading">
                <h3 data-name="login">Register</h3>
            </div>
            <form className="form-grid" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} type="text" name="email" value={email} placeholder="E-mail"></input>
            
              <button placeholder="submit" type="submit" className="login-submit-button" onClick={this.handleSubmit}>
                Submit
              </button>
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