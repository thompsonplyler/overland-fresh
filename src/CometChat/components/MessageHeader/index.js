import React from "react";
import dateFormat from "dateformat";
/** @jsxRuntime classic */
/** @jsx jsx */import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import { MessageHeaderManager } from "./controller";

import StatusIndicator from "../StatusIndicator";
import Avatar from "../Avatar";
import { SvgAvatar } from '../../util/svgavatar';
import * as enums from '../../util/enums.js';
import { validateWidgetSettings } from "../../util/common";

import { 
  chatHeaderStyle, 
  chatDetailStyle, 
  chatSideBarBtnStyle, 
  chatThumbnailStyle,
  chatUserStyle,
  chatNameStyle,
  chatStatusStyle,
  chatOptionWrapStyle,
  chatOptionStyle
} from "./style";

import { theme } from "../../resources/theme";
import Translator from "../../resources/localization/translator";

import menuIcon from './resources/menuicon.png';
import audioCallIcon from './resources/audiocall.png';
import videoCallIcon from './resources/videocall.png';
import detailPaneIcon from './resources/detailpane.png';

class MessageHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      status: "",
      presence: "offline",
    }
  }

  componentDidMount() {

    this.MessageHeaderManager = new MessageHeaderManager();
    this.MessageHeaderManager.attachListeners(this.updateHeader);

    if(this.props.type === "user") {
      this.setStatusForUser();
    } else {
      this.setStatusForGroup();
    }
  }

  componentDidUpdate(prevProps, prevState) {

    this.MessageHeaderManager.removeListeners();
    this.MessageHeaderManager = new MessageHeaderManager();
    this.MessageHeaderManager.attachListeners(this.updateHeader);

    if (this.props.type === 'user' 
    && (prevProps.item.uid !== this.props.item.uid
    || (prevProps.item.uid === this.props.item.uid && prevProps.lang !== this.props.lang))) {

      this.setStatusForUser();

    } else if (this.props.type === 'group' 
    && (prevProps.item.guid !== this.props.item.guid 
    || (prevProps.item.guid === this.props.item.guid && prevProps.item.membersCount !== this.props.item.membersCount)
    || (prevProps.item.guid === this.props.item.guid && prevProps.lang !== this.props.lang)) ) {

      this.setStatusForGroup();
    }
  }

  setStatusForUser = () => {

    let status = "";
    const presence = (this.props.item.status === "online") ? "online" : "offline";

    if(this.props.item.status === "offline" && this.props.item.lastActiveAt) {

      const lastActive = (this.props.item.lastActiveAt * 1000);
      const messageDate = dateFormat(lastActive, "d mmmm yyyy, h:MM TT");

      status = `${Translator.translate("LAST_ACTIVE_AT", this.props.lang)} : ${messageDate}`;

    } else if(this.props.item.status === "offline") {
      
      status = (Translator.translate("OFFLINE", this.props.lang));

    } else if (this.props.item.status === "online") {

      status = (Translator.translate("ONLINE", this.props.lang));
    }

    this.setState({status: status, presence: presence});
  }

  setStatusForGroup = () => {

    let membersText = (Translator.translate("MEMBERS", this.props.lang)).toLowerCase();
    const status = `${this.props.item.membersCount} ${membersText}`;
    this.setState({status: status});
  }

  componentWillUnmount() {

    this.MessageHeaderManager.removeListeners();
    this.MessageHeaderManager = null;
  }

  updateHeader = (key, item, groupUser) => {
    
    switch(key) {

      case enums.USER_ONLINE:
      case enums.USER_OFFLINE: {
        if(this.props.type === "user" && this.props.item.uid === item.uid) {

          //if user presence is disabled in chat widget
          if (validateWidgetSettings(this.props.widgetsettings, "show_user_presence") === false) {
            return false;
          }
          let status = "";
          
          if (item.status === "offline") {

            status = Translator.translate("OFFLINE", this.props.lang);

          } else if (item.status === "online") {

            status = Translator.translate("ONLINE", this.props.lang);
          }

          this.setState({ status: status, presence: item.status });
        }
        break;
      }
      case enums.GROUP_MEMBER_KICKED:
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_LEFT:
        if(this.props.type === "group" 
        && this.props.item.guid === item.guid
        && this.props.loggedInUser.uid !== groupUser.uid) {

          let membersCount = parseInt(item.membersCount);
          const status = `${membersCount} ${Translator.translate("MEMBERS", this.props.lang).toLowerCase()}`;
          this.setState({status: status});
        }
      break;
      case enums.GROUP_MEMBER_JOINED:
        if(this.props.type === "group" && this.props.item.guid === item.guid) {

          let membersCount = parseInt(item.membersCount);
          const status = `${membersCount} ${(Translator.translate("MEMBERS", this.props.lang)).toLowerCase()}`;
          this.setState({status: status});
        }
      break;
      case enums.GROUP_MEMBER_ADDED:
        if(this.props.type === "group" && this.props.item.guid === item.guid) {

          let membersCount = parseInt(item.membersCount);
          const status = `${membersCount} ${(Translator.translate("MEMBERS", this.props.lang)).toLowerCase()}`;
          this.setState({status: status});
        }
      break;
      case enums.TYPING_STARTED: {
        
        if (this.props.type === "group" && this.props.type === item.receiverType && this.props.item.guid === item.receiverId) {

          const typingText = `${item.sender.name} ${Translator.translate("IS_TYPING", this.props.lang)}`;
          this.setState({ status: typingText });
          this.props.actionGenerated("showReaction", item);

        } else if (this.props.type === "user" && this.props.type === item.receiverType && this.props.item.uid === item.sender.uid) {

          const typingText = `${Translator.translate("TYPING", this.props.lang)}`;
          this.setState({ status: typingText });
          this.props.actionGenerated("showReaction", item);
        }
        
        break;
      }
      case enums.TYPING_ENDED: {

        if (this.props.type === "group" && this.props.type === item.receiverType && this.props.item.guid === item.receiverId) {

          this.setStatusForGroup();
          this.props.actionGenerated("stopReaction", item);

        } else if (this.props.type === "user" && this.props.type === item.receiverType && this.props.item.uid === item.sender.uid) {
          
          this.props.actionGenerated("stopReaction", item);

          if(this.state.presence === "online") {
            this.setState({ status: Translator.translate("ONLINE", this.props.lang), presence: "online" });
          } else {
            this.setStatusForUser();
          }
        }
        break;
      }
      default:
      break;
    }
  }
    
  toggleTooltip = (event, flag) => {

    const elem = event.target;
    const scrollWidth = elem.scrollWidth;
    const clientWidth = elem.clientWidth;

    if(scrollWidth <= clientWidth) {
      return false;
    }

    if(flag) {
      elem.setAttribute("title", elem.textContent);
    } else {
      elem.removeAttribute("title");
    }
    
  }

  render() {

    let image, presence;
    if(this.props.type === "user") {

      if(!this.props.item.avatar) {

        const uid = this.props.item.uid;
        const char = this.props.item.name.charAt(0).toUpperCase();

        this.props.item.avatar = SvgAvatar.getAvatar(uid, char);
      }

      image = this.props.item.avatar;
      presence = (
        <StatusIndicator
        widgetsettings={this.props.widgetsettings}
        status={this.state.presence}
        borderColor={this.props.theme.borderColor.primary} />
      );

    } else {

      if(!this.props.item.icon) {
        const guid = this.props.item.guid;
        const char = this.props.item.name.charAt(0).toUpperCase();

        this.props.item.icon = SvgAvatar.getAvatar(guid, char);
      }
      image = this.props.item.icon;
    }

    let status = (
      <span css={chatStatusStyle(this.props, this.state)} className="user__status">{this.state.status}</span>
    );

    const audioCallText = Translator.translate("AUDIO_CALL", this.props.lang);
    let audioCallBtn = ( 
      <div title={audioCallText} onClick={() => this.props.actionGenerated("audioCall")} css={chatOptionStyle(audioCallIcon)}>
        <img src={audioCallIcon} alt={audioCallText} />
      </div>);
    
    const videoCallText = Translator.translate("VIDEO_CALL", this.props.lang);
    let videoCallBtn = (
      <div title={videoCallText} onClick={() => this.props.actionGenerated("videoCall")} css={chatOptionStyle(videoCallIcon)}>
        <img src={videoCallIcon} alt={videoCallText} />
      </div>);

    const viewDetailText = Translator.translate("VIEW_DETAIL", this.props.lang);
    let viewDetailBtn = (<div title={viewDetailText}  onClick={() => this.props.actionGenerated("viewDetail")} css={chatOptionStyle(detailPaneIcon)}>
      <img src={detailPaneIcon} alt={viewDetailText} />
    </div>);
    
    if(this.props.viewdetail === false) {
      viewDetailBtn = null;
    }

    if(this.props.item.blockedByMe === true || this.props.audiocall === false) {
      audioCallBtn = null;
    }

    if(this.props.item.blockedByMe === true || this.props.videocall === false) {
      videoCallBtn = null;
    }

    //if audiocall is disabled in chat widget
    if (validateWidgetSettings(this.props.widgetsettings, "enable_voice_calling") === false) {
      audioCallBtn = null;
    }

    //if videocall is disabled in chat widget
    if (validateWidgetSettings(this.props.widgetsettings, "enable_video_calling") === false) {
      videoCallBtn = null;
    }

    //if user presence is disabled in chat widget
    if (validateWidgetSettings(this.props.widgetsettings, "show_user_presence") === false && this.props.type === "user") {
      status = null;
    }

    return (
      <div css={chatHeaderStyle(this.props)} className="chat__header">
        <div css={chatDetailStyle()} className="chat__details">
          <div css={chatSideBarBtnStyle(menuIcon, this.props)} className="chat__sidebar-menu" onClick={() => this.props.actionGenerated("menuClicked")}></div>
          <div css={chatThumbnailStyle()} className="chat__thumbnail">
            <Avatar image={image} borderColor={this.props.theme.borderColor.primary} />
            {presence}
          </div>
          <div css={chatUserStyle()} className="chat__user">
            <h6 css={chatNameStyle()} className="user__name"
            onMouseEnter={event => this.toggleTooltip(event, true)} 
            onMouseLeave={event => this.toggleTooltip(event, false)}>{this.props.item.name}</h6>
            {status}
          </div>
        </div>
        <div css={chatOptionWrapStyle()} className="chat__options">
          {audioCallBtn}
          {videoCallBtn}
          {viewDetailBtn}
        </div>
      </div>
    );
  }
}

// Specifies the default values for props:
MessageHeader.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme
};

MessageHeader.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object
}

export default MessageHeader;