export const checkUserCreds = (user) => {

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