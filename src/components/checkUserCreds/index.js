<<<<<<< HEAD
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL, LOGIN_FAILED_URL, WRONG_PASSWORD_URL, AGENDA_URL} from '../../urls'

export const checkUserCreds = (user) => {
  console.log("LocalStorage from checkUserCreds: ",localStorage)
  console.log("User information sent to checkUserCreds: ", user)

  console.log("Checking localStorage: ",localStorage)
  if (localStorage.length > 0) {
    console.log(`
    
    Local storage is not empty.
    
    `)
    console.log(`

    Checking to see if the user has been cleared to return for 2021...
    
    `)
    if (window.localStorage.getItem('cleared')=='true'){
      console.log(`
      
      User has already had local storage cleared in order to access site.`)
      
    }
    else {

      console.log(`
      
      No clear flag found...
      
      `)
      console.log(`
      
      Clearing local storage...
      
      `)
      localStorage.clear()

      console.log(`
      
      Setting cleared flag to TRUE

      `)
      localStorage.setItem('cleared','true')
    }
  }

    let loggedIn = false; 
    if (user.email) {
      loggedIn = true; 
=======
import {ADDRESS} from '../../env_define'
import { confirmationCodeChallenge } from '../confirmationCodeChallenge'

export const checkUserCreds = async (data) => {

  // console.log("User data passed to checkUserCreds, if any:", data)

  try {
  let loggedIn = false; 
    if (data.user) {
      loggedIn = true
      return loggedIn
    }
  if (localStorage.length > 0) {
    // console.log("Yes! There's stuff in localStorage!")
    // console.log("Local Storage: ", localStorage)
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user)
      user = {email: user.email, confirm_token: user.confirm_token}
      const results = await confirmationCodeChallenge(user)
      // console.log("Results from confirmationCodeChallenge, passed to checkUserCreds: ",results)
      loggedIn = results.confirmed
      return loggedIn
>>>>>>> final-2021
    }
    else {
      return loggedIn
    }

  }
  return loggedIn
  
  }

  catch {
    let loggedIn = false;
    return loggedIn
  }

 
  }