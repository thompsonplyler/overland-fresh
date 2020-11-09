import '../App.css';
import {
  Link
} from "react-router-dom";
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL} from '../urls'

const clickHandler=()=>{
    localStorage.clear()
}

function Logout(props) {
    let {subject} = props
    return(
        <div className="logout-button">
            <button onClick={clickHandler}>Logout</button>
        </div>
    )
}

export default Logout;