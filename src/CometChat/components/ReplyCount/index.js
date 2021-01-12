/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import { validateWidgetSettings } from "../../util/common";

import { replyCountStyle } from "./style";

import { theme } from "../../resources/theme";
import Translator from "../../resources/localization/translator";

const replycount = (props) => {

    const replyCount = props.message.replyCount;
    const replyText = (replyCount === 1) ? (`${replyCount} ${Translator.translate("REPLY", props.lang)}`) : (`${replyCount} ${Translator.translate("REPLIES", props.lang)}`);

    let replies = (
    <span 
    css={replyCountStyle(props)} 
    className="replycount" 
    onClick={() => props.actionGenerated("viewMessageThread", props.message)}>{replyText}</span>);

    if(props.message.hasOwnProperty("replyCount") === false) {
        replies = null;
    }


    //if threadedchats are disabled in chat widget
    if (validateWidgetSettings(props.widgetconfig, "threaded-chats") === false) {
        replies = null;
    }

    //if threadedchats are disabled in chat widget
    if (validateWidgetSettings(props.widgetsettings, "enable_threaded_replies") === false) {
        replies = null;
    }

    return replies;
}

// Specifies the default values for props:
replycount.defaultProps = {
    lang: Translator.getDefaultLanguage(),
    theme: theme
};

replycount.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.object
}

export default replycount;