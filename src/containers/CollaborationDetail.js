import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import { connect } from 'react-redux';
import { Menu, Card, Button, DatePicker, TimePicker, Form, Modal, Skeleton, message, Divider, List, Tabs, Row, Col, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import Checkout from "../components/MeetingCheckout";
import { collabDetailURL, collabSentRequestURL } from "../constants";
import * as actions from "../store/actions/auth";
import { authAxios } from '../utils';
import "../assets/session.css"
import moment from 'moment';

const { SubMenu } = Menu;
const { TabPane } = Tabs;
const format = 'HH';
class ArticleDetail extends React.Component {

    state = {
        article: {},
        loading: false,
        disable: false,
        action_send: false,
        orderId: null,
    };

    componentDidMount() {
        console.log("componentDidMount THIPROPS: " + JSON.stringify(this.props))
        const collaborationID = this.props.match.params.collabID;
        //const sessionID = 11
        axios.get(collabDetailURL(collaborationID))
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    article: res.data,
                });
                console.log("Article Detail res data: " + res.data);
            });
        }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({action_send: true})
        this.props.form.validateFields((err, values) => {
        console.log("handleFormSubmit values: ", JSON.stringify(values));
        const hrs =
            values["hrs"] === undefined ? null : values["hrs"];
        const content =
            values["date_picker"] === undefined ? null : values["date_picker"];
        const topic =
            values["time_picker_start"] === undefined ? null : values["time_picker_start"];
        const inquiry =
            values["time_picker_end"] === undefined ? null : values["time_picker_end"];

        const postObj = {
            user: this.props.username,
            hrs: 1,
            session_id: this.props.match.params.sessionID,
            date: values.date_picker,
            start_time: this.handleDateFormat(topic, content),
            end_time: this.handleDateFormat(inquiry, content),  
        }
        console.log("handleFormSubmit postObj: ", postObj.start_time.month, postObj);
        if (!err) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.post(collabSentRequestURL, 
            postObj
            )
                .then(res => {
                    if (res.status === 200) {
                       this.setState({ orderId: res.data, loading: false, action_send: true})
                     } else {
                       this.setState({ loading: false})
                     }
                })
                .catch(error => console.error(error))
                console.log('Error');
            
            console.log('Received values of form: ', values);
        } else{
            console.log('Received error: ', err);
        }
        });
    }


    render() {
        console.log('this.PROPS: ' + JSON.stringify(this.props))
        console.log("this.state: " + this.state, this.state.orderId)
        const { loading, action_send, article} = this.state
        const {user_info} = this.state.article
        return (
            <div>
                <Card title={user_info ? <a className="td" href={`/profile-page/${user_info.profile_username}`}>{user_info.name}</a>:null}>
                    <Row>
                        <Col span={15}>
                            <div id="session-div-2">
                            <img
                                className="contain"
                                alt="logo"
                                src={user_info ? user_info.profile_avatar: null}
                            />
                             <Button type="primary" htmlType="submit" loading={loading} disabled={action_send} >
                            Send Request 
                        </Button>
                            </div>
                        </Col>
                        <Col span={9}>
                            <Tabs defaultActiveKey="1" tabPosition={"right"}>
                                  <TabPane tab="University" key="1">
                                    <p>{user_info ? user_info.university : null}</p>
                                    <p>{user_info ? user_info.degree : null}</p>
                                  </TabPane>
                                  <TabPane tab="Course" key="2">
                                    <p>{user_info ? user_info.course : null}</p>
                                  </TabPane>
                                  <TabPane tab="About me" key="3">
                                    <p>{this.state.article.content}</p>
                                  </TabPane>
                                  <TabPane tab="Topics guidance" key="4">
                                        <li>{this.state.article.topic}</li>
                                  </TabPane>
                                  <TabPane tab="Areas of expertice" key="5">
                                        <li>{this.state.article.experience}</li>
                                  </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Card>
            </div>
            
        )
    }
}

const WrappedArticleCreate = Form.create()(ArticleDetail);

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default withRouter(connect(mapStateToProps)(WrappedArticleCreate));