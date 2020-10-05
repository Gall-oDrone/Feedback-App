let localhost = null
const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
if (process.env.NODE_ENV === "production"){
  localhost = 'https://py3-test-app.herokuapp.com'
  // console.log("process.env.PUBLIC_URL", JSON.stringify(process.env.PUBLIC_URL))
  // console.log("window.location", JSON.stringify(window.location))
  // console.log("publicUrl", JSON.stringify(publicUrl))
} else {
  localhost = 'http://127.0.0.1:8000'
  // console.log("process.env.PUBLIC_URL", JSON.stringify(process.env.PUBLIC_URL))
  // console.log("window.location", JSON.stringify(window.location))
  // console.log("publicUrl", JSON.stringify(publicUrl))
}

const apiURL = '/api'
const apiArticlesURL = '/api/articles'
const imageURL = '/media'
const mediaURL = imageURL

// Output logging information to console.

export function log(text) {
  var time = new Date();

  console.log("[" + time.toLocaleTimeString() + "] " + text);
}

// Output an error message to console.

export function log_error(text) {
  var time = new Date();

  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}

export function registerPeerConnectionListeners(pc) {
  pc.addEventListener('icegatheringstatechange', () => {
    console.log(
        `ICE gathering state changed: ${pc.iceGatheringState}`);
  });

  pc.addEventListener('connectionstatechange', () => {
    console.log(`Connection state change: ${pc.connectionState}`);
  });

  pc.addEventListener('signalingstatechange', () => {
    console.log(`Signaling state change: ${pc.signalingState}`);
  });

  pc.addEventListener('iceconnectionstatechange ', () => {
    console.log(
        `ICE connection state change: ${pc.iceConnectionState}`);
  });
}

// export function ObjectQuery() {
//   $(function() {
//     $('#datepicker').datepicker({
//         changeYear: true,
//         showButtonPanel: true,
//         dateFormat: 'yy',
//         onClose: function(dateText, inst) { 
//             var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
//             $(this).datepicker('setDate', new Date(year, 1));
//         }
//     });
//   $(".date-picker-year").focus(function () {
//         $(".ui-datepicker-month").hide();
//     });
//   });
// }