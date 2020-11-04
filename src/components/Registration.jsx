import '../App.css';
import {Fragment, useState} from 'react'
import Button from '../components/EmailForm'
import InputField from '../components/InputField'
import freshLogo from '../assets/images/frshlogo.svg'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import ClientPendingBanner from '../components/ClientPendingBanner'
import InputBox from '../components/InputBox'



function Reg() {

  const [inputBox, setInputBoxState] = useState("signin")

return(
<Fragment>
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          {/* <h2 style={{color: "white", fontFamily: "PTSerif"}}>Worldwide Meeting 2020</h2>  */}
          <h2 className="registration-heading-1">under one sky</h2>
            <ClientPendingBanner subject="registration"/>
          <p className="para1">November 17, 2020</p>
          
          <InputBox />
    </div>
    </Fragment>
    )
}

export default Reg;