import React from 'react'
import { Component, setState } from 'react'
import axios from 'axios'
import '../App.css';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import styled, { ThemeConsumer } from 'styled-components';
import {emailRegCheck} from '../components/emailRegCheck'

class RegistrationInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailConfirm: '',
      passwordConfirm: '',
      errors: [],
      userRegistered: false
    };
  }

  onKeyPress = (event) => {
    if (event.keyCode === 13) {
      // console.log('enter')
      this.handleSubmit(event)
    }
  }

  inputDetermine = () => {


    return
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  confirmInput = (event) => {
    const { name, value } = event.target
    let { errors } = this.state
    // console.log("Errors at start of event input:",errors)

    if (this.state.email=='') {
      this.setState({ errors: [...this.state.errors, "You must include a valid e-mail address."] })
    }
    console.log("Email is false, i.e. empty?", !this.state.email)
    console.log(this.state.errors)

    if (this.state.email != '' && this.state.emailConfirm != '' && this.state.emailConfirm != this.state.email) {
      this.setState({ errors: [...errors, "Your e-mail address does not match."] })
    }

    if (this.state.emailConfirm == '') {
      this.setState({ errors: [...errors, "You must confirm your e-mail address is correct."] })
    }

    if (this.state.password == '') {
      this.setState({ errors: [...errors, "You must enter a password."] })
    }

  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { email, password, emailConfirm, passwordConfirm } = this.state
    console.log("Submitted!")
    let errorArray = []

    if (this.state.userRegistered == true){
      errorArray.push("This e-mail address has already been registered.")
    }
    // const entrySuccess  = this.confirmInput(event)
    if (password !== passwordConfirm){
      errorArray.push("Passwords do not match.")
    }

    if (email !== emailConfirm) {
      errorArray.push("Emails do not match.")
    }
    
    if (!email){
      errorArray.push("You must include an e-mail address.")
    }

    if (!password){
      errorArray.push("You must include a password.")
    }

    if (errorArray.length > 0) {
      this.setState({errors:errorArray})
    }

                          console.log(
                            `
                        Email: ${email}
                        Email Confirm:${emailConfirm}
                        Password: ${password}
                        Password Confirm: ${passwordConfirm}
                        `
                        )

  if (errorArray.length == 0) {

    let user = {
      email: email,
      password: password,
      registration: true
    }

       this.props.handleLogin(user)
  }

  };

  handleErrors = () => {
    // console.log(this.state.errors)
    return (
      <div className="error-div">
        <ul className="ul-error">
          {this.state.errors.map(error => {
            return <li className="li-error" key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  onEmailBlur = async(e) => {
    const registered = await emailRegCheck(e)
    // console.log(registered)
    
    if (registered.registration == true){
      this.setState({userRegistered:true})
    }

    else{
      this.setState({userRegistered:false})
    }
  }

  render(props) {
    // console.log("Registration input props: ",this.props)
    const { email, password, emailConfirm, passwordConfirm } = this.state
    const junk = `Password`
    return (
      <div className="form-grid-registration" style={{border: "0px",borderRight: `${this.props.border}px`, borderColor: "white",paddingRight: `${this.props.padding}vw`, borderStyle: "solid"}} >
        <div className="login-heading">

          <h3 data-name="login">Register for Jan 27, 2021</h3>
        </div>
        <form className="form-grid" onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} onKeyDown={(e) => this.onKeyPress(e)} type="text" name="email" value={email} placeholder="E-mail"></input>
          <input onBlur={(e)=>this.onEmailBlur(e)} onChange={this.handleChange} onKeyDown={(e) => this.onKeyPress(e)} type="text" name="emailConfirm" value={emailConfirm} placeholder="Confirm E-mail" ></input>
          <input onChange={this.handleChange} onKeyDown={(e) => this.onKeyPress(e)} type="password" name="password" value={password} placeholder={junk}/>
          <input onChange={this.handleChange} onKeyDown={(e) => this.onKeyPress(e)} type="password" name="passwordConfirm" value={passwordConfirm} placeholder="Confirm Password"></input>
          <button placeholder="submit" type="submit" className="login-submit-button">Submit</button>
          <div>
            {
              this.state.errors.length > 0 ? this.handleErrors() : null
            }
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(RegistrationInput);