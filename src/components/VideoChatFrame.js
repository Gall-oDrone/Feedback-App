import React from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import DailyIframe from '@daily-co/daily-js';
import Iframe from "./iFrame";
const iframe = <Iframe src="https://www.example.com/show?data..." width="540" height="450"></Iframe>; 

function createFrameAndJoinRoom() {
  window.callFrame = window.DailyIframe.createFrame();
  callFrame.join({ url: A_DAILY_CO_ROOM_URL });
}
let MY_IFRAME = iframe 


class ProductList2 extends React.Component {

    state = {
        loading: false,
        error: null,
        data: []
    }
    componentDidMount() {
        this.setState({loading:true})
        axios.get("/some-url")
        .then(res => {
            this.setState.setState({
                data: res.data,
                loading: false

            });
        })
        .catch(err => {
            this.setState({error: err, loading: false})
        })
    }

    async createFrameAndRoom() {
        document.getElementById('create-a-room').style.display = 'none';
        await this.createRoom();
        await this.createFrame();
        this.buttonEnable('join-meeting');
      }
  
      // async createRoom() {
      //   //
      //   // create a short-lived demo room and a meeting token that gives
      //   // owner privileges and allows recording. if you just want to
      //   // hard-code a meeting link for testing you could do something like
      //   // this:
      //   //
      //   //   room = { url: 'https://your-domain.daily.co/hello' }
      //   //   ownerLink = room.url;
      //   //
      //   const room = await DailyIframe.createMtgRoom();
      //   const ownerLink = await DailyIframe.createMtgLinkWithToken(
      //     room, { 
      //       is_owner: true,
      //       enable_recording: 'local'
      //   });
      // }
      
      // async createFrame() {
      //   //
      //   // ask the daily-js library to create an iframe inside the
      //   // 'call-frame-container' div
      //   //
      //   let customLayout = !!document
      //                          .querySelector('input[name="customLayout"]:checked')
      //                          .value,
      //       cssFile = customLayout ? 'basics.css' : null;
      //    const callFrame = window.DailyIframe.createFrame(
      //     document.getElementById('call-frame-container'),
      //     { customLayout, cssFile }
      //   );
      // }

  render() {
    let callFrame = DailyIframe.createFrame();
    return (
      <div id="page-blocks">
  <div id="create-a-room">
    <button onclick="createFrameAndRoom()">create a room</button>
    <div>
      <input type="radio" name="customLayout" value="" checked>
        standard Daily.co UI
      </input>
    </div>
    <div>
      <input type="radio" name="customLayout" value="true">
        demo custom UI
      </input>
    </div>
  </div>
  
  <div id="meeting-info-row">
    <div id="meeting-room-info" class="info">
      room info
    </div>
    <div id="meeting-participants-info" class="info">
      meeting participants
    </div>
    <div id="network-info" class="info">
      network stats
    </div>  
  </div>
  
  <div id="buttons-row">
    <div>
      <button id="join-meeting" onclick="callFrame.join({ url: ownerLink })">
        join meeting (as owner)
      </button>
      <button id="leave-meeting" onclick="callFrame.leave()">
        leave meeting
      </button>
    </div>
    <div>
      <button id="toggle-local-cam" onclick="toggleCam()">
        toggle local cam
      </button>
      <button id="toggle-local-mic" onclick="toggleMic()">
        toggle local mic
      </button>
    </div>
    <div>
      <button id="start-recording"
              onclick="buttonDisable('start-recording');
                       callFrame.startRecording()">
        start recording
      </button>
      <button id="stop-recording" onclick="callFrame.stopRecording()">
        stop recording
      </button>
    </div>
    <div>
      <button id="start-screenshare" onclick="callFrame.startScreenShare()">
        start screenshare
      </button>
      <button id="stop-screenshare" onclick="callFrame.stopScreenShare()">
        stop screenshare
      </button>
    </div>
  </div>
  {callFrame} 
  <div id="call-frame-container">
  </div>
</div>
    )
  }
}
export default ProductList2;