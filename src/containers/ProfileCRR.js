import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Table, Divider, Tag, DatePicker, Tab, Icon, Popover } from 'antd';
import {putCollaborationRequest} from "../store/actions/collaborations";
import {getProfileMeetingInfo} from "../store/actions/profileUserInfo";
import UProfInfo from "../components/UserProfileInfo";
const { Column, ColumnGroup } = Table;
var moment = require('moment');

const buttonWidth = 70;

class receivedReceived extends React.Component {

  state = {
    dataList: {},
    dateNow: moment( new Date().toJSON().slice(0, 10) ).format("DD-MM-YYYY HH:mm"),
    iconLoading: false,
    loading: false
  }

  handleReqRes(index, data, status){
    // this.setState({loading: true})
    const putObj = {
      requestId: data.id,
      status: status,
      recipient: data.requester
    }
    this.props.putUserRequest(this.props.username, this.props.token, putObj)
  }

render(){
  console.log('this.PROPS: ' + JSON.stringify(this.props))
  console.log('this.state: ' + JSON.stringify(this.state))
  const {username, received, token} = this.props;
  console.log('received: ' +received)

  return(
    <div>
        {username !== null ? (
          <div>
            {received && received.length > 0 ? (    
              <Table dataSource={received}>
                    
                    <Column 
                      title="From" 
                      dataIndex="requester"
                      key={`requester${received.id}`}
                    />
                    <Column 
                      title="Date" 
                      dataIndex="timestamp"
                      key={`timestamp${received.id}`}
                      render={date => (
                        <span>
                            {moment.utc(received.timestamp).format("DD-MM-YYYY HH:mm")}
                        </span>
                      )}
                    />
                    <Column
                      title="User"
                      dataIndex="notified"
                      key={`userInfo${received.id}`}
                      render={(record, date, index) => (
                          <UProfInfo 
                            requester={received[index].requester}
                            token={token}
                            username={username}
                            // username={this.props.username !== received[index].requester ? 
                            //   received[index].requester:null}
                            keys = {index}
                          >
                          </UProfInfo>
                      )}
                    />
                    <Column
                      title="Action"
                      dataIndex="action"
                      key={`action${received.id}`}
                      render={(scheduled, record, index) => (
                          scheduled === true ? (
                          <div>
                              <div>
                                <Icon type="check-circle" key={`scheduled: ${index}`} theme="twoTone" twoToneColor="#52c41a" />
                                  <span key={`${index}`}>
                                    ACCEPTED
                                  </span>
                              </div>     
                          </div>
                        ) : (
                          received[index].canceled === true ? (
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
                                  <Button type="primary" key={`accept: ${index}`} loading={this.state.iconLoading} onClick={() => this.handleReqRes(index, received[index], "accepted")} size={"small"}>
                                    Accept
                                  </Button>
                                  <Divider type="vertical" />
                                  <Button type="danger" key={`reject: ${index}`} onClick={() => this.handleReqRes(index, received[index], "rejected")} size={"small"}>
                                    Reject
                                  </Button>
                              </span>
                              )
                            )
                      )}
                    />
              </Table>
            ):(<a>Nothing yet</a>)}
          </div>
        ): ( <a>!Please Sign up!</a>)}
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
    pInfo: state.profileInfo,
    loading: state.meetings.loading
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    putUserRequest: (usename, token, obj) => dispatch(putCollaborationRequest(usename, token, obj)),
    getInfo: (username, token) => dispatch(getProfileMeetingInfo(username, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (receivedReceived);