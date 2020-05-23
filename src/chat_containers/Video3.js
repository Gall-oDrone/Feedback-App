import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { SOCKET_URL } from "../settings";
import "../assets/main.css";
// On this codelab, you will be streaming only video (video: true).

// Get our hostname

var myHostname = window.location.hostname;
if (!myHostname) {
  myHostname = "localhost";
}
log("Hostname: " + myHostname);

var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream = null;
var answered = false;

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
  iceServers: [     // Information about ICE servers - Use your own!
    {
      urls: [
        // "turn:" + myHostname, // A TURN server
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
      username: "webrtc",
      credential: "turnserver"
    }
  ]
  // iceServers: [
  //   {
  //     urls: [
  //       'stun:stun1.l.google.com:19302',
  //       'stun:stun2.l.google.com:19302',
  //     ],
  //   },
  // ],
  // iceCandidatePoolSize: 10,
};

let localVideo = null 
let remoteVideo = null
var transceiver = null;    

const offerOptions = {
  offerToReceiveVideo: 1,
};

// Output logging information to console.

function log(text) {
  var time = new Date();

  console.log("[" + time.toLocaleTimeString() + "] " + text);
}

// Output an error message to console.

function log_error(text) {
  var time = new Date();

  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}


class VideoCallFrame extends React.Component {

  constructor(props) {
    super(props);
    this.socketRef = chatSocket;
    this.videoRef = React.createRef();
    this.remoteVideoRef = React.createRef();
    localVideo = this.videoRef
    remoteVideo = this.remoteVideoRef

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
      this.handleVideoOfferMsg(message)
    } else if (message.type === 'answer' && isStarted) {
      console.log("32", pc, ", ", message)
      this.handleVideoAnswerMsg(message);
    } else if (message.type === 'candidate' && isStarted) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      await pc.addIceCandidate(candidate);
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
      // localStream.getTracks().forEach(
      //   transceiver = track => pc.addTransceiver(track, {streams: [localStream]})
      // );
      console.log('>>>>>> Local');
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
      console.log('>>>>>> Stream =>', pc);
      isStarted = true;
    } 
  }
  
  async handleVideoOfferMsg(msg) {
    
    if (!pc) {
    this.createPeerConnection();
    }
    // localVideo = this.videoRef.current.srcObject
  
    var desc = new RTCSessionDescription(msg);
    
    if (pc.signalingState != "stable") {
      log("  - But the signaling state isn't stable, so triggering rollback");
  
      // Set the local and remove descriptions for rollback; don't proceed
      // until both return.
      await Promise.all([
        pc.setLocalDescription({type: "rollback"}),
        pc.setRemoteDescription(desc)
      ]);
      return;
    } else {
      log ("  - Setting remote description");
      await pc.setRemoteDescription(desc);
    }
    await pc.setRemoteDescription(desc);
    // Get the webcam stream if we don't already have it
    console.log("localStream =>", localStream, desc)
  if (!localStream) {
    console.log("!localStream")
    try {
      await navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(localStream = stream => this.gotLocalMediaStream(stream, this.videoRef));
      // this.remoteVideoRef.current.src = localStream;
    } catch(err) {
      this.handleGetUserMediaError(err);
      return;
    }

    // Add the camera stream to the RTCPeerConnection

    try {
      localStream.getTracks().forEach(
        transceiver = track => pc.addTransceiver(track, {streams: [localStream]})
      );
    } catch(err) {
     this.handleGetUserMediaError(err);
    }
  } else { console.log("localStream ", localStream, remoteStream)}

  log("---> Creating and sending answer to caller");

  await pc.setLocalDescription(await pc.createAnswer());
  sendMessage(pc.localDescription, "answer", this.props.username)
  }

  async handleVideoAnswerMsg(msg) {
    log("*** Call recipient has accepted our call");
  
    // Configure the remote description, which is the SDP payload
    // in our "video-answer" message.
    
    var desc = new RTCSessionDescription(msg);
    console.log("localStream =>", desc)
    await pc.setRemoteDescription(desc).catch(this.reportError);
  }

  reportError(errMessage) {
    log_error(`Error ${errMessage.name}: ${errMessage.message}`);
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
      pc.ontrack = this.handleRemoteStreamAdded.bind(this);
      pc.onremovetrack = this.handleRemoteHangup;
      pc.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
      pc.onsignalingstatechange = this.handleICEConnectionStateChangeEvent.bind(this);
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
    try {
      log("---> Creating offer");
      const offer = await pc.createOffer();
  
      // If the connection hasn't yet achieved the "stable" state,
      // return to the caller. Another negotiationneeded event
      // will be fired when the state stabilizes.
  
      if (pc.signalingState != "stable") {
        log("     -- The connection isn't stable yet; postponing...")
        return;
      }
      log("---> Setting local description to the offer");
      await pc.setLocalDescription(offer);

    // Send the offer to the remote peer.

    log("---> Sending the offer to the remote peer");
    sendMessage(pc.localDescription, "answer", this.props.username);
    } catch(err) {
      log("*** The following error occurred while handling the negotiationneeded event:");
      this.reportError(err);
    };
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
    console.log('Remote stream added.');
    this.remoteVideoRef.current.srcObject = event.streams[0];
    console.log('Remote peer connection received remote stream.');
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
    //   if(this.state.local === true){
    // } else {
    //   if (remoteStream === null || remoteStream === undefined){
    //   navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    //   .then(stream => this.gotRemoteMediaStream(stream, this.remoteVideoRef))
    //   .catch(error => console.error(error))
    // }
    // }
  }

  // Handles call button action: creates peer connection.
  async callAction() {
    // this.setState({ initiated:true})
    isInitiator = true;
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