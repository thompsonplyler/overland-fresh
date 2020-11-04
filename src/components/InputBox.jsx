import React from 'react'
import {Fragment} from 'react'
import {useState} from 'react'
import '../App.css';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
  import Button from '../components/EmailForm'

function InputBox() {
    const [loginState, setLogin] = useState("login")

const inputDetermine = (loginState) => {
    // if (loginState = "login") {
    //     return(
    //         <div>Login</div>
    //     )
    // }
    //     else {
    //         return (
    //             <div>Register</div>
    //         )
    //     }
    if (loginState==="login"){

        return<form className="form-grid">
            <input placeholder="E-mail"></input>
            <input placeholder="Password"></input>
            <Link to="/event"><Button /></Link>
        </form>
    }
    else {
        return <form className="form-grid">
            <input placeholder="First Name"></input>
            <input placeholder="Last Name"></input>
            <input placeholder="E-Mail"></input>
            <input placeholder="Confirm E-Mail"></input>
            <input placeholder="Password"></input>
            <input placeholder="Confirm Password"></input>
            <Link to="/event"><Button classname="submit-button"/></Link>
        </form>
    }
    
    }

    const clickHandler = (e) => {
        console.log("I've been clicked!")
        console.log(e.target.dataset.name)
        setLogin(e.target.dataset.name)
    }


    return(
        <div className="form-grid-container">
            <div className="login-heading"><h3 data-name="login" onClick={clickHandler}>Login</h3></div>
            <div className="login-heading login-heading-register" data-name="register"><h3 onClick={clickHandler}>Register</h3></div>
        {inputDetermine(loginState)}
    </div>
    )
}

export default InputBox;