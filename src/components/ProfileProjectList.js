import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Table, Divider, Tag, DatePicker, Tab, Icon, Popover } from 'antd';
import {getUserReceivedMeeting, updateMeeting} from "../store/actions/meetings";
import {getProfileMeetingInfo} from "../store/actions/profileUserInfo";
import UProfInfo from "./UserProfileInfo";
import {getProfileArticleList, deleteProfileArticleDetail} from "../store/actions/profile";
const { Column, ColumnGroup } = Table;
var moment = require('moment');

class ProfileArticleList extends React.Component {

  state = {
    dataList: {},
    dateNow: moment( new Date().toJSON().slice(0, 10) ).format("DD-MM-YYYY HH:mm"),
    iconLoading: false
  }

  componentDidMount() {
    console.log("1) componentDidMount: ")
    // console.log("this.props: " + JSON.stringify(this.props))
    if (this.props.token !== undefined && this.props.token !== null) {
      console.log("2) this.props.token: " + this.props.token)
      console.log("this.props: " + JSON.stringify(this.props))
      console.log("this.props.username: " + JSON.stringify(this.props.username))
      if(this.props.username !== null != undefined){
        this.props.getPAL(this.props.token, this.props.username)
        // .then(res => {
        //   console.log("6) componentWillReceiveProps before assigning res to dataList: " + JSON.stringify(this.props))
        //   console.log(JSON.stringify(res))
        //   this.setState({
        //     dataList: res.articleList
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
      if (newProps.token !== undefined && newProps.token !== null !== undefined) {
        console.log("4) newProps.token: " + newProps.token)
        console.log("5) this.props: " + JSON.stringify(this.props))
        // console.log("this.props.getMeetings: " + JSON.stringify(this.props.getMeetings(this.props.username, this.props.token)))
        this.props.getPAL(newProps.token, newProps.username)
      } else {
        console.log("this.props.getMeetings was undefined")
      }
    }
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  handleDelete(articleID) {
    this.props.deleteArticle(this.props.token, articleID, this.props.username)
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
      // console.log("k: "+JSON.stringify(k))
      // console.log("meetingData[index].k: "+JSON.stringify(meetingData[index][k]))
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
      // console.log("k: "+JSON.stringify(k))
      // console.log("meetingData[index].k: "+JSON.stringify(meetingData[index][k]))
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
  const {articleList} = this.props.pArticleList
  if(articleList !== undefined) {
    console.log('articleList: ' +articleList)
    // Object.keys(articleList).map(k=>{
    //   console.log("k: "+JSON.stringify(articleList[k]))
    //   console.log("articleList[k].: "+JSON.stringify(articleList[k]))
    // })
  }
  return(
    <div> 
    {articleList !== undefined && username !== null ? (
      <div>
        <Table dataSource={articleList}>
          <Column 
            title="Article Title" 
            dataIndex="title"
            key="title"
          />
          <Column 
            title="Created date" 
            dataIndex="timestamp"
            key={`timestamp `}
            render={date => (
              <span>
                  {moment(date).format("DD-MM-YYYY HH:mm")}
              </span>
            )}
          />
          <Column 
            title="Category" 
            dataIndex="categories"
            key="categories"
            render={category => (
              <li>
                {category.map(val => (
                  <Tag color="blue" key={val}>
                    {val}
                  </Tag>
                ))}
              </li>
            )}
          />
          <Column
            title="Views"
            dataIndex="view_count"
            key="view_count"
          />
          <Column
            title="Likes"
            dataIndex="likes_count"
            key="likes_count"
          />
          <Column
            title="Action"
            dataIndex="id"
            key="action"
            render={(id, record) => (
              <span>
                <a href={`/profile/${1}/account/articles/detail/${id}`}>Modify</a>
                <Divider type="vertical" />
                <a onClick={() =>{this.handleDelete(id)}}>Delete</a>
              </span>
            )}
          />
        </Table>
        <Button type="primary" block href={"/create-article/"}>
          Create an Article
        </Button>
    </div>
  ): ( <a>Please Sign up to see your articles</a>)}
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
    pArticleList: state.profile
  };
};
  
  const mapDispatchToProps = dispatch => {
    console.log("mapDispatchToProps: ")
    return {
      getPAL: (token, username) => dispatch(getProfileArticleList(token, username)),
      deleteArticle: (token, articleID, username) => dispatch(deleteProfileArticleDetail(token, articleID, username))
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (ProfileArticleList);