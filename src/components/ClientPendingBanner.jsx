import '../App.css';
import {Fragment} from 'react'
import Button from './SubmitButton'
import InputField from '../components/InputField'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


function ClientPendingBanner(props) {
    let {subject} = props
    return(
        <div className="offset">
            <h3>Technical Build Box</h3>
            <p>This is the {subject} page.</p>
            <p> Final client copy and/or artwork pending.</p>
            <p>To see draft pages, please click the following:</p>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/confirmation-test">Confirmation</Link></li>
                <li><Link to="/event-test">Event</Link></li>
                <li><Link to="/postevent-test">Post-Event</Link></li>
            </ul>
        </div>
    )
}

export default ClientPendingBanner;