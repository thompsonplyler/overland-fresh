import React from 'react'
import {Component, setState} from 'react'
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
import styled, { ThemeConsumer } from 'styled-components';

class LoginInputBox extends Component{

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



        if (this.state.email != '' && name=='emailConfirm' && value != this.state.email){
          console.log("They have to match.")
          this.state.errors=[]
          this.state.errors.push(["Verify you have typed your e-mail address correctly."])
        }

        if (this.state.email != '' && name=='emailConfirm' && value == this.state.email){
          console.log("They match!")
          this.state.errors = ''
        }

        if (this.state.email != '' && name=='emailConfirm' && value == '' && this.state.errors.length < 1){
          this.state.errors = ''
        }


        if (this.state.email == '' && this.state.emailConfirm == ''){
          this.state.errors = ''
        }

        if (this.state.password != '' && name=='passwordConfirm' && value != this.state.password){
          this.state.errors = []
          console.log("They have to match.")
          this.state.errors.push("Passwords do not match.")
        }

        if (this.state.password != '' && name=='passwordConfirm' && value == this.state.password){
          console.log("They match!")
          this.state.errors = ''
        }

      };

handleSubmit = (event) => {
  event.preventDefault()
  const {email,password} = this.state
  
  let user = {
    email: email,
    password: password,
    registration: true
    }

    console.log(this.state.errors)

  if (this.state.errors == [] || this.state.errors == ''){
    this.props.handleLogin(user)
    console.log("Submitted!")}

  else if (this.state.errors){
    this.setState({errors: [...this.state.errors,"Please fix errors before submitting."]})
    console.log("Not submitted!")
  }

};

handleErrors = () => {
console.log(this.state.errors)
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
      console.log(this.state.errors)
    return(
          <div className="form-grid-registration">
            <div className="login-heading">
              
                <h3 data-name="login">Register</h3>
            </div>
            <form className="form-grid" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} type="text" name="email" value={email} placeholder="E-mail"></input>
            <input onChange={this.handleChange} type="text" name="emailConfirm" value={emailConfirm} placeholder="Confirm E-mail"></input>
            <input onChange={this.handleChange} type="password" name="password" value={password} placeholder="Password"></input>
            <input onChange={this.handleChange} type="password" name="passwordConfirm" value={passwordConfirm} placeholder="Password Confirm"></input>
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