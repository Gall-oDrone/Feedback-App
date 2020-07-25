import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Hoc from "../hoc/hoc";
import {Button, Col, Icon, Popover, Row, Modal} from "antd";
import { authAxios } from "../utils";
import WebSocketInstance from "../websocket";
import axios from "axios";
import Video from "./Video7";
import { chatDetailParticipantsURL, chatDetailRoomStatusURL } from "../constants";

class Profile extends React.Component {

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  
  // constructor(props) {
  //   super(props);
  //   WebSocketInstance.addCallbacks(
  //     this.props.setRoomStatus.bind(this)
  //   );
  // }
  
  state = {
    chatParts: null,
    status: null,
    visible: false,
    params: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    if(this.props.params !== undefined && this.props.params !== null){
      this.handleFetchDetailChat()
      this.handleFetchChatStatus()
    } 
    else if (this.props.recipient !== undefined && this.props.recipient !== null){
      var others = [null];
      others.push(this.props.recipient)
      this.setState({
        chatParts: others,
      });
    }
    
  }
  
  handleFetchDetailChat = () => {
    this.setState({ loading: true });
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
      axios.get(chatDetailParticipantsURL(this.props.params))
      .then(res => {
        var others = [null];
        res.data.forEach(el => {
          if(el.user !== this.props.username){
            others.push(el.user)
          }
        })
        this.setState({
          chatParts: others,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
        console.error("ERROR", err)
      });
  };

  handleFetchChatStatus = () => {
    this.setState({ loading: true });
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
      axios.get(chatDetailRoomStatusURL(this.props.params))
      .then(res => {
        this.setState({
          status: res.data.video_disabled,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
        console.error(err)
      });

    // this.waitForSocketConnection(() => {
    // WebSocketInstance.fetchRoomStatus(
    //   this.props.username,
    //   this.props.params
    // );
    // WebSocketInstance.connect(this.props.params);
    // });
  };

  handleRoomStatus = async e => {
    this.setState({loading:true})
    const data = {
      command:"room_status",
      from: this.props.username,
      content: "start",
      chatId: this.props.params
    }
    WebSocketInstance.newMessage(
      data
    )
    // this.setState({loading:false});
    console.log("123", this.props.status, this.state.loading)
  }

  content = status =>(
    <div>
      <Row>
        <Col>
          {status === true 
            ? <Button onClick={this.showModal}>Join Room</Button>
            : <Button onClick={this.showModal} loading={this.state.loading}>Create Room</Button>
          }
        </Col>
      </Row>
    </div>
  );

  render() {
    console.log("0 PROPS: ", this.props)
    console.log("1 STATE: ", this.state, this.state.chatParts)
    if (this.props.token === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="contact-profile">
        {this.props.username !== null ? (
          <Hoc>
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            {this.state.chatParts !== null ? (
              <p>Chatting with {this.state.chatParts}</p> 
            ):null}
            <div className="social-media">
              <i className="fa fa-facebook" aria-hidden="true"><Icon type="facebook"></Icon></i>
              <i className="fa fa-twitter" aria-hidden="true" ><Icon type="twitter"></Icon></i>
              <i className="fa fa-instagram" aria-hidden="true" ><Icon type="instagram"></Icon></i>
              <Popover placement="bottomRight" content={this.content(this.state.status)} trigger="click">
                <i className="fa fa-video-chat" aria-hidden="true" >
                  <Icon type="video-camera">
                  </Icon>
                </i>
              </Popover>
            </div>
            <div>
              <Modal
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                wrapClassName={"frame"}
              >
                <Video/>
              </Modal>
            </div>
          </Hoc>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    token: state.auth.token,
    status: state.message.status
  };
};

export default connect(mapStateToProps)(Profile);


// background-image: url("https://images-ssl.gotinder.com/55acf6ad-ecc8-4b71-892a-397026eb6083/320x400_5026f25d-07a8-41fa-9ce7-43f80d55a42e.jpg")
// ;background-position: 50% 100%;background-size: auto 100.952%;"