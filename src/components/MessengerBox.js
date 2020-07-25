import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Menu, Card, Button, DatePicker, TimePicker, Form, Modal, Skeleton, message, Divider, List, Tabs, Row, Col, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import Checkout from "../components/MeetingCheckout";
import {getProfileAccountInfo, putProfileAccountInfo} from "../store/actions/profileUserInfo";
import {profilePageURL} from "../constants";
import  Popup from "../chat_containers/Popup"
import  Profile from "../chat_containers/Profile"
import  Chat from "../chat_containers/Messenger"
import "../assets/popupChatWindow.css";

class MessengerBox extends React.Component {

    state = {
        username: null,
        university: null,
        academic_status: null,
        academic_degree: null,
        bachelors_degree: null,
        masters_degree: null,
        phD_degree: null,
        course: null,
        profile_avatar: null,
        message: null,
        website: null,
        work_experience: null,
        open_messenger: false,
        showPopup: "none",
        visible: false,
    };

    handleOpenMessenger = e => {
      this.setState({
        open_messenger: true,
        showPopup: "inline-flex"
    });
    }

    handleCloseMessenger = e => {
    this.setState({
      open_messenger: false,
      showPopup: "none"
  });
  }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    
      handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
          autoCompleteResult = [];
        } else {
          autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
      };
    
      handleBachelorChange = val => {
        var lab = null
        this.lab = val
        return this.lab
      };
    
      handleMasterChange = val => {
        var lab = null
        this.lab = val
        return this.lab
      };
    
      handleDoctorateChange = val => {
        var lab = null
        this.lab = val
        return this.lab
      };
    
      handleCourseChange = val => {
        var lab = null
        this.lab = val
        return this.lab
      };
    
      handleAcademicStatus = val => {
        var academic_s = null
        if(val.undergraduate === true){
          this.academic_s = "undergraduate"
        } else if (val.graduate === true){
          this.academic_s = "graduate"
        } else if (val.postgraduate === true){
          this.academic_s = "postgraduate"
        }
        return this.academic_s
      }
    
      handleDegree = val => {
        var academic_d = null
        if(val === "Bachelor's degree"){
          academic_d = "bachelor"
        } else if (val === "Master's degree"){
          academic_d = "master"
        } else if (val === "Doctorate"){
          academic_d = "doctorate"
        }
        return academic_d
      }
    
      handleCourse = val => {
        var academic_c = null
        return this.academic_c
      }
    
      handleWorkExperience = val => {
        var work_e = null
        if(val === "True"){
          this.work_e = "True"
        } else if (val === "False"){
          this.work_e = "False"
        } else {
          return this.work_e
        }
        return this.work_e
      }

    componentDidMount() {
        console.log("componentDidMount THIPROPS: " + JSON.stringify(this.props))
        const user = this.props.match.params.user;
        //const sessionID = 11
        // this.props.getProfileInfo(this.props.token, this.props.match.params.user)
        axios.get(profilePageURL(user))
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    username: res.data.name,
                    university: res.data.university,
                    country: res.data.country,
                    academic_status: res.data.academic_status,
                    academic_degree: res.data.degree,
                    bachelors_degree: res.data.bachelor,
                    masters_degree: res.data.master,
                    phD_degree: res.data.doctorate,
                    course: res.data.course,
                    profile_avatar: res.data.profile_avatar,
                    message: res.data.message,
                    website: res.data.website,
                    work_experience: res.data.work_experience,
                });
                console.log("Article Detail res data: " + res.data);
            });
        // if(!(sessionID === "create")){
        // axios.get(`http://127.0.0.1:8000/articles/${sessionID}`)
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
          // this.props.getProfileInfo(newProps.token, newProps.match.params.user)
            axios.defaults.headers = {
                "Content-Type": "aplication/json",
                Authorization: newProps.token
            }
            const user = this.props.match.params.user;
            axios.get(profilePageURL(user))
                .then(res => {
                    this.setState({
                        username: res.data.name,
                        university: res.data.university,
                        country: res.data.country,
                        academic_status: res.data.academic_status,
                        academic_degree: res.data.degree,
                        bachelors_degree: res.data.bachelor,
                        masters_degree: res.data.master,
                        phD_degree: res.data.doctorate,
                        course: res.data.course,
                        profile_avatar: res.data.profile_avatar,
                        message: res.data.message,
                        website: res.data.website,
                        work_experience: res.data.work_experience,
                    });
                    console.log("Article Detail res data: " + res.data);
                })
        }

    }

    // handleUpdate = event => {
    //     if (this.props.token !== null) {
    //         const sessionID = this.props.match.params.sessionID;
    //         axios.defaults.headers = {
    //             "Content-Type": "aplication/json",
    //             Authorization: `Token ${this.props.token}`
    //         }
    //         axios.post(`http://127.0.0.1:8000/articles/${sessionID}/update/`);
    //         this.props.history.push('/');
    //         this.forceUpdate();
    //     } else {
    //         // Could not update 
    //     }
    // }

    render() {
        console.log('this.PROPS: ' + JSON.stringify(this.props))
        console.log("this.state: " + this.state, this.state.orderId)
        const { profileIA:{UserAccountInfo}, match:{ params: {user}}} = this.props;
        const { 
          showPopup,
          open_messenger,
          loading } = this.state
        return (
            <div>
              <button className="open-button" onClick={()=>this.handleOpenMessenger()}>Chat</button>
                {open_messenger === true ?
                  <div className="form-popup" style={{display:`${showPopup}`}} id="myForm">
                      <div className="form-container">
                        <div id="chat-frame">
                          <div className="chat-content">
                            <Profile recipient={user}/>
                            <Chat recipient={user} />
                          </div>
                        </div>

                          {/* <label ><b>Message</b></label>
                          <textarea placeholder="Type message.." name="msg" required></textarea>

                          <button type="submit" className="btn">Send</button> */}
                          <button type="button" className="btn cancel" onClick={()=>this.handleCloseMessenger()}>Close</button>
                      </div>
                  </div> 
                  :null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username,
        profileIA: state.profileInfo
    }
}

const mapDispatchToProps = dispatch => {
    console.log("mapDispatchToProps: ")
    return {
      getProfileInfo: (token, userID) => dispatch(getProfileAccountInfo(token, userID)),
    //   putProfileInfo: (token, username, data) => dispatch(putProfileAccountInfo(token, username, data)),
    };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MessengerBox));