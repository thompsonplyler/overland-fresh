// import '../App.css';
// // import {CometChat} from '@cometchat-pro/chat'

// var appID = "249870f75ebe805";
// var region = "us";
// var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();

// CometChat.init(appID, appSetting).then(
//   () => {
//     console.log("Initialization completed successfully");
//     // You can now call login function.
//   },
//   error => {
//     console.log("Initialization failed with error:", error);
//     // Check the reason for error and take appropriate action.
//   }
// );

// let apiKey = "579995b5896983be6e05f7785085358fe109d78c"
// let name = "Kevin";
// let uid = "user1";
// let user = new CometChat.User(uid);

// user.setName(name)

// CometChat.createUser(user,apiKey).then(
//     user=> {console.log("user created", user)},
//     error=> {
//         console.log("error", error)
//     }
// )

// function RealChat() {
//     console.log(CometChat)
    
//     return(
//         <div className="chat-area">
//             {/* {randomphrases[random]} */}
//             <p>[chat box location]</p>
//         </div>
//     )
// }

// export default RealChat;