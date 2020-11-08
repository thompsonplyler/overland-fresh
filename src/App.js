
import {Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
  Link
} from "react-router-dom";
import axios from 'axios'
import VideoPage from "./components/VideoPage"
import PreEvent from "./components/PreEvent"
import PostEvent from "./components/PostEvent"
import Login from "./components/Login"
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL} from './urls'

export const fakeAuth = {
  signedIn: false
}

export const realAuth = {
  signedIn: false
}

const RequireAuth = ({component: Component, children, location, isLoggedIn, user} ) => {
  // console.log("Children of Auth router," children)
  console.log("isLoggedIn?", isLoggedIn)
  console.log("Location from RequireAuth",location)
  if (!isLoggedIn){
    return <Redirect to={{
      pathname: LOGIN_URL,
      search: location.search
    }} />
  }
  
  return children
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  }



  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {
    console.log("Data from login check:", data)
    this.setState({
      isLoggedIn: true,
      user: data.data.user
    })

    
    console.log("Reading user state: ", this.state.user)
    console.log("Reading login state: ", this.state.isLoggedIn)
    this.props.history.push("/confirmation")
    return <Redirect to="/confirmation"/>

  }

  componentDidUpdate(prevProps, prevState){
    console.log("CDU prevState ",prevState)
    console.log("CDU prevProps ",prevProps)
    if (prevProps.location.pathname!=this.props.location.pathname){
      if (prevProps.location.pathname == LOGIN_URL && this.props.location.pathname==CONFIRMATION_URL){
        return <Redirect to="/confirmation" />
      }
    }
  }
  

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  // loginStatus retriever from Rails API
  // save for later
  loginStatus = () => {
    console.log("Reading localStorage during login status check: ",localStorage)
    let user
    if (localStorage.loggedIn && localStorage.confirm_token){
      user = {confirm_token: localStorage.confirm_token}
      }

      console.log("User object taken from local storage and sent to Rails: ",user)
      
    

    axios.post('http://localhost:3001/logged_in', {user},
   {withCredentials: true})    
   .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    }
    )
    .catch(error => console.log('api errors:', error))
  }

  render(){
    console.log("App/Router State:",this.state)
    
      return (
        
          <Router>
            <Switch>


            <Route
              exact path={CONFIRMATION_URL}
              render={(props)=> <PreEvent {...props} user={this.state.user} topLevelLogin={this.handleLogin}/>}
              
            />
            
            <Route 
              exact path={LOGIN_URL} 
              params={this.props.match}
              render={(props)=> <Login {...props} user={this.state.user} topLevelLogin={this.loginStatus}/>}
                />
                            


            {/* <RequireAuth 
              isLoggedIn={this.state.isLoggedIn} 
              location={this.props.location}
              user={this.state.user}
              topLevelLogin={this.handleLogin}
              > */}
              

            <Route 
              exact path="/" 
              render={(props)=> <PreEvent {...props} user={this.state.user} topLevelLogin={this.handleLogin}/>}
              
              
              />

          

              <Route 
                  exact path={EVENT_URL}
                  render={(props)=> <VideoPage {...props} topLevelLogin={this.handleLogin} user={this.state.user}/>}
              
              />

              <Route
              exact path={POST_EVENT_URL} 
              render={(props)=> <PostEvent {...props} topLevelLogin={this.handleLogin} user={this.state.user}/>}
              />
            {/* </RequireAuth> */}
            </Switch>
          </Router>
          
      );
    }
  }

export default withRouter(App);

/* Old Routing Stuff:
<AuthenticatedRoute 
                exact path='/confirmation' 
                render={props => (
                <PreEvent {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <AuthenticatedRoute 
                exact path='/event' 
                render={props => (
                <VideoPage {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
             <AuthenticatedRoute 
                exact path='/' 
                render={props => (
                <PreEvent {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
                <AuthenticatedRoute 
                exact path='/postevent' 
                render={props => (
                <PostEvent {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
*/