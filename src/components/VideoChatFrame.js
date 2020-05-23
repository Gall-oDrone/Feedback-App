import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import "../assets/main.css";
import * as videoFns from "../chat_containers/VideoFns";
import axios from 'axios';
import { authAxios } from '../utils';
import { vcroomGetDetailURL } from "../constants";
// On this codelab, you will be streaming only video (video: true).
const mediaStreamConstraints = {
  video: true,
};

// Video element where stream will be placed.
const localVideo = null
var remoteVideo = null;

// Local stream that will be reproduced on the video.
let localStream;
let remoteStream;

let localPeerConnection;
let remotePeerConnection;

const offerOptions = {
  offerToReceiveVideo: 1,
};

// Handles error by logging a message to the console with the error message.
function handleLocalMediaStreamError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// Connects with new peer candidate.
function handleConnection(event) {
  const peerConnection = event.target;
  const iceCandidate = event.candidate;
  console.log("t:2", iceCandidate)
  
  if (iceCandidate) {
    const newIceCandidate = new RTCIceCandidate(iceCandidate);
    const otherPeer = getOtherPeer(peerConnection);

    otherPeer.addIceCandidate(newIceCandidate)
      .then(() => {
        handleConnectionSuccess(peerConnection);
      }).catch((error) => {
        handleConnectionFailure(peerConnection, error);
      });
    console.log(`${getPeerName(peerConnection)} ICE candidate:\n` +
          `${event.candidate.candidate}.`);
  }
}

// Gets the "other" peer connection.
function getOtherPeer(peerConnection) {
  console.log("000: ", peerConnection === localPeerConnection)
  return (peerConnection === localPeerConnection) ?
      remotePeerConnection : localPeerConnection;
}

// Gets the name of a certain peer connection.
function getPeerName(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      'localPeerConnection' : 'remotePeerConnection';
}

// Logs that the connection succeeded.
function handleConnectionSuccess(peerConnection) {
  console.log(`${getPeerName(peerConnection)} addIceCandidate success.`);
};

// Logs that the connection failed.
function handleConnectionFailure(peerConnection, error) {
  console.log(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n`+
        `${error.toString()}.`);
}

// Logs changes to the connection state.
function handleConnectionChange(event) {
  const peerConnection = event.target;
  console.log('ICE state change event: ', event);
  console.log(`${getPeerName(peerConnection)} ICE state: ` +
        `${peerConnection.iceConnectionState}.`);
}

// Logs error when setting session description fails.
function setSessionDescriptionError(error) {
  console.log(`Failed to create session description: ${error.toString()}.`);
}

// Logs success when setting session description.
function setDescriptionSuccess(peerConnection, functionName) {
  const peerName = getPeerName(peerConnection);
  console.log(`${peerName} ${functionName} complete.`);
}

// Logs success when localDescription is set.
function setLocalDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setLocalDescription');
}

// Logs success when remoteDescription is set.
function setRemoteDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setRemoteDescription');
}

// Logs offer creation and sets peer connection session descriptions.
function createdOffer(description, localPeerConnection) {
  console.log(`Offer from localPeerConnection:\n${description.sdp}`);
  console.log('localPeerConnection setLocalDescription start.');
  console.log('t:4', localPeerConnection);
  localPeerConnection.setLocalDescription(description)
    .then(() => {
      setLocalDescriptionSuccess(localPeerConnection);
    })
    .catch(setSessionDescriptionError);

  console.log('remotePeerConnection setRemoteDescription start.');
  remotePeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(remotePeerConnection);
    }).catch(setSessionDescriptionError);

    console.log('remotePeerConnection createAnswer start.');
  remotePeerConnection.createAnswer()
    .then(createdAnswer)
    .catch(setSessionDescriptionError);
}

// Logs answer to offer creation and sets peer connection session descriptions.
function createdAnswer(description) {
  console.log(`Answer from remotePeerConnection:\n${description.sdp}.`);

  console.log('00: ', description);
  console.log('remotePeerConnection setLocalDescription start.');
  remotePeerConnection.setLocalDescription(description)
    .then(() => {
      setLocalDescriptionSuccess(remotePeerConnection);
    }).catch(setSessionDescriptionError);

  console.log('localPeerConnection setRemoteDescription start.');
  localPeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);
}

class VideoCallFrame extends React.Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.remoteVideoRef = React.createRef();
    // this.isInitiator = false;

    this.state = {
      otherUserId: null,
      participants: null
    };

    // this.user = window.user;
    // this.user.stream = null;
    // this.peers = {};

  }

  componentDidMount() {
    console.log("URL Daily.Co: " + JSON.stringify(this.props.url))
    if(this.props.token !== undefined){
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
      axios.get(vcroomGetDetailURL(this.props.match.params.roomID))
      .then(res => {
        console.log("0O", res.data)
        this.setState({
          participants: res.data.participants
        })
      })
      .catch(err => console.log(err))
    }
    // Initializes media stream.
    // navigator.mediaDevices
    //         .getUserMedia(mediaStreamConstraints)
    //         .then(stream => this.gotLocalMediaStream(stream, this.videoRef))
    //         .catch(handleLocalMediaStreamError);
    //       if (!this.props.url) {
    //         console.error('please set REACT_APP_DAILY_ROOM_URL env variable!');
    //         return;
    //       }
  }

  gotLocalMediaStream(mediaStream, ref) {
    // const videoTracks = mediaStream.getVideoTracks()
    // const track = videoTracks[0]
    // alert(`Getting video from: ${track.label}`)
    localStream = mediaStream;
    ref.current.srcObject = mediaStream;
    localStream.getTracks().forEach(track => localPeerConnection.addTrack(track, localStream));
   
  }

  // Handles remote MediaStream success by adding it as the remoteVideo src.
gotRemoteMediaStream(event) {
  const mediaStream = event.stream;
  remoteVideo.current.srcObject = mediaStream;
  remoteStream = mediaStream;
  console.log('Remote peer connection received remote stream.');
}

  startAction() {
    // startButton.disabled = true;
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
      .then(stream => this.gotLocalMediaStream(stream, this.videoRef))
      .catch(handleLocalMediaStreamError);
  }

  // Handles call button action: creates peer connection.
  callAction(initiator) {
    // callButton.disabled = true;
    // hangupButton.disabled = false;
    this.isInitiator = initiator
    console.log('Starting call.');
    let startTime = window.performance.now();

    // Get local media stream tracks.
    const videoTracks = localStream.getVideoTracks();
    const audioTracks = localStream.getAudioTracks();
    if (videoTracks.length > 0) {
      console.log(`Using video device: ${videoTracks[0].label}.`);
    }
    if (audioTracks.length > 0) {
      console.log(`Using audio device: ${audioTracks[0].label}.`);
    }

    const servers = {
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

    // Create peer connections and add behavior.
    localPeerConnection = new RTCPeerConnection(servers);
    console.log('Created local peer connection object localPeerConnection.');

    console.log('t:1');
    localPeerConnection.addEventListener('icecandidate', handleConnection);
    localPeerConnection.addEventListener(
      'iceconnectionstatechange', handleConnectionChange);
      
    remotePeerConnection = new RTCPeerConnection(servers);
    console.log('Created remote peer connection object remotePeerConnection.');

    console.log('t:3');
    remotePeerConnection.addEventListener('icecandidate', handleConnection);
    remotePeerConnection.addEventListener(
      'iceconnectionstatechange', handleConnectionChange);

    remoteVideo = this.remoteVideoRef

    remotePeerConnection.addEventListener('addstream', this.gotRemoteMediaStream);

    // Add local stream to connection and create offer to connect.
    localPeerConnection.addStream(localStream);
    console.log('Added local stream to localPeerConnection.');

    console.log('localPeerConnection createOffer start.');
    localPeerConnection.createOffer(offerOptions)
      .then(description => createdOffer(description, localPeerConnection))
      .catch(setSessionDescriptionError);
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
                        <button className="button btn-success btn-sm" onClick={() => {this.callAction(true)}} id="callButton">Call</button>
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