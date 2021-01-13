import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import { checkMessageForExtensionsData } from "../../util/common";

import ToolTip from "../ToolTip";
import ReplyCount from "../ReplyCount";
import ReadReciept from "../ReadReciept";
import RegularReactionView from "../RegularReactionView";

import {
    messageContainerStyle,
    messageWrapperStyle,
    messageTxtWrapperStyle,
    messageTxtContainerStyle,
    messageTxtStyle,
    messageBtnStyle,
    messageInfoWrapperStyle,
    messageReactionsWrapperStyle,
} from "./style";

import { theme } from "../../resources/theme";
import Translator from "../../resources/localization/translator";

import documentIcon from "./resources/senderdocument.png";

class SenderDocumentBubble extends React.PureComponent {

    messageFrom = "sender";

    constructor(props) {

        super(props);
        const message = Object.assign({}, props.message, { messageFrom: this.messageFrom });

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

    launchCollaborativeDocument = () => {

        let documentUrl = null;
        let documentData = checkMessageForExtensionsData(this.state.message, "document");
        if (documentData
        && documentData.hasOwnProperty("document_url")
        && documentData.document_url.length) {

            documentUrl = documentData.document_url;
            window.open(documentUrl, '', 'fullscreen=yes, scrollbars=auto');
        }
    }

    render() {

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

        const documentTitle = Translator.translate("CREATED_DOCUMENT", this.props.lang); 
        return (
            <div css={messageContainerStyle()} className="sender__message__container message__document">

                <ToolTip {...this.props} message={this.state.message} />
                    
                <div css={messageWrapperStyle()} className="message__wrapper">
                    <div css={messageTxtWrapperStyle(this.props)} className="message__document__wrapper">
                        <div css={messageTxtContainerStyle()} className="message__document__container">
                            <img src={documentIcon} alt={Translator.translate("COLLABORATIVE_DOCUMENT", this.props.lang)} />
                            <p css={messageTxtStyle()} className="document__title">{documentTitle}</p>
                        </div>
                        <ul css={messageBtnStyle(this.props)} className="document__button">
                            <li onClick={this.launchCollaborativeDocument}>
                                <p>{Translator.translate("LAUNCH", this.props.lang)}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {messageReactions}

                <div css={messageInfoWrapperStyle()} className="message__info__wrapper">
                    <ReplyCount {...this.props} message={this.state.message} />
                    <ReadReciept {...this.props} message={this.state.message} />
                </div>

            </div>
        )
    }
}

// Specifies the default values for props:
SenderDocumentBubble.defaultProps = {
    lang: Translator.getDefaultLanguage(),
    theme: theme
};

SenderDocumentBubble.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.object
}

export default SenderDocumentBubble;