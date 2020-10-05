import axios from "axios";
import React from 'react';
import Hoc from "../hoc/hoc";
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import { withRouter } from "react-router-dom";
import {getProfileNotificationList, putProfileNotificationList} from "../store/actions/profileNTFN"
import { Spin, Popover, Icon, Menu, Badge, List, message, Button, Col, Row} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import NTFNDDMenu from "./NTFNDDMenu";
import { notificationListScrollerURL } from "../constants";
import * as messageActions from "../store/actions/notification";
import WebSocketInstance from "../NTFNwebsocket";

class ProfileHeaderMenu extends React.Component {


  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchNTFNS(
        this.props.username,
      );
    });
    Promise.resolve(WebSocketInstance.notification_connect(this.props.username))
    .then(() => this.setState((props) => ({
      data: props.notification
    })
    ))
    .catch(err => {
      console.error("NOBETTER",err.message)
    });
  }


  constructor(props) {
    super(props);
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
    );
    if(this.props.username !== undefined){
      this.initialiseChat();
    }
  }

  state = { 
    data: null,
    showContent: false,
    notifications: [],
    loading: false,
    hasMore: true,
    offset: 5,
    limit: 5,
  };

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
    }, 5000);
  }

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
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null || undefined){
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }
  
  // componentDidUpdate(prevProps) {
  //   if (newProps.token !== this.props.token) {
  //     console.log("newProps.token !== this.props.token")
  //     WebSocketInstance.disconnect();
  //     if(newProps.username !== undefined){
  //     this.waitForSocketConnection(() => {
  //       WebSocketInstance.fetchNTFNS(
  //         newProps.username,
  //       );
  //     });
  //     WebSocketInstance.notification_connect(newProps.username);
  //   } else {
  //     WebSocketInstance.disconnect();
  //   }
  // } else {
  //     console.log("newProps.token !== this.props.token NOT")
  // }   
  // }

  handleViewNTFN = async () => {
    if(this.props.unviews === "0"){
      return
    } else {
      WebSocketInstance.fetchNTFNViews(
        this.props.username,
      );
    }
    this.setState((props) => ({
        loading: false,
        data: props.notification,
        showContent:true
      })
    )
  }

  loadNotifications = () => {
    console.log("KORN")
    this.setState({ loading: true}, () => {
        // const { offset, limit} = this.state;
        // WebSocketInstance.fetchMoreNTFNS(this.props.username, limit, offset)
        // WebSocketInstance.notification_connect(this.props.username)
        // .then(
        //   this.setState((state, props) => ({
        //     loading: false,
        //     offset: offset + limit
        // })
        // ))
        // .catch(err => {
        //   this.setState({
        //     error: err.message,
        //     loading: false
        //   });
        // });
    })
  };

  render() {
    console.log("PHDM this.props",JSON.stringify(this.props))
    console.log("PHDM this.state",JSON.stringify(this.state))
    let { data, offset, limit } = this.state

    if(this.props.notification){
      console.log("CORSO",JSON.stringify(this.props.notification))
    }

      const content = (NTFN) => {
          return(
          <div className="parent">
            <Menu >
              <div className="list-container">
                <InfiniteScroll
                  dataLength={NTFN.length}
                  initialLoad={true}
                  // pageStart={0}
                  // loadMore={this.loadNotifications()}
                  hasMore={this.props.hasMore}
                  loader={<Spin spinning={this.state.loading} delay={500} />}
                  useWindow={false}
                  // height={150}
                >
                  <NTFNDDMenu ntfns={NTFN}/>

                  {/* <List
                    size="small"
                    bordered
                    dataSource={NTFN}
                    renderItem={(item, index) =><List.Item key={index}>{item.content}</List.Item>}
                  >
                    {this.state.loading && this.state.hasMore && (
                      <div className="demo-loading-container">
                        <p>MR CORSO</p>
                      </div>
                    )}
                  </List> */}
                </InfiniteScroll>
              </div>
            </Menu>
          </div>
        )
      }
        return (
          this.props.notification ?
          <Hoc>
            <NTFNDDMenu 
              ntfns={this.props.notification}
              username={this.props.username}
              token={this.props.token}
              hasMore={this.props.hasMore}/>

            {/* <div className="demo">
                <Popover placement="bottomRight" trigger="click" 
                  onClick={()=>this.handleViewNTFN()} 
                  content={content(this.props.notification)}
                  // content={this.state.showContent === true ? content( this.props.notification ):<p>Not Yet</p>}
                >
                  <Badge count={1} count={(this.props.unviews)} >
                    <Icon type="notification" />
                  </Badge>
                </Popover>
            </div> */}
        </Hoc>
        : null
        )
    }
  }
  
    const mapStateToProps = state => {
      return {
        username: state.auth.username,
        token: state.auth.token,
        notification: state.notify.messages,
        hasMore: state.notify.hasMore,
      };
    };

    const mapDispatchToProps = dispatch => {
      return {
        logout: () => dispatch(actions.logout()),
        addMessage: message => dispatch(messageActions.addMessage(message)),
        setMessages: messages => dispatch(messageActions.setMessages(messages)),
      };
    };
    
    export default withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ProfileHeaderMenu)
    );