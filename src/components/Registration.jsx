import '../App.css';
import {Fragment} from 'react'
import Button from '../components/EmailForm'
import InputField from '../components/InputField'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function Reg() {
    return(
<Fragment>
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          <h2 className="registration-heading-1">under one sky</h2>
          <p className="para1">Nov 17</p>
          <p className="para1">Register today</p>
          <form>
            <input></input>
            <Link to="/conference"><Button /></Link>
          </form>
    </div>
    </Fragment>
    )
}

export default Reg;