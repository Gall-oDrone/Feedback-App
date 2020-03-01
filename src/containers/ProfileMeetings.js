import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Table, Divider, Tag, DatePicker, Tabs, Result, Card } from 'antd';
import { getUserMeeting } from "../store/actions/meetings";
import ProfileMRSent from "./ProfileMRS"
import ProfileMRR from "./ProfileMRR"
import ProfileMRB from "./ProfileMRB"
const { Column, ColumnGroup } = Table;
var moment = require('moment');

const { TabPane } = Tabs;

const meetingListContent= {
  sent: <div><ProfileMRSent /></div>,
  received: <div><ProfileMRR /></div>,
  booked: <div><ProfileMRB /></div>,
};

class ProfileMeetings extends React.Component {

  state = {
    article: ['sent', 'received', 'booked'],
    dataList: null,
    dateNow: moment(new Date().toJSON().slice(0, 10)).format("DD-MM-YYYY HH:mm"),
    key: 'tab1',
    noTitleKey: '',
  }

  onTabChange = (key, type) => {
    console.log("onTabChange:", key, type);
    this.setState({ [type]: key });
  };

  componentDidMount() {
    console.log("1) componentDidMount: ")
    console.log("this.props: " + JSON.stringify(this.props))
    if (this.props.token !== undefined && this.props.token !== null) {
      console.log("2) this.props.token: " + this.props.token)
      console.log("this.props: " + JSON.stringify(this.props))
      console.log("this.props.username: " + JSON.stringify(this.props.username))
      if (this.props.username !== null && this.props.getMeetings(this.props.username, this.props.token) != undefined) {
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
    console.log("3.5) CWRP newProps: " + JSON.stringify(newProps))
    if (newProps.token !== this.props.token) {
      console.log("3.6) newProps.token !== this.props.token")
      console.log("3.7) CWRP newProps: " + JSON.stringify(newProps.token))
      console.log("3.8) CWRP Props: " + JSON.stringify(this.props.token))
      console.log("3.9) CWRP Props.username: " + JSON.stringify(this.props.username))
      console.log("3.9.1) CWRP newProps.username: " + JSON.stringify(newProps.username))
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

  handleTabList = (item) => {
    let array = []
    if (typeof item !== 'undefined' && item.length > 0) {
      // the array is defined and has at least one element
      item.forEach(val => {
        let tab = {
          key: `${val}`, tab: `${val.toUpperCase()}`
        }
        array.push(tab)
      }
      )
      console.log("ehreno 4: " + JSON.stringify(array))
      console.log("ehreno 5: " + JSON.stringify(item))
      return array
    } else {
      return
    }
  }

  render() {
    console.log('this.PROPS: ' + JSON.stringify(this.props))
    console.log('this.state: ' + JSON.stringify(this.state))
    const { username, token, getMeetings } = this.props;
    const { UserMeetingList } = this.props.meetings;
    console.log('UserMeetingList: ' + UserMeetingList)
    
    // console.log(Object.values(UserMeetingList))
    if (UserMeetingList !== undefined) {
      console.log('UserMeetingList.length: ' + UserMeetingList.lengt)
      // console.log('UserMeetingList.recipient: ' + UserMeetingList[0].recipient)
      // console.log('UserMeetingList.article: ' + UserMeetingList.article)
      // console.log('this.state.DateNow: ' + JSON.stringify(this.state.dateNow))
      // Object.keys(UserMeetingList).map(k => {
      //   console.log("k: " + JSON.stringify(UserMeetingList[k]))
      //   console.log("UserMeetingList[k].: " + JSON.stringify(UserMeetingList[k].recipient))
      // })
    }
    return (
      <div>
        {this.props.username !== (undefined || null)? (
          <div>
              <Card
              style={{ width: '100%' }}
              tabList={this.handleTabList(this.state.article)}
              activeTabKey={this.state.noTitleKey}
              onTabChange={key => {
                this.onTabChange(key, 'noTitleKey');
              }}
            >
              {meetingListContent[(this.state.noTitleKey)]}
            </Card>
          </div>    
        ) : (<Result
          title="You need to be Logged In"
          extra={
            <Button type="primary" key="console">
              Go Console
            </Button>
          }
        />)
        }
      </div>
    )
  };
}

const mapStateToProps = state => {
  console.log("mapStateToProps: " + JSON.stringify(state))
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
)(ProfileMeetings);