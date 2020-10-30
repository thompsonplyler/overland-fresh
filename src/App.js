
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

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/conference"><VideoPage /></Route>
      <Route path="/"><Reg /></Route>
      {/* <Route path="/register"><Registration /></Route> */}
    </Switch>
    </Router>
  );
}

export default App;
