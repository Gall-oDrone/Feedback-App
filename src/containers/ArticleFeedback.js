import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { Menu, Card, Button, Skeleton, message, Result, List, Icon, Form } from "antd";
import CalendarComponent from '../components/Calendar';
import MeetingSteps from '../components/MeetingSteps';
import {getDetailMeetingList} from "../store/actions/meetings"
import { configConsumerProps } from 'antd/lib/config-provider';
import * as actions from "../store/actions/auth";

const { SubMenu } = Menu;

  const contentListNoTitle = {
    livechat: <div><MeetingSteps/></div>,
    app: <p>app content</p>,
    survey: <p>survey content</p>,
  };

class ArticleFeedback extends React.Component {

    state = {
        article: {},
        current: 'mail',
        schedule: false,
        key: 'tab1',
        noTitleKey: '',
    };

    onTabChange = (key, type) => {
        console.log("onTabChange:", key, type);
        this.setState({ [type]: key });
      };

    componentDidMount() {
        console.log("Component Did Mount")
        // console.log("this.props.match.params: " + JSON.stringify(this.props.match.params))
        // console.log("this.props.match.params.articleID: " + JSON.stringify(this.props.match.params.articleID))
        const articleID = this.props.match.params.articleID;
        //const articleID = 11
        // console.log("res -1: " + this.props.getDetailMeetingList(this.props.token, articleID, this.props.username))
        if(this.props.username !== null){
            this.props.getDetailMeetingList(this.props.token, articleID, this.props.username)
                // .then(res => {
                //     console.log("res 0: " + JSON.stringify(res.data))
                //     this.setState({
                //         listMeeting: res.data
                //     });
                //     console.log("Article Detail res data: " + JSON.stringify(res.data));
                // });
        }
        axios.get(`http://127.0.0.1:8000/articles/${articleID}`)
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    article: res.data,
                    listMeeting: res.data
                });
                console.log("Article Detail res data: " + JSON.stringify(res.data));
            });
        // if(!(articleID === "create")){
        // axios.get(`http://127.0.0.1:8000/articles/${articleID}`)
        //     .then(res => {
        //         console.log("res: " + JSON.stringify(res.data))
        //         this.setState({
        //             article: res.data
        //         });
        //         console.log("Article Detail res data: " + res.data);
        //     });
        // }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            axios.defaults.headers = {
                "Content-Type": "aplication/json",
                Authorization: newProps.token
            }
            const articleID = this.props.match.params.articleID;
            axios.get(`http://127.0.0.1:8000/articles/${articleID}/`)
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
    //         const articleID = this.props.match.params.articleID;
    //         axios.defaults.headers = {
    //             "Content-Type": "aplication/json",
    //             Authorization: `Token ${this.props.token}`
    //         }
    //         axios.post(`http://127.0.0.1:8000/articles/${articleID}/update/`);
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
                {this.state.article.engagement !== undefined && 
                 this.props.username !== (undefined || null) && 
                 this.props.meetingDetails !== undefined ? (
                    <Card
                        style={{ width: '100%' }}
                        tabList={this.handleTabList(this.state.article.engagement)}
                        activeTabKey={this.state.noTitleKey}
                        onTabChange={key => {
                            this.onTabChange(key, 'noTitleKey');
                        }}
                        >
                            {!this.state.schedule && this.state.noTitleKey == "live chat" ? (
                                <div>
                                 {this.props.meetingDetails.date_to_appointment == null ? (
                                <Button type="primary" onClick={() =>{this.handleClick()}}>
                                   Schedule a Meeting
                                </Button>
                                ) : (<Result
                                    title="You already scheduled a Live Chat Meeting"
                                  />)}
                                </div>
                            ) : (contentListNoTitle[(this.state.noTitleKey).replace(/ +/g, "")])}
                    </Card>
                    ) : (<Result
                        title="You need to be Logged In to leave a feedback"
                        extra={
                          <Button type="primary" key="console">
                            Go Console
                          </Button>
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
        getDetailMeetingList: (token, articleID, userID) => dispatch(getDetailMeetingList(token, articleID, userID))
    };
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleFeedback));