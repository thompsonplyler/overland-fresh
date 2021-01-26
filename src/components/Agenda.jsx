import '../App.css';
import { useEffect, Fragment } from 'react'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link, 
  withRouter
} from "react-router-dom";
import {LOGIN_URL, EVENT_URL, NS_EVENT_URL} from '../urls'
import {checkUserCreds} from '../components/checkUserCreds'
import TestButton from '../components/TestButton'

function Agenda(props) {
useEffect(()=>{
  document.body.classList.remove('sawdust-body')
},[])


useEffect(() => {
  const checkLogin = async () => {
  document.body.classList.remove('sawdust-body')
  // console.log("Props from Login: ", props)
  let user = await checkUserCreds(props.user);
  // console.log("User result from checkUserCreds: ",user)
  if (user === false) {

    props.history.push(LOGIN_URL);
  }
}
checkLogin()
}, [])
  // console.log(queryString.parse(props.location.search))



return(
<Fragment>
    <div className="container">
          
          <img alt="fresh logo" className="img-fresh-logo" src={freshLogo}/>
          
          <h2 className="registration-heading-1">under one sky</h2>
          <div className="agenda-grid">
          <div className="agenda-grid-item">
              <h3>Part 1: Interactive Welcome Session</h3>
              <h3>8:00 AM - 8:15 AM EST</h3>
                  <a href="https://spatial.chat/s/freshunderonesky?sp=fresh007" target="_blank">
                    <button className="agenda-button">Click to Watch</button></a>
                    {// <Tooltip message={tooltip_data.tooltip} position={'right'}>{tooltip_data.buttonText}</Tooltip>
}
          </div>
          <div className="agenda-grid-item">
          <h3>Part 2: 2021 - 30th Anniversary - Brand Purpose</h3>
              <h3>8:20 AM - 9:05 AM EST</h3>
                  <Link to={EVENT_URL}><button className="agenda-button">Click To Watch</button></Link>
          </div>
          <div className="agenda-grid-item">
          <h3>Part 3: Purpose Experience</h3>
              <h3>9:20 AM - 10:05 AM EST</h3>
                  <a href={NS_EVENT_URL}><button className="agenda-button">Click To Watch</button></a>
          </div>
          </div>
    </div>
    <TestButton handleLogout={props.handleLogout} />
    </Fragment>
    )
}

export default withRouter(Agenda);