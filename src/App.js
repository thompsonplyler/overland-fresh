
import {Component} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import {createBrowserHistory} from 'history'
import VideoPage from "./components/VideoPage"
import PreEvent from "./components/PreEvent"
import PostEvent from "./components/PostEvent"
import Login from "./components/Login"
import LoginFailed from "./components/LoginFailed"
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL, LOGIN_FAILED_URL} from './urls'
import ReactGA from 'react-ga';

// const trackingId = ""
// ReactGA.initialize()
// ReactGA.set({

// })
// import {isIE} from 'react-device-detect'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  }

  componentDidMount() {
    ReactGA.initialize('G-GJYMBF5T3F');
    ReactGA.pageview(window.location.pathname);
    let localUser = localStorage.getItem('user');
    if (localUser) {
      const user = JSON.parse(localUser); 
      this.setState({
        isLoggedIn: true, 
        user
      });
      // console.log('USER PRESENT', user);
    }
  }

  handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({
      isLoggedIn: true,
      user: user
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: true,
    user: {}
    })
  }

  render(){
    const history = createBrowserHistory();

    // Initialize google analytics page view tracking
    history.listen(location => {
      ReactGA.initialize('G-GJYMBF5T3F');
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname); // Record a pageview for the given page
    });
    
    return (
      
      
      <Router>
        <Switch>
          <Route
            exact
            path={LOGIN_URL}
            params={this.props.match}
            render={(props) => (
              <Login
                {...props}
                user={this.state.user}
                handleLogin={this.handleLogin}
              />
            )}
          />
          
          <Route
            exact
            path={CONFIRMATION_URL}
            render={(props) => (
              <PreEvent
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                
                
              />
            )}
          />

        <Route
            exact
            path={EVENT_URL}
            params={this.props.match}
            render={(props) => (
              <VideoPage
                {...props}
                user={this.state.user}
                handleLogin={this.handleLogin}
              />
              )}
              />
    

          <Route
            exact
            path="/"
            render={(props) => (
              <Login
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                handleLogin={this.handleLogin}
              />
            )}
          />
          <Route
            exact
            path={POST_EVENT_URL}
            render={(props) => (
              <PostEvent
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />

<Route
            exact
            path={LOGIN_FAILED_URL}
            render={(props) => (
              <LoginFailed
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />
            )}
          />
          {/* <Route
            exact
            path="/"
            params={this.props.match}
            render={(props) => (
              <Login
                {...props}
                // user={this.state.user}
                handleLogin={this.handleLogin}
              />
            )} */}
          />
        </Switch>
      </Router>
    );
    }
  }

export default withRouter(App);