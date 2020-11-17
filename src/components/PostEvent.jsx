import React from 'react'
import 'video.js/dist/video-js.css'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'
import commentBox from 'commentbox.io';
import {LOGIN_URL, EVENT_URL, CONFIRMATION_URL, POST_EVENT_URL, LOGIN_FAILED_URL} from '../urls'

class PageWithComments extends React.Component {

    componentDidMount() {

        this.removeCommentBox = commentBox('5757613853638656-proj', {
            singleSignOn: {
                onSignOn(onComplete, onError) {
        
                    fetch('/sso')
                    .then(response => {
        
                        if(response.ok) {
                            return response.text();
                        }
                        throw new Error('Could not sign in.');
                    })
                    .then(token => {
                        onComplete(token);
                    })
                    .catch(err => {
                        onError(err);
                    });
                }
            }
        });
        }
        

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div className="commentbox" />
        );
    }
}

function PostEvent() {
    return(
    <div className="container">
          <img className="img-fresh-logo" src={freshLogo}/>
          <h2 className="registration-heading-1">under one sky</h2>
          <p className="para1">Thank you for coming!</p>
          <p className="para1">Today's meeting has concluded.</p>
        {/* <PageWithComments /> */}
        {/* <ClientPendingBanner subject="post-event"/> */}

    </div>
    )
}

export default PostEvent;