import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Table, Divider, Tag, DatePicker, Tab, Icon, Popover } from 'antd';
import {getUserIncentiveList} from "../store/actions/incentives";
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

class ProfileIncentiveList extends React.Component {

  state = {
    dataList: {},
    dateNow: moment( new Date().toJSON().slice(0, 10) ).format("DD-MM-YYYY HH:mm"),
    iconLoading: false
  }

  componentDidMount() {
    console.log("1) componentDidMount: ")
    console.log("this.props: " + JSON.stringify(this.props))
    if (this.props.token !== undefined && this.props.token !== null) {
      console.log("2) this.props.token: " + this.props.token)
      console.log("this.props: " + JSON.stringify(this.props))
      console.log("this.props.username: " + JSON.stringify(this.props.username))
      if(this.props.username !== null){
        this.props.getUIL(this.props.username, this.props.token)
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
      if (newProps.token !== undefined && newProps.token !== null) {
        console.log("4) newProps.token: " + newProps.token)
        console.log("5) this.props: " + JSON.stringify(this.props))
        this.props.getUIL(newProps.username, newProps.token)
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

  handleAttend() {
    
  }
  handleAcceptR(index, data, meetingData){
    // this.enterIconLoading()
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
    this.props.putRoom(this.props.token)
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

render(){
  console.log('this.PROPS: ' + JSON.stringify(this.props))
  console.log('this.state: ' + JSON.stringify(this.state))
  const {username, token, getMeetings} = this.props;
  const {UserIncentives} = this.props.pAIncentiveList;
  return(
    <div>
    {UserIncentives !== undefined && username !== null ? (
      
  <Table dataSource={UserIncentives}>
        
        <Column 
          title="Buy date" 
          dataIndex="created"
          key={`date_created`}
          render={date => (
            <span>
                {moment(date).format("DD-MM-YYYY HH:mm")}
            </span>
          )}
        />
        <Column 
          title="Brand" 
          dataIndex="incentive_brand"
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
          title="Claimed"
          dataIndex="claimed"
          key="claimed_status"
          render={claimed => (
            claimed ? (
              <li>
                <a>Yes</a>
              </li>
            ):(
              <li>
                <a>No</a>
              </li>
            )
          )}
        />
        <Column
          title="Claimed Code"
          dataIndex="cardClaimCode"
          key="claimedCode"
        />
        <Column
          title="Amount"
          dataIndex="amount"
          key="language"
        />
        <Column
          title="Currency"
          dataIndex="currency"
          key="userInfo"
        />
        <Column
          title="Recipient"
          dataIndex="recipient"
          key="status"
          render={recipient => (
            recipient === this.props.username ? (
              <li>
                <Tag color="pink" key={"val"}>
                  {"myself"}
                </Tag>
              </li>
            ):(
              <li>
                <Tag color="blue" key={"val"}>
                  {recipient}
                </Tag>
            </li>
            )
          )}
        />
        {/* <Column
          title="Action"
          key="action"
          render={(text, record, date) => (
            <span>
              {this.state.dateNow ===  moment(date).format("DD-MM-YYYY HH:mm") ? (
                <Button type="primary" disabled size={"small"}>
                  Attend
                </Button>
              ):(
                <Button type="primary" onClick={() => this.handleAttend()} size={"small"}>
                  Attend
                </Button>
              )}
              <Divider type="vertical" />
                <Button type="danger" onClick={() => this.handleCancel()} size={"small"}>
                  Cancel
                </Button>
            </span>
          )}
        /> */}
  </Table>
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
    meeting: state.meetings,
    pAIncentiveList: state.incentives
    // loading: state.meetings.loading
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getUIL: (username, token) => dispatch(getUserIncentiveList(username, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (ProfileIncentiveList);