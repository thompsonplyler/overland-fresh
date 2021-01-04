export const emailRegCheck = async(event) => {
    console.log("Sending to email check:", event)
    // console.log(event)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"user":{"email":`${event.target.value}`}});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  
  try { 
    // call to test server. remove after testing registration system
    // const response = await fetch("http://localhost:3001/api/v1/registered", requestOptions)
    // the real call. restore after testing registration system. 
    const response = await fetch("https://fresh-under-one-sky-email-api.herokuapp.com/api/v1/registered", requestOptions)

  const json = await response.json()
    console.log("Response from 'does this user exist?' on blur: ",json)
  return json
      
  } catch (error) {
      console.log(error)
  }
  };