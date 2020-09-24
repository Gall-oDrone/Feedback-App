import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Table, Divider, Tag, DatePicker, Tab, Icon } from 'antd';
import {getUserMeeting} from "../store/actions/meetings";
const { Column, ColumnGroup } = Table;
var moment = require('moment');

class ProfileMRSent extends React.Component {

  state = {
    dataList: null,
    dateNow: moment( new Date().toJSON().slice(0, 10) ).format("DD-MM-YYYY HH:mm"),
  }

  componentDidMount() {
    console.log("1) componentDidMount: ")
  }

render(){
  console.log('this.PROPS: ' + JSON.stringify(this.props))
  console.log('this.state: ' + JSON.stringify(this.state))
  const {username, token, sent} = this.props;
  console.log('sent: ' +sent)

  return(
    <div>
      {username ? (
        <div>
          {sent !== undefined && sent.length > 0 ? (
              <Table dataSource={sent}>   
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
                    sent[index].canceled === true ? (
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
                      {sent[index].scheduled === false ? (
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
          ):(<a>Nothing yet</a>)}
        </div>
        ): ( <a>Please Sign up!</a>)}
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