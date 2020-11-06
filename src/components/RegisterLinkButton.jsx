import React, { Component } from 'react';
import { Button } from 'react-desktop/macOs';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

export default class extends Component {
  render() {
    return (
      <Link to="/register"><Button color="blue" onClick={this.props.registerHandler}>
        Register
      </Button></Link>
    );
  }
}
