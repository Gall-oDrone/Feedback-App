import React from 'react';
import { connect } from "react-redux";
import { Button, Table, Divider, Icon } from 'antd';
import {putCollaborationRequest} from "../store/actions/collaborations";
import {getProfileMeetingInfo} from "../store/actions/profileUserInfo";
import CollabTable  from "../components/CollabTable";
import "../assets/collaboration.css";
var moment = require('moment');

class BookedMeetingList extends React.Component {

  state = {
    dataList: {},
    dateNow: moment( new Date().toJSON().slice(0, 10) ).format("DD-MM-YYYY HH:mm"),
    accepted: this.props.accepted
  }

  componentDidMount() {
    if (this.props.token && this.props.username) {
    } else {
      console.log("there was an error while Fetching")
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.collabs.collabs.length !== this.props.collabs.collabs.length) {
    }
  }

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
  const {accepted } = this.state

  return(
    <div>
      {accepted ? (
                     <div className="table-wrapper">
                      <div className="table-title">
                          <div className="row">
                              <div className="col-1"><h2>Manage <b>Collaborators</b> </h2></div>
                              <div className="col-2">
                                  <div className="btn-group" data-toggle="buttons">
                                      <label className="btn btn-info active">
                                          <input type="radio" name="status" value="all" checked="checked"/>All
                                      </label>
                                      <label className="btn btn-success">
                                          <input type="radio" name="status" value="active"/>Active
                                      </label>
                                      <label className="btn btn-warning">
                                          <input type="radio" name="status" value="inactive"/>Inactive
                                      </label>
                                      <label className="btn btn-danger">
                                          <input type="radio" name="status" value="expired"/>Expired
                                      </label>       
                                  </div>
                              </div>
                          </div>
                      </div>
                      <table className="table table-striped table-hover">
                          <thead>
                              <tr>
                                  <th>User</th>
                                  <th>Name</th>
                                  <th>Position</th>
                                  <th>Status</th>
                                  <th>Project</th>
                                  <th>Workflow</th>
                                  <th>Completion</th>
                                  <th>Total Tasks</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                                {accepted.map(el => {
                                  return(
                                    <tr data-status="active">
                                      <td>{el.requester}</td>
                                      <td><span className="label label-success">Active</span></td>
                                      <td><span className="label label-success">Programmer</span></td>
                                      <td><span className="label label-success">Inactive</span></td>
                                      <td><span className="label label-success">Green technologies</span></td>
                                      <td><span className="label label-success">Delfino Board</span></td>
                                      <td><span className="label label-success">50%</span></td>
                                      <td><span className="label label-success">2</span></td>
                                      <td>
                                        <a href="soengsouy.com" className="btn btn-sm manage">add a task</a>
                                        <span className="label label-success"/>
                                        <a href="soengsouy.com" className="btn btn-sm manage">remove</a>
                                      </td>
                                    </tr>
                                    )
                                  })
                                }
                          </tbody>
                      </table>
                    </div> 
      ):(<a>Nothing yet</a>)}
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
) (BookedMeetingList);