import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Table, Divider, Cascader, Tag, DatePicker, Tab, Icon, Popover } from 'antd';
import {getUserReceivedMeeting, updateMeeting} from "../store/actions/meetings";
import {getProfileMeetingInfo} from "../store/actions/profileUserInfo";
import UProfInfo from "../components/UserProfileInfo";
import {getProfileSurveyList, putProfileSurveyDetail} from "../store/actions/profileSurvey";
import {getProfileArticleList} from "../store/actions/profile";
const { Column, ColumnGroup } = Table;
var moment = require('moment');

let article_options = []

class ProfileArticleList extends React.Component {

  state = {
    dataList: {},
    value: null,
    article: "",
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
        this.props.getPSL(this.props.token, this.props.username)
        this.props.getPAL(this.props.token, this.props.username)
        // .then(res => {
        //   console.log("6) componentWillReceiveProps before assigning res to dataList: " + JSON.stringify(this.props))
        //   console.log(JSON.stringify(res))
        //   this.setState({
        //     dataList: res.surveyList
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
        this.props.getPSL(newProps.token, newProps.username)
        this.props.getPAL(newProps.token, newProps.username)
      } else {
        console.log("this.props.getPSL was undefined")
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

  handleSave(id, survey){
    this.enterIconLoading()
    let newObj = {};
    survey.forEach(el => {
      if(el.id === id){
        newObj = {article: this.state.value}
        Object.assign(newObj, el)
      }
    })
    this.props.putPSD(this.props.token, id, this.props.username, newObj)
  }

  handleRemove(id){
    
  }

  onChangeArticle = (value, label) => {
    console.log('onChangeIssueType changed', value);
    console.log('onChangeIssueType changed', label);
    this.setState({ article: label[0].label })
  }

  handleArticleAssign(data ){
    console.log(JSON.stringify(data))
    article_options = []
    data.forEach(el => {
      if(article_options.indexOf(el.id) == -1)
      article_options.push({
        value: el.id,
        label: el.title
      })
    })
  }

render(){
  console.log('this.PROPS: ' + JSON.stringify(this.props))
  console.log('this.state: ' + JSON.stringify(this.state))
  const {username, token, getMeetings} = this.props;
  const {surveyList} = this.props.pSurveyList;
  const { articleList} = this.props.pArticleList;
  if(surveyList !== undefined) {
    if(articleList !== undefined){
      console.log('surveyList: ' +surveyList)
      this.handleArticleAssign(articleList)
    }
  }
  return(
    <div> 
    {surveyList !== undefined && username !== null ? (
      <div>
        <Table dataSource={surveyList}>
              
              <Column 
                title="Survey Title" 
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
                title="To Article"
                dataIndex="article"
                key="view_count"
              />
              <Column
                title="Assign article"
                dataIndex="article"
                key="article_id"
                render={(id, record) => (
                  <span>
                    <Cascader options={article_options} onChange={this.onChangeArticle} placeholder="Please select">
                      <Button>
                        {`${this.state.article}`} <Icon type="down" />
                      </Button>
                    </Cascader>
                  </span>
                )}
              />
              <Column
                title="Action"
                dataIndex="id"
                key="action"
                render={(id) => (
                  <span>
                    {/* <a href={`/profile/${1}/account/survey/detail/${id}`}>Modify</a> */}
                    <a onClick={() => {this.handleSave(id, surveyList)}}>Save</a>
                    <Divider type="vertical" />
                    <a onClick={this.handleRemove(id)}>Delete</a>
                  </span>
                )}
              />
        </Table>
        <Button type="primary" block href={"/create/survey/"}>
          Create a Survey
        </Button>
      </div>
  ): ( <a>Please Sign up to see your articles</a>)}
  </div>
  )
};
}

const mapStateToProps = state => {
  console.log("mapStateToProps: "+JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    pSurveyList: state.profileSurvey,
    pArticleList: state.profile
  };
};
  
  const mapDispatchToProps = dispatch => {
    console.log("mapDispatchToProps: ")
    return {
      getPSL: (token, username) => dispatch(getProfileSurveyList(token, username)),
      putPSD: (token, surveyID, username, data) => dispatch(putProfileSurveyDetail(token, surveyID, username, data)),
      getPAL: (token, username) => dispatch(getProfileArticleList(token, username)),
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (ProfileArticleList);