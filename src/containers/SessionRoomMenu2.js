import React from 'react';
import { connect } from "react-redux";
import Hoc from "../hoc/hoc";
import { withRouter } from "react-router-dom";
import '../assets/App.css';
import '../assets/index.css';
import { Layout, Menu, Icon, Row, Col, Button, Progress, Tabs } from 'antd';
import VideoCallFrame from '../components/VideoFrame';
import MeetinP from "./MeetingParticipantSelector";
import {getDetailRoom, updateRoom} from "../store/actions/dailyRooms";
import {getProfileSessionDetail} from "../store/actions/profileSession";

var moment = require('moment');

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

class App2 extends React.Component {
  state = {
    defaultKey: "3",
    timeNow: moment().format("mm:ss"),
    timeNow2: moment().format(),
    timeDuration: moment( "2013-05-09T00:30:00Z" ).format("mm:ss"),
    minutes: 1,
    seconds: 0,
    min:5,
    sec:0,
    disabledB:false,
    disabledA:true,
    caller:false
  };

  handlerTimeCounter(RoomKeys) {
    const {date_to_appointment, dta_start_time} = RoomKeys
          console.log("ZZ: "+date_to_appointment)
          const dateTest = "2020-03-14T16:20:00-06:00"
          if(moment().format()> moment((dateTest)).format()){
            console.log("now > DTA")
            console.log(moment(new Date(dateTest)).format())
            console.log(moment().format())
            console.log(moment().format() > moment(new Date(dateTest)).format())
            this.setState({ minutes:0, seconds:0, disabledB:false, disabledA:false, defaultKey: "2" });
          } else {
            this.intervalZ = setInterval(() => {
              console.log("now < DTA")
              var timeTillDate = date_to_appointment
              var timeFormat = 'YYYY-MM-DD HH:mm:ss'
              // const { timeTillDate, timeFormat } = this.props;
              const then = moment(timeTillDate, timeFormat).add('m', 30);
              const then2 = moment( dateTest, timeFormat)
              const now = moment();
              const countdown = (then2 - now)
              console.log("then: "+then2)
              console.log("now:"+ now)
              console.log("countdown:"+ countdown)
              console.log("countdown:"+ (countdown <0))
              const minutes = moment(countdown).format('mm');
              const seconds = moment(countdown).format('ss');
              console.log("minutes: "+minutes)
              console.log("seconds:"+ seconds)
              if (countdown < 0 ){
                clearInterval(this.intervalZ);
                this.setState({ minutes:0, seconds:0, disabledB:false, disabledA:false, defaultKey: "2" });
              } else {
                if (countdown < 0 ){clearInterval(this.intervalZ);}
                this.setState({ minutes:minutes, seconds:seconds });
              }
              
          }, 1000);
          }
  }

  handlerCallerTimeCounter(maxTime) {
          this.intervalH = setInterval(() => {
            var timeFormat = 'YYYY-MM-DD HH:mm:ss'
            const start = moment().format();
            let ef = new Date(maxTime);
            const date_to_moment = moment(ef).format()
            //Change .add('m', 1) when making tests
            const end = moment(date_to_moment).add('m', 5).format(); 
            const diff = moment(end).diff(start);
            const duration = moment.utc(moment.duration(diff).asMilliseconds()).format()
            // let minuteReminder = 5 - moment(start).minute() % 5;
            // let secondReminder = 60 - moment(start).second() % 60;
            let minuteReminder = moment(duration).minute();
            let secondReminder = moment(duration).second();
            // var ss3 = moment(minuteReminder, 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
            console.log("HCTC now: "+ JSON.stringify(start))
            console.log("HCTC diff: "+ JSON.stringify(diff))
            console.log("HCTC start: "+ JSON.stringify(date_to_moment))
            console.log("HCTC end: "+ JSON.stringify(end))
            console.log("HCTC minuteReminder: "+ JSON.stringify(minuteReminder))
            console.log("HCTC secondReminder: "+ JSON.stringify(secondReminder))
            console.log("HCTC duration: "+ JSON.stringify(duration))
            if (minuteReminder === 0 && secondReminder === 0 ){
              clearInterval(this.intervalH);
              
              this.setState({ min:0, sec:0});
            } else {
              this.setState({ min:minuteReminder, sec:secondReminder });
            }
            
        }, 1000);
  }

  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  handleIsFinished = e => {
    const mode = e.target.value;
    this.setState({
        disabledA: false,
        disabledB: true,
        defaultKey: "2"
     });
  };
  async handleC(data, newData){
    return (
    new Promise((resolve, reject) => {
      resolve(this.props.updateDetailRoom(this.props.token, data.room_name, newData))
    })
    )
  }
  handleReview(timeNow, date_to_appointment){
    if(timeNow > date_to_appointment){
      this.setState({
        disabledB:true,
        disabledA:false,
      })
    }
  }
  handleCaller = (data) => {
    const par = data.participants
    const data1 = data
    par.forEach(async el => {
      if(this.props.username !== el){
        const adding = {
          called: moment().format(),
          called_user:el,
          caller:this.props.username,
        }
        const newData = Object.assign(adding, data1)
        console.log("newData at handleCaller: ", JSON.stringify(newData))
        const prom = this.handleC(data1, newData).then(() => {
          this.handlerCallerTimeCounter(adding.called)
              this.setState({
              caller:true
            })
        })
      }
    })
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getDetailRoom(this.props.token, "wzzGwAyE9f7e4CawhzZm")
      this.props.getDetailSessionRoom(this.props.token, this.props.match.params.roomID, this.props.username)
      }
    }

componentWillReceiveProps(newProps) {
  console.log("3) componentWillReceiveProps: ")
  if (newProps.token !== this.props.token) {
    console.log("3.5.3) CWRP getDetailRoom: " +this.props.getDetailRoom(newProps.token, "wzzGwAyE9f7e4CawhzZm"))
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
        this.props.getDetailRoom(newProps.token, "wzzGwAyE9f7e4CawhzZm")
        this.props.getDetailSessionRoom(newProps.token, newProps.match.params.roomID, newProps.username)
      }
  } else if (this.props.sessionDetail !== undefined){
    this.handlerTimeCounter(this.props.sessionDetail)
  } else if (newProps.sessionDetail !== undefined){
    this.handlerTimeCounter(newProps.sessionDetail)
  }
}

componentWillUnmount() {
    if (this.interval) {
        clearInterval(this.interval);
    }
}

  render() {
      console.log("this.props: "+ JSON.stringify(this.props))
      const { minutes, seconds, min, sec, timeNow, timeNow2, defaultKey, disabledA, disabledB } = this.state;
      const reviews = [];
      const start = moment();
      let minuteReminder = 5 - start.minute() % 5;
      const end = moment().add('m', 5); 
      const duration = moment.duration(end.diff(start))
      // const duration = moment().utcOffset(0).set({ minute: 5, second: 0}).format("mm:ss")
      const duration2 = moment().utcOffset(0).set({ minute: minutes, second: seconds}).format("mm:ss")
      const duration3 = moment().utcOffset(0).set({ minute: min, second: sec}).format("mm:ss")
      var ss = moment(duration2, 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
      var ss2 = moment(duration3, 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
      var ss3 = moment(duration, 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
      var ss3 = moment(minuteReminder, 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
      var totalSec = moment("30:00", 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
      var totalSec2 = moment("05:00", 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
      const dateTime = moment(start).add(minuteReminder, "minutes").format("DD.MM.YYYY, h:mm:ss a");
      return (
        <div>
          {this.props.sessionDetail !== undefined ? (
            timeNow2 > "2020-03-06T00:30:00Z"//this.props.sessionDetail.sta_end_time
              ? 
                    <div style={{ display: 'block', justifyContent: 'center'}}>
                      <span>
                          <h1 align="center">Meeting finished please provide session review!</h1>
                      </span>
                        <MeetinP pa={this.props.sessionDetail.participants}/>
                    </div>    
              :

              <div>
              <Row type="flex" justify="center" align="top">
               <Col span={3} pull={3}>
                   <div>
                     { timeNow2 > "2020-03-06T00:30:00Z"//this.props.roomDetails.RoomDetail.date_to_appointment
                         ? <Button disabled icon="user"> Call user</Button>
                         : 
                           this.state.caller === true ? (
                             <Progress percent={ss2/totalSec2 * 100} format={() => `${duration3}`}/>
                           ):(<Button icon="user" onClick={()=>{this.handleCaller(this.props.sessionDetail)}}> Call user</Button>)
                     }
                   </div>
                 </Col>
                 <Col span={12} style={{justifyContent: 'center'}}>
                   <div>
                     { timeNow2 > "2020-03-06T00:30:00Z"//this.props.sessionDetail.sta_end_time
                         ? <h1 align="center">Meeting finished please provide a review!</h1>
                         : <h1 align="center">Time Remaining: {`${duration2}`}</h1>
                         // : <h1 align="center">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                     }
                   </div>
                   { timeNow2 > "2020-03-06T00:30:00Z"//this.props.roomDetails.RoomDetail.date_to_appointment
                    ?<Progress percent={seconds/totalSec * 100} format={() => `${seconds}`}/>
                    :<Progress percent={ss/totalSec * 100} format={() => `${duration2}`}/>
                   }
                 </Col>
              </Row>    

               <Row justify="center">
                 <Content style={{ padding: '0', minHeight: 600 }}>
                   <Layout style={{ padding: '24px 0', background: '#fff' }}>
                     <Col>
                     <div>
                          <div className="App">
                            <header className="App-header">
                              {this.props.sessionDetail.room_name !== null ?
                              <VideoCallFrame url={`https://testwebapp.daily.co/${this.props.sessionDetail.room_name}`}/>
                              : <VideoCallFrame url={`https://testwebapp.daily.co/wzzGwAyE9f7e4CawhzZm`}/>
                              }
                            </header>
                          </div>
                      </div> 
                     </Col>
                   </Layout>
                 </Content>
               </Row>
         </div>
           ):(null)
          }
        </div>
           )
  }
} 

const mapStateToProps = state => {
  console.log("mapStateToProps: "+JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    roomDetails: state.roomDetail,
    sessionDetail: state.session.articleDetail
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getDetailRoom: (token, roomName) => dispatch(getDetailRoom(token, roomName)),
    getDetailSessionRoom: (token, sessoinID, username) => dispatch(getProfileSessionDetail(token, sessoinID, username)),
    updateDetailRoom: (token, roomName, data) => dispatch(updateRoom(token, roomName, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App2);