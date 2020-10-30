
import {Fragment} from 'react'
import Button from './components/EmailForm'
import InputField from './components/InputField'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import VideoPage from "./components/VideoPage"
import Reg from "./components/Registration"
import PreEvent from "./components/PreEvent"
import PostEvent from "./components/PostEvent"

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/postevent"><PostEvent /></Route>
      <Route path="/preevent"><PreEvent /></Route>
      <Route path="/event"><VideoPage /></Route>
      <Route path="/register"><Reg /></Route>
      <Route path="/"><Reg /></Route>
    </Switch>
    </Router>
  );
}

export default App;
