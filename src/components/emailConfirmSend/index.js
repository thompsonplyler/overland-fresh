export const emailConfirmSend = async(event) => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

console.log(event)

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
}

      
      // axios(config)
      // .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  
      // let personData = JSON.stringify({"name":"login",
      //   "data":{
      //   "recipient":"thompson@thompsonplyler.com"
      
      // }});
      
  
      // axios(config)
      // .then(function (response) {
      
      // data variable refers to exposed JSON data
      // let personData = data.find(userA => userA.email == user.email.toLowerCase())
        
  
        // if (personData){
  
        // let config = {
        //   method: 'post',
        //   mode: 'cors',
        //   headers: { 'Access-Control-Allow': 'CORS' },
        //   url: ``,
        //   data : personData
        // };
  
      //   axios(config)
      //   .then(function (response){})
      //   .catch(function (error){})
     
      // }
        // this.props.handleLogin(personData)
  
  
  
    
    
          
    // axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    //   .then(response => {
    //     if (response.data.logged_in) {
    //       this.props.handleLogin(response)
    //     } else {
    //       this.setState({
    //         errors: response.data.errors
    //       })
    //       }
    //   })
    //   .catch(error => console.log('api errors:', error))
  };