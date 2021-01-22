import '../App.css';
import { useEffect, useState, Fragment } from 'react'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link, 
  Redirect,
  withRouter
} from "react-router-dom";

import {LOGIN_URL, EVENT_URL, AGENDA, CONFIRMATION_URL, NS_EVENT_URL, POST_EVENT_URL, LOGIN_FAILED_URL, ALREADY_REGISTERED} from '../urls'


import {request} from '../components/request'
import {emailConfirmSend} from '../components/emailConfirmSend'
import {checkUserCreds} from '../components/checkUserCreds'
import Tooltip from '../components/Tooltip'
import TestButton from '../components/TestButton'



function Admin(props) {

    const [regResult,setRegResult]=useState([])
    const [addResult,setAddResult]=useState([])
    const [userToAdd,setUserToAdd]=useState({})
    const [emailCheck, setEmailCheck]=useState("")
    const [emailAdd, setEmailAdd]=useState("")
    const [lastName, setlastName]=useState("")
    const [firstName, setFirstName]=useState("")
    const [company, setCompany]=useState("")
    

    useEffect(() => {
        const checkLogin = async () => {
        document.body.classList.remove('sawdust-body')
        // console.log("Props from Login: ", props)
        let user = await checkUserCreds(props.user);
        // console.log("User result from checkUserCreds: ",user)
        if (user == false) {

            props.history.push(LOGIN_URL);
        }
        }
        checkLogin()
    }, [])
  // console.log(queryString.parse(props.location.search))


    const handleAddSubmit = (event) => {
        event.preventDefault()
        console.log(event)

        let user = {
            firstname: firstName,
            lastname: lastName,
            company: company,
            email: emailAdd
        }
        let error_results = []
      if (!user.firstname){
          error_results.push("WTF! No first name!")
      }
      if (!user.lastname){
        error_results.push("WTF! No last name!")
      }
      if (!user.company){
        error_results.push("WTF! No company!")
      }
      if(!user.email){
        error_results.push("WTF! No email!")
      }

      if (error_results.length>1){
          setAddResult(error_results)
          return
      }

      if (error_results.length<1){
          setAddResult([])
          console.log("Submitted!")
      }

        
    }

    const handleCheckSubmit = (event) => {
        event.preventDefault()

        console.log("Email value for submission: ",emailCheck)
      

        console.log("Submitted!")
    }

    const handleAddResponse = () => {
        return(<div>
            <ul>{addResult.map(result=><li>{result}</li>)}</ul>
        </div>)
    }

    const handleCheckResponse =() =>{

    }

    const onKeyPressAdd = (event) => {
        if (event.keyCode === 13) {
          console.log('enter(add)')
          handleAddSubmit(event)
        }
      }

      const onKeyPressCheck = (event) => {
        if (event.keyCode === 13) {
          console.log('enter(check)')
          handleCheckSubmit(event)
        }
      }

    const emailChangeAdd = (event) => {
        setEmailAdd(event.target.value)
    };

    const emailChangeCheck = (event) => {
        setEmailCheck(event.target.value)
    };

    const firstNameChange = (event) => {
        setFirstName(event.target.value)
    };

    const lastNameChange = (event) => {
        setlastName(event.target.value)
    };

    const companyChange = (event) => {
        setCompany(event.target.value)
    };


    
return(
<Fragment>
    <div className="container">
          
          <img className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          <h3 data-name="admin">Admin Panel</h3>
          <h3 className="registration-heading-1">Add User</h3>
          <div className="admin-grid">
              <form className="admin-form" onSubmit={handleAddSubmit}>
                  <input name="firstname" onChange={firstNameChange} placeholder="First Name" value={firstName} onKeyDown={(e)=>onKeyPressAdd(e)}></input>
                  <input name="lastname" onChange={lastNameChange} placeholder="Last Name" value={lastName} onKeyDown={(e)=>onKeyPressAdd(e)}></input>
                  <input name="company" onChange={companyChange} placeholder="Company" value={company} onKeyDown={(e)=>onKeyPressAdd(e)}></input>
                  <input name="email" onChange={emailChangeAdd} placeholder="E-mail" value={emailAdd} onKeyDown={(e)=>onKeyPressAdd(e)}></input>
                  <button>Submit</button>
              </form>
              {
            addResult ? handleAddResponse() : null
          }
              </div>
              <div className="admin-grid">
              <h3 className="registration-heading-1">Check Registration Status</h3>
          
              <form className="admin-form" onSubmit={handleCheckSubmit}>
                  <input name="email" placeholder="E-mail" value={emailCheck} onKeyDown={(e)=>onKeyPressCheck(e)} onChange={emailChangeCheck}></input>
                  <button>Submit</button>
              </form>
              {
            regResult ? handleCheckResponse() : null
          }
          

          </div>
    </div>
    </Fragment>
    )
}

export default withRouter(Admin);