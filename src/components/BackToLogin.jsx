import React, { Component } from 'react';
import { Button } from 'react-desktop/macOs';
import freshLogo from '../assets/images/frshlogo.svg'
import {
    withRouter,
    Link
  } from "react-router-dom";

export default class extends Component {
  render() {
    return (
      <Link to="/">
          <button onClick={this.props.handleSubmit}>
        Return
      </button>
      </Link>
    );
  }
}
