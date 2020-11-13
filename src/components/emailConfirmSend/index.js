export const emailConfirmSend = async(event) => {
if (!event.registered)
  {
console.log("New user discovered! Sending confirmation to e-mail service.")
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



var raw = JSON.stringify({"email":`${event.email}`,"first_name":`${event.firstname}`,"last_name":`${event.email}`});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

  
try { const response = await fetch("https://fresh-under-one-sky-email-api.herokuapp.com/api/v1/person", requestOptions)

const json = await response.json()

return json
    
} catch (error) {
    console.log(error)
}}
else return
  };