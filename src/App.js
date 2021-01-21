
import { Component } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import { createBrowserHistory } from 'history'
import VideoPage from "./components/VideoPage"
import PreEvent from "./components/PreEvent"
import PostEvent from "./components/PostEvent"

import Login from "./components/Login"
import LoginFailed from "./components/LoginFailed"
import { LOST_PASSWORD_URL,AGENDA_URL, NS_EVENT_URL, ADMIN_URL,LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL, UNREGISTERED_ERROR_URL,LOGIN_FAILED_URL,ALREADY_REGISTERED, WRONG_PASSWORD_URL } from './urls'
import ReactGA from 'react-ga';
import LostPassword from './components/LostPassword';
import Agenda from './components/Agenda';
import WrongPassword from './components/WrongPassword';
import VideoPageSawDust from './components/VideoPageSawdust';
import UnregisteredError from './components/UnregisteredError';
import Admin from './components/Admin';


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
    console.log("User login info:",user)
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({
      isLoggedIn: true,
      user: user
    })
  }

  handleLogout = (props) => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })

    localStorage.clear() 
  }

  render(props) {
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
            history={history}
            params={this.props.match}
            render={(props) => (
              <Login
                {...props}
                user={this.state.user}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
              />
            )}
          />

          <Route
            exact
            path={CONFIRMATION_URL}
            history={history}
            render={(props) => (
              <PreEvent
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                handleLogout={this.handleLogout}


              />
            )}
          />

          <Route
            exact
            path={EVENT_URL}
            params={this.props.match}
            history={history}
            render={(props) => (
              <VideoPage
                {...props}
                user={this.state.user}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
              />
            )}
          />

<Route
            exact
            path={AGENDA_URL}
            params={this.props.match}
            history={history}
            render={(props) => (
              <Agenda
                {...props}
                user={this.state.user}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
              />
            )}
          />


   

          <Route
            exact
            path={POST_EVENT_URL}
            history={history}
            render={(props) => (
              <PostEvent
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                handleLogout={this.handleLogout}
              />
            )}
          />

          <Route
            exact
            path={LOGIN_FAILED_URL}
            history={history}
            render={(props) => (
              <LoginFailed
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                handleLogout={this.handleLogout}
              />

              


            )}
          />

<Route
            exact
            path={LOST_PASSWORD_URL}
            history={history}
            render={(props) => (
              <LostPassword
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                handleLogout={this.handleLogout}
              />

              


            )}
          />

<Route
            exact
            path={WRONG_PASSWORD_URL}
            history={history}
            render={(props) => (
              <WrongPassword  
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                handleLogout={this.handleLogout}
              />

              


            )}
          />

<Route
            exact
            path={NS_EVENT_URL}
            history={history}
            render={(props) => (
              <VideoPageSawDust  
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                handleLogout={this.handleLogout}
              />

              


            )}
          />

<Route
            exact
            path={UNREGISTERED_ERROR_URL}
            history={history}
            render={(props) => (
              <UnregisteredError  
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                handleLogout={this.handleLogout}
              />

              


            )}
          />

          

<Route
            exact
            path="/"
            history={history}
            render={(props) => (
              <Login  
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />

              


            )}
          />

<Route
            exact
            path={ADMIN_URL}
            history={history}
            render={(props) => (
              <Admin  
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />

              


            )}
          />

        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);