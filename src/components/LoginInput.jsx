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
import styled from 'styled-components';

class LoginInput extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          email: '',
          password: '',
          errors: ''
         };
      }
  onKeyPress=(event)=> {
        if (event.keyCode === 13) {
            console.log('enter')
            this.handleSubmit(event)
        }
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
  const {email, password} = this.state
  
    let user = {
      email: email,
      password: password,
      registration: false
      }

this.props.handleLogin(user)

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
      <div className="form-grid-registration" style={{border: "0px",borderLeft: `${this.props.border}px`, borderColor: "white",paddingLeft: `${this.props.padding}vw`, borderStyle: "solid"}} >
            <div className="login-heading">
              
                <h3 data-name="login">LOGIN ON JAN, 27 2021</h3>
            </div>
            <form className="form-grid" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} type="text" name="email" value={email} placeholder="E-mail" onKeyDown={(e) => this.onKeyPress(e) }></input>
            <input onChange={this.handleChange} type="password" name="password" value={password} placeholder="Password" onKeyDown={(e) => this.onKeyPress(e) }></input>
            <button placeholder="submit" type="submit" handleSubmit={this.handleSubmit} className="login-submit-button">Submit</button>
            <p className="lost-password"><Link to="/lostpassword">forgot password?</Link></p>
            <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
          </div>
        </form>
        </div>
    )}
}

export default withRouter(LoginInput);