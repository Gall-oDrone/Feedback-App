import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { SOCKET_URL } from "../settings";
import "../assets/main.css";
// On this codelab, you will be streaming only video (video: true).

var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream;
var caller;
var callee;

var roomName = 'st';
var ws = 'ws://';
if(window.location.protocol=="https:"){ ws = 'wss://'; }
var chatSocket = new WebSocket(`${SOCKET_URL}` + '/ws/chat/' + "1" + '/');
isChannelReady = true;

////////////////////////////////////////////////

function sendMessage(message, comm, user) {
  console.log('Client sending message: ', message);
  chatSocket.send(JSON.stringify({
    command: comm,
    from: user,
    message: message,
    chatId: "1"
  }));
}

const mediaStreamConstraints = {
  video: true,
};

// Allows for RTC server configuration.
const configuration = {
  iceServers: [
    {
      urls: "stun:stun.stunprotocol.org"
    }
    // {
    //   urls: [
    //     'stun:stun1.l.google.com:19302',
    //     'stun:stun2.l.google.com:19302',
    //   ],
    // },
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

  constructor(props) {
    super(props);
    this.socketRef = chatSocket;
    this.videoRef = React.createRef();
    this.remoteVideoRef = React.createRef();
    remoteVideo = this.remoteVideoRef;
    localVideo = this.videoRef;

    this.state = {
      initiated: false,
      local:true,
      hasJoined: null,
      media: false,
      message: "",
      otherUserId: null,
      participants: null
    };
  }

  componentDidMount() {
    if(this.props.token !== undefined){
      this.connect();
    }
  }
  connect = () => {
  this.socketRef.onmessage = async e => {
    var data = JSON.parse(e.data);
    var message = data['message'];
    console.log('Client received message:', message);
    if (message.message === 'got user media') {
      this.setState({ local:false})
      this.maybeStart();
    } else if (message.type === 'offer') {
      this.setState({ initiated:true})
      if (!isInitiator && !isStarted) {
        this.maybeStart();
      }
      // this.handleVideoOfferMsg(message)
      //Theirs
      if(!pc){
        this.createPeerConnection()
        pc.setRemoteDescription(new RTCSessionDescription(message));
      }
      //Theirs
      this.doAnswer();
    } else if (message.type === 'answer' && isStarted) {
      console.log("32", pc, ", ", message)
      if (!pc.currentRemoteDescription && message) {
      //Yours if answer
      await pc.setRemoteDescription(new RTCSessionDescription(message));
      }
    } else if (message.type === 'candidate' && isStarted) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      pc.addIceCandidate(candidate);
    } else if (message.message === 'end' && isStarted) {
      this.handleRemoteHangup();
    }
  };
}

  maybeStart() {
    console.log('>>>>>>> maybeStart() ', isStarted, typeof localStream, isChannelReady);
    if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
      console.log('>>>>>> creating peer connection');
      this.createPeerConnection();
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
      isStarted = true;
    } 
  }
  
  async handleVideoOfferMsg(msg) {
    var localStream = null;
    this.createPeerConnection();
    // localVideo = this.remoteVideoRef.current.srcObject
  
    var desc = new RTCSessionDescription(msg);
  
    pc.setRemoteDescription(desc).then(function () {
      return navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
    })
    .then(function(stream) {
      
      localStream = stream;
      console.log("111, ", localStream, remoteVideo, localVideo)
      remoteVideo.current.srcObject = localStream;
  
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
    })
    .then(function() {
      return pc.createAnswer();
    })
    .then(function(answer) {
      return pc.setLocalDescription(answer);
    })
    .then(sendMessage(pc.localDescription, "answer", this.props.username))
    .catch(this.handleGetUserMediaError);
  }

  handleGetUserMediaError(e) {
    switch(e.name) {
      case "NotFoundError":
        alert("Unable to open your call because no camera and/or microphone" +
              "were found.");
        break;
      case "SecurityError":
      case "PermissionDeniedError":
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        alert("Error opening your camera and/or microphone: " + e.message);
        break;
    }
  }

  async createPeerConnection() {
    try {
      pc = new RTCPeerConnection(configuration);
      
      pc.onicecandidate = this.handleIceCandidate.bind(this);
      pc.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent.bind(this);
      // Theirs
      pc.addEventListener('track', event => {
        console.log('Got remote track:', event.streams[0]);
        this.gotRemoteMediaStream(event.streams[0])
        event.streams[0].getTracks().forEach(track => {
          console.log('Add a track to the remoteStream:', track);
          remoteStream.addTrack(track); 
        });
      });
      pc.onremovestream = this.handleRemoteStreamRemoved;
    
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
      sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      }, "caller", this.props.username);
    } else {
      console.log('End of candidates.');
    }
  }

  handleICEConnectionStateChangeEvent(event) {
    switch(pc.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        // closeVideoCall();
        break;
    }
  }
  
  handleCreateOfferError(event) {
    console.log('createOffer() error: ', event);
  }
  
  async doCall() {
    console.log('Sending offer to peer');
    await pc.createOffer(this.setLocalAndSendMessage.bind(this), this.handleCreateOfferError);
  }
  
  doAnswer() {
    console.log('Sending answer to peer.');
    pc.createAnswer().then(
      this.setLocalAndSendMessage.bind(this),
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
      sendMessage(sessionDescription, "offer", this.props.username);
    }
    else if(sessionDescription.type === "answer"){
      sendMessage(sessionDescription, "answer", this.props.username);
    }
  }
  
  onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description: ' + error.toString());
  }
  
  async handleRemoteStreamAdded(event) {
    try{
      remoteVideo.current.srcObject = event.streams[0];
      console.log('Remote peer connection received remote stream.');
    }catch (error){
      remoteVideo.current.src = window.URL.createObjectURL(event.streams[0]);
    }

    event.streams[0].getTracks().forEach(track => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
      })
  }

  handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
  }

  gotLocalMediaStream(mediaStream, ref) {
    localStream = mediaStream;
    ref.current.srcObject = mediaStream;
  }

  // Handles remote MediaStream success by adding it as the remoteVideo src.
  // gotRemoteMediaStream(mediaStream, ref) {
  //   remoteStream = mediaStream;
  //   ref.current.srcObject = mediaStream;
  // }
