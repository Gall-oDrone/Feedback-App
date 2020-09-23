import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import { connect } from 'react-redux';
import { Menu, Card, Button, DatePicker, TimePicker, Form, Modal, Skeleton, message, Divider, List, Tabs, Row, Col, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import Checkout from "../components/MeetingCheckout";
import { collabDetailURL, collabCreateRequestURL } from "../constants";
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

    handleSubmit = () => {
        this.setState({action_send: true, loading: true})
        const postObj = {
            user: this.props.username,
            recipient: this.state.article.user_info.profile_username,
            collabId: this.props.match.params.collabID
        }
        console.log("elv: ", postObj)
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        }
        axios.post(collabCreateRequestURL(postObj.collabId), postObj)
            .then(res => {
                if (res.status === 201) {
                   this.setState({loading: false, action_send: false})
                 }
            })
            .catch(error => {
                console.error(error) 
                this.setState({loading: false, action_send: false})
            })
            console.log('Error');
    }


    render() {
        console.log('this.PROPS: ' + JSON.stringify(this.props))
        console.log("this.state: " + this.state, this.state.orderId)
        const { loading, action_send, article} = this.state
        const {user_info} = this.state.article
        return (
            <div>
                <Card>
                    <Row gutter={[16, 48]}>
                        <Col style={{justifyContent:"center"}} span={15}>
                            <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                                <div id="session-div-2">
                                    <img
                                        className="contain"
                                        alt="logo"
                                        src={user_info ? user_info.profile_avatar: null}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col span={9}>
                            {user_info ? <a className="td" href={`/profile-page/${user_info.profile_username}`}><h2>{user_info.name}</h2></a>:null}
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
                    <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                        <div >
                            <Button onClick={() => this.handleSubmit()} loading={loading} disabled={action_send} >
                            Send Request 
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
            
        )
    }
}

const WrappedArticleCreate = Form.create()(ArticleDetail);

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username
    }
}
export default withRouter(connect(mapStateToProps)(WrappedArticleCreate));