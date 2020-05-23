import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { SOCKET_URL } from "../settings";
import WebSocketInstance from "../websocket";
import "../assets/main.css";
import * as videoFns from "../chat_containers/VideoFns";
import axios from 'axios';
import * as messageActions from "../store/actions/message";
import { authAxios } from '../utils';
import { vcroomGetDetailURL } from "../constants";
// On this codelab, you will be streaming only video (video: true).

var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream;
var answered = false;

var maybeStart;
var doAnswer;

var roomName = 'st';
var ws = 'ws://';
if(window.location.protocol=="https:"){ ws = 'wss://'; }
var chatSocket = new WebSocket(`${SOCKET_URL}` + '/ws/chat/' + "1" + '/');
isInitiator = true;
isChannelReady = true;
////////////////////////////////////////////////

// function sendMessage(message, comm) {
//   console.log('Client sending message: ', message);
//   chatSocket.send(JSON.stringify({
//     command: comm,
//     from: "q",
//     message: message,
//     chatId: "1"
//   }));
// }

// chatSocket.onmessage = async function(e) {
//   var data = JSON.parse(e.data);
//   var message = data['message'];
//   console.log('Client received message:', message);
//   if (message.content === 'got user media') {
//     maybeStart();
//   } else if (message.type === 'offer') {
//     if (!isInitiator && !isStarted) {
//       maybeStart();
//     }
//     //Theirs
//     pc.setRemoteDescription(new RTCSessionDescription(message));
//     //Theirs
//     doAnswer();
//   } else if (message.type === 'answer' && isStarted) {
//     console.log("32", pc, ", ", message)
//     if (!pc.currentRemoteDescription && message) {
//     //Yours if answer
//     await pc.setRemoteDescription(new RTCSessionDescription(message));
//     }
//   } else if (message.type === 'candidate' && isStarted) {
//     var candidate = new RTCIceCandidate({
//       sdpMLineIndex: message.label,
//       candidate: message.candidate
//     });
//     pc.addIceCandidate(candidate);
//   } else if (message === 'bye' && isStarted) {
//     // handleRemoteHangup();
//   }
// };

const mediaStreamConstraints = {
  video: true,
};

// Allows for RTC server configuration.
const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

let localVideo = null 
let remoteVideo = null
let peerConnection = null;
let localPeerConnection;
let remotePeerConnection;

const offerOptions = {
  offerToReceiveVideo: 1,
};

class VideoCallFrame extends React.Component {

  initialiseChat() {
    // WebSocketInstance.connect(this.props.match.params.chatID);
    WebSocketInstance.connect("1");
    console.log("AR: ", WebSocketInstance.callbacks)
  }

