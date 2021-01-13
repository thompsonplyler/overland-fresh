import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import { checkMessageForExtensionsData } from "../../util/common";
import { SvgAvatar } from '../../util/svgavatar';

import Avatar from "../Avatar";
import ToolTip from "../ToolTip";
import ReplyCount from "../ReplyCount";
import ReadReciept from "../ReadReciept";
import RegularReactionView from "../RegularReactionView";

import { theme } from "../../resources/theme";

import {
  messageContainerStyle,
  messageWrapperStyle,
  messageThumbnailStyle,
  messageDetailStyle,
  nameWrapperStyle,
  nameStyle,
  messageAudioContainerStyle,
  messageAudioWrapperStyle,
  messageInfoWrapperStyle,
  messageReactionsWrapperStyle
} from "./style";


class ReceiverAudioBubble extends React.Component {

  messageFrom = "receiver";

  constructor(props) {

    super(props);

    const message = Object.assign({}, props.message, { messageFrom: this.messageFrom });
    if (message.receiverType === 'group') {

      if (!message.sender.avatar) {

        const uid = message.sender.getUid();
        const char = message.sender.getName().charAt(0).toUpperCase();

        message.sender.setAvatar(SvgAvatar.getAvatar(uid, char));
      }
    }

    this.state = {
      message: message
    }
  }

  componentDidUpdate(prevProps) {

    const previousMessageStr = JSON.stringify(prevProps.message);
    const currentMessageStr = JSON.stringify(this.props.message);

    if (previousMessageStr !== currentMessageStr) {

      const message = Object.assign({}, this.props.message, { messageFrom: this.messageFrom });
      this.setState({ message: message })
    }
  }

  render() {

    let avatar = null, name = null;
    if (this.state.message.receiverType === 'group') {

      avatar = (
        <div css={messageThumbnailStyle()} className="message__thumbnail">
          <Avatar borderColor={this.props.theme.borderColor.primary} image={this.state.message.sender.avatar} />
        </div>
      );

      name = (<div css={nameWrapperStyle(avatar)} className="message__name__wrapper">
        <span css={nameStyle(this.props)} className="message__name">{this.state.message.sender.name}</span>
        </div>);
    }

    let messageReactions = null;
    const reactionsData = checkMessageForExtensionsData(this.state.message, "reactions");
    if (reactionsData) {

      if (Object.keys(reactionsData).length) {
        messageReactions = (
          <div css={messageReactionsWrapperStyle()} className="message__reaction__wrapper">
            <RegularReactionView {...this.props} message={this.state.message} reaction={reactionsData} />
          </div>
        );
      }
    }

    return (
      <div css={messageContainerStyle()} className="receiver__message__container message__audio">
        
        <div css={messageWrapperStyle()} className="message__wrapper">
          {avatar}
          <div css={messageDetailStyle()} className="message__details">
            {name}
            <ToolTip {...this.props} message={this.state.message} name={name} />
            <div css={messageAudioContainerStyle(this.props)} className="message__audio__container">
              <div css={messageAudioWrapperStyle(this.props)} className="message__audio__wrapper">
                <audio controls>
                  <source src={this.props.message.data.url} />
                </audio>
              </div>
            </div>

            {messageReactions}

            <div css={messageInfoWrapperStyle()} className="message__info__wrapper">
              <ReadReciept {...this.props} message={this.state.message} />
              <ReplyCount {...this.props} message={this.state.message} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Specifies the default values for props:
ReceiverAudioBubble.defaultProps = {
  theme: theme
};

ReceiverAudioBubble.propTypes = {
  theme: PropTypes.object
}

export default ReceiverAudioBubble;