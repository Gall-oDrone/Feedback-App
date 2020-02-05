// import React from 'react';
// import DailyIframe from '@daily-co/daily-js';
// import { Layout } from 'antd';
// // import "../assets/styleDailyCo.css";


// const { Header, Content, Footer, Sider } = Layout;

// const iframe = <Iframe src={'https://testwebapp.daily.co/hello'} width="540" height="450" allow="microphone" camera= "autoplay"></Iframe>;

// const createFrame = () => (
//     DailyIframe.createFrame()
// );

// window.frame = DailyIframe.createFrame();
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