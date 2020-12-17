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

class RealLoginInputBox extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          email: '',
          password: '',
          emailConfirm: '',
          passwordConfirm: '',
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
//   const {email} = this.state
  
//   let user = {
//     email: email
//     }

// this.props.handleLogin(email)

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
    const {email, password, emailConfirm, passwordConfirm} = this.state
   
    return(
          <div className="form-grid-registration">
            <div className="login-heading">
              
                <h3 data-name="login">Login</h3>
            </div>
            <form className="form-grid" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} type="text" name="email" value={email} placeholder="E-mail"></input>
            <input onChange={this.handleChange} type="text" name="password" value={password} placeholder="Password"></input>
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

export default withRouter(RealLoginInputBox);