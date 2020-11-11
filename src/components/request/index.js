export const request = async(event) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"user":{"email":`${event}`}});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  
  try { const response = await fetch("https://fresh-under-one-sky-email-api.herokuapp.com/api/v1/login", requestOptions)

  const json = await response.json()

  return json
      
  } catch (error) {
      console.log(error)
  }
  };