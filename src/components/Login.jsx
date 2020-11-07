import '../App.css';
import {Fragment} from 'react'
// import Button from './SubmitButton'
// import InputField from '../components/InputField'
import freshLogo from '../assets/images/frshlogo.svg'
// import {
//   BrowserRouter as Router,
//   Link, 
//   Redirect
// } from "react-router-dom";
import ClientPendingBanner from '../components/ClientPendingBanner'
import LoginInputBox from '../components/LoginInputBox'
// import RegisterButton from './RegisterSubmitButton'
// import RegisterLinkButton from '../components/RegisterLinkButton'


function Login(props) {

  console.log("Props from Login component",props)

  // const [inputBox, setInputBoxState] = useState("signin")

  // const {from} = this.props.location.state || {from:{pathname:'/'}}

  // if (this.state.redirect === true) {
  //   return <Redirect to={from} />
  // }

return(
<Fragment>
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          {/* <h2 style={{color: "white", fontFamily: "PTSerif"}}>Worldwide Meeting 2020</h2>  */}
          <h2 className="registration-heading-1">under one sky</h2>
            <ClientPendingBanner subject="login"/>
          <p className="para1">November 17, 2020</p>
            <div className="login-grid-row">
          <LoginInputBox />
          </div>
    </div>
    </Fragment>
    )
}

export default Login;