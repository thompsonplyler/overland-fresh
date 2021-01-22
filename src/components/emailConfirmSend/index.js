import {ADDRESS} from '../../env_define'
export const emailConfirmSend = async(event) => {
  // console.log(event.registered)
if (!event.registered)
  {
// console.log("New user discovered! Sending confirmation to e-mail service.")
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



var raw = JSON.stringify({"email":`${event.email}`,"first_name":`${event.firstname}`,"last_name":`${event.email}`});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

  
try { const response = await fetch(`${ADDRESS}/person`, requestOptions)

const json = await response.json()

return json
    
} catch (error) {
    console.log(error)
}}
else return
  };