export const listItem = (props) => {

    const selectedState = (props.selectedConversation && props.selectedConversation.conversationId === props.conversation.conversationId) ? {
        backgroundColor: `${props.theme.backgroundColor.primary}`
    } : {};

    return {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
        cursor: "pointer",
        width: "100%",
        padding: "8px 16px",
        ...selectedState,
        '&:hover': {
            backgroundColor: `${props.theme.backgroundColor.primary}`
        },
    }
}

export const itemThumbnailStyle = () => {

    return {
        display: "inline-block",
        width: "36px",
        height: "36px",
        flexShrink: "0",
    }
}

export const itemDetailStyle = () => {

    return {
        width: "calc(100% - 45px)",
        flexGrow: "1",
        paddingLeft: "16px",
        "&[dir=rtl]": {
            paddingRight: "16px",
            paddingLeft: "0",
        }
    }
}

export const itemRowStyle = () => {

    return {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
    }
}

export const itemNameStyle = () => {

    return {
        fontSize: "15px",
        fontWeight: "600",
        display: "block",
        width: "calc(100% - 60px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }
}

export const itemLastMsgStyle = (props) => {

    return {
        margin: "0",
        fontSize: "13px",
        width: "calc(100% - 50px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: "20px",
        color: `${props.theme.color.helpText}`,
    }
}

export const itemLastMsgTimeStyle = (props) => {

    return {
        fontSize: "11px",
        textTransform: "uppercase",
        color: `${props.theme.color.helpText}`,
    }
}