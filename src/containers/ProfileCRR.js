import React from 'react';
import { connect } from "react-redux";
import { Button, Table, Divider, Icon } from 'antd';
import {putCollaborationRequest} from "../store/actions/collaborations";
import {getProfileMeetingInfo} from "../store/actions/profileUserInfo";
import UProfInfo from "../components/UserProfileInfo";
const { Column } = Table;
var moment = require('moment');

class receivedReceived extends React.Component {

  state = {
    dataList: {},
    dateNow: moment( new Date().toJSON().slice(0, 10) ).format("DD-MM-YYYY HH:mm"),
    received: this.props.received
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('SNAP LOADING + ' + "MIERDA", prevProps.loading, this.props.loading)
  //   return null;
  // }

  // static getDerivedStateFromProps(props, state){
  // console.log('DERIVED LOADING + ' + "MIERDA", props.loading)
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('LOADING UP ' + "MIERDA", prevProps.loading, this.props.loading)
  //   if (prevProps.loading !== this.props.loading) {
      
  //   }
  // }

  handleReqRes(index, data, status){
    const { received } = this.state
    const update = {...received}
    update[index].status = status
    const putObj = {
      requestId: data.id,
      status: status,
      recipient: data.requester
    }
    this.props.putUserRequest(this.props.username, this.props.token, putObj)
    this.setState({received: {...update} })
  }

render(){
  console.log('this.PROPS: ' + JSON.stringify(this.props) )
  console.log('this.state: ' + JSON.stringify(this.state))
  const {username, token} = this.props;
  const { received } = this.state

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
                      title="Profile Info"
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
                      dataIndex="status"
                      key={`action${received.id}`}
                      render={(status, record, index) => (
                          status === "accepted" ? (
                              <div>
                                <Icon type="check-circle" key={`scheduled: ${index}`} theme="twoTone" twoToneColor="#52c41a" />
                              </div>     
                        ) : (
                          status === "rejected" ? (
                                  <div>
                                    <Icon type="close-circle" key={`canceled: ${index}`} theme="twoTone" twoToneColor="#F5222D" />
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
    pInfo: state.profileInfo,
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    putUserRequest: (usename, token, obj) => dispatch(putCollaborationRequest(usename, token, obj)),
    getInfo: (username, token) => dispatch(getProfileMeetingInfo(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (receivedReceived);