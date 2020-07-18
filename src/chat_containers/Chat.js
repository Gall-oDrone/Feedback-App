import React from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../websocket";
import Hoc from "../hoc/hoc";
import {Icon} from "antd"
import "../assets/style.css";

class Chat extends React.Component {
  state = { message: "" };

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.params
      );
    });
    // WebSocketInstance.connect(this.props.match.params.chatID);
    WebSocketInstance.connect(this.props.params);
  }

  constructor(props) {
    super(props);
    console.log("1: ", this.props)
    if(this.props.params !== undefined){
      this.initialiseChat();
    }
    // if(this.props.match !== undefined){
    //   this.initialiseChat();
    // }
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 10);
  }

  messageChangeHandler = event => {
    this.setState({ message: event.target.value });
  };

  sendMessageHandler = e => {
    e.preventDefault();
    const messageObject = {
      from: this.props.username,
      content: this.state.message,
      chatId: this.props.params
      //chatId: this.props.match.params.chatID
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
    this.scrollToBottom();
  };

  renderTimestamp = timestamp => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "just now...";
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  renderMessages = messages => {
    const currentUser = this.props.username;
    console.log("A: ", messages)
    return messages.map((message, i, arr) => (
      <li
        key={message.id}
        style={{ display: "block", marginBottom: arr.length - 1 === i ? "300px" : "15px" }}
        className={message.author === currentUser ? "sent" : "replies"}
      >
        <img
          src="http://emilcarlsson.se/assets/mikeross.png"
          alt="profile-pic"
        />
        <p>
          {message.content}
          <br />
          <small>{this.renderTimestamp(message.timestamp)}</small>
        </p>
      </li>
    ));
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    // this.messagesEnd.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  handleScroll = (event) => {
    return window.scrollY === 0
        // itemTranslate = Math.min(0, scrollTop/3 - 60);
}

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.scrollToBottom();
  }

  componentDidUpdate() {
    // this.scrollToBottom();
  }

  componentWillReceiveProps(newProps) {
    // if (this.props.match.params.chatID !== newProps.match.params.chatID) {
    if (this.props.params !== newProps.params) {
      console.log("ELG 2", this.props.params, newProps.params)
      WebSocketInstance.disconnect();
      this.waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(
          newProps.username,
          newProps.params
          // newProps.match.params.chatID
        );
      });
      WebSocketInstance.connect(newProps.params);
      // WebSocketInstance.connect(newProps.match.params.chatID);
    } else {
      console.log("ELG", this.props.params, newProps.params)
      WebSocketInstance.disconnect();
      WebSocketInstance.connect(this.props.params);
      // WebSocketInstance.disconnect();
      // this.waitForSocketConnection(() => {
      //   WebSocketInstance.fetchMessages(
      //     this.props.username,
      //     this.props.params
      //     // newProps.match.params.chatID
      //   );
      // });
      // WebSocketInstance.connect(this.props.params);
    }
  }

  render() {
    return (
      <Hoc>
        <div className="messages">
          <ul id="chat-log" key={this.props.username}>
            {this.props.messages && this.renderMessages(this.props.messages)}
            <div
              className="messageDisplay"
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </ul>
        </div>
        <div className="message-input">
          <form onSubmit={this.sendMessageHandler}>
            <div className="wrap">
              <input
                onChange={this.messageChangeHandler}
                value={this.state.message}
                required
                id="chat-message-input"
                type="text"
                placeholder=" Write your message..."
              />
              <i className="fa fa-paperclip attachment" aria-hidden="true" ><Icon type="paper-clip"/></i>
              <button id="chat-message-submit" className="submit">
                <i className="fa fa-paper-plane" aria-hidden="true" ><Icon type="check" style={{color:"#ffffff"}}/></i>
              </button>
            </div>
          </form>
        </div>
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    messages: state.message.messages
  };
};

export default connect(mapStateToProps)(Chat);
