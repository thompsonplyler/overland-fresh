import React, { Component, Fragment } from 'react';

import '../App.css';
import '../chat.css'


// const rumbleChatScript = `<div style="height: 500px;"><div id="rt-5b6961d2f1da63d021ee524f74fa38a4"></div> <script src="https://rumbletalk.com/client/?k7oEx~5-"></script></div>`
// const amplifyChatScript = `<div class="arena-liveblog" data-publisher="fresh-underonesky" data-event="3f62" data-version="2"></div><script async src="https://go.arena.im/public/js/arenalib.js?p=fresh-underonesky&e=3f62"></script>`
export default class extends Component {
    state = {
      loaded: true
    }

    componentDidMount() {
        var loadScript = function (src) {
          var tag = document.createElement('script');
          tag.async = true;
          tag.src = src;
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(tag);
        }
      
        loadScript('https://go.arena.im/public/js/arenachatlib.js?p=fresh-underonesky&e=fresh-underonesky-global');
      }




render(){
    const pagePos = {
        overlay: "overlay",
        inPage: "in-page",
        bottom: "bottom",
        side: "side"
    }

    return(
        
        <div className="arena-chat chat-area" data-publisher="fresh-underonesky" data-chatroom="fresh-underonesky-global" data-position={`${pagePos.overlay}`} ></div>
    )
}
}