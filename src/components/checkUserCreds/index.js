export const checkUserCreds = (user) => {
    let loggedIn = false; 
    if (user.email) {
      loggedIn = true; 
    }
    if (!user) {
      const localUser = localStorage.getItem('user');
      if (localUser) {
        loggedIn = true; 
      }
    }
    return loggedIn; 
  }