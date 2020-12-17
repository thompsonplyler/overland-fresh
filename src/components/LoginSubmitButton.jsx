import React, { Component } from 'react';
import { Button } from 'react-desktop/macOs';



export default class extends Component {
  render() {
    return (
      <Button color="blue" style={{width:"91%", justifySelf:"center"}}  onClick={this.props.handleSubmit}>
        Submit
      </Button>
    );
  }
}
