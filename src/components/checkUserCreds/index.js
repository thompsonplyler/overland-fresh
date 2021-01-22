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