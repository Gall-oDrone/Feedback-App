import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Menu, Card, Button, DatePicker, TimePicker, Form, Modal, Skeleton, message, Divider, List, Tabs, Row, Col, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import Checkout from "../components/MeetingCheckout";
import {getProfileAccountInfo, putProfileAccountInfo} from "../store/actions/profileUserInfo";
import {profilePageURL} from "../constants"
import "../assets/session.css"
import countryList from 'react-select-country-list'

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const options2 = countryList().getData();
const universities = [
  {
    value: 'ITAM',
    label: 'Instituto Autónomo Tecnológico de México (ITAM)'
  },
  {
    value: 'Center of Teaching and Research in Economics',
    label: 'Centro de Investigación y Docencias Económicas (CIDE)'
  },
  {
    value: 'COLMEX',
    label: 'El Colegio de México (COLMEX)'
  },
  {
    value: 'TEC_MONTERREY',
    label: 'Instituto Tecnológico y de Estudios Superiores de Monterrey (ITESM)'
  },
  {
    value: 'IBERO',
    label: 'Universidad Iberoamericana (IBERO)'
  },
  {
    value: 'Massachusetts Institute of Technology',
    label: 'Massachusetts Institute of Technology (MIT)'
  }
]

class ArticleDetail extends React.Component {

    state = {
        username: null,
        university: null,
        country: options2,
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
    };

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

      handleCountryChange = value => {
        console.log('Country changed', value);
        // this.setState({ country: value[0] })
        Object.values(options2).map((k) => {
          // console.log(JSON.stringify(k))
          if(k.value === value){
            return k.label
          } 
        })
        return value
      }
    
      handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
          autoCompleteResult = [];
        } else {
          autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
      };
    
      handleUniversityChange = val => {
        var lab = null
        Object.values(universities).map((k, i) => {
          if(k.value === val){
            this.lab = val
            return
          } 
        })
        return this.lab
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
        const { UserAccountInfo} = this.props.profileIA;
        const { 
        username,
        university,
        country,
        academic_status,
        academic_degree,
        bachelors_degree,
        masters_degree,
        phD_degree,
        course,
        profile_avatar,
        message,
        website,
        work_experience,
        visible, orderId, loading } = this.state
        return (
            <div>
                <Card title={username}>
                    <Row type="flex" style={{ alignItems: 'center' }} justify="center">
                        <Col span={12}>
                          <Row type="flex" style={{ alignItems: 'center' }} justify="center">
                            <div id="session-div-2">
                            <img
                                className="contain"
                                alt="logo"
                                src={`http://127.0.0.1:8000${profile_avatar}`}
                            />
                            </div>
                            </Row>
                        </Col>
                        <Col span={12}>
                          <div>
                              <p style={pStyle}>Basic Information</p>
                              <p>{username}</p>
                              {/* <p>{country}</p> */}
                              <p>{message}</p>

                              <Divider />
                              <p style={pStyle}>Academic Information</p>
                              <p>University: {university}</p>
                              <p>{academic_status}</p>
                              <p>Degree: {academic_degree}</p>
                              <p>{bachelors_degree}</p>
                              <p>{masters_degree}</p>
                              <p>{phD_degree}</p>
                              <p>Course: {course}</p>

                              <Divider />
                              <p style={pStyle}>Working experience</p>
                              <p>Website: {website}</p>
                              <p>Experience: {work_experience}</p>
                              </div>
                        </Col>
                    </Row>
                </Card>
                  {visible === true && orderId !== null ? (
                    <Modal  
                      visible={visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                      <Checkout orderID={orderId}/>
                    </Modal>
                  ):(null)}
            </div>
            
        )
    }
}

const WrappedArticleCreate = Form.create()(ArticleDetail);

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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedArticleCreate));