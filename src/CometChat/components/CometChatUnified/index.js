import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import { CometChat } from "@cometchat-pro/chat";

import { CometChatManager } from "../../util/controller";
import * as enums from '../../util/enums.js';
import Translator from "../../resources/localization/translator";

import NavBar from "./NavBar";
import CometChatMessageListScreen from "../CometChatMessageListScreen";
import CometChatUserDetail from "../CometChatUserDetail";
import CometChatGroupDetail from "../CometChatGroupDetail";
import MessageThread from "../MessageThread";
import CallAlert from "../CallAlert";
import CallScreen from "../CallScreen";
import ImageView from "../ImageView";

import { theme } from "../../resources/theme";

import {
  unifiedStyle,
  unifiedSidebarStyle,
  unifiedMainStyle,
  unifiedSecondaryStyle
} from "./style";

class CometChatUnified extends React.Component {

  loggedInUser = null;

  constructor(props) {
    
    super(props);

    this.state = {
      darktheme: false,
      viewdetailscreen: false,
      item: {},
      type: "user",
      tab: "conversations",
      groupToDelete: {},
      groupToLeave: {},
      groupToUpdate: {},
      threadmessageview: false,
      threadmessagetype: null,
      threadmessageitem: {},
      threadmessageparent: {},
      composedthreadmessage: {},
      incomingCall: null,
      outgoingCall: null,
      messageToMarkRead: {},
      callmessage: {},
      sidebarview: false,
      imageView: null,
      groupmessage: {},
      lastmessage: {},
      lang: props.lang,
      unreadMessages: []
    }

    this.messageScreenRef = React.createRef();

    CometChat.getLoggedInUser().then((user) => {
      this.loggedInUser = user;

    }).catch((error) => {
      console.log("[CometChatUnified] getLoggedInUser error", error);
    });
  }
  
  componentDidMount() {

    if(!Object.keys(this.state.item).length) {
      this.toggleSideBar();
    }

    window.addEventListener('languagechange', this.setState({ lang: Translator.getLanguage() }));
  }

  componentDidUpdate(prevProps) {

    if (prevProps.lang !== this.props.lang) {
      this.setState({ lang: this.props.lang });
    }
  }

  changeTheme = (e) => {
    this.setState({
      darktheme: !this.state.darktheme
    })
  }

  navBarAction = (action, type, item) => {
    
    switch(action) {
      case "itemClicked":
        this.itemClicked(item, type);
      break;
      case "tabChanged":
        this.tabChanged(type);
      break;
      case "closeMenuClicked":
        this.toggleSideBar();
      break;
      default:
      break;
    }
  }
  
  itemClicked = (item, type) => {

    this.toggleSideBar();
    this.setState({ item: {...item}, type, viewdetailscreen: false });
  }

  tabChanged = (tab) => {

    this.setState({tab});
    this.setState({viewdetailscreen: false});
  }

  actionHandler = (action, item, count, ...otherProps) => {
    
    switch(action) {
      case "blockUser":
        this.blockUser();
      break;
      case "unblockUser":
        this.unblockUser();
      break;
      case "audioCall":
        this.audioCall();
      break;
      case "videoCall":
        this.videoCall();
      break;
      case "viewDetail":
      case "closeDetailClicked":
        this.toggleDetailView();
      break;
      // eslint-disable-next-line no-lone-blocks
      case "menuClicked": {
        
        this.toggleSideBar();
        this.setState({ item: {} });
      }
      break;
      case "groupUpdated":
        this.groupUpdated(item, count, ...otherProps);
      break;
      case "groupDeleted": 
        this.deleteGroup(item);
      break;
      case "leftGroup":
        this.leaveGroup(item);
      break;
      case "membersUpdated":
        this.updateMembersCount(item, count);
      break;
      case "viewMessageThread":
        this.viewMessageThread(item);
      break;
      case "closeThreadClicked":
        this.closeThreadMessages();
      break;
      case "threadMessageComposed":
        this.onThreadMessageComposed(item);
        this.updateLastMessage(item[0]);
        break;
      case "acceptIncomingCall":
        this.acceptIncomingCall(item);
        break;
      case "acceptedIncomingCall":
        this.callInitiated(item);
        break;
      case "rejectedIncomingCall":
        this.rejectedIncomingCall(item, count);
        break;
      case "outgoingCallRejected":
        this.setState({ outgoingCall: null, incomingCall: null });
        break;
      case "outgoingCallCancelled":
      case "callEnded":
        this.outgoingCallEnded(item);
        break;
      case "userJoinedCall":
      case "userLeftCall":
        this.appendCallMessage(item);
      break; 
      case "viewActualImage":
        this.toggleImageView(item);
      break;
      case "membersAdded": 
        this.membersAdded(item);
      break;
      case "memberUnbanned":
        this.memberUnbanned(item);
      break;
      case "memberScopeChanged":
        this.memberScopeChanged(item);
      break;
      case "messageComposed": 
      case "messageEdited":
      case "messageDeleted":
        this.updateLastMessage(item[0]);
      break;
      case "updateThreadMessage":
        this.updateThreadMessage(item[0], count);
      break;
      case "unreadMessages":
        this.setState({ unreadMessages: [...item] });
      break;
      default:
      break;
    }
  }

  updateLastMessage = (message) => {
    this.setState({ lastmessage: message });
  }

  updateThreadMessage = (message, action) => {

    if (this.state.threadmessageview === false || message.id !== this.state.threadmessageparent.id) {
      return false;
    }

    if (action === "delete") {
      this.setState({ threadmessageparent: { ...message }, threadmessageview: false });
    } else {
      this.setState({ threadmessageparent: { ...message } });
    }

  }

  blockUser = () => {

    let usersList = [this.state.item.uid];
    CometChatManager.blockUsers(usersList).then(list => {

        this.setState({item: {...this.state.item, blockedByMe: true}});

    }).catch(error => {
      console.log("Blocking user fails with error", error);
    });
  }

  unblockUser = () => {
    
    let usersList = [this.state.item.uid];
    CometChatManager.unblockUsers(usersList).then(list => {

        this.setState({item: {...this.state.item, blockedByMe: false}});

      }).catch(error => {
      console.log("unblocking user fails with error", error);
    });
  }

  audioCall = () => {

    let receiverId, receiverType;
    if(this.state.type === "user") {

      receiverId = this.state.item.uid;
      receiverType = CometChat.RECEIVER_TYPE.USER;

    } else if(this.state.type === "group") {

      receiverId = this.state.item.guid;
      receiverType = CometChat.RECEIVER_TYPE.GROUP;
    }

    CometChatManager.call(receiverId, receiverType, CometChat.CALL_TYPE.AUDIO).then(outgoingCall => {

      this.appendCallMessage(outgoingCall);
      this.setState({ outgoingCall: outgoingCall });

    }).catch(error => {

      console.log("Call initialization failed with exception:", error);
    });

  }

  videoCall = () => {

    let receiverId, receiverType;
    if(this.state.type === "user") {

      receiverId = this.state.item.uid;
      receiverType = CometChat.RECEIVER_TYPE.USER;

    } else if(this.state.type === "group") {
      receiverId = this.state.item.guid;
      receiverType = CometChat.RECEIVER_TYPE.GROUP;
    }
   
    CometChatManager.call(receiverId, receiverType, CometChat.CALL_TYPE.VIDEO).then(outgoingCall => {

      this.appendCallMessage(outgoingCall);
      this.setState({ outgoingCall: outgoingCall });

    }).catch(error => {

      console.log("Call initialization failed with exception:", error);
    });

  }

  toggleDetailView = () => {

    let viewdetail = !this.state.viewdetailscreen;
    this.setState({viewdetailscreen: viewdetail,  threadmessageview: false});
  }

  toggleSideBar = () => {

    const sidebarview = this.state.sidebarview;
    this.setState({ sidebarview: !sidebarview });
  }

  closeThreadMessages = () => {
    this.setState({viewdetailscreen: false, threadmessageview: false});
  }

  viewMessageThread = (parentMessage) => {

    const message = {...parentMessage};
    const threaditem = {...this.state.item};
    this.setState({
      threadmessageview: true, 
      threadmessageparent: message, 
      threadmessageitem: threaditem,
      threadmessagetype: this.state.type, 
      viewdetailscreen: false
    });
  }

  onThreadMessageComposed = (composedMessage) => {

    if(this.state.type !== this.state.threadmessagetype) {
      return false;
    }

    if((this.state.threadmessagetype === "group" && this.state.item.guid !== this.state.threadmessageitem.guid)
    || (this.state.threadmessagetype === "user" && this.state.item.uid !== this.state.threadmessageitem.uid)) {
      return false;
    }

    const message = { ...composedMessage };
    this.setState({composedthreadmessage: message});
  }

  deleteGroup = (group) => {

    this.toggleSideBar();
    this.setState({groupToDelete: group, item: {}, type: "group", viewdetailscreen: false});
  }

  leaveGroup = (group) => {

    this.toggleSideBar();
    this.setState({groupToLeave: group, item: {}, type: "group", viewdetailscreen: false});
  }

  updateMembersCount = (item, count) => {

    //console.log("updateMembersCount item", item);
    const group = Object.assign({}, this.state.item, {membersCount: count});
    this.setState({item: group, groupToUpdate: group});
  }

  groupUpdated = (message, key, group, options) => {
    
    switch(key) {
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_KICKED: {
        
        if(options.user.uid === this.loggedInUser.uid) {
          this.setState({item: {}, type: "group", viewdetailscreen: false});
        }
        break;
      }
      case enums.GROUP_MEMBER_SCOPE_CHANGED: {
        
        if(options.user.uid === this.loggedInUser.uid) {

          const newObj = Object.assign({}, this.state.item, {"scope": options["scope"]})
          this.setState({item: newObj, type: "group", viewdetailscreen: false});
        }
        break;
      }
      default:
      break;
    }
  }

  acceptIncomingCall = (call) => {

    this.setState({ incomingCall: call });

    const type = call.receiverType;
    const id = (type === "user") ? call.sender.uid : call.receiverId;

    CometChat.getConversation(id, type).then(conversation => {

      this.itemClicked(conversation.conversationWith, type);

    }).catch(error => {

      console.log('error while fetching a conversation', error);
    });

  }

  callInitiated = (message) => {
    this.appendCallMessage(message);
  }

  rejectedIncomingCall = (incomingCallMessage, rejectedCallMessage) => {

    let receiverType = incomingCallMessage.receiverType;
    let receiverId = (receiverType === "user") ? incomingCallMessage.sender.uid : incomingCallMessage.receiverId;

    //marking the incoming call message as read
    if (incomingCallMessage.hasOwnProperty("readAt") === false) {
      CometChat.markAsRead(incomingCallMessage.id, receiverId, receiverType);
    }

    //updating unreadcount in chats list
    this.setState({ messageToMarkRead: incomingCallMessage });

    let item = this.state.item;
    let type = this.state.type;

    receiverType = rejectedCallMessage.receiverType; 
    receiverId = rejectedCallMessage.receiverId;

    if ((type === 'group' && receiverType === 'group' && receiverId === item.guid)
      || (type === 'user' && receiverType === 'user' && receiverId === item.uid)) {

      this.appendCallMessage(rejectedCallMessage);
    }
  }

  outgoingCallEnded = (message) => {

    this.setState({ outgoingCall: null, incomingCall: null });
    this.appendCallMessage(message);
  }

  appendCallMessage = (call) => {
    this.setState({ callmessage: call });
  }

  membersAdded = (members) => {

    const messageList = [];
    members.forEach(eachMember => {

      const message = `${this.loggedInUser.name} ${Translator.translate("ADDED", this.state.lang)} ${eachMember.name}`;
      const sentAt = new Date() / 1000 | 0;
      const messageObj = { 
        "category": "action", 
        "message": message, 
        "type": enums.ACTION_TYPE_GROUPMEMBER, 
        "sentAt": sentAt, 
        "action": "added",
        "actionBy": { ...this.loggedInUser }, 
        "actionOn": { ...eachMember } 
      };
      messageList.push(messageObj);
    });
    
    this.setState({ groupmessage: messageList });
  }

  memberUnbanned = (members) => {

    const messageList = [];
    members.forEach(eachMember => {

      const message = `${this.loggedInUser.name} ${Translator.translate("UNBANNED", this.state.lang)} ${eachMember.name}`;
      const sentAt = new Date() / 1000 | 0;
      const messageObj = { 
        "category": "action", 
        "message": message, 
        "type": enums.ACTION_TYPE_GROUPMEMBER, 
        "sentAt": sentAt,
        "action": CometChat.ACTION_TYPE.MEMBER_UNBANNED,
        "actionBy": { ...this.loggedInUser },
        "actionOn": { ...eachMember } 
      };

      messageList.push(messageObj);
    });

    this.setState({ groupmessage: messageList });
  }

  memberScopeChanged = (members) => {

    const messageList = [];

    members.forEach(eachMember => {

      const newScope = Translator.translate(eachMember.scope, this.state.lang);

      const message = `${this.loggedInUser.name} ${Translator.translate("MADE", this.state.lang)} ${eachMember.name} ${newScope}`;
      const sentAt = new Date() / 1000 | 0;
      const messageObj = { 
        "category": "action", 
        "message": message, 
        "type": enums.ACTION_TYPE_GROUPMEMBER, 
        "sentAt": sentAt,
        "action": CometChat.ACTION_TYPE.MEMBER_SCOPE_CHANGED,
        "actionBy": { ...this.loggedInUser },
        "actionOn": { ...eachMember } 
      };
      messageList.push(messageObj);
    });

    this.setState({ groupmessage: messageList });
  }

  toggleImageView = (message) => {
    this.setState({ imageView: message });
  }
  
  render() {

    let threadMessageView = null;
    if(this.state.threadmessageview) {
      threadMessageView = (
        <div css={unifiedSecondaryStyle(this.props.theme)} className="unified__secondary-view">
          <MessageThread
          theme={this.props.theme}
          tab={this.state.tab}
          item={this.state.threadmessageitem}
          type={this.state.threadmessagetype}
          parentMessage={this.state.threadmessageparent}
          loggedInUser={this.loggedInUser}
          lang={this.state.lang}
          actionGenerated={this.actionHandler} />
        </div>
      );
    }

    let detailScreen = null;
    if(this.state.viewdetailscreen) {

      if(this.state.type === "user") {

        detailScreen = (
          <div css={unifiedSecondaryStyle(this.props.theme)} className="unified__secondary-view">
            <CometChatUserDetail
              theme={this.props.theme}
              item={this.state.item} 
              type={this.state.type}
              lang={this.state.lang}
              actionGenerated={this.actionHandler} />
          </div>
          );

      } else if (this.state.type === "group") {

        detailScreen = (
          <div css={unifiedSecondaryStyle(this.props.theme)} className="unified__secondary-view">
          <CometChatGroupDetail
            theme={this.props.theme}
            item={this.state.item} 
            type={this.state.type}
            lang={this.state.lang}
            actionGenerated={this.actionHandler} />
          </div>
        );
      }
    }
    
    let messageScreen = null;
    if(Object.keys(this.state.item).length) {
      messageScreen = (
        <CometChatMessageListScreen 
        ref={(el) => { this.messageScreenRef = el; }}
        theme={this.props.theme}
        item={this.state.item} 
        tab={this.state.tab}
        type={this.state.type}
        composedthreadmessage={this.state.composedthreadmessage}
        callmessage={this.state.callmessage}
        groupmessage={this.state.groupmessage}
        loggedInUser={this.loggedInUser}
        lang={this.state.lang}
        actionGenerated={this.actionHandler} />
      );
    }

    let imageView = null;
    if (this.state.imageView) {
      imageView = (<ImageView open={true} close={() => this.toggleImageView(null)} message={this.state.imageView} lang={this.state.lang} />);
    }

    return (
      <div css={unifiedStyle(this.props.theme)} className="cometchat cometchat--unified" dir={Translator.getDirection(this.state.lang)}>
        <div css={unifiedSidebarStyle(this.state, this.props.theme)} className="unified__sidebar">
          <NavBar 
          theme={this.props.theme}
          type={this.state.type}
          item={this.state.item}
          tab={this.state.tab}
          groupToDelete={this.state.groupToDelete}
          groupToLeave={this.state.groupToLeave}
          groupToUpdate={this.state.groupToUpdate}
          messageToMarkRead={this.state.messageToMarkRead}
          lastMessage={this.state.lastmessage}
          lang={this.state.lang}
          unreadMessages={this.state.unreadMessages}
          actionGenerated={this.navBarAction}
          enableCloseMenu={Object.keys(this.state.item).length} />
        </div>
        <div css={unifiedMainStyle(this.state)} className="unified__main">{messageScreen}</div>
        {detailScreen}
        {threadMessageView}
        <CallAlert 
        theme={this.props.theme} 
        lang={this.state.lang}
        actionGenerated={this.actionHandler}  />
        <CallScreen
        theme={this.props.theme}
        item={this.state.item} 
        type={this.state.type}
        lang={this.state.lang}
        incomingCall={this.state.incomingCall}
        outgoingCall={this.state.outgoingCall}
        loggedInUser={this.loggedInUser}
        actionGenerated={this.actionHandler} />
        {imageView}
      </div>
    );
  }
}

// Specifies the default values for props:
CometChatUnified.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme
};

CometChatUnified.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object
}

export default CometChatUnified;