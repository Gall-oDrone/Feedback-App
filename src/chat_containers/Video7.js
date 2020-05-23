import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { SOCKET_URL } from "../settings";
import { log, log_error, registerPeerConnectionListeners} from "../fns";
import "../assets/style.css";
// On this codelab, you will be streaming only video (video: true).

var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream;
var caller;
var callee;
var transceiver;
var candidates = [];
var roomName = 'st';
var ws = 'ws://';
if(window.location.protocol=="https:"){ ws = 'wss://'; }
var chatSocket
isChannelReady = true;

////////////////////////////////////////////////

function sendMessage(message, comm, user, target) {
  if(message.type){
    log(`Client >>${user}<< sending message ==> ${message.type}, to ${target}`);
  } else {log(`Client >>${user}<< sending message ==> ${message}`);}
  
  chatSocket.send(JSON.stringify({
    command: comm,
    from: user,
    to: target,
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
    chatSocket = new WebSocket(`${SOCKET_URL}` + '/ws/chat/video_chat/' + "1" + '/');
    this.socketRef = chatSocket;
    this.videoRef = React.createRef();
    this.remoteVideoRef = React.createRef();
    remoteVideo = this.remoteVideoRef;
    localVideo = this.videoRef;

    this.state = {
      initiated: false,
      local:true,
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

  // componentWillReceiveProps(newProps) {
  //   // if (this.props.match.params.chatID !== newProps.match.params.chatID) {
  //   if (this.props.params !== newProps.params) {
  //     this.disconnect();
  //     this.connect();
  //     // WebSocketInstance.connect(newProps.match.params.chatID);
  //   } else {
  //     this.disconnect();
  //   }
  // }

  connect = () => {
    this.socketRef.onopen = () => {
      console.log("WebSocket open at VIDEO 7");
      sendMessage("participants", "get_participants", this.props.username, null)
    };
  this.socketRef.onmessage = async e => {
    var data = JSON.parse(e.data);
    var message = data['message'];
    var to_user = data["to"]
    if(message.participants) { 
      this.setState({participants: message.participants})
    }
    console.log("A: ", this.state.participants)
    if(this.props.username === (message.to || to_user)){
      if(message.type){
        log(`Client >>${this.props.username}<< receiving message ==> ${message.type}`);
      } else {log(`Client >>${this.props.username}<< receiving message ==> ${message.message}`);}
      if (message.message === 'got user media') {
        this.setState({ local:false})
        caller = this.props.username
        this.maybeStart();
      } else if (message.type === 'offer') {
        this.setState({ initiated:true})
        callee = this.props.username
        // if (!isInitiator && !isStarted) {
        //   this.maybeStart();
        // }
        // this.handleVideoOfferMsg(message)
        //Theirs
        console.log("CALLEE: ", callee, caller)
        if(callee === this.props.username){
          if(!pc){
            await this.createPeerConnection()
            // pc.setRemoteDescription(new RTCSessionDescription(message));
            if (pc.signalingState !== "stable") {
              log("  - But the signaling state isn't stable, so triggering rollback");
          
              await Promise.all([
                pc.setLocalDescription({type: "rollback"}),
                pc.setRemoteDescription(new RTCSessionDescription(message))
              ]);
              return;
            } else {
              log("  - Setting O on remote description");
              pc.setRemoteDescription(new RTCSessionDescription(message)).then(() => this.doAnswer());
            }
            //Theirs
            // this.doAnswer();
          }
          
        }
      } else if (message.type === 'answer' && isStarted) {
        if (!pc.currentRemoteDescription && message && this.props.username === caller) {
        //Yours if answer
        log("  - Setting A on remote description");
        await pc.setRemoteDescription(new RTCSessionDescription(message));
        } else { log("Couldn't set RD to Caller in Answer")}
      } else if (message.type === 'candidate') {
        if(!pc || !pc.remoteDescription){
          //push candidate onto queue...
          log("push candidate onto ARRAY")
          candidates.push(message.candidate)
        } else{
            log(`Adding candidate to >>${this.props.username}<< candidates`);
            var candidate = new RTCIceCandidate({
              sdpMLineIndex: message.label,
              candidate: message.candidate
            });
            pc.addIceCandidate(candidate);
        }
      } else if (message.message === 'end' && isStarted) {
        this.handleRemoteHangup();
      }
    };
  };
}

disconnect = () => {
  sendMessage("disconnect", "disconnect", this.props.username, null)
  this.socketRef.close();
}

  maybeStart() {
    console.log('>>>>>>> maybeStart() ', isStarted, typeof localStream, isChannelReady);
    if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
      log('>>>>>> creating peer connection');
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
    .then(sendMessage(pc.localDescription, "answer", this.props.username, caller))
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

      if(!localStream){
        localStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
        this.videoRef.current.srcObject = localStream
           localStream.getTracks().forEach(track => {
          pc.addTrack(track, localStream);
        });
        isStarted = true;
      }
      // if(localStream){
      //   localStream.getTracks().forEach(track => {
      //     pc.addTrack(track, localStream);
      //   });
      // } else {
      //   localStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
      //   this.videoRef.current.srcObject = localStream
      // }
      pc.onicecandidate = this.handleIceCandidate.bind(this);
      registerPeerConnectionListeners(pc);
      
      // Theirs
      pc.addEventListener('track', event => {
        this.gotRemoteMediaStream(event.streams[0])
        event.streams[0].getTracks().forEach(track => {
          console.log('Add a track to the remoteStream:', track);
          remoteStream.addTrack(track); 
        });
      });
      pc.onremovestream = this.handleRemoteStreamRemoved;
    
      console.log('RTCPeerConnnection Created');
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ' + e.message);
      alert('Cannot create RTCPeerConnection object.');
      return;
    }
  }
  
  async handleIceCandidate(event) {
    if (event.candidate) {
      log(`icecandidate event: ${event.candidate.candidate}`);
      this.state.participants.forEach(el => {
        if(this.props.username !== el){
          var cll_or_cllee
          if(this.props.username === caller){
            cll_or_cllee = "caller"
          } else {
            cll_or_cllee = "callee"
          }
          sendMessage({
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate
          }, cll_or_cllee, this.props.username, el);
        }
      })
      if(candidates.length > 1){
        candidates.forEach((el, index) => {
          var candidate = new RTCIceCandidate({
            sdpMLineIndex: index,
            candidate: el
          });
          pc.addIceCandidate(candidate);
        })
      }
    } else {
      log('End of candidates.');
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
    log('Creating Offer to peer');
    await pc.createOffer(this.setLocalAndSendMessage.bind(this), this.handleCreateOfferError);
  }
  
  doAnswer() {
    log('Creating Answer to peer.');
    pc.createAnswer().then(
      this.setLocalAndSendMessage.bind(this),
      this.onCreateSessionDescriptionError
    );
  }
  
  setLocalAndSendMessage(sessionDescription) {
    //Yours if offer, theirs if answer
    pc.setLocalDescription(sessionDescription);

    log(`Sending >> ${sessionDescription.type} << to Server`);
  
    if(sessionDescription.type === "offer"){
      sendMessage(sessionDescription, "offer", this.props.username, callee);
    }
    else if(sessionDescription.type === "answer"){
      sendMessage(sessionDescription, "answer", this.props.username, "q");
      pc.onicecandidate = this.handleIceCandidate.bind(this);
    }
  }
  
  onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description: ' + error.toString());
  }
  
  async handleRemoteStreamAdded(event) {
    try{
      remoteVideo.current.srcObject = event.streams[0];
      log('Remote peer connection received remote stream.');
    }catch (error){
      remoteVideo.current.src = window.URL.createObjectURL(event.streams[0]);
    }

    event.streams[0].getTracks().forEach(track => {
        log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
      })
  }

  handleRemoteStreamRemoved(event) {
    log('Remote stream removed. Event: ', event);
  }

  gotLocalMediaStream(mediaStream, ref) {
    localStream = mediaStream;
    ref.current.srcObject = mediaStream;
  }

  // Handles remote MediaStream success by adding it as the remoteVideo src.
  gotRemoteMediaStream(event) {
    const mediaStream = event;
    remoteVideo.current.srcObject = mediaStream;
    remoteStream = mediaStream;
    log('On Function >> gotRemoteMediaStream << Remote peer connection received.');
  }

  startAction() {
    this.setState({media:true})
    
      if(localStream === null || localStream === undefined){
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
        .then(stream => this.gotLocalMediaStream(stream, this.videoRef))
        .then(() => sendMessage("got user media", "media", this.props.username, this.props.username))
        .catch(error => console.error(error))
      }
  }

  // Handles call button action: creates peer connection.
  async callAction() {
    // this.setState({ initiated:true})
    isInitiator = true;
    caller = this.props.username
    this.state.participants.forEach(el => {
      if(el !== caller){
        callee = el
      }
    })
    log(`¿ isInitiator ? ${isInitiator}`)
    log(` >> ${caller} << is the Caller`)
    log(` >> ${callee} << is the callee`)
    pc.onnegotiationneeded = this.doCall();
  }

  // Handles hangup action: ends up call, closes connections and resets peers.
  hangupAction() {
    // hangupButton.disabled = true;
    // callButton.disabled = false;
    this.stop();
    log('Ending call.');
    sendMessage("End Call", "end", this.props.username, callee)
  }

  handleRemoteHangup() {
    log('Session terminated.');
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
    log(`Participants: ${this.state.participants}, Par: ${this.par}`)
    return( 
      <div id="frame">
          <div id="video-container-outer">
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
          </div>
            <div id="button-outer">
              <div id="button-inner">
                  <button className="button" disabled={media} onClick={() => {this.startAction()}} id="startButton">Start</button>
                  <button className="button" disabled={initiated} onClick={() => {this.callAction()}} id="callButton">Call</button>
                  <button className="button" onClick={() => {this.hangupAction()}} id="hangupButton">Hang Up</button>
              </div>
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