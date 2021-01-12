/* eslint-disable no-useless-concat */
/* eslint-disable no-extend-native */
const emailPattern = new RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}", "gi");///([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
const urlPattern = new RegExp("(^|[\\s.:;?\\-\\]<\\(])"+"((https?://|www\\.|pic\\.)[-\\w;/?:@&=+$\\|\\_.!~*\\|'()\\[\\]%#,☺]+[\\w/#](\\(\\))?)"+"(?=$|[\\s',\\|\\(\\).:;?\\-\\[\\]>\\)])", "gi");
const phoneNumPattern = new RegExp("^\\s*(?:\\+?(\\d{1,3}))?([-. (]*(\\d{3})[-. )]*)?((\\d{3})[-. ]*(\\d{2,4})(?:[-.x ]*(\\d+))?)\\s*", "gi");

export const linkify = (message) => {

    let outputStr = message.replace(phoneNumPattern, "<a target='blank' rel='noopener noreferrer' href='tel:$&'>$&</a>");
    outputStr = outputStr.replace(emailPattern, "<a target='blank' rel='noopener noreferrer' href='mailto:$&'>$&</a>");
    outputStr = outputStr.replace(urlPattern, "<a target='blank' rel='noopener noreferrer' href='$&'>$&</a>");

    return outputStr;
}

export const validateWidgetSettings = (wSettings, checkAgainst) => {

    let output = null;

    if (wSettings && wSettings.hasOwnProperty("main")) {

        if (wSettings.main.hasOwnProperty(checkAgainst)) {
            output = wSettings.main[checkAgainst];
        } else {
            output = false;
        }
    } 
    
    return output;
}

export const checkMessageForExtensionsData = (message, extensionKey) => {

    let output = null;
    
    if (message.hasOwnProperty("metadata")) {

        const metadata = message.metadata;
        const injectedObject = metadata["@injected"];
        if (injectedObject && injectedObject.hasOwnProperty("extensions")) {

            const extensionsObject = injectedObject["extensions"];
            if (extensionsObject && extensionsObject.hasOwnProperty(extensionKey)) {

                output = extensionsObject[extensionKey];
            }
        }
    }

    return output;
}