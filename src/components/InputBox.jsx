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

        return<form >
            <input placeholder="E-mail"></input>
            <input placeholder="Password"></input>
        </form>
    }
    else {
        return <form>
            <input placeholder="First Name"></input>
            <input placeholder="Last Name"></input>
            <input placeholder="E-Mail"></input>
            <input placeholder="Confirm E-Mail"></input>
            <input placeholder="Password"></input>
            <input placeholder="Confirm Password"></input>
        </form>
    }
    
    }

    const clickHandler = (e) => {
        console.log("I've been clicked!")
        console.log(e.target.dataset.name)
        setLogin(e.target.dataset.name)
    }


    return(
        <div>
            <h3 data-name="login" onClick={clickHandler}>Login</h3>
            <h3 data-name="register" onClick={clickHandler}>Register</h3>
        {inputDetermine(loginState)}
    </div>
    )
}

export default InputBox;