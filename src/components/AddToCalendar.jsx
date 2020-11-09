import React, { Component } from 'react';
import { Button } from 'react-desktop/macOs';


export default class extends Component {
  render() {
    return (
<div title="Add to Calendar" className="addeventatc">
    Add to Calendar
    <span className="start">11/17/2020 07:30 AM</span>
    <span className="end">11/17/2020 10:00 AM</span>
    <span className="timezone">America/New_York
</span>
    <span className="title">Under One Sky</span>
    <span className="description">Fresh Under One Sky</span>
    <span className="location">https://freshunderonesky.com</span>
</div>
    );
  }
}
