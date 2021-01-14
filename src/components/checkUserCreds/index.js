export const checkUserCreds = (user) => {
  console.log("LocalStorage from checkUserCreds: ",localStorage)
  console.log("User information sent to checkUserCreds: ", user)

    let loggedIn = false; 
    if (user.email) {
      loggedIn = true; 
    }
    if (!user.email) {
      const localUser = localStorage.getItem('user');
      console.log(localUser)
      if (localUser) {
        loggedIn = true;
        return loggedIn
      }
    }
    console.log("Logged in status from checkuserCreds: ", loggedIn)
    return loggedIn; 
  }