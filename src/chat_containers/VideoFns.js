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
export function handleLocalMediaStreamError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// Connects with new peer candidate.
export function handleConnection(event) {
  const peerConnection = event.target;
  const iceCandidate = event.candidate;
  
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
export function getOtherPeer(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      remotePeerConnection : localPeerConnection;
}

// Gets the name of a certain peer connection.
export function getPeerName(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      'localPeerConnection' : 'remotePeerConnection';
}

// Logs that the connection succeeded.
export function handleConnectionSuccess(peerConnection) {
  console.log(`${getPeerName(peerConnection)} addIceCandidate success.`);
};

// Logs that the connection failed.
export function handleConnectionFailure(peerConnection, error) {
  console.log(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n`+
        `${error.toString()}.`);
}

// Logs changes to the connection state.
export function handleConnectionChange(event) {
  const peerConnection = event.target;
  console.log('ICE state change event: ', event);
  console.log(`${getPeerName(peerConnection)} ICE state: ` +
        `${peerConnection.iceConnectionState}.`);
}

// Logs error when setting session description fails.
export function setSessionDescriptionError(error) {
  console.log(`Failed to create session description: ${error.toString()}.`);
}

// Logs success when setting session description.
export function setDescriptionSuccess(peerConnection, functionName) {
  const peerName = getPeerName(peerConnection);
  console.log(`${peerName} ${functionName} complete.`);
}

// Logs success when localDescription is set.
export function setLocalDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setLocalDescription');
}

// Logs success when remoteDescription is set.
export function setRemoteDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setRemoteDescription');
}

// Logs offer creation and sets peer connection session descriptions.
export function createdOffer(description, localPeerConnection) {
  console.log(`Offer from localPeerConnection:\n${description.sdp}`);
  console.log('localPeerConnection setLocalDescription start.');
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
export function createdAnswer(description) {
  console.log(`Answer from remotePeerConnection:\n${description.sdp}.`);

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