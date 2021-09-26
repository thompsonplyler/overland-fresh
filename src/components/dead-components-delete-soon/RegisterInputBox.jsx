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
import axios from 'axios'
import RegisterSubmitButton from './RegisterSubmitButton'
import ADDRESS from '../../env_define'


class RegisterInputBox extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          password_confirmation: '',
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
        const {firstname, lastname, email, email_confirmation, password, password_confirmation} = this.state
        let user = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          email_confirmation: email_confirmation,
          password: password,
          password_confirmation: password_confirmation
        }
        
        axios.post(`${ADDRESS}/users`, {user}, {withCredentials: true})
        .then(response => {
          if (response.data.status === 'created') {
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

    redirect = () => {
        this.props.history.push('/confirmation')
      }

    handleErrors = () => {
        return (
          <div>
            <ul>{this.state.errors.map((error) => {
              return <li key={error}>{error}</li>
            })}
            </ul> 
          </div>
        )
      }

    render(){
        const {firstname, lastname, email, email_confirmation, password, password_confirmation} = this.state
    return(
        <div className="register-form-grid-container">
            <div className="register-heading register-heading-register" data-name="register"><h3>Register</h3></div>
            <form className="registration-form-grid" onSubmit={this.handleSubmit}>
            <input type="text" name="firstname" value={firstname} onChange={this.handleChange} placeholder="First Name"></input>
            <input type="text" name="lastname" value={lastname} onChange={this.handleChange} placeholder="Last Name"></input>
            <input type="text" name="email" value={email} onChange={this.handleChange} placeholder="E-Mail"></input>
            <input type="text" name="email_confirmation" value={email_confirmation} onChange={this.handleChange} placeholder="Confirm E-Mail"></input>
            <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password"></input>
            <input type="password" name="password_confirmation" value={password_confirmation} onChange={this.handleChange} placeholder="Confirm Password"></input>
            <div style={{gridColumn:"1/3"}}>
                {/* <button type="submit" placeholder="submit" classname="">Submit</button> */}
                <RegisterSubmitButton placeholder="submit" type="submit" handleSubmit={this.handleSubmit} className="register-submit-button"/>
            </div>
        </form>
        <div>{this.state.errors ? this.handleErrors():null}</div>
    </div>
    )}
}

export default RegisterInputBox;