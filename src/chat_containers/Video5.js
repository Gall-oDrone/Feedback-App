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
var isCaller = null;
var isStarted = false;
var localStream;
var pc;
var rpc;
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
    // {
    //   urls: [
    //     "turn:" + myHostname, // A TURN server
    //     // 'stun:stun1.l.google.com:19302',
    //     // 'stun:stun2.l.google.com:19302',
    //     // 'stun:stun3.l.google.com:19302',
    //     // 'stun:stun4.l.google.com:19302',
    //     // 'stun:stunserver.org:3478',
    //   ],
    //   username: "webrtc",
    //   credential: "turnserver"
    // },
    {'urls': 'stun:stun.services.mozilla.com'},
    {'urls': 'stun:stun1.l.google.com:19302',}
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
      participants: []
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
      if (!pc.currentRemoteDescription && message) {
        //Yours if answer
        await this.handleVideoAnswerMsg(message);
        }
    } else if (message.type === 'candidate' && isStarted) {
      this.handleNewICECandidateMsg(message);
      // var candidate = new RTCIceCandidate({
      //   sdpMLineIndex: message.label,
      //   candidate: message.candidate
      // });
      // await pc.addIceCandidate(candidate);
    } else if (message.message === 'end' && isStarted) {
      // this.handleRemoteHangup();
      this.handleHangUpMsg(message.message)
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
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
      isStarted = true;
    } 
  }
  
  async handleVideoOfferMsg(msg) {
    
    // if (!pc) {
    //   console.log('Creating new PC in  Offer ');
    //   this.createPeerConnection();
    // }
    rpc = new RTCPeerConnection(configuration);
    console.log('Create PeerConnection with configuration: ', configuration);
    // let pc = new RTCPeerConnection(configuration);

    //the offer
    var desc = new RTCSessionDescription(msg);
    this.registerPeerConnectionListeners();
    if (rpc.signalingState != "stable") {
      log("  - But the signaling state isn't stable, so triggering rollback");
  
      // Set the local and remove descriptions for rollback; don't proceed
      // until both return.
      await Promise.all([
        rpc.setLocalDescription({type: "rollback"}),
        rpc.setRemoteDescription(desc)
      ]);
      return;
    } else {
      log ("  - Setting remote description");
      await rpc.setRemoteDescription(desc);
    }
    
    // rpc.addEventListener('icecandidate', event => {
    //   if (!event.candidate) {
    //     console.log('Got final candidate!');
    //     return;
    //   }
    //   console.log('Got candidate: ', event.candidate);
    // });

    if (!localStream) {
      try {
        localStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
      } catch(err) {
        this.handleGetUserMediaError(err);
        return;
      }
    this.videoRef.current.srcObject = localStream;

    try {
      localStream.getTracks().forEach(
      transceiver = track => rpc.addTransceiver(track, {streams: [localStream]}))
    } catch(err) {
      this.handleGetUserMediaError(err);
    }
  }

    // navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    //   .then(stream => this.gotRemoteMediaStream(stream, this.remoteVideoRef))

    // rpc.addEventListener('track', event => {
    //   console.log('Got remote track:', event.streams[0]);
    //   event.streams[0].getTracks().forEach(track => {
    //     console.log('Add a track to the remoteStream:', track);
    //     remoteStream.addTrack(track);
    //   });
    // });

    // await pc.setRemoteDescription(new RTCSessionDescription(msg));

    // var desc = new RTCSessionDescription(msg);
    // await pc.setRemoteDescription(desc);
    

  log("---> Creating and sending answer to caller");
  const answer = await rpc.createAnswer();
  await rpc.setLocalDescription(answer);
  if(this.props.username !== isCaller){
    sendMessage(rpc.localDescription, "answer", this.props.username)
  }
  }

  async handleVideoAnswerMsg(msg) {
    log("*** Call recipient has accepted our call");
  
    // Configure the remote description, which is the SDP payload
    // in our "video-answer" message.
    
    var desc = new RTCSessionDescription(msg);
    console.log("localStream =>", desc)
    await pc.setRemoteDescription(desc).catch(this.reportError);
  }

  // A new ICE candidate has been received from the other peer. Call
// RTCPeerConnection.addIceCandidate() to send it along to the
// local ICE framework.

