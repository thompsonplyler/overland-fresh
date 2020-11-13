import React, { Component } from 'react';
import { Button } from 'react-desktop/macOs';



export default class extends Component {
  render() {
    return (
      <button onClick={this.props.handleSubmit}>
        Submit
      </button>
    );
  }
}