gotRemoteMediaStream(event) {
  const mediaStream = event;
  remoteVideo.current.srcObject = mediaStream;
  remoteStream = mediaStream;
  console.log('Remote peer connection received remote stream.');
}

  startAction() {
    this.setState({media:true})
    console.log("isInitiator? ",isInitiator, remoteVideo, this.state.local)
    
      if(localStream === null || localStream === undefined){
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
        .then(stream => this.gotLocalMediaStream(stream, this.videoRef))
        .then(() => sendMessage("got user media", "media", this.props.username))
        .catch(error => console.error(error))
      }
  }

  // Handles call button action: creates peer connection.
  async callAction() {
    // this.setState({ initiated:true})
    isInitiator = true;
    caller = this.props.username
    console.log('isInitiator', isInitiator);
    pc.onnegotiationneeded = this.doCall();
  }

  // Handles hangup action: ends up call, closes connections and resets peers.
  hangupAction() {
    console.log('Hanging up.');
    // hangupButton.disabled = true;
    // callButton.disabled = false;
    this.stop();
    console.log('Ending call.');
    sendMessage("End Call", "end")
  }

  handleRemoteHangup() {
    console.log('Session terminated.');
    this.stop();
    isInitiator = false;
  }

  stop() {
    isStarted = false;
    pc.close();
    pc = null;
  }

  render() {
    const { initiated, media } = this.state
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
                        <button className="button btn-primary btn-sm" disabled={media} onClick={() => {this.startAction()}} id="startButton">Start</button>
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
  };
};

export default withRouter(connect(
  mapStateToProps
)(VideoCallFrame));