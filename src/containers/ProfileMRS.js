import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Table, Divider, Tag, DatePicker, Tab, Icon } from 'antd';
import {getUserMeeting} from "../store/actions/meetings";
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

class ProfileMRSent extends React.Component {

  state = {
    dataList: null,
    dateNow: moment( new Date().toJSON().slice(0, 10) ).format("DD-MM-YYYY HH:mm"),
  }

  componentDidMount() {
    console.log("1) componentDidMount: ")
    console.log("this.props: " + JSON.stringify(this.props))
    if (this.props.token !== undefined && this.props.token !== null) {
      console.log("2) this.props.token: " + this.props.token)
      console.log("this.props: " + JSON.stringify(this.props))
      console.log("this.props.username: " + JSON.stringify(this.props.username))
      if(this.props.username !== null && this.props.getMeetings(this.props.username, this.props.token) != undefined){
        console.log("this.props.getMeetings: " + JSON.stringify(this.props.getMeetings(this.props.username, this.props.token)))
        this.props.getMeetings(this.props.username, this.props.token)
        // .then(res => {
        //   console.log("6) componentWillReceiveProps before assigning res to dataList: " + JSON.stringify(this.props))
        //   console.log(JSON.stringify(res))
        //   this.setState({
        //     dataList: res.UserMeetingList
        //   });
        //   console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
        // });
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
      if (newProps.token !== undefined && newProps.token !== null && this.props.getMeetings(newProps.username, newProps.token) !== undefined) {
        console.log("4) newProps.token: " + newProps.token)
        console.log("5) this.props: " + JSON.stringify(this.props))
        // console.log("this.props.getMeetings: " + JSON.stringify(this.props.getMeetings(this.props.username, this.props.token)))
        this.props.getMeetings(newProps.username, newProps.token).then(res => {
          console.log("6) componentWillReceiveProps before assigning res to dataList: " + JSON.stringify(this.props))
          console.log(JSON.stringify(res))
          this.setState({
            dataList: res.UserMeetingList
          });
          console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
        });
      } else {
        console.log("this.props.getMeetings was undefined")
      }
    }
  }

  handleDelete() {

  }

  handleCancel() {

  }

  handleAttend() {
    
  }

render(){
  console.log('this.PROPS: ' + JSON.stringify(this.props))
  console.log('this.state: ' + JSON.stringify(this.state))
  const {username, token, getMeetings} = this.props;
  const {UserMeetingList} = this.props.meetings;
  console.log('UserMeetingList: ' +UserMeetingList)
  // console.log(Object.values(UserMeetingList))
  if(UserMeetingList !== undefined && UserMeetingList.length > 0 ) {
    console.log('UserMeetingList.recipient: ' +UserMeetingList[0].recipient)
    console.log('UserMeetingList.article: ' +UserMeetingList.article)
    console.log('this.state.DateNow: ' +JSON.stringify(this.state.dateNow))
    Object.keys(UserMeetingList).map(k=>{
      console.log("k: "+JSON.stringify(UserMeetingList[k]))
      console.log("UserMeetingList[k].: "+JSON.stringify(UserMeetingList[k].recipient))
    })
  }
  return(
    <div>
      {username !== null ? (
        <div>
          {UserMeetingList !== undefined && UserMeetingList.length > 0 ? (
              <Table dataSource={UserMeetingList}>   
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
                  key={`discussion_topic `}
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
                  title="Confirmation"
                  dataIndex="scheduled"
                  key="confirmation"
                  render={(scheduled, record, index) => (
                    scheduled === true ? (
                    <div>
                        <div>
                          <Icon type="check-circle" key={`scheduled: ${index}`} theme="twoTone" twoToneColor="#52c41a" />
                            <span key={`${index}`}>
                              CONFIRMED
                            </span>
                        </div>     
                    </div>
                  ) : (
                    UserMeetingList[index].canceled === true ? (
                        <div>
                            <div>
                              <Icon type="close-circle" key={`canceled: ${index}`} theme="twoTone" twoToneColor="#F5222D" />
                                <span key={`${index}`}>
                                  REJECTED
                                </span>
                            </div>     
                        </div>
                      ) : (
                        <div>
                            <div>
                              <Icon type="question-circle" key={`canceled: ${index}`} theme="twoTone" />
                            </div>     
                        </div>
                        )
                      )
                )}
                />
                <Column
                  title="Action"
                  key="action"
                  render={(text, record, index) => (
                    <span>
                      {UserMeetingList[index].scheduled === false ? (
                        <Button type="danger" onClick={() => this.handleCancel()} size={"small"}>
                          Cancel
                        </Button>
                      ):(
                        null
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
  /*console.log("1) ASNT List mapStateToProps containers state 1: "+ JSON.stringify(state.assignments.assignments))
  console.log("2) ASNT List mapStateToProps containers state 2: "+ JSON.stringify(state.assignments))
  console.log("2) ASNT List mapStateToProps containers state 3: "+ JSON.stringify(state))*/
  return {
    token: state.auth.token,
    username: state.auth.username,
    meetings: state.meetings,
    // loading: state.meetings.loading
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getMeetings: (username, token) => dispatch(getUserMeeting(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (ProfileMRSent);