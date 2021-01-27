import React from 'react';
import { List, Avatar, Icon } from 'antd';
import {media_endpoint} from "../constants"
import "../assets/workshop.css"

class WorkshopVC extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = { 
      VideoPlayerModal: false,
    };
  }
  handleVideoBanner = (action) => {
    if (action === "open"){
      this.setState({VideoPlayerModal: true})
    }else {
      this.setState({VideoPlayerModal: false})
    }
  }
  render() {
    return (
        <div>
            {/* <div className="wclt_vc_3 wclt_vc_2 wclt_vc_1"> */}
              {/* <div className="_2rE_lCfgv6vHsuZX7fghr" aria-label="Close" onClick={() => {this.handleCloseModal()}}></div> */}
              {/* <div id="player" className="player player-02750c07-366c-49f2-85ff-cbfc31267285 js-player-fullscreen with-fullscreen with-sticky-custom-logo player-md player-cardsCorner"> */}
                {/* <div className="vp-video-wrapper transparent"> */}
                  <div className="vp-video">
                    {/* <div className="vp-telecine"> */}
                      <video controls src={this.props.video}>
                        <track kind="captions" src="/texttrack/7833658.vtt?token=600b4a26_0x6980e832c8c09197c823794e2423d945cc246f80" id="telecine-track-7833658" srclang="en" label="English"/>
                      </video>
                    {/* </div> */}
                  </div>
                {/* </div> */}
              {/* </div> */}
            {/* </div> */}
      </div>
      );
  }
}

export default WorkshopVC;