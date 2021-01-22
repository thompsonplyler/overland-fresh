import {ADDRESS} from '../../env_define'

export const request = async(event) => {
    // console.log("Request being sent to Rails server for login request: ",event)
    // console.log(event)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"user":{"email":`${event.email}`,"registration":`${event.registration}`,"password":`${event.password}`}});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  
  try { 
    // call to test server. remove after testing registration system
    const response = await fetch(`${ADDRESS}login`, requestOptions)
    // the real call. restore after testing registration system. 
    // const response = await fetch("https://fresh-under-one-sky-email-api.herokuapp.com/api/v1/login", requestOptions)

  const json = await response.json()
    // console.log("Server response from request handler, success: ",json)
  return json
      
  } catch (error) {
      console.log(error)
  }
  };