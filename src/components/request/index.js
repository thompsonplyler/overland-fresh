export const request = async(event) => {
    // event.preventDefault()
    // const {email} = this.state
    // const {decideTopLevelLogin} = this.props
    
    // let user = {
    //   email: email
    //   }
  
    //   var inputData = {"user":{"email":`${email}`}};
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"user":{"email":`${event}`}});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  
try { const response = await fetch("http://localhost:3001/api/v1/login", requestOptions)

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
        //   url: `https://fresh-under-one-sky-email-api.herokuapp.com/api/v1/person?email=${personData.email}&first_name=${personData.firstname}&last_name=${personData.lastname}&company=${personData.company}`,
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