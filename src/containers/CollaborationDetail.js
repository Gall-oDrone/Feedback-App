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
import "../assets/collaboration.css";
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
        recruitment: null,
        category: null,
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
                    recruitment: res.data.collaboration_rf,
                    category: res.data.collaboration_cat
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
                   this.setState({loading: false, action_send: true})
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
        console.log("this.state: " + JSON.stringify(this.state), this.state.orderId)
        const { loading, article, article: {user_info}, article: { selected_project }} = this.state
        return (
            <div>
                
              <div>
              <div className="layout-shadow">
                <div className="layout-content-is-white">
                  <div className="grid-row" id="Employment">
                    <div className="grid-row-inner">
                      <div className="resume_section js-employments" data-view="resumes#employment">
                        <div className="resume_section-inner">
                          <h2 className="resume_section-title has-default_offset">COLLABORATION INFO</h2>
                          <div className="resume_section-content">
                            <ul>
                              <li className="resume_section-content_item" data-gql-id="VjEtRW1wbG95bWVudC0xNjIxNTQ" data-role="item" id="employment-162154">
                                <div className="resume_section-content_row">
                                  <div className="resume_section-content_subtitle">{article.collaboration_type && article.collaboration_type.toUpperCase()} COLLABORATION</div>
                                </div>
                                <div className="muted">
                                  <ul>
                                    <li>
                                      JOIN FORM: COLLABORATION {article.collaboration_rf && article.collaboration_rf.toUpperCase()}
                                    </li>
                                    <li>
                                      CATEGORY: {article.collaboration_cat && article.collaboration_cat.toUpperCase()}
                                    </li>
                                    {article.category && article.category.position ?
                                        <li>
                                          {`Position Required: ${article.category.position.toUpperCase()}`}
                                        </li>
                                      :
                                        null
                                    }
                                  </ul>
                                  <div className="js-technologies">Fields: {article.category && article.category.field.toUpperCase()}</div>
                                </div>
                              </li>
                              <li className="resume_section-content_item" data-gql-id="VjEtRW1wbG95bWVudC0xNjIxNTQ" data-role="item" id="employment-162154">
                                <div className="resume_section-content_row">
                                  <div className="resume_section-content_subtitle">ABOUT THE {article.collaboration_type && article.collaboration_type.toUpperCase()}</div>
                                </div>
                                <div className="muted">
                                  {/* <div className="project-photo_wrapper">
                                    <div id="collab-img-con">
                                      <img
                                          alt="logo"
                                          src={
                                              article.collaboration_type === "project" ? 
                                                  selected_project && selected_project.project_image
                                                :
                                                  selected_project && selected_project.thumbnail
                                              }
                                      />
                                  </div> 
                                </div>*/}
                                  <ul>
                                    <div className="resume_section-content_row">
                                      <div className="resume_section-content_subtitle">OVERVIEW</div>
                                    </div>
                                    <div className="muted">
                                      <ul>
                                        <li>
                                          {article.collaboration_type === "project" ? 
                                              selected_project && selected_project.content
                                            :
                                              selected_project && selected_project.overview
                                          }
                                        </li>
                                      </ul>
                                    </div>
                                  </ul>
                                  <div className="js-technologies">Categories: {article.collaboration_type === "project" ? 
                                                                                      selected_project && selected_project.category.map(el => { return(<span style={{padding:"0 10px"}}>{el.toUpperCase()}</span>) })
                                                                                    :
                                                                                      selected_project && selected_project.categories.map(el => { return(<span style={{padding:"0 10px"}}>{el.toUpperCase()}</span>) })
                                                                                    }
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <h2 className="resume_section-title has-default_offset">
                            DO YOU WANT TO COLLABORATE WITH {user_info ? 
                                  <a className="td" href={`/profile-page/${user_info.profile_username}`}>
                                    {user_info.name.toUpperCase()}
                                  </a>
                                :
                                  null
                                } ?
                          </h2>
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
                                      <Tabs defaultActiveKey="1" tabPosition={"right"}>
                                            <TabPane tab="Education" key="1">
                                              <p>{user_info ? user_info.university : null}</p>
                                              <p>{user_info ? user_info.degree : null}</p>
                                            </TabPane>
                                            <TabPane tab="About me" key="2">
                                              <p>{this.state.article.content}</p>
                                            </TabPane>
                                      </Tabs>
                                  </Col>
                              </Row>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="grid-row">
                    <div class="grid-row-inner">
                      <div class="resume_section for-hire_block mobile_app-hide">
                        <div class="resume_hire_block">
                          <div class="resume_hire_block-actions">
                            <a 
                              onClick={() => this.handleSubmit()} 
                              loading={loading} 
                              disabled={this.state.action_send} 
                              className={`button ${this.state.action_send === true ? "is-green_candy":"is-grey"} is-default resume_top-hire_button`} 
                              data-role="action_button" 
                              data-short-text="Hire" >
                                {this.state.action_send === false ? "Send Request" : "Request Sent"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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