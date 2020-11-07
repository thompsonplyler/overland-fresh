
import {Component, Fragment, useState} from 'react'
import Button from './components/SubmitButton'
import InputField from './components/InputField'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import axios from 'axios'
import VideoPage from "./components/VideoPage"
import PreEvent from "./components/PreEvent"
import PostEvent from "./components/PostEvent"
import RealChat from "./components/RealChat"
import Login from "./components/Login"

function AuthenticatedRoute({component: Component, loggedInStatus, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => loggedInStatus === true
          ? <Component {...props} {...rest} />
          : <Redirect to={{pathname: '/login', state: {from:props.location}}}/>} />
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      authenticated: false,
      currentUser: null,
      loading: true,
      user: {}
     };
  }

  setCurrentUser = (user) => {
    if (user) {
      this.setState({
        currentUser: user,
        isLoggedIn: true
      })
    } else {
      this.setState({
        currentUser: null,
        isLoggedIn: false
      })
    }
  }

  componentWillMount(){
    
  }

  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', 
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
      return (
        <Fragment>
          <Router>
            <Switch>
            <Route 
              exact path='/login' 
              render={props => (
              <Login {...props} handleLogout={this.handleLogout} //pass prop 
              loggedInStatus={this.state.isLoggedIn}/>)}
              />

              {/* <Route 
              exact path='/event-test' 
              render={props => (
              <VideoPage {...props} handleLogout={this.handleLogout} //pass prop 
              loggedInStatus={this.state.isLoggedIn}/>)}
              /> */}

              {/* <Route 
              exact path='/confirmation-test' 
              render={props => (
              <PreEvent {...props} handleLogout={this.handleLogout} //pass prop 
              loggedInStatus={this.state.isLoggedIn}/>)}
              /> */}

{/* <Route 
              exact path='/postevent-test' 
              render={props => (
              <PostEvent {...props} handleLogout={this.handleLogout} //pass prop 
              loggedInStatus={this.state.isLoggedIn}/>)}
              /> */}

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
                          <Route 
              path='/' 
              render={props => (
              <Login {...props} handleLogout={this.handleLogout} //pass prop 
              loggedInStatus={this.state.isLoggedIn}/>)}
              />

            </Switch>
          </Router>
        </Fragment>
      );
    }
  }

export default App;