import { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import Avatar from "../Avatar";
import StatusIndicator from "../StatusIndicator";

import {
  tableRowStyle,
  tableColumnStyle,
  avatarStyle,
  nameStyle,
  selectionColumnStyle,
  selectionBoxStyle
} from "./style";

import { theme } from "../../resources/theme";
import inactiveIcon from "./resources/checkbox-inactive.svg";
import activeIcon from "./resources/checkbox-blue-active.svg";

const AddMemberView = (props) => {

  const [checked, setChecked] = useState(() => {
    const found = props.members.find(member => member.uid === props.user.uid);
    const value = (found) ? true : false;

    return value;
  });

  const handleCheck = (event) => {

    const value = (checked === true) ? false : true;
    setChecked(value);
    props.changed(props.user, value);
  }

  const toggleTooltip = (event, flag) => {

    const elem = event.currentTarget;
    const nameContainer = elem.lastChild;

    const scrollWidth = nameContainer.scrollWidth;
    const clientWidth = nameContainer.clientWidth;
    
    if(scrollWidth <= clientWidth) {
      return false;
    }

    if(flag) {
      nameContainer.setAttribute("title", nameContainer.textContent);
    } else {
      nameContainer.removeAttribute("title");
    }
  }
  
  return (
    <tr css={tableRowStyle(props)}>
      <td css={tableColumnStyle()} className="userinfo"
      onMouseEnter={event => toggleTooltip(event, true)}
      onMouseLeave={event => toggleTooltip(event, false)}>
        <div css={avatarStyle()} className="avatar">
          <Avatar image={props.user.avatar} borderColor={props.theme.borderColor.primary} />
          <StatusIndicator
          widgetsettings={props.widgetsettings}
          status={props.user.status}
          borderColor={props.theme.borderColor.primary} />
        </div>
        <div css={nameStyle()} className="name">{props.user.name}</div>
      </td>
      <td css={selectionColumnStyle()} className="selection">
          <input 
          css={selectionBoxStyle(inactiveIcon, activeIcon)}
          type="checkbox" 
          checked={checked}
          id={props.user.uid+"sel"} 
          onChange={handleCheck}  />
          <label htmlFor={props.user.uid+"sel"}>&nbsp;</label>
      </td>
    </tr>
  )
}

// Specifies the default values for props:
AddMemberView.defaultProps = {
  theme: theme
};

AddMemberView.propTypes = {
  theme: PropTypes.object
}

export default AddMemberView;