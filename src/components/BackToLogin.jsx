import React, { Component } from 'react';
import { Button } from 'react-desktop/macOs';
import {
    withRouter,
    Link
  } from "react-router-dom";

export default class extends Component {
  render() {
    return (
      <Link to="/">
          <button style={{width: "150px"}} placeholder="submit" type="submit">Return to Registration</button>
      </Link>
    );
  }
}