async handleNewICECandidateMsg(msg) {
  var candidate = new RTCIceCandidate({
      sdpMLineIndex: msg.label,
      candidate: msg.candidate,
      usernameFragment: msg.usernameFragment
    });

  log("*** Adding received ICE candidate: " + JSON.stringify(candidate));
  try {
    await pc.addIceCandidate(candidate)
  } catch(err) {
    this.reportError(err);
  }
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
      pc.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent.bind(this);
      pc.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent
      pc.ontrack = this.handleRemoteStreamAdded.bind(this);
      // pc.onremovetrack = this.handleRemoteHangup;
      pc.onsignalingstatechange = this.handleSignalingStateChangeEvent.bind(this);
      // Theirs
      // pc.addEventListener('track', event => {
      //   console.log('Got remote track:', event.streams[0]);
      //   this.gotRemoteMediaStream(event.streams[0])
      //   event.streams[0].getTracks().forEach(track => {
      //     console.log('Add a track to the remoteStream:', track);
      //     remoteStream.addTrack(track); 
      //   });
      // });
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
        this.closeVideoCall();
        break;
    }
  }

  // Set up a |signalingstatechange| event handler. This will detect when
// the signaling connection is closed.
//
// NOTE: This will actually move to the new RTCPeerConnectionState enum
// returned in the property RTCPeerConnection.connectionState when
// browsers catch up with the latest version of the specification!

handleSignalingStateChangeEvent(event) {
  log("*** WebRTC signaling state changed to: " + pc.signalingState);
  switch(pc.signalingState) {
    case "closed":
      this.closeVideoCall();
      break;
  }
}
  
  handleCreateOfferError(event) {
    console.log('createOffer() error: ', event);
  }

registerPeerConnectionListeners() {
    rpc.addEventListener('icegatheringstatechange', () => {
      console.log(
          `ICE gathering state changed: ${rpc.iceGatheringState}`);
    });
  
    rpc.addEventListener('connectionstatechange', () => {
      console.log(`Connection state change: ${rpc.connectionState}`);
    });
  
    rpc.addEventListener('signalingstatechange', () => {
      console.log(`Signaling state change: ${rpc.signalingState}`);
    });
  
    rpc.addEventListener('iceconnectionstatechange ', () => {
      console.log(
          `ICE connection state change: ${rpc.iceConnectionState}`);
    });
}
  
  async doCall() {
    log("*** Negotiation needed");
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
    sendMessage(pc.localDescription, "offer", this.props.username);
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
    console.log('Remote stream added.', this.remoteVideoRef);
    if (this.remoteVideoRef.current.srcObject) return;
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
  gotRemoteMediaStream(mediaStream, ref) {
    remoteStream = mediaStream;
    ref.current.srcObject = mediaStream;
  }

// Close the RTCPeerConnection and reset variables so that the user can
// make or receive another call if they wish. This is called both
// when the user hangs up, the other user hangs up, or if a connection
// failure is detected.

closeVideoCall() {

  log("Closing the call");

  // Close the RTCPeerConnection

  if (pc) {
    log("--> Closing the peer connection");

    // Disconnect all our event listeners; we don't want stray events
    // to interfere with the hangup while it's ongoing.

    pc.ontrack = null;
    pc.onnicecandidate = null;
    pc.oniceconnectionstatechange = null;
    pc.onsignalingstatechange = null;
    pc.onicegatheringstatechange = null;
    pc.onnotificationneeded = null;

    // Stop all transceivers on the connection

    pc.getTransceivers().forEach(transceiver => {
      transceiver.stop();
    });

    // Stop the webcam preview as well by pausing the <video>
    // element, then stopping each of the getUserMedia() tracks
    // on it.

    if (localVideo.current.srcObject) {
      console.log("MG =>",localVideo)
      localVideo.current.pause();
      localVideo.current.srcObject.getTracks().forEach(track => {
        track.stop();
      });
    }

    // Close the peer connection

    pc.close();
    pc = null;
    localStream = null;
  }

  // Disable the hangup button

  // document.getElementById("hangup-button").disabled = true;
  // targetUsername = null;
}

// Handle the "hang-up" message, which is sent if the other peer
// has hung up the call or otherwise disconnected.

handleHangUpMsg(msg) {
  log("*** Received hang up notification from other peer");

  this.closeVideoCall();
}

// Hang up the call by closing our end of the connection, then
// sending a "hang-up" message to the other peer (keep in mind that
// the signaling is done on a different connection). This notifies
// the other peer that the connection should be terminated and the UI
// returned to the "no call in progress" state.

// hangUpCall() {
//   this.closeVideoCall();

//   sendToServer({
//     name: myUsername,
//     target: targetUsername,
//     type: "hang-up"
//   });
// }

  startAction() {
    this.setState({media:true})
    console.log("isInitiator? ",isInitiator, remoteVideo, this.state.local)
    remoteStream = new MediaStream();
    this.remoteVideoRef.current.srcObject = remoteStream;
    
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
    isInitiator = true
    isCaller = this.props.username;
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

  // handleRemoteHangup() {
  //   console.log('Session terminated.');
  //   this.stop();
  //   isInitiator = false;
  // }

  stop() {
    isStarted = false;
    // pc.close();
    // pc = null;
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