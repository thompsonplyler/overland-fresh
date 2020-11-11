import React, { Component, Fragment } from 'react';
import { Button } from 'react-desktop/macOs';


export default class extends Component {
state = {
  loaded: true
}

componentDidMount() {
  var loadScript = function (src) {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);
  }

  loadScript('https://addevent.com/libs/atc/1.6.1/atc.min.js');
}

// componentDidMount(){
// this.setState({loaded: true})
// }
  render() {
    return (
this.state.loaded?<div title="Add to Calendar" className="addeventatc">
  
    Add to Calendar
    <span className="start">11/17/2020 07:30 AM</span>
    <span className="end">11/17/2020 10:00 AM</span>
    <span className="timezone">America/New_York
</span>
    <span className="title">Under One Sky</span>
    <span className="description">Fresh Under One Sky</span>
    <span className="location">https://freshunderonesky.com</span>
</div>:<Fragment></Fragment>
    );
  }
}
