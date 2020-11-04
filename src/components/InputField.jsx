import React, { Component } from 'react';
import { TextInput } from 'react-desktop/macOs';


export default class extends Component {
  handleChange = e => console.log(e.target.value);

  render() {
    return (
      <TextInput
        label=""
        placeholder="Enter E-mail Address"
        defaultValue=""
        onChange={this.handleChange}
      />
      
    );
  }
}