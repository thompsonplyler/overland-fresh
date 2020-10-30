import '../App.css';
import {Fragment} from 'react'
import Button from '../components/EmailForm'
import InputField from '../components/InputField'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


function ClientPendingBanner() {
    return(
        <div className="offset">
            <p>This is the welcome/registration page.</p>
            <p> Final client copy and/or artwork pending.</p>
            <ul>
                <li><Link to="/register">Registration</Link></li>
                <li><Link to="/preevent">Pre-Event</Link></li>
                <li><Link to="/event">Event</Link></li>
                <li><Link to="/postevent">Post-Event</Link></li>
            </ul>
        </div>
    )
}

export default ClientPendingBanner;