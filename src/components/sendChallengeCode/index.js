export const sendChallengeCode = async(event) => {
    console.log("Sending to Challenge Verifier:", event)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({user:{"challenge_code":`${event.code}`, "email": `${event.email}`}});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  
  try { 
    // call to test server. remove after testing registration system
    const response = await fetch("http://localhost:3001/api/v1/challenge_approve", requestOptions)
    // the real call. restore after testing registration system. 
    // const response = await fetch("https://fresh-under-one-sky-email-api.herokuapp.com/api/v1/challenge_approve", requestOptions)

  const json = await response.json()
    console.log(json)
  return json
      
  } catch (error) {
      console.log(error)
  }
  };