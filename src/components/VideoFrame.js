import React from 'react';
import DailyIframe from '@daily-co/daily-js';

class VideoCallFrame extends React.Component {

  constructor(props) {
    super(props);
    this.iframeRef = React.createRef();
  }

  componentDidMount() {
    console.log("URL Daily.Co: " + JSON.stringify(this.props.url))
    if (!this.props.url) {
      console.error('please set REACT_APP_DAILY_ROOM_URL env variable!');
      return;
    }
    this.daily = DailyIframe.wrap(this.iframeRef.current);
    this.daily.join({ url: this.props.url });
  }

  render() {
    return <iframe className="Video-Frame"
             title="video call iframe"
             ref={this.iframeRef}
             allow="camera; microphone; fullscreen"
           ></iframe>
  }
}

export default VideoCallFrame;


// import React from 'react';
// import DailyIframe from '@daily-co/daily-js';
// import { Layout } from 'antd';
// import {styles} from "../assets/styleDailyCo.module.css";


// const { Header, Content, Footer, Sider } = Layout;

// const iframe = <Iframe src={'https://testwebapp.daily.co/hello'} width="540" height="450" allow="microphone" camera= "autoplay"></Iframe>;

// // const createFrame = DailyIframe.createFrame()
// const frmeB = DailyIframe.iframe
// // const frame = DailyIframe.wrap(iframe);
// function mtgJoin () {
//     if (!window.frame) {
//       window.inp = document.getElementById('mtg-link');
//       window.frame = window.DailyIframe.createFrame(
//         document.getElementById('mtg-frame')
//       );
//     }
//     window.frame.join({ url: inp.value });
//   }
  
//   function mtgLeave () {
//     window.frame.leave();
//   }
  
// // let wrapFrame = DailyIframe.wrap()
// const Iframe = ({ source }) => {

//     // if (!source) {
//     //     return <div>Loading...</div>;
//     // }

//     const src = "https://testwebapp.daily.co/hello";
//     return (
//         // basic bootstrap classes. you can change with yours.
//         <div className="col-md-12">
//             <div className="emdeb-responsive">
//                 <div>
//                     <Layout>
//                         <Content>
//                         <iframe src={'https://testwebapp.daily.co/hello'} width="840" height="750" allow="microphone" camera= "autoplay"/>
//                         </Content>
//                     </Layout>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Iframe;