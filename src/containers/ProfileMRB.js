import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Button, Table, Divider, Tag, DatePicker, Tab, Icon, Popover, Card } from 'antd';
import {getUserBookedMeeting, updateMeeting} from "../store/actions/meetings";
import UProfInfo from "../components/UserProfileInfo";
import MAN from "../components/MeetingAttendaceNTFN";
import App2 from "../components/test"
import RoomMenu from "./RoomMenu"
const { Column, ColumnGroup } = Table;
var moment = require('moment');

const data = [
  {
    key: '1',
    userName: 'John',
    articleTitle: 'Brown',
    meetingDate: 32,
    topic: 'New York No. 1 Lake Park',
    University: ['MIT'],
  },
  {
    key: '2',
    userName: 'Jim',
    articleTitle: 'Green',
    meetingDate: 42,
    topic: 'London No. 1 Lake Park',
    University: ['Stanford'],
  },
  {
    key: '3',
    userName: 'Joe',
    articleTitle: 'Black',
    meetingDate: 32,
    topic: 'Sidney No. 1 Lake Park',
    University: ['Berkley'],
  },
];

const text = <span>Title</span>;
const content = (
  <Card>
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  </Card>
);

const buttonWidth = 70;

class BookedMeetingList extends React.Component {

  state = {
    dataList: {},
    // dateNow: moment( new Date().toJSON().slice(0, 10) ).format("DD-MM-YYYY HH:mm"),
    dateNow: moment().format("DD-MM-YYYY HH:mm"),
    iconLoading: false
  }

  componentDidMount() {
    console.log("1) componentDidMount: ")
    console.log("this.props: " + JSON.stringify(this.props))
    if (this.props.token !== undefined && this.props.token !== null) {
      console.log("2) this.props.token: " + this.props.token)
      console.log("this.props: " + JSON.stringify(this.props))
      console.log("this.props.username: " + JSON.stringify(this.props.username))
      if(this.props.username !== null && this.props.getBM(this.props.username, this.props.token) != undefined){
        console.log("this.props.getMeetings: " + JSON.stringify(this.props.getBM(this.props.username, this.props.token)))
        this.props.getBM(this.props.username, this.props.token)
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }

  componentWillReceiveProps(newProps) {
    console.log("3) componentWillReceiveProps: ")
    console.log("3.5) CWRP newProps: " +JSON.stringify(newProps))
    if (newProps.token !== this.props.token) {
      console.log("3.6) newProps.token !== this.props.token")
      console.log("3.7) CWRP newProps: " +JSON.stringify(newProps.token))
      console.log("3.8) CWRP Props: " +JSON.stringify(this.props.token))
      console.log("3.9) CWRP Props.username: " +JSON.stringify(this.props.username))
      console.log("3.9.1) CWRP newProps.username: " +JSON.stringify(newProps.username))
      if (newProps.token !== undefined && newProps.token !== null && this.props.getBM(newProps.username, newProps.token) !== undefined) {
        console.log("4) newProps.token: " + newProps.token)
        console.log("5) this.props: " + JSON.stringify(this.props))
        // console.log("this.props.getMeetings: " + JSON.stringify(this.props.getMeetings(this.props.username, this.props.token)))
        this.props.getBM(newProps.username, newProps.token).then(res => {
          console.log("6) componentWillReceiveProps before assigning res to dataList: " + JSON.stringify(this.props))
          console.log(JSON.stringify(res))
          this.setState({
            dataList: res.BookedMeetingList
          });
          console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
        });
      } else {
        console.log("this.props.getMeetings was undefined")
      }
    }
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  handleDelete() {

  }

  handleCancel() {

  }

  handleAttend(requestUrl) {
    console.log("requestUrl: "+JSON.stringify(requestUrl))
  }
  handleAcceptR(index, data, meetingData){
    this.enterIconLoading()
    const articleID = meetingData[index]["article"];
    console.log("EHRENO: "+JSON.stringify(index))
    console.log("EHRENO: "+JSON.stringify(meetingData[index]))
    Object.keys(meetingData[index]).map(k => {
      console.log("k: "+JSON.stringify(k))
      console.log("meetingData[index].k: "+JSON.stringify(meetingData[index][k]))
      data[k] = meetingData[index][k]
      if (k === "scheduled") {
        data[k] = true
      }
    })
    console.log("data after: "+JSON.stringify(data))
    this.props.putDetailMeeting(this.props.token, articleID, this.props.username, data)
    console.log("MR CORSO ")
    // {() => this.enterIconLoading()}
    // this.setState({ iconLoading: false });
    
  }

  handleRejectR(index, data, meetingData){
    this.enterIconLoading()
    const articleID = meetingData[index]["article"];
    console.log("EHRENO: "+JSON.stringify(index))
    console.log("EHRENO: "+JSON.stringify(meetingData[index]))
    Object.keys(meetingData[index]).map(k => {
      console.log("k: "+JSON.stringify(k))
      console.log("meetingData[index].k: "+JSON.stringify(meetingData[index][k]))
      data[k] = meetingData[index][k]
      if (k === "canceled") {
        data[k] = true
      }
    })
    console.log("data after: "+JSON.stringify(data))
    this.props.putDetailMeeting(this.props.token, articleID, this.props.username, data)
    console.log("MR CORSO ")
    // {() => this.enterIconLoading()}
    // this.setState({ iconLoading: false });
  }

  handleMettingNotification(meetingTime){
    const start = moment().format();
    let ef = new Date(meetingTime);
    const date_to_moment = moment(ef).format()
    //Change .add('m', 1) when making tests
    const preview = moment(date_to_moment).subtract('m', 5).format(); 
    const diff = moment(preview).diff(start);
    if(preview != start){
      return
    }
  }

render(){
  console.log('this.PROPS: ' + JSON.stringify(this.props))
  console.log('this.state: ' + JSON.stringify(this.state))
  const {username, token, getMeetings} = this.props;
  const {BookedMeetingList} = this.props.meeting;
  console.log('BookedMeetingList: ' +BookedMeetingList)
  // console.log(Object.values(BookedMeetingList))
  if(BookedMeetingList !== undefined && BookedMeetingList.length > 0) {
    console.log('BookedMeetingList.recipient: ' +BookedMeetingList[0].recipient)
    console.log('BookedMeetingList.article: ' +BookedMeetingList.article)
    console.log('BookedMeetingList.scheduled: ' +BookedMeetingList[0].scheduled)
    console.log('this.state.DateNow: ' +JSON.stringify(this.state.dateNow))
    console.log('this.state.DateNow: ' +JSON.stringify(this.state.dateNow))
    Object.keys(BookedMeetingList).map(k=>{
      console.log("k: "+JSON.stringify(BookedMeetingList[k]))
    })
  }

  return(
    <div>
      {/* {this.handleMettingNotification ? <MAN message={"Your meeting is about to start"} description={"Meeting NTFN"}/>:null} */}
      {username !== null ? (
        <div>    
          {BookedMeetingList !== undefined && BookedMeetingList.length > 0 ? (  
              <Table dataSource={BookedMeetingList}>  
                    <Column 
                      title="Article Title" 
                      dataIndex="article"
                      key="article"
                    />
                    <Column 
                      title="Meeting date" 
                      dataIndex="date_to_appointment"
                      key={`meetingDate `}
                      render={date => (
                        <span>
                            {moment.utc(date).format("DD-MM-YYYY HH:mm")}
                        </span>
                      )}
                    />
                    <Column 
                      title="Topic" 
                      dataIndex="discussion_topic"
                      key="discussion_topic"
                      render={topic => (
                        <li>
                          {topic.map(val => (
                            <Tag color="blue" key={val}>
                              {val}
                            </Tag>
                          ))}
                        </li>
                      )}
                    />
                    <Column
                      title="Language"
                      dataIndex="notified"
                      key="language"
                    />
                    <Column
                      title="User"
                      dataIndex="notified"
                      key="userInfo"
                      render={(record, date, index) => (
                        <div style={{ width: buttonWidth}}>
                          <UProfInfo {...this.props}
                            token={this.props.token}
                            username={this.props.username !== BookedMeetingList[index].sender ? 
                              BookedMeetingList[index].sender:null}
                            keys = {index}
                          >
                          </UProfInfo>
                        </div>
                      )}
                    />
                    <Column
                      title="Status"
                      dataIndex="scheduled"
                      key="status"
                      render={(scheduled, record, index) => (
                          scheduled === true ? (
                          <div>
                              <div>
                                <Icon type="check-circle" key={`scheduled: ${index}`} theme="twoTone" twoToneColor="#52c41a" />
                                  <span key={`${index}`}>
                                    BOOKED
                                  </span>
                              </div>     
                          </div>
                        ) : (
                          BookedMeetingList[index].canceled === true ? (
                              <div>
                                  <div>
                                    <Icon type="close-circle" key={`canceled: ${index}`} theme="twoTone" twoToneColor="#F5222D" />
                                      <span key={`${index}`}>
                                        REJECTED
                                      </span>
                                  </div>     
                              </div>
                            ) : (
                                <span>
                                  <Button type="primary" key={`ARB: ${index}`} loading={this.state.iconLoading} onClick={() => this.handleAcceptR(index, this.state.dataList, BookedMeetingList)} size={"small"}>
                                    Accept
                                  </Button>
                                  <Divider type="vertical" />
                                  <Button type="danger" key={`RRB: ${index}`} onClick={() => this.handleRejectR(index, this.state.dataList, BookedMeetingList)} size={"small"}>
                                    Reject
                                  </Button>
                              </span>
                              )
                            )
                      )}
                    />
                    <Column
                      title="Action"
                      key="action"
                      render={(text, data, index) => (
                        <span>
                          {this.state.dateNow ===  moment(new Date(data.date_to_appointment)).format("DD-MM-YYYY HH:mm") ? (
                            <Link to={`/frameTest/${BookedMeetingList[index].room_name}`}>
                            <Button type="primary" size={"small"}>
                              Attend
                            </Button>
                            </Link>
                          ):(

                            <div>
                            {this.state.dateNow > moment(new Date(data.date_to_appointment)).format("DD-MM-YYYY HH:mm") ? (
                              <Link to={`/frameTest`}>
                              <Button type="primary" disabled size={"small"}>
                                Finished
                              </Button>
                              </Link>
                            ):(
                              <div>
                              <Link to={`/frameTest/${BookedMeetingList[index].room_name}`}>
                                <Button type="primary" disabled onClick={() => this.handleAttend(BookedMeetingList[index].room_url)} size={"small"}>
                                  Attend
                                </Button>
                              </Link>
                               <Divider type="vertical" />
                               <Button type="danger" onClick={() => this.handleCancel()} size={"small"}>
                                 Cancel
                               </Button>
                               </div>
                            )}
                            </div>
                          )}
                         
                        </span>
                      )}
                    />
              </Table>
          ):(<a>No meetings yet</a>)}
        </div>
      ): ( <a>Please Sign up to see your meetings</a>)}
    </div>
  )
};
}

const mapStateToProps = state => {
  console.log("mapStateToProps: "+JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    meeting: state.meetings,
    // loading: state.meetings.loading
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getBM: (username, token) => dispatch(getUserBookedMeeting(username, token)),
    putDetailMeeting: (token, articleID, userI, data) => dispatch(updateMeeting(token, articleID, userI, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (BookedMeetingList);