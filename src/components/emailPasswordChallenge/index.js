export const emailPasswordChallenge = async(event) => {
  if (event){
    // console.log("Sending to Password Challenge:", event)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({user:{"email":`${event}`}});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  
  try { 
    // call to test server. remove after testing registration system
    const response = await fetch(`${ADDRESS}challenge_make`, requestOptions)
    // the real call. restore after testing registration system. 
    // const response = await fetch("https://fresh-under-one-sky-email-api.herokuapp.com/api/v1/challenge_make", requestOptions)

  const json = await response.json()
    // console.log(json)
  return json
      
  } catch (error) {
      // console.log(error)
  }
  }
  else {
    return {"emptyEvent": true}
  }
};