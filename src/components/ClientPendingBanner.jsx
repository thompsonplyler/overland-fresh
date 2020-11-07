import '../App.css';
import {
  Link
} from "react-router-dom";
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL} from '../urls'

function ClientPendingBanner(props) {
    let {subject} = props
    return(
        <div className="offset">
            <h3>Technical Build Box</h3>
            <p>This is the {subject} page.</p>
            <p> Final client copy and/or artwork pending.</p>
            <p>To see draft pages, please click the following:</p>
            <ul>
                <li><Link to={LOGIN_URL}>Login</Link></li>
                <li><Link to={CONFIRMATION_URL}>Confirmation</Link></li>
                <li><Link to={EVENT_URL}>Event</Link></li>
                <li><Link to={POST_EVENT_URL}>Post-Event</Link></li>
            </ul>
        </div>
    )
}

export default ClientPendingBanner;