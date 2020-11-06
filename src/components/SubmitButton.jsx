import React, { Component } from 'react';
import { Button } from 'react-desktop/macOs';

export default class extends Component {
  render() {
    return (
      <Button className="register-submit-button" color="blue" onClick={this.props.submitHandler}>
        Submit
      </Button>
    );
  }
}

