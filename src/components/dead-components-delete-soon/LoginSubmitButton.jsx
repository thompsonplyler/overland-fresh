import React, { Component } from 'react';
import { Button } from 'react-desktop/macOs';



export default class extends Component {
  render() {
    return (
      <Button color="blue" style={{width:"100%", height:"3vh", justifySelf:"center"}}>
        Submit
      </Button>
    );
  }
}
