import React from "react";
import { Spin, Icon } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import * as navActions from "../store/actions/nav";
import * as messageActions from "../store/actions/message";
import Contact from "../chat_components/Contact";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Sidepanel extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loginForm: true,
  //     timer: null
  //   };
  // }

  state = {
    loginForm: true,
    timer: null
  };

  waitForAuthDetails() {
    const component = this;
    let { timer } = this.state
    if (
      component.props.token !== null &&
      component.props.token !== undefined
    ) {
      component.props.getUserChats(
        component.props.username,
        component.props.token
      );
      return;
    // timer = setTimeout(function() {
    //   if (
    //     component.props.token !== null &&
    //     component.props.token !== undefined
    //   ) {
    //     component.props.getUserChats(
    //       component.props.username,
    //       component.props.token
    //     );
    //     return;
    //   } else {
    //     console.log("waiting for authentication details...");
    //     component.waitForAuthDetails();
    //     console.log("NIP TUCK", component.props.token);
    //     console.log("timer", timer.timeout, timer, this.timer);
    //     console.log("timer > 60 sec? ", this.timer>60);
    //   }
    // }, 5000);
    // if(timer > 60){
    //   console.log("timer is greater than 60 secs, it's: ", timer);
    //   this.componentWillUnmount(timer)
    }
  }

  componentDidMount() {
    this.waitForAuthDetails();
  }

//   static getDerivedStateFromProps(nextProps, prevState){
//     console.log("Static X", nextProps.token, prevState.token)
//     if(nextProps.token!==prevState.token){
//       if(nextProps.getUserChats !==undefined ){
//         return nextProps.getUserChats(
//           nextProps.username,
//           nextProps.token
//         )
//       }
//    }
//    else return null;
//  }

 componentDidUpdate(prevProps, prevState) {
  console.log("Static X CDU", prevProps.token, this.props.token)
  if(prevProps.token!==this.props.token){
    this.props.getUserChats(
      this.props.username,
      this.props.token
    )
  }
}

  // componentWillReceiveProps(newProps){
  //   if (
  //     newProps.token !== null &&
  //     newProps.token !== undefined
  //     ) {
  //       newProps.getUserChats(
  //         newProps.username,
  //         newProps.token
  //       );
  //   }
  // }

  componentWillUnmount(timer){
    clearTimeout(timer);
    console.log("Timer after: ", timer)
  }

  openAddChatPopup() {
    this.props.addChat();
  }

  changeForm = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  // authenticate = e => {
  //   e.preventDefault();
  //   if (this.state.loginForm) {
  //     this.props.login(e.target.username.value, e.target.password.value);
  //   } else {
  //     this.props.signup(
  //       e.target.username.value,
  //       e.target.email.value,
  //       e.target.password.value,
  //       e.target.password2.value
  //     );
  //   }
  // };

  render() {
    console.log("taki, ", this.props.chats)
    const activeChats = this.props.chats.map(c => {
      return (
        <Contact
          key={c.id}
          name={c.participants.map(usr => {if(usr!==this.props.username){return usr}})}
          picURL="http://emilcarlsson.se/assets/louislitt.png"
          status="busy"
          chatURL={`${c.id}`}
        />
      );
    });
    return (
      <div id="sidepanel">
        {/* {!this.props.isAuthenticated ? (
        <div id="profile">
          <div className="wrap">
            <img
              id="profile-img"
              src="http://emilcarlsson.se/assets/mikeross.png"
              className="online"
              alt=""
            />
            <p>{this.props.username}</p>
            <i
              className="fa fa-chevron-down expand-button"
              aria-hidden="true"
            />
            <div id="status-options">
              <ul>
                <li id="status-online" className="active">
                  <span className="status-circle" /> <p>Online</p>
                </li>
                <li id="status-away">
                  <span className="status-circle" /> <p>Away</p>
                </li>
                <li id="status-busy">
                  <span className="status-circle" /> <p>Busy</p>
                </li>
                <li id="status-offline">
                  <span className="status-circle" /> <p>Offline</p>
                </li>
              </ul>
            </div>
            <div id="expanded">
              {this.props.loading ? (
                <Spin indicator={antIcon} />
              ) : this.props.isAuthenticated ? (
                <button onClick={() => this.props.logout()} className="authBtn">
                  <span>Logout</span>
                </button>
              ) : (
                <div>
                  <form method="POST" onSubmit={this.authenticate}>
                    {this.state.loginForm ? (
                      <div>
                        <input
                          name="username"
                          type="text"
                          placeholder="username"
                        />
                        <input
                          name="password"
                          type="password"
                          placeholder="password"
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          name="username"
                          type="text"
                          placeholder="username"
                        />
                        <input name="email" type="email" placeholder="email" />
                        <input
                          name="password"
                          type="password"
                          placeholder="password"
                        />
                        <input
                          name="password2"
                          type="password"
                          placeholder="password confirm"
                        />
                      </div>
                    )}

                    <button type="submit">Authenticate</button>
                  </form>

                  <button onClick={this.changeForm}>Switch</button>
                </div>
              )}
            </div>
          </div>
        </div>
        ):null} */}
        <div id="search">
          <label htmlFor="">
            <i className="fa fa-search" aria-hidden="true" />
          </label>
          <input type="text" placeholder="Search Chats..." />
        </div>
        <div id="contacts">
          <ul>{activeChats}</ul>
        </div>
        <div id="bottom-bar">
          <button id="addChat" onClick={() => this.openAddChatPopup()}>
            <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
            <span>Create chat</span>
          </button>
          <button id="settings">
            <i className="fa fa-cog fa-fw" aria-hidden="true" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    username: state.auth.username,
    chats: state.message.chats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // login: (userName, password) =>
    //   dispatch(actions.authLogin(userName, password)),
    // logout: () => dispatch(actions.logout()),
    // signup: (username, email, password1, password2) =>
    //   dispatch(actions.authSignup(username, email, password1, password2)),
    addChat: () => dispatch(navActions.openAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidepanel);
