import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import {projectDetailURL} from "../constants";
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from "react-router-dom";
import { Menu, Card, Button, Skeleton, message, Result, List, Icon, Form } from "antd";
import CalendarComponent from '../components/Calendar';
import MeetingSteps from '../components/MeetingSteps';
import SurveyDetail from "./SurveyDetail"
import {getDetailMeetingList} from "../store/actions/meetings"
import { configConsumerProps } from 'antd/lib/config-provider';
import * as actions from "../store/actions/auth";

const { SubMenu } = Menu;
const data = { params: {model: "project" }}

  const contentListNoTitle = {
    livechat: <div><MeetingSteps/></div>,
    app: <p>app content</p>,
    survey: <SurveyDetail/>,
  };

class ArticleFeedback extends React.Component {

    state = {
        article: {},
        current: 'mail',
        schedule: false,
        key: 'tab1',
        noTitleKey: '',
    };

    onTabChange = (key, type, arId) => {
        console.log("onTabChange:", key, type);
        console.log("onTabChange arId:",arId);
        if(key === "survey"){
        contentListNoTitle["survey"] = <SurveyDetail {...{arId}}/>
        console.log("Looking at CLNT: ",JSON.stringify(contentListNoTitle))
        this.setState({ [type]: key });
        }else{
            this.setState({ [type]: key });
        };
    };

    componentDidMount() {
        console.log("Component Did Mount")
        // console.log("this.props.match.params: " + JSON.stringify(this.props.match.params))
        // console.log("this.props.match.params.projectID: " + JSON.stringify(this.props.match.params.projectID))
        const projectID = this.props.match.params.projectID;
        //const projectID = 11
        // console.log("res -1: " + this.props.getDetailMeetingList(this.props.token, projectID, this.props.username))
        if(this.props.username !== null){
            this.props.getDetailMeetingList(this.props.token, projectID, this.props.username, data)
                // .then(res => {
                //     console.log("res 0: " + JSON.stringify(res.data))
                //     this.setState({
                //         listMeeting: res.data
                //     });
                //     console.log("Article Detail res data: " + JSON.stringify(res.data));
                // });
        }
        axios.get(projectDetailURL(projectID), data)
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    article: res.data,
                    listMeeting: res.data
                });
                console.log("Article Detail res data: " + JSON.stringify(res.data));
            });
        // if(!(projectID === "create")){
        // axios.get(`http://127.0.0.1:8000/api/articles/${projectID}`)
        //     .then(res => {
        //         console.log("res: " + JSON.stringify(res.data))
        //         this.setState({
        //             article: res.data
        //         });
        //         console.log("Article Detail res data: " + res.data);
        //     });
        // }
    }

      // static getDerivedStateFromProps(props, state){
  //   const projectID = props.match.params.projectID;
  //   if(props.token !== undefined){
  //     props.getLiked(props.token, projectID)
  //   };
  //     // axios.get(projectDetailURL(projectID))
  //     // .then(res => {
  //     //     console.log("res: " + JSON.stringify(res.data))
  //     //         state.project= res.data
  //     //     console.log("Article Detail res data: " + res.data);
  //     // })
  // }
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            axios.defaults.headers = {
                "Content-Type": "aplication/json",
                Authorization: newProps.token
            }
            const projectID = this.props.match.params.projectID;
            axios.get(projectDetailURL(projectID), data)
                .then(res => {
                    this.setState({
                        article: res.data
                    });
                    console.log("Article Detail res data: " + res.data);
                })
        }

    }

    // handleUpdate = event => {
    //     if (this.props.token !== null) {
    //         const projectID = this.props.match.params.projectID;
    //         axios.defaults.headers = {
    //             "Content-Type": "aplication/json",
    //             Authorization: `Token ${this.props.token}`
    //         }
    //         axios.post(`http://127.0.0.1:8000/api/articles/${projectID}/update/`);
    //         this.props.history.push('/');
    //         this.forceUpdate();
    //     } else {
    //         // Could not update 
    //     }
    // }

    handleClick = () => {
        console.log("handleClick on Feedback type")
        console.log(this.state.schedule)
        this.setState({ schedule: true });
        console.log(this.state.schedule)
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

    handleFeedbackIcon = (feedbackType) => {
        // "live chat","phone call","survey"
        if (feedbackType === "live chat") {
            return "video-camera"
        }
        else if (feedbackType === "chat") {
            return "wechat"
        }
        else if (feedbackType === "phone call") {
            return "phone"
        }
        else if (feedbackType === "survey") {
            return "profile"
        }
    }

    renderItem(item) {
        const icons = ["phone", "mail", "profile"]
        console.log("item: " + item)
        return (
            <List.Item onClick={this.handleClick} key={`feedback-type: ${item}`}>
                <Card title={item} tabList={this.handleTabList(item)}><Icon type={this.handleFeedbackIcon(item)} theme="filled" /></Card>
            </List.Item>
        );
    }

    render() {
        const { type, username, token, meetingDetails, match: { params: {projectID}} } = this.props
        console.log("3) this.state.article.engagement: " + this.state.article.engagement)
        console.log("4) this.state.schedule: " + this.state.schedule)
        console.log("5) this.state.noTitleKey: " + this.state.noTitleKey.replace(/ +/g, ""))
        console.log("6) this.props: " + JSON.stringify(this.props))
        if(this.props.meetingDetails !== undefined) {
            console.log("7) this.props.meetings.meetingList: " + JSON.stringify(this.props.meetingDetails))
            console.log("8) this.props.meetings.meetingList: " + JSON.stringify(this.props.meetingDetails.scheduled))
        }
        // const {scheduled} = this.props.meetings.meetingList
        return (
            <div>
                {/* {this.state.article.engagement !== undefined && 
                 this.props.username !== (undefined || null) && 
                 this.props.meetingDetails !== undefined ? ( */}
                   {type !== undefined && 
                    token !== undefined && 
                    token !== null && 
                    meetingDetails !== undefined ? (
                    <Card
                        style={{ width: '100%' }}
                        tabList={this.handleTabList(type)}
                        activeTabKey={this.state.noTitleKey}
                        onTabChange={key => {
                            this.onTabChange(key, 'noTitleKey', projectID);
                        }}
                    >
                            {!this.state.schedule && this.state.noTitleKey == "live chat" ? (
                                <div>
                                    {this.props.meetingDetails.date_to_appointment === null ? (
                                        <Button type="primary" onClick={() =>{this.handleClick()}}>
                                            Schedule a Meeting
                                        </Button>
                                        ) : (<Result
                                            title="You already scheduled a Live Chat Meeting"
                                                />
                                            )
                                    }
                                </div>
                            ) : (contentListNoTitle[(this.state.noTitleKey).replace(/ +/g, "")])}
                    </Card>
                    ) : (<Result
                        title="You need to be Logged In"
                        extra={
                            <Link to={{
                                pathname: "/login",
                                state: {from: this.props.location}
                                }}
                            >
                                <Button type="primary" key="console">
                                  Login
                                </Button>
                            </Link>
                        }
                      />)
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("this.sate at mapStateToProps: "+JSON.stringify(state))
    return {
        token: state.auth.token,
        username: state.auth.username,
        meetingDetails: state.meetings.UserMeetingDetails,
    }
}

const mapDispatchToProps = dispatch => {
    console.log("mapDispatchToProps ")
    return {
        getDetailMeetingList: (token, projectID, userID, params) => dispatch(getDetailMeetingList(token, projectID, userID, params))
    };
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleFeedback));