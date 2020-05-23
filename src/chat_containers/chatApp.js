import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BaseRouter from "../routes";
import Sidepanel from "./Sidepanel";
import Profile from "./Profile";
import Chat from "./Chat";
import Video from "./Video7"
import AddChatModal from "./Popup";
import * as actions from "../store/actions/auth";
import * as navActions from "../store/actions/nav";
import * as messageActions from "../store/actions/message";
import WebSocketInstance from "../websocket";
import "../assets/style.css";

class ChatApp extends React.Component {
  componentWillMount() {
    // this.props.onTryAutoSignup();
  }

  constructor(props) {
    super(props);
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this),
      this.props.setRoomStatus.bind(this),
    );
  }

  render() {
    console.log("0: ", this.props)
    return (
      // <Router>
        <div id="frame">
          <Sidepanel/>
            {Object.keys(this.props.match.params).length > 0 ? (
              <div className="content">
                <AddChatModal
                  isVisible={this.props.showAddChatPopup}
                  close={() => this.props.closeAddChatPopup()}
                />
                <Profile params={this.props.match.params.chatID}/>
                <Chat params={this.props.match.params.chatID}/>
                {/* <BaseRouter/> */}
              </div>
            ):(
              <div className="content">
                 <AddChatModal
                  isVisible={this.props.showAddChatPopup}
                  close={() => this.props.closeAddChatPopup()}
                />
                <div className="container">
                  <div className="no-chats">
                    <h2>Please select a Chat</h2>
                  </div>
                </div>
              </div>
            )}
        </div>
        // </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    showAddChatPopup: state.nav.showAddChatPopup,
    authenticated: state.auth.token,
    roomStatus: state.message.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onTryAutoSignup: () => dispatch(actions.authCheckState()),
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    addMessage: message => dispatch(messageActions.addMessage(message)),
    setMessages: messages => dispatch(messageActions.setMessages(messages)),
    setRoomStatus: status => dispatch(messageActions.setStatus(status)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatApp)
);
