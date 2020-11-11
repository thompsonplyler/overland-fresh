import "../App.css";
import { Fragment, useState } from "react";
import freshLogo from "../assets/images/frshlogo.svg";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter,
} from "react-router-dom";
import ClientPendingBanner from "../components/ClientPendingBanner";
import LoginInputBox from "../components/LoginInputBox";
import queryString from "query-string";
import Logout from "../components/Logout";
// import authorizedData from "../../src/assets/json/authenticated_roster.json";
import styled from 'styled-components';
import {request} from '../components/request'

function Login(props) {
  const [ showNullMessage, setShowNullMessage ] = useState(false);
  const [ failedCount, setFailedCount ] = useState(0);


  const handleLogin = async (email) => {
    console.log("Data returned from the Rails server to parse: ", email);
    console.log(props);

    const user = await request(email)
    console.log(user)

    // INTERIM JUST FIND USER IN HER
    // const loggedInUser = authorizedData.find((user) => {
    //   return email.toLowerCase() === user.email.toLowerCase();
    // });

    if (user.email) {
      console.log("we got a match IN LOGIN");
      let userInfo = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        company: user.company
      }

      props.handleLogin(userInfo);
      props.history.push({
        pathname: "/confirmation",
        state: { loggedIn: true },
      });
    } else {
      setFailedCount(failedCount + 1);
      setShowNullMessage(true);
    }

    // console.log(topLevelLogin)

    // if (e.data.logged_in){
    //   localStorage.setItem("loggedIn", "true")
    // }

    // if (e.data.user.confirm_token){
    //   localStorage.setItem("confirm_token", `${e.data.user.confirm_token}`)
    // }

    // topLevelLogin()
    // return props.history.push({pathname:"/confirmation", state: {loggedIn: true}})

    // Use this history
    // props.history.push("/confirmation");
  };

  const focusHandler = () => setShowNullMessage(false);

  return (
    <Fragment>
      <Container>
        <img className="img-fresh-logo" src={freshLogo} />

        <h2 className="registration-heading-1">under one sky</h2>

        <p className="para1">November 17, 2020</p>

        <div className="login-grid-row">
          <LoginInputBox 
            handleLogin={handleLogin} 
            focusHandler={focusHandler}
          />
        </div>
        { showNullMessage && <NullUserMessage> We could not find that email please try again </NullUserMessage> }
      </Container>

      {/* <Logout /> */}
      <ClientPendingBanner subject="login"/>
    </Fragment>
  );
}

export default withRouter(Login);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 0%; 
  min-height: 100vh;
  position: relative; 
`

const NullUserMessage = styled.div`
  margin: 20px; 
  text-align: center;
  color: white; 
  font-size: 20px;
  position: absolute;
  bottom: 10%;
`