  constructor(props) {
    super(props);
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this)
    );
    this.initialiseChat();
    this.callback = WebSocketInstance.callbacks
    this.videoRef = React.createRef();
    this.remoteVideoRef = React.createRef();

    this.state = {
      initiated: false,
      message: "",
      otherUserId: null,
      participants: null
    };
  }

  componentDidMount() {
    console.log("URL Daily.Co: " + JSON.stringify(this.props.url))
    if(this.props.token !== undefined){
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
    }
  }

  // componentWillReceiveProps(newProps) {
  //   // if (this.props.match.params.chatID !== newProps.match.params.chatID) {
  //   if (this.props.params !== newProps.params) {
  //     WebSocketInstance.disconnect();
  //     this.waitForSocketConnection(() => {
  //       const messageObject = {
  //         command: "media",
  //         from: this.props.username,
  //         content: "Initialize",
  //         chatId: "1"
  //         //chatId: this.props.match.params.chatID
  //       };
  //       WebSocketInstance.newMessage(messageObject);
  //     });
  //     WebSocketInstance.connect("1");
  //     // WebSocketInstance.connect(newProps.match.params.chatID);
  //   } else {
  //     WebSocketInstance.disconnect();
  //   }
  // }

  sendMessage(message, comm) {
    console.log('Client sending message: ', message);
    const messageObject = {
      command: comm,
      from: this.props.username,
      content: message,
      chatId: "1"
      //chatId: this.props.match.params.chatID
    };
    WebSocketInstance.newMessage(messageObject);
  }

  receivedMessage(event) {
    console.log(WebSocketInstance.callback)
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
  async handleSocketConnection() {
  }
  async maybeStart() {
    console.log('>>>>>>> maybeStart() ', isStarted, typeof localStream, isChannelReady);
    if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
      console.log('>>>>>> creating peer connection');
      this.createPeerConnection();
      // pc.addStream(localStream);
      isStarted = true;
      console.log('isInitiator', isInitiator);
      if (isInitiator) {
        this.doCall();
      }
    } 
  }
  
  async createPeerConnection() {
    try {
      pc = new RTCPeerConnection(null);
      pc.onicecandidate = this.handleIceCandidate;
      // Theirs
      if(isStarted){
        pc.ontrack = this.handleRemoteStreamAdded;
      }
      
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    
      console.log('Created RTCPeerConnnection');
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ' + e.message);
      alert('Cannot create RTCPeerConnection object.');
      return;
    }
  }
  
  handleIceCandidate(event) {
    console.log('icecandidate event: ', event);
    if (event.candidate) {
      this.sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      }, "caller");
    } else {
      console.log('End of candidates.');
    }
  }
  
  handleCreateOfferError(event) {
    console.log('createOffer() error: ', event);
  }
  
  async doCall() {
    console.log('Sending offer to peer');
    await pc.createOffer(this.setLocalAndSendMessage, this.handleCreateOfferError);
  }
  
  doAnswer() {
    console.log('Sending answer to peer.');
    pc.createAnswer().then(
      this.setLocalAndSendMessage,
      this.onCreateSessionDescriptionError
    );
  }
  
  setLocalAndSendMessage(sessionDescription) {
    // Set Opus as the preferred codec in SDP if Opus is present.
    //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
    //Yours if offer, theirs if answer
    pc.setLocalDescription(sessionDescription);
    console.log('setLocalAndSendMessage sending message');
  
    if(sessionDescription.type === "offer"){
      this.sendMessage(sessionDescription, "offer");
    }
    else if(sessionDescription.type === "answer"){
      this.sendMessage(sessionDescription, "answer");
    }
  }
  
  onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description: ' + error.toString());
  }
  
  async handleRemoteStreamAdded(event) {
    console.log('Remote stream added.');
    console.log(remoteVideo)
    // try{
    //   remoteVideo.current.srcObject = event.stream;
    //   console.log('Remote peer connection received remote stream.');
    // }catch (error){
    //   remoteVideo.current.src = window.URL.createObjectURL(event.stream);
    // }
      event.streams[0].getTracks().forEach(track => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
      });
  }

  gotLocalMediaStream(mediaStream, ref) {
    localStream = mediaStream;
    ref.current.srcObject = mediaStream;
  }

  // Handles remote MediaStream success by adding it as the remoteVideo src.
  gotRemoteMediaStream(mediaStream, ref) {
    remoteStream = mediaStream;
    ref.current.srcObject = mediaStream;
  }
// gotRemoteMediaStream(event) {
//   const mediaStream = event.stream;
//   remoteVideo.current.srcObject = mediaStream;
//   remoteStream = mediaStream;
//   console.log('Remote peer connection received remote stream.');
// }

  startAction() {
    // startButton.disabled = true;
    remoteVideo = this.remoteVideoRef
    if(localStream === null || localStream === undefined){
      navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
      .then(stream => this.gotLocalMediaStream(stream, this.videoRef))
      // .then(() => sendMessage("got user media", "new_message"))
      .catch(error => console.error(error))
    } 
    if(isStarted){
      if (remoteStream === null || remoteStream === undefined){
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
        .then(stream => this.gotRemoteMediaStream(stream, this.remoteVideoRef))
        .catch(error => console.error(error))
      }
      console.log(chatSocket);
    }
  }

  // Handles call button action: creates peer connection.
  callAction() {
    this.setState({ initiated:true})
    this.sendMessage("got user media", "media")
  }

  // Handles hangup action: ends up call, closes connections and resets peers.
  hangupAction() {
    localPeerConnection.close();
    remotePeerConnection.close();
    localPeerConnection = null;
    remotePeerConnection = null;
    // hangupButton.disabled = true;
    // callButton.disabled = false;
    console.log('Ending call.');
  }

  render() {
    const { initiated } = this.state
    console.log("AR 2: ", this.props.messages)
    return( 
      <div>
            <div id="video-container">
                {/* <section className="col-md-8"> */}
                    <h1>Realtime communication with WebRTC</h1>
                    <video  
                      className="my-video"
                      ref={this.videoRef} 
                      autoPlay 
                      playsInline
                      width={350}
                      style={{backgroundColor:'#848484'}}
                    >
                    </video>
                    <video  
                      className="user-video"
                      ref={this.remoteVideoRef} 
                      autoPlay 
                      playsInline
                      // poster={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
                      width={350}
                      style={{backgroundColor:'#000000'}}
                    >
                    </video>
                    </div>
                    <div>
                        <button className="button btn-primary btn-sm" onClick={() => {this.startAction()}} id="startButton">Start</button>
                        <button className="button btn-success btn-sm" disabled={initiated} onClick={() => {this.callAction()}} id="callButton">Call</button>
                        <button className="button btn-danger btn-sm" onClick={() => {this.hangupAction()}} id="hangupButton">Hang Up</button>
                    </div>
                {/* </section> */}
            </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    username: state.auth.username,
    messages: state.message.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(messageActions.addMessage(message)),
    setMessages: messages => dispatch(messageActions.setMessages(messages))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoCallFrame));