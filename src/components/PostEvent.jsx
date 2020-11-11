import {React, useEffect} from 'react'
import 'video.js/dist/video-js.css'
import '../App.css';
import freshLogo from '../assets/images/frshlogo.svg'
import ClientPendingBanner from '../components/ClientPendingBanner'
import {checkUserCreds} from '../components/checkUserCreds'



function PostEvent(props) {
	useEffect(() => {
		const user = checkUserCreds(props.user);
		if (!user) {
		  props.history.push('/login');
		}
	  }, [])

    return(
    <div className="container">
			<img className="img-fresh-logo" src={freshLogo}/>
			<h2 className="registration-heading-1">under one sky</h2>
			<p className="para1">Thank you for coming!</p>
			<p className="para1">Today's meeting has concluded.</p>

			<ClientPendingBanner subject="post-event"/>

    </div>
    )
}

export default PostEvent;