export const groupScreenStyle = (theme) => {

    return {
        display: "flex",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: `${theme.fontFamily}`,
        "*": {
            boxSizing: "border-box",
            fontFamily: `${theme.fontFamily}`,
            "::-webkit-scrollbar": {
                width: "8px",
                height: "4px",
            },
            "::-webkit-scrollbar-track": {
                background: "#ffffff00"
            },
            "::-webkit-scrollbar-thumb": {
                background: "#ccc",
                "&:hover": {
                    background: "#aaa"
                }
            }
        }
    }
}

export const groupScreenSidebarStyle = (state, theme) => {

    const sidebarView = (state.sidebarview) ? {
        left: "0",
        boxShadow: "rgba(0, 0, 0, .4) -30px 0 30px 30px"
    } : {};

    const mq = [`@media (min-width : 320px) and (max-width: 767px)`];

    return {

        width: "280px",
        borderRight: `1px solid ${theme.borderColor.primary}`,
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        ".css-15jyeqi": {
            height: "calc(100% - 130px)",
        },
        [mq[0]]: {
            position: "absolute!important",
            left: "-100%",
            top: "0",
            bottom: "0",
            width: "100%!important",
            zIndex: "2",
            backgroundColor: `${theme.backgroundColor.white}`,
            transition: "all .3s ease-out",
            ...sidebarView
        }
    }
}

export const groupScreenMainStyle = (state) => {

    const secondaryView = (state.threadmessageview || state.detailview) ? {
        width: "calc(100% - 680px)"
    } : {};

    const mq = [`@media (min-width : 320px) and (max-width: 767px)`];

    return {
        width: "calc(100% - 280px)",
        height: "100%",
        order: "2",
        ...secondaryView,
        [mq[0]]: {
            width: "100%!important",
        }
    }
}

export const groupScreenSecondaryStyle = (theme) => {

    const mq = [`@media (min-width : 320px) and (max-width: 767px)`];

    return {
        float: "right",
        borderLeft: `1px solid ${theme.borderColor.primary}`,
        height: "100%",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        order: "3",
        [mq[0]]: {
            position: "absolute!important",
            right: "0!important",
            top: "0",
            bottom: "0",
            width: "100%!important",
            zIndex: "2",
            backgroundColor: `${theme.backgroundColor.white}`,
        }
    }
}