export const sendNewPassword = async(event) => {
    console.log("Sending to Challenge Verifier:", event)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({user:{"password":`${event.password}`, "email": `${event.email}`}});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  
  try { 
    // call to test server. remove after testing registration system
    // const response = await fetch("http://localhost:3001/api/v1/password_reset", requestOptions)
    // the real call. restore after testing registration system. 
    const response = await fetch("https://fresh-under-one-sky-email-api.herokuapp.com/api/v1/password_reset", requestOptions)

  const json = await response.json()
    console.log(json)
  return json
      
  } catch (error) {
      console.log(error)
  }
  };