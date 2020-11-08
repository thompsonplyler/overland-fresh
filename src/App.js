
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

const RequireAuth = ({children, location}) => {
  if (!fakeAuth.signedIn){
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

     };
  }



  // componentDidMount() {
  //   this.loginStatus()
  // }

  // handleLogin = (data) => {
  //   this.setState({
  //     isLoggedIn: true,
  //     user: data.user
  //   })
  // }
  

  // handleLogout = () => {
  //   this.setState({
  //   isLoggedIn: false,
  //   user: {}
  //   })
  // }

  // loginStatus retriever from Rails API
  // save for later
  // loginStatus = () => {
  //   axios.get('http://localhost:3001/logged_in', 
  //  {withCredentials: true})    
  //  .then(response => {
  //     if (response.data.logged_in) {
  //       this.handleLogin(response)
  //     } else {
  //       this.handleLogout()
  //     }
  //   }
  //   )
  //   .catch(error => console.log('api errors:', error))
  // }

  render(){
    
      return (
          <Router>
            <Switch>



            <Route 
              exact path={LOGIN_URL} 
              params={this.props.match}
              component={Login}
                />
                            


            <RequireAuth location={this.props.location}>

            <Route 
              path="/" 
              component={PreEvent}
              />

            <Route
              exact path={CONFIRMATION_URL}
              exact component={PreEvent}
              
            />

              <Route 
                  exact path={EVENT_URL}
                  component={VideoPage}
              
              />

              <Route
              exact path={POST_EVENT_URL} 
              component={PostEvent}
              />
            </RequireAuth>
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