import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import '../assets/App.css';
import '../assets/index.css';
import { Layout, Menu, Icon, Row, Col, Progress, Tabs } from 'antd';
import VideoCallFrame from './VideoFrame';
import MeetingReview from "./MeetingReview"

var moment = require('moment');

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

class App2 extends React.Component {
  state = {
    percent: 50,
    timeNow: moment().format("mm:ss"),
    timeDuration: moment( "2013-05-09T00:30:00Z" ).format("mm:ss"),
    minutes: 1,
    seconds: 0
  };

  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  decline = () => {
    this.interval = setInterval(() => {
      const { timeTillDate, timeFormat } = this.props;
      const then = moment(timeTillDate, timeFormat);
      const then2 = moment( "2013-05-09T00:30:00Z" ).format("mm:ss");
      const now = moment("2013-05-09T00:30:00Z").format("mm:ss");
      const countdown = moment(then2 - now).format("mm:ss");
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');
      this.setState({ minutes, seconds });
  }, 1000);
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  };
  componentDidMount() {
    this.interval = setInterval(() => {
        const { seconds, minutes } = this.state
        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1
          }))
        }    if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.myInterval)
          } else {
            this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59
            }))
          }
        }
      }, 1000)
}

componentWillUnmount() {
    if (this.interval) {
        clearInterval(this.interval);
    }
}

    render() {
      const { minutes, seconds } = this.state
      const roomName = this.props.match.params.roomID;
      const duration2 = moment().utcOffset(0).set({ minute: minutes, second: seconds}).format("mm:ss")
      var ss = moment(duration2, 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
      var totalSec = moment("01:00", 'mm:ss: A').diff(moment().startOf('day'), 'seconds');
      return (
        <div>
          <Row type="flex" justify="center" align="top">
            <Col span={12}>
              <div>
                { minutes === 0 && seconds === 0
                    ? <h1 align="center">Meeting finished please provide a review!</h1>
                    : <h1 align="center">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
              </div>
              <Progress percent={ss/totalSec * 100} format={() => `${duration2}`}/>
            </Col>
          </Row>

          <Row>
          <Content style={{ padding: '0px' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Col span={5}>
                <Sider width={200} style={{ background: '#fff' }}>
                  <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 220 }}>
                    {[...Array(30).keys()].map(i => (
                      i === 2 ? (
                        <TabPane tab={`Tab-${i}`} key={i}>
                          <MeetingReview/>
                        </TabPane>
                      ): (
                    <TabPane tab={`Tab-${i}`} key={i}>
                      Content of tab {i}
                    </TabPane>
                      )
                    ))}
                  </Tabs>
                    

                  <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      style={{ height: '100%' }}
                  >
                      <Menu.Item key="sub1">
                          <span>
                          <Icon type="user" />
                              Call User
                          </span>
                      </Menu.Item>
                      <Menu.Item key="sub2">
                          <span>
                          <Icon type="book" />
                              Agenda
                          </span>
                      </Menu.Item>
                      <Menu.Item key="star">
                          <span>
                          <Icon type="notification" />
                              Review Meeting
                          </span>
                      </Menu.Item>
                      <Menu.Item key="sub4">
                          <span>
                          <Icon type="trophy" />
                              Offer Incentives
                          </span>
                      </Menu.Item>
                  </Menu>
                </Sider>
              </Col>
              <Col span={15}>
                <Content style={{ padding: '0', minHeight: 280 }}>
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

                    <VideoCallFrame url={`https://testwebapp.daily.co/${roomName}`}/>

                  </header>
                  </div>
                </Content>
              </Col>
            </Layout>
          </Content>
          </Row>
        </div>
           )
  }
} 

const mapStateToProps = state => {
  console.log(JSON.stringify(state))
  return {
    token: state.auth.token,
  };
};

export default withRouter(connect(mapStateToProps)(App2));