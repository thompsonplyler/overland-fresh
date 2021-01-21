import {ADDRESS} from '../../env_define'
import { confirmationCodeChallenge } from '../confirmationCodeChallenge'

export const checkUserCreds = async (user) => {

  try {
  let loggedIn = false; 
  return loggedIn
  }

  catch {
    let loggedIn = true;
    return loggedIn
  }
  // const checkConfirmationCode = async(data) => {
  //   const challenge = await confirmationCodeChallenge(data)
  //   console.log("Results from challenge confirmation: ",challenge)
  //   if (challenge.confirmed){
  //   return true
  // }
  //   else{
  //     return false
  //   }
  // }
  // // is localStorage empty?
  // // if localStorage isn't empty, check to see if they're a user who
  // // has visited previously in order to prevent old logins from
  // // November 2020
  // if (localStorage.length > 0) {
  //   console.log(`
    
  //   Local storage is not empty.
    
  //   `)
  //   console.log(`

  //   Checking to see if the user has been cleared to return for 2021...
    
  //   `)
  //   if (window.localStorage.getItem('cleared')=='true'){
  //     console.log(`
      
  //     User has already had local storage cleared in order to access site.`)
      
  //   }
  //   else {

  //     console.log(`
      
  //     No clear flag found...
      
  //     `)
  //     console.log(`
      
  //     Clearing local storage...
      
  //     `)
  //     localStorage.clear()

  //     console.log(`
      
  //     Setting cleared flag to TRUE

  //     `)
  //     localStorage.setItem('cleared','true')
  //   }
  // }

  //   // let loggedIn = false; 
  //   console.log("Logged in? ",user)
  //   // if state is set to log in, that's good enough for the app
  //   // this is for the same session
  //   if (user.email) {
  //     loggedIn = true; 
  //   }

  //   // not the same session, so have they logged in before? 
  //   if (!user.email) {
  //     console.log("No user email!")
  //     const localUser = localStorage.getItem('user');
  //     console.log("Local User from checkUserCreds: ",localUser)
  //     if (localUser) {
  //       console.log("User info found in localStorage: ",localUser)
  //       let challenge = await checkConfirmationCode(localUser)
  //       loggedIn = challenge;
  //       console.log("Last train to confirmation. Is this person logged in? ", `${(loggedIn == true) ? "yes" :"no"}`)
  //       return loggedIn
  //     }
  //   }
  //   console.log("Logged in status from checkuserCreds: ", loggedIn)
  //   return loggedIn; 
 
  }