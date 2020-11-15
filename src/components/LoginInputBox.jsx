
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
            
            <input onChange={this.handleChange} type="text" name="email" value={email} placeholder="E-mail"></input>
            
              <button name="email-auth-submit" placeholder="submit" type="submit" className="login-submit-button" onClick={this.handleSubmit}>
                Submit
              </button>
    
    
 
    </div>
    )}
}

export default withRouter(LoginInputBox);