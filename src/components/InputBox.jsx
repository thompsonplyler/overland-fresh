import React from 'react'
import {useState} from 'react'
import '../App.css';
import StyledButton from './buttons/StyledButton';
import {
    Link,
    Redirect
  } from "react-router-dom";

function InputBox(props) {
    
    const [loginState, setLogin] = useState("register")
    
    const inputDetermine = (loginState) => {

    if (loginState==="login"){

        return<form className="form-grid">
            <input placeholder="E-mail"></input>
            <input placeholder="Password"></input>
            <Link to="/event"><StyledButton type="submit" link="event" submitHandler={submitHandler}/></Link>
        </form>
    }
    else {
        return <form className="form-grid" onSubmit={submitHandler}>
            <input placeholder="First Name"></input>
            <input placeholder="Last Name"></input>
            <input placeholder="E-Mail"></input>
            <input placeholder="Confirm E-Mail"></input>
            <input placeholder="Password"></input>
            <input placeholder="Confirm Password"></input>
            <Link to="/preevent"><StyledButton type="submit" link="preevent" submitHandler={submitHandler}/></Link>
        </form>
    }
    
    }

    const clickHandler = (e) => {
        setLogin(e.target.dataset.name)
    }

    const submitHandler = (e) => {
        <Redirect to="/preevent"/>
    }
    
    return(
        <div className="form-grid-container">
            <div className="login-heading login-heading-register" data-name="register"><h3 onClick={clickHandler}>Register</h3></div>
            <div className="login-heading"><h3 data-name="login" onClick={clickHandler}>Login</h3></div>
        {inputDetermine(loginState)}
    </div>
    )
}

export default InputBox;