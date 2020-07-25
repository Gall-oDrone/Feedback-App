import React from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../websocket";
import Hoc from "../hoc/hoc";
import {Icon} from "antd";
import * as messageActions from "../store/actions/message";
// import "../assets/style.css";

class Messenger extends React.Component {
  state = { message: "" };

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMesengerMessages(
        this.props.username,
        this.props.recipient,
        this.props.params
      );
    });
    // WebSocketInstance.connect(this.props.match.params.chatID);
    WebSocketInstance.connect_messenger(this.props.username);
  }

  constructor(props) {
    super(props);
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this),
      this.props.setRoomStatus.bind(this),
    );
    console.log("1: ", this.props)
    if(this.props.username !== undefined){
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
      to: this.props.recipient,
      content: this.state.message,
      chatId: this.props.params
      //chatId: this.props.match.params.chatID
    };
    WebSocketInstance.newMesengerMessage(messageObject);
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
    // const message2= [{id: 624, author: "q", content: "la ratamarimachez del ratamarimacho t4", timestamp: "2020-07-03 23:30:58.815302"},
    //                 {id: 625, author: "w", content: "t5", timestamp: "2020-07-03 23:30:58.815302"},
    //                 {id: 626, author: "q", content: "t6", timestamp: "2020-07-03 23:30:58.815302"},
    //                 {id: 627, author: "w", content: "t7", timestamp: "2020-07-03 23:30:58.815302"},
    //                 {id: 628, author: "q", content: "FC C Klaus has his own family 🤣🤣🤣", timestamp: "2020-07-03 23:30:58.815302"},
    //                 {id: 629, author: "w", content: "t9", timestamp: "2020-07-03 23:30:58.815302"},
    //                 {id: 630, author: "q", content: "la ratamarimachez del ratamarimacho  t10", timestamp: "2020-07-03 23:30:58.815302"},
    //                 {id: 631, author: "w", content: "t11", timestamp: "2020-07-03 23:30:58.815302"}]
    return messages.map((message, i, arr) => (
      // return Object.values(message2).map((message, i, arr)=> {
      //   return(
      <li
        key={message.id}
        // style={{ display: "block", marginBottom: arr.length - 1 === i ? "300px" : "15px" }}
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
      // )})
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
    // if (this.props.params !== newProps.params) {
    //   console.log("ELG 2", this.props.params, newProps.params)
    //   WebSocketInstance.disconnect();
    //   this.waitForSocketConnection(() => {
    //     WebSocketInstance.fetchMesengerMessages(
    //       newProps.username,
    //       newProps.recipient,
    //       newProps.params
    //       // newProps.match.params.chatID
    //     );
    //   });
    //   WebSocketInstance.connect_messenger(newProps.username);
    //   // WebSocketInstance.connect(newProps.match.params.chatID);
    // } else {
    //   console.log("ELG", this.props.params, newProps.params)
    //   WebSocketInstance.disconnect();
    //   WebSocketInstance.connect_messenger(this.props.username);
    // }
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
                cols="5" 
                rows="5"
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

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(messageActions.addMessage(message)),
    setMessages: messages => dispatch(messageActions.setMessages(messages)),
    setRoomStatus: status => dispatch(messageActions.setStatus(status)),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Messenger);
