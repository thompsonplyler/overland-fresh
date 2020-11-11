import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ForceRedirect extends Component {
  redirect = () => this.props.history.push('/confirmation');
  componentDidMount(){
    console.log('PROPS INSIDE REDIRECT: ', this.props);
    this.redirect();
  }

  render() {
    return (
      <></>
    )
  }
}

export default withRouter(ForceRedirect);
