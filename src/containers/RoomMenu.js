import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import '../assets/App.css';
import '../assets/index.css';
import { Layout, Menu, Icon, Row, Col, Button, Progress, Tabs } from 'antd';
import VideoCallFrame from '../components/VideoFrame';
import MeetingReview from "../components/MeetingReview";
import MeetingListIncentives from "../components/MeetingIncentives";
import {getDetailRoom} from "../store/actions/dailyRooms";

var moment = require('moment');

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

class App2 extends React.Component {
  state = {
    defaultKey: "1",
    timeNow: moment().format("mm:ss"),
    timeDuration: moment( "2013-05-09T00:30:00Z" ).format("mm:ss"),
    minutes: 1,
    seconds: 0
  };

  // handlerTimeCounter(RoomKeys) {
  //   const {date_to_appointment} = RoomKeys
  //         console.log("ZZ: "+date_to_appointment)
  //         this.interval = setInterval(() => {
  //           var timeTillDate = date_to_appointment
  //           var timeFormat = 'YYYY-MM-DD HH:mm:ss'
  //           // const { timeTillDate, timeFormat } = this.props;
  //           const then = moment(timeTillDate, timeFormat);
  //           const then2 = moment( "2020-01-25T20:00:00Z", timeFormat)
  //           const now = moment();
  //           // const now2 = moment("2020-01-25T14:30:00Z").format("mm:ss");
  //           const countdown = moment(then2 - now);
  //           console.log("then: "+then2)
  //           console.log("now:"+ now)
  //           console.log("countdown:"+countdown)
    
  //           const minutes = countdown.format('mm');
  //           const seconds = countdown.format('ss');
  //           if (countdown <= 0 ){
  //             this.setState({ minutes:0, seconds:0, defaultKey: "2" });
  //           } else {
  //             this.setState({ minutes, seconds });
  //           }
            
  //       }, 1000);
  // }

  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      console.log("2) this.props.token: " + this.props.token)
      console.log("this.props: " + JSON.stringify(this.props))
      console.log("this.props.username: " + JSON.stringify(this.props.username))
      this.props.getDetailRoom(this.props.token, "b2Zea0d1nb1vaTTK7he3")
      }
    }

componentWillReceiveProps(newProps) {
  console.log("3) componentWillReceiveProps: ")
  console.log("3.5) CWRP newProps: " +JSON.stringify(newProps))
  console.log("3.5.1) CWRP getDetailRoom: " +JSON.stringify(this.props.roomDetails.RoomDetail))
  console.log("3.5.2) CWRP newProps getDetailRoom: " +JSON.stringify(newProps.roomDetails.RoomDetail))
  if (newProps.token !== this.props.token) {
    console.log("3.5.3) CWRP getDetailRoom: " +this.props.getDetailRoom(newProps.token, "b2Zea0d1nb1vaTTK7he3"))
    console.log("3.6) newProps.token !== this.props.token")
    console.log("3.7) CWRP newProps: " +JSON.stringify(newProps.token))
    console.log("3.8) CWRP Props: " +JSON.stringify(this.props.token))
    console.log("3.9) CWRP Props.username: " +JSON.stringify(this.props.username))
    console.log("3.9.1) CWRP newProps.username: " +JSON.stringify(newProps.username))
    console.log("3.9.2) CWRP newProps.params: " +JSON.stringify(newProps.match.params.roomID))
    console.log("3.9.3) CWRP Props.params: " +JSON.stringify(this.props.match.params.roomID))
    // newProps.getRoomDetail(newProps.token, "b2Zea0d1nb1vaTTK7he3")
    if (newProps.token !== undefined && newProps.token !== null) {
      console.log("4) CWRP newProps.loading: " +JSON.stringify(newProps.loading))
      console.log("4) CWRP Props.loading: " +JSON.stringify(this.props.loading))
        this.props.getDetailRoom(newProps.token, "b2Zea0d1nb1vaTTK7he3")
      }
  } else if (this.props.roomDetails.RoomDetail !== undefined){
    // this.handlerTimeCounter(this.props.roomDetails.RoomDetail)
  } else if (newProps.roomDetails.RoomDetail !== undefined){
    // this.handlerTimeCounter(newProps.roomDetails.RoomDetail)
  }
}

componentWillUnmount() {
    if (this.interval) {
        clearInterval(this.interval);
    }
}

    render() {
      console.log("this.props: "+ JSON.stringify(this.props))
      const { minutes, seconds, defaultKey } = this.state;
      console.log("defaultKey: "+ JSON.stringify(defaultKey))
      if(this.props.roomDetails.RoomDetail !== undefined){
        const {date_to_appointment} = this.props.roomDetails.RoomDetail
        console.log("date_to_appointment: "+date_to_appointment)
      }
      const duration2 = moment().utcOffset(0).set({ minute: minutes, second: seconds}).format("mm:ss")
      var ss = moment(duration2, 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
      var totalSec = moment("30:00", 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
      return (
        <div>
          <Row type="flex" justify="center" align="top">
          <Col span={3} pull={3}>
              <div>
                { minutes === 0 && seconds === 0
                    ? <Button disabled icon="user"> Call user</Button>
                    : <Button icon="user" onClick={()=>{this.decline()}}> Call user</Button>
                }
              </div>
            </Col>
            <Col span={12} style={{justifyContent: 'center'}}>
              <div>
                { minutes === 0 && seconds === 0
                    ? <h1 align="center">Meeting finished please provide a review!</h1>
                    : <h1 align="center">Time Remaining: {`${duration2}`}</h1>
                    // : <h1 align="center">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
              </div>
              <Progress percent={ss/totalSec * 100} format={() => `${duration2}`}/>
            </Col>
          </Row>

          <Row>
          <Content style={{ padding: '0', minHeight: 600 }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Col span={5}>
                  <Tabs defaultActiveKey={"3"} tabPosition="left" style={{ marginRight: "90rem", height: 720, width:900}}>
                    <TabPane key={"1"} tab={
                            <span>
                            <Icon type="book" />
                                Tips and Advices
                            </span>
                        }
                    >
                    </TabPane>
                    <TabPane key={"2"} tab={
                            <span>
                            <Icon type="notification" />
                                Review Meeting
                            </span>
                        }
                    >
                      <MeetingReview/>
                    </TabPane>
                    <TabPane key={"3"} tab={
                            <span>
                            <Icon type="trophy" />
                                Offer Incentives
                            </span>
                        }
                    >
                      <MeetingListIncentives/>
                    </TabPane>
                    <TabPane key={"4"} tab={
                          <span>
                          <Icon type="camera" />
                              Video Chat
                          </span>
                      }
                  >                        
                        <div className="App">
                          <header className="App-header">
                            <p>
                              Edit <code>src/App.js</code> and save to reload.
                            </p>
                            <a
                              className="App-link"
                              href="https://reactjs.org"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Learn React
                            </a>
        
                            <VideoCallFrame url={`https://testwebapp.daily.co/b2Zea0d1nb1vaTTK7he3`}/>
        
                          </header>
                        </div>
                    </TabPane>
                    </Tabs>    
              </Col>
            </Layout>
          </Content>
          </Row>
        </div>
           )
  }
} 

const mapStateToProps = state => {
  console.log("mapStateToProps: "+JSON.stringify(state))
  /*console.log("1) ASNT List mapStateToProps containers state 1: "+ JSON.stringify(state.assignments.assignments))
  console.log("2) ASNT List mapStateToProps containers state 2: "+ JSON.stringify(state.assignments))
  console.log("2) ASNT List mapStateToProps containers state 3: "+ JSON.stringify(state))*/
  return {
    token: state.auth.token,
    username: state.auth.username,
    roomDetails: state.roomDetail,
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getDetailRoom: (token, roomName) => dispatch(getDetailRoom(token, roomName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App2);