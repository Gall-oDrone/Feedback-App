import React from "react";
import axios from "axios";
import {Form, Select, Button } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import countryList from 'react-select-country-list'
import "../assets/collaboration.css";
import "../assets/resume.css";
import {getProfileAccountInfo, putProfileAccountInfo} from "../store/actions/profileUserInfo";
import {putProfileAccountDetail } from "../store/actions/profileAccountInfo";
import { fetchDegreesAndCoursesURL } from "../constants"
import ProfilePic from "../components/ProfilePicUploader";

const minOffset = 0;
const maxOffset = 60;
const FormItem = Form.Item;
const { Option } = Select;
const options = countryList().getData();

class CustomLayoutContainer extends React.Component {

  constructor(props){
    super(props);
    const thisYear = (new Date()).getFullYear();
    this.state = {
      collapsed: true,
      current: '1',
      profileInfoModal: false,
      thisYear: thisYear,
      selectedYear: thisYear,
      jobPosList: ["initial"],
      jobPosDescList: ["initial"],
      academic_status:null,
      bachelorList:["initial"],
      masterList:["initial"],
      phdList:["initial"],
      otherEduList:["initial"],

      universities: [],
      countries: options,
      academic_status: null,
      academic_degree: null,
      bachelors_degrees: null,
      masters_degrees: null,
      phD_degrees: null,
      courses: null,
      employment:[
          {
            job_pos:null,
            company:null,
            location:null,
            duration: {from:null, to:null},
            desc: [""],
            technos: [],
            skills: [],
          }
        ],
      education:{
        status:null,
        undergrad:[
          {
            course:null,
            inst:null,
            stu_type:null,
            duration: {from:null, to:null},
          }
        ],
        grad:[
          {
            degree:null,
            inst:null,
            duration: {from:null, to:null},
          }
        ],
        posgrad:[
          {
            degree:null,
            inst:null,
            duration: {from:null, to:null},
          }
        ],
        other_edu:[
          {
            di_cer:null,
            inst:null,
            duration: {from:null, to:null},
          }
        ],
      }
    }
  }

  handleLoginModal = () => {
    this.setState({loginModal: true})
  }

  handleCloseModal = () => {
    this.setState({loginModal: false, loading: false})
  }
  handleSelectedPicture = (val) => {
    this.setState({selectedImage: val})
  }
  onHandleDatepickerChange = (e) => {
    // Handle Change Here
    // alert(evt.target.value);
    this.setState({ selectedYear: e.target.value });
  };
  handleChangePosDesc = (action, list, parent, index, child_i) => {
    var callPar = parent[index]
    const { form } = this.props;
    const desc_val = form.getFieldValue(`employment-${[index]}[pos_desc]`);
    if(action === "add"){
      const addingEl = list.concat(list[list.length + 1])
      // callPar.desc.push("")
      this.setState({ jobPosDescList: addingEl });
    } else if (action === "delete"){
      const removingEl = list.splice(-1,1)
      // var callPar = parent[index]
      // callPar.desc.pop()
      // this.setState({ jobPosDescList: removingEl, employment: [callPar] });
      this.setState({ jobPosDescList: removingEl });
    } else {
      const desc_val = form.getFieldValue(`pos_desc_${child_i}`);
      console.log("aleluya:", callPar.desc, desc_val, child_i)
      // form.setFieldsValue({
      //   [`pos_desc_${child_i}`]: desc_val
      // });
      // callPar.desc[child_i] = desc_val
      // this.setState({ employment: [callPar] });
    }
  }
  handleChangePosDesc2 = (e, parent, index, child_i) => {
    var callPar = parent[index]
    const { form } = this.props;
      // const desc_val = form.getFieldValue(`pos_desc_${child_i}`);
      // console.log("aleluya II:", callPar.desc, e.target.value)
      // form.setFieldsValue({
      //   [`pos_desc_${child_i}`]: desc_val
      // });
      // callPar.desc[child_i] = e.target.value
      // this.setState({ employment: [callPar] });
  }
  handleChangePos = async (action, list, parent) => {
    if(action === "add"){
      const addingEl = list.concat(list[list.length + 1])
      // var add_vals = parent.push({...parent[0]})
      // this.setState({ jobPosList: addingEl, employment: [add_vals] });
      this.setState({ jobPosList: addingEl });
    } else {
      const removingEl = list.splice(-1,1)
      this.setState({ jobPosList: removingEl });
    }
  }
  handleAS = (e) =>{
    console.log("AÑO: ", e.target.value)
    this.setState({ academic_status: e.target.value });
  }
  handleChangeEdu = (action, degree, list) => {
    if(action === "add"){
      const addingEl = list.concat(list[list.length + 1])
      if(degree === "bachelor"){
        this.setState({ bachelorList: addingEl });
      }
      else if(degree === "master"){
        this.setState({ masterList: addingEl })
      }
      else if(degree === "phd"){
        this.setState({ phdList: addingEl })
      }
      else if(degree === "otherEdu"){
        this.setState({ otherEduList: addingEl })
      }
    } else {
      const removingEl = list.splice(-1,1)
      if(degree === "bachelor"){
        this.setState({bachelorList: removingEl });
      }
      else if(degree === "master"){
        this.setState({masterList: removingEl });
      }
      else if(degree === "phd"){
        this.setState({phdList: removingEl });
      }
      else if(degree === "otherEdu"){
        this.setState({otherEduList: removingEl });
      }
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { UserAccountInfo} = this.props.profileIA;
    let formData = new FormData();
    this.props.form.validateFields((err, values) => {
      console.log("handleFormSubmit values: ", JSON.stringify(values) );
      const personal_info = 
        values["personal_info"] === undefined 
        || values["personal_info"][0] === UserAccountInfo.personal_info ? null : values["personal_info"][0];
      const ifname = values["ifname"] === undefined ? null : values["ifname"]
      const ilname = values["ilname"] === undefined ? null : values["ilname"]
      const iprofesion = 
        values["iprofesion"] === undefined ? null : values["iprofesion"]
      const ilocation = 
        values["ilocation"] === undefined ? null : values["ilocation"]
      const imyself = 
        values["imyself"] === undefined ? null : values["imyself"]
      // const university = 
      //   values["university"] === undefined 
      //   || values["university"][0] === UserAccountInfo.university ? null : values["university"][0];
      // const attendace = 
      //   values["attendace"] === undefined 
      //   || values["attendace"] === UserAccountInfo.attendace ? null : values["attendace"];
      // const degree = 
      //   values["degree"] === undefined 
      //   || values["degree"] === UserAccountInfo.degree ? null : values["degree"];
      // const bachelor = 
      //   values["bachelor"] === undefined 
      //   || values["bachelor"][0] === UserAccountInfo.bachelor ? null : values["bachelor"][0];
      // const master = 
      //   values["master"] === undefined 
      //   || values["master"][0] === UserAccountInfo.master ? null : values["master"][0];
      // const doctorate = 
      //   values["doctorate"] === undefined 
      //   || values["doctorate"][0] === UserAccountInfo.doctorate ? null : values["doctorate"][0];
      // const other_edu = 
      //   values["other_edu"] === undefined 
      //   || values["other_edu"][0] === UserAccountInfo.other_edu ? null : values["other_edu"][0];
      // const course = 
      //   values["course"] === undefined 
      //   || values["course"][0] === UserAccountInfo.course ? null : values["course"][0];
      // const student_type = 
      //   values["student_type"] === undefined 
      //   || values["student_type"][0] === UserAccountInfo.student_type ? null : values["student_type"][0];
      // const website = 
      //   values["website"] === undefined 
      //   || values["website"] === UserAccountInfo.website ? null : values["website"];
      // const employment = 
        const employments = values["employments"] === undefined ? null : values["employments"];
        const academy = values["academy"] === undefined ? null : values["academy"];

      const postObj = {
        profile_username: this.props.username,
        personal_info: personal_info,
        selectedImage: null,
        ifname: ifname,
        ilname: ilname,
        iprofesion: iprofesion,
        ilocation: ilocation,
        imyself: imyself,
        employments: employments,
        academy: academy,
        // university: university,
        // attendace: attendace,
        // degree: degree,
        // bachelor: bachelor,
        // master: master,
        // doctorate: doctorate,
        // course: course,
        // website: website,
        // student_type: student_type,
        // employment: employment,
      }
      console.log("postObj: ", JSON.stringify(postObj), UserAccountInfo, this.state.selectedImage);
      if (this.state.selectedImage !== null){
        formData.append("file", this.state.selectedImage)
        console.log("formData I: ", JSON.stringify(formData))
        console.log("formData II: ", JSON.stringify(this.state.selectedImage))
      }
        formData.append("data", JSON.stringify(postObj))
      if (!err) {
        this.props.putProfileInfo(this.props.token, this.props.userId, formData)
      } else{
        console.error('Received error: ', err);
      }
    });
  };
  fetchData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    }
    axios.get(fetchDegreesAndCoursesURL)
    .then(res => {
      console.log("resData at UI: ", (res))
      this.setState({
        academic_degree:res.data[0].degree,
        bachelors_degrees:res.data[0].bachelor,
        masters_degrees:res.data[0].master,
        phD_degrees:res.data[0].pHD,
        courses: res.data[0].course,
        universities: res.data[0].university,
      });
      console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
    })
    .catch(err =>
      console.error("ERROR 123: ", err.message));
  }
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        this.props.getProfileInfo(this.props.token, this.props.username)
        this.fetchData()
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }
  
  componentDidUpdate(newProps) {
    if (newProps.token !== this.props.token) {
      if (this.props.token !== undefined && this.props.token !== null) {
        this.props.getProfileInfo(this.props.token, this.props.username)
        this.fetchData()
      } else {
        this.props.history.push('/');
      }
    }    
  }

  render() {
    const { 
      thisYear, selectedYear, jobPosList, jobPosDescList,
      bachelorList, masterList, phdList, otherEduList, 
      academic_status, selectedImage, countries, 
      employment, bachelors_degrees, masters_degrees, 
      phD_degrees, courses, universities
    } = this.state;
    const { getFieldDecorator, getFieldValue, getFieldsValue } = this.props.form;
    const options = [];
    // getFieldDecorator(`employments`, { initialValue: employment });
    for (let i = minOffset; i <= maxOffset; i++) {
      const year = thisYear - i;
      options.push(<option key={i} value={year}>{year}</option>);
    }
    return(
      
      <div>
        <Form onSubmit={this.handleSubmit}>
          <div className="layout-shadow">
            <div className="layout-content-is-white">
              <div className="grid-row">
                <div className="grid-row-inner">
                  <div className="resume_section resume_top-section" data-view="resumes#top-aligner">
                    <div className="resume_top-left-2" data-role="left_panel">
                      {/* <div className="resume_top-photo_wrapper">
                        <img alt="Adrien Castelain, Designer in Wellington, New Zealand" className="resume_top-photo" src="http://127.0.0.1:8000/media/profileAvatar/IMG_20180723_230803_tKPJtyV.jpg"></img>
                      </div> */}
                      <div className="resume_top-photo_wrapper-2">
                        <ProfilePic profile_pic={this.handleSelectedPicture}/>
                      </div>
                    </div>
                    <div className="resume_top-right" data-role="right_panel">
                      <div className="resume_top-info">
                        <div className="resume_top-info_name-2" data-slug="adrien-castelain" data-target-role="Designer">
                          <div className="firstname-con">
                            <div className="firstname-con-label">
                              <label id="name" for="fname">First Name</label>
                            </div>
                            <div>
                              <Form.Item style={{marginBottom: "0px"}}>
                                {getFieldDecorator("ifname", {
                                  rules: [
                                    { type: 'string', required: true, message: 'Please enter down your name' },
                                  ],
                                })(
                                  <input type="text" id="ifname" name="firstname" placeholder="Your name.."/>
                                )}
                              </Form.Item>
                            </div>
                          </div>
                          <div className="lastname-con">
                            <div className="lastname-con-label">
                              <label id="lastname" for="lname">Last Name</label>
                            </div>
                            <div>
                              <Form.Item style={{marginBottom: "0px"}}>
                                  {getFieldDecorator("ilname", {
                                    rules: [
                                      { type: 'string', required: true, message: 'Please enter down your lastname' },
                                    ],
                                  })(
                                    <input type="text" id="ilname" name="lastname" placeholder="Your lastname.."/>
                                  )}
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                        <div className="short-desc-cont">
                          <div className="short-desc-profession">
                            <div className="profesion-con">
                              <label id="profesion" for="profesion">Profesion</label>
                            </div>
                            <div>
                              {/* <input type="text" id="iprofesion" name="profesion" placeholder="E.g. Designer..."/>  */}
                              <Form.Item style={{marginBottom: "0px"}}>
                                  {getFieldDecorator("iprofesion", {
                                    rules: [
                                      { type: 'string', required: true, message: 'Please enter down your current profesion' },
                                    ],
                                  })(
                                    <input type="text" id="iprofesion" name="profesion" placeholder="E.g. Designer..."/> 
                                  )}
                              </Form.Item>
                            </div>
                          </div>
                          <div className="short-desc-location">
                            <div className="location-con">
                              <label id="location" for="location">Location</label>
                            </div>
                            <div>
                              {/* <input type="text" id="ilocation" name="location" placeholder="E.g. Wellington, New Zealand..."/> */}
                              <Form.Item style={{marginBottom: "0px"}}>
                                  {getFieldDecorator("ilocation", {
                                    rules: [
                                      { type: 'string', required: true, message: 'Please enter down your current location' },
                                    ],
                                  })(
                                    <input type="text" id="ilocation" name="location" placeholder="E.g. Wellington, New Zealand..."/>
                                  )}
                              </Form.Item>
                            </div>
                          </div>
                          <div className="resume_top-info_since">Member since January 10, 2019</div>
                        </div>
                        <div className="resume_top-info_bio" data-role="description">
                          <div className="myself-con-label">
                            <label id="myself" for="lname">About yourself</label>
                          </div>
                          <div>
                            <Form.Item>
                              {getFieldDecorator("imyself", {
                                rules: [
                                  { type: 'string', required: true, message: 'Please write down a short bio about yourself' },
                                ],
                              })(
                                <textarea name="app[questions][make]" id="imyself" className="my-desc-textarea">
                                </textarea>
                              )}
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid-row" id="Employment">
                <div className="grid-row-inner">
                  <div className="resume_section js-employments" data-view="resumes#employment">
                    <div className="resume_section-inner">
                      <h2 className="resume_section-title has-default_offset">Employment</h2>
                      <div className="resume_section-content">
                        <ul>
                          {jobPosList.map((val, i) => {
                            return(
                                <li key={`job-${i}`} className="resume_section-content_item-2" data-gql-id="VjEtRW1wbG95bWVudC0xNjIxNTQ" data-role="item" id="li-employment">
                                  <div className="employment-list-cont">
                                    <h3 className="resume_section-content_title has-range">
                                      <div className="job-position-cont">
                                        <label id="employment" for="employment">Job Position</label>
                                      </div>
                                      <div className="job-position-cont">
                                      <Form.Item style={{marginBottom: "0px"}}>
                                        {getFieldDecorator(`employments[${[i]}][job_pos]`, {
                                          rules: [
                                            { type: 'string', required: true, message: 'Please enter down the name of your job position' },
                                          ],
                                        })(
                                          <input type="text" id={`employments[${[i]}][job_pos]`} name="employment-1" placeholder="E.g. Consultant Digital Designer of UX/UI, Interaction, and Strategy"/>
                                        )}
                                      </Form.Item>
                                      </div>
                                    </h3>
                                    <div className="employment-duration">
                                      <div className="employment-duration-from">
                                        <label id="employment" for="employment">From</label>
                                          <Form.Item style={{marginBottom: "0px"}}>
                                          {getFieldDecorator(`employments[${[i]}]["duration"]["from"]`, {
                                            rules: [
                                              { type: 'string', required: true, message: 'Please enter down the name of your job position' },
                                            ],
                                          })(
                                            <select id={`employments[${[i]}]["duration"]["from"]`} value={this.selectedYear} onChange={this.onHandleChange}> 
                                              <option value="" selected disabled hidden>Choose here</option>
                                              {options}
                                            </select>
                                          )}
                                        </Form.Item>
                                      </div>
                                      <div className="employment-duration-to">
                                        <label id="employment" for="employment">To</label>
                                          <Form.Item style={{marginBottom: "0px"}}>
                                            {getFieldDecorator(`employments[${[i]}]["duration"]["to"]`, {
                                              rules: [
                                                { type: 'string', required: true, message: 'Please enter down the name of your job position' },
                                              ],
                                            })(
                                              <select id={`employments[${[i]}]["duration"]["to"]`} value={this.selectedYear} onChange={this.onHandleChange}> 
                                                <option value="" selected disabled hidden>Choose here</option>
                                                {options}
                                              </select>
                                            )}
                                          </Form.Item>
                                      </div>
                                    </div>
                                    <div className="employment-comapny-name">
                                      <div className="job-position-cont">
                                        <label id="employment" for="employment">Company</label>
                                      </div>
                                      <div className="job-position-cont">
                                        <Form.Item style={{marginBottom: "0px"}}>
                                            {getFieldDecorator(`employments[${[i]}]["company"]`, {
                                              rules: [
                                                { type: 'string', required: true, message: 'Please enter down the name of your job position' },
                                              ],
                                            })(
                                              <input type="text" id={`employments[${[i]}]["company"]`} name="bdaymonth" placeholder="E.g. Bold&amp;Bald"/>
                                            )}
                                        </Form.Item>
                                      </div>
                                    </div>
                                    <div className="employment-location">
                                      <div className="job-position-cont">
                                        <label id="employment" for="employment">Location</label>
                                      </div> 
                                      <div className="job-position-cont">
                                        <Form.Item style={{marginBottom: "0px"}}>
                                            {getFieldDecorator(`employments[${[i]}]["location"]`, {
                                              rules: [
                                                { type: 'string', required: true, message: 'Please enter down the name of your job position' },
                                              ],
                                            })(
                                              <input type="text" id={`employments[${[i]}]["company"]`} name="bdaymonth" placeholder="E.g. New Zealand"/>
                                            )}
                                        </Form.Item>
                                      </div>
                                    </div>
                                  </div>
                                <div className="muted">
                                  <ul>
                                    {jobPosDescList.map((el, index) => {
                                      return(
                                        <li id={`job-${i}-pos-desc-${el}`} key={index}>
                                          <div className="job-pos-desc">
                                            <div className="job-pos-desc-label">
                                              <label id="employment" for="employment">Job Position Description</label>
                                            </div>
                                            <div className="job-pos-desc-textarea">
                                              <Form.Item style={{marginBottom: "0px"}}>
                                                  {getFieldDecorator(`employments[${[i]}]["desc"][${index}]`, {
                                                    rules: [
                                                      { type: 'string', required: true, message: 'Please enter down the name of your job position' },
                                                    ],
                                                  })(
                                                    <textarea 
                                                      type="text" 
                                                      onChange={(e) => this.handleChangePosDesc2(e, employment, i, index)} 
                                                      id={`employments[${[i]}]["desc"][${index}]`} 
                                                      name="bdaymonth" 
                                                      placeholder="E.g Led UX and UI for an investment banking web app, delivering clean and uncluttered look and feel based on research, creating, testing and enhancing main user-flows (onboarding, investing, withdrawing, customer feedback, and so on), building the design system, working across different teams and in an agile environment, collaborating efficiently with multiple stakeholders."
                                                    />
                                                  )}
                                              </Form.Item>
                                            </div>
                                          </div>
                                        </li>
                                      )
                                    })}
                                    <div className="pos-desc-add" data-role="load_more_link_wrapper">
                                      <a className="button is-light is-small" 
                                        onClick={() => this.handleChangePosDesc("add", jobPosDescList, employment, i, null)} data-role="load_more_link">+</a>
                                      {jobPosDescList.length > 1 ?
                                          <a className="button is-light is-small button-delete" onClick={() => this.handleChangePosDesc("delete", jobPosDescList, employment, i, null)} data-role="load_more_link">-</a>
                                        :
                                          null
                                      }
                                    </div>
                                  </ul>
                                  <div className="employ-skills-techno">
                                    <div className="employment-technologies">
                                      <label id="employment" for="employment">Technologies</label>
                                      <div class="techs-select techs-select--multiple">
                                        <Form.Item style={{marginBottom: "0px"}}>
                                          {getFieldDecorator(`employments[${[i]}]["techs"]`, {
                                            rules: [
                                              { type: 'array', required: true, message: 'Please select' },
                                            ],
                                          })(
                                            <Select name={`employment-${[i]}["techs"]`} id={`employments[${[i]}]["techs"]`} mode="tags" placeholder="Please select or type an option">
                                            </Select>
                                          )}
                                        </Form.Item>
                                        <span class="focus"></span>
                                      </div>
                                    </div>
                                    {/* <div className="container">
                                      <h3>Video Category</h3>
                                      <div className="select-box">
                                        <div className="options-container">
                                          <div className="option">
                                            <input
                                              type="radio"
                                              className="radio"
                                              id="automobiles"
                                              name="category"
                                            />
                                            <label for="automobiles">Automobiles</label>
                                          </div>

                                          <div className="option">
                                            <input type="radio" className="radio" id="film" name="category" />
                                            <label for="film">Film & Animation</label>
                                          </div>
                                          <div class="selected">
                                            Select Video Category
                                          </div>
                                          <div class="search-box">
                                            <input type="text" placeholder="Start Typing..." />
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                    <div className="js-skills">
                                    <label id="employment" for="employment">Skills</label>
                                    <div class="techs-select techs-select--multiple">
                                      <Form.Item style={{marginBottom: "0px"}}>
                                          {getFieldDecorator(`employments[${[i]}]["skills"]`, {
                                            rules: [
                                              { type: 'array', required: true, message: 'Please select' },
                                            ],
                                          })(
                                             <Select name={`employment-${[i]}["techs"]`} id={`employments[${[i]}]["techs"]`} mode="tags" placeholder="Please select or type an option">
                                              </Select>
                                          )}
                                      </Form.Item>
                                      <span class="focus"></span>
                                    </div>
                                  </div>
                                  </div>
                                </div>
                            </li>
                            )
                          })}
                          <div className="employment-actions-add" data-role="load_more_link_wrapper">
                            <a className="button is-light is-small" onClick={() => this.handleChangePos("add", jobPosList, employment)} data-role="load_more_link">Add</a>
                              {jobPosList.length > 1 ?
                                  <a className="button is-light is-small button-delete" onClick={() => this.handleChangePos("delete", jobPosList, employment)} data-role="load_more_link">Remove</a>
                                :
                                  null
                              }
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid-row #Education">
                <div className="grid-row-inner">
                  <div className="resume_section js-educations">
                    <div className="resume_section-inner">
                      <h2 className="resume_section-title for-education">Education</h2>
                      <div className="resume_section-content">
                        <ul>
                          <div className="academic-grade-cont">
                            <div className="academic-grade-row">
                              <div className="academic-grade-label">
                                <label for="cars">Academic Status</label>
                              </div>
                              <div className="academic-grade-choices">
                                <Form.Item style={{marginBottom: "0px"}}>
                                  {getFieldDecorator("academy[academic_grade]", {
                                    rules: [
                                      { type: 'string', required: true, message: 'Please select' },
                                    ],
                                  })(
                                    <select onChange={e => {this.handleAS(e)}} id="academic_grade" name="cars">
                                      <option value="" selected disabled hidden>Choose here</option>
                                      <option value="undergraduate">Undergraduate</option>
                                      <option value="graduate">Graduate</option>
                                      <option value="posgraduate">Posgraduate</option>
                                      <option value="other">Other</option>
                                  </select> 
                                  )}
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                          {academic_status === "undergraduate" ?
                          <div className="undergrad-cont">
                            <div className="undergrad-row-cont">
                              <div className="undergrad-education">
                                <div className="undergrad-education-label">
                                  <label for="course">Course</label>
                                </div>
                                <div>
                                  <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator("academy[undergraduate[academic_course]]", {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                      <select id="academy[undergraduate[academic_course]]" name="courses">
                                        <option value="" selected disabled hidden>Choose here</option>
                                        {courses.map(el => {
                                          return(
                                            <option value={el.value}>{el.label}</option>
                                          )
                                        })}
                                      </select> 
                                    )}
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="undergrad-institution">
                                <div>
                                  <label for="udergras-inst">Institution</label>
                                </div>
                                <div>
                                  <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator("academy[undergraduate[institution]]", {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                      <select id="academy[undergraduate[institution]]" name="courses">
                                        <option value="" selected disabled hidden>Choose here</option>
                                        {universities.map(el => {
                                              return (
                                                <option value={el.value}>{el.label}</option>
                                              )
                                            })
                                          }
                                      </select> 
                                    )}
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="undergrad-student-type">
                              <div>
                                <label for="cars">Student Type</label>
                              </div>
                              <div>
                                <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator("academy[undergraduate[student_type]]", {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                      <select id="academy[undergraduate[student_type]]" name="courses">
                                        <option value="" selected disabled hidden>Choose here</option>
                                        <option value="freshman">Freshman</option>
                                        <option value="sophomore">Sophomore</option>
                                        <option value="junior">Junior</option>
                                        <option value="senior">Senior</option>
                                      </select> 
                                    )}
                                </Form.Item>
                              </div>
                            </div>
                            <div className="undergrad-duration">
                            <div className="undergrad-duration-from">
                              <label id="undergrad-edu" for="undergrad-edu">Attending from</label>
                              <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator("academy[undergraduate[from_year]]", {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                    <select id="academy[undergraduate[from_year]]"value={this.selectedYear} onChange={this.onHandleChange}> 
                                      <option value="" selected disabled hidden>Choose a year</option>
                                      {options}
                                    </select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="undergrad-duration-to">
                              <label id="employment" for="employment">To</label>
                              <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator("academy[undergraduate[to_year]]", {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                      <select id="academy[undergraduate[to_year]]r"value={this.selectedYear} onChange={this.onHandleChange}> 
                                        <option value="" selected disabled hidden>Choose a year</option>
                                        {options}
                                      </select>
                                    )}
                                </Form.Item>
                            </div>
                          </div>
                          </div>
                            : null
                          }
                          {academic_status === "graduate" || academic_status === "posgraduate" ?
                          <div className="bachelor-cont">
                            <ul>
                              {bachelorList.map((el, index) => {
                                return(
                                  <li key={`bachelor-${index}`}>
                                    <div className="bachelor-education">
                                      <div className="bachelor-row-cont">
                                        <div>
                                          <div className="bachelor-education-label">
                                            <label for="cars">Bachelor's Degree</label>
                                          </div>
                                            <div>
                                              <Form.Item style={{marginBottom: "0px"}}>
                                                {getFieldDecorator(`academy[bachelor[${index}][degree]]`, {
                                                  rules: [
                                                    { type: 'string', required: true, message: 'Please select' },
                                                  ],
                                                })(
                                                  <select id={`academy[bachelor[${index}][degree]]`} name="cars">
                                                    <option value="" selected disabled hidden>Choose here</option>
                                                    {bachelors_degrees.map(el => {
                                                        return (
                                                          <option value={el.value}>{el.label}</option>
                                                        )
                                                      })
                                                    }
                                                  </select> 
                                                )}
                                              </Form.Item>
                                          </div>
                                        </div>
                                        <div className="bachelor-institution">
                                          <div className="bachelor-institution-label">
                                            <label for="cars">Institution</label>
                                          </div>
                                          <div>
                                          <Form.Item style={{marginBottom: "0px"}}>
                                            {getFieldDecorator(`academy[bachelor[${index}][institution]]`, {
                                              rules: [
                                                { type: 'string', required: true, message: 'Please select' },
                                              ],
                                            })(
                                              <select id={`academy[bachelor[${index}][institution]]`} name="cars">
                                                <option value="" selected disabled hidden>Choose here</option>
                                                      {universities.map(el => {
                                                      return (
                                                        <option value={el.value}>{el.label}</option>
                                                      )
                                                    })
                                                  }
                                                    </select> 
                                            )}
                                          </Form.Item>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="bachelor-duration">
                                        <div className="bachelor-duration-from">
                                          <label id="bachelor-edu" for="bachelor-edu">From</label>
                                          <Form.Item style={{marginBottom: "0px"}}>
                                              {getFieldDecorator(`academy[bachelor[${index}][from_year]]`, {
                                                rules: [
                                                  { type: 'string', required: true, message: 'Please select' },
                                                ],
                                              })(
                                                <select id={`academy[bachelor[${index}][from_year]]`} value={this.selectedYear} onChange={this.onHandleChange}> 
                                                    <option value="" selected disabled hidden>Choose a year</option>
                                                    {options}
                                                  </select>
                                              )}
                                          </Form.Item> 
                                        </div>
                                        <div className="bachelor-duration-to">
                                          <label id="employment" for="employment">To</label>
                                          <Form.Item style={{marginBottom: "0px"}}>
                                              {getFieldDecorator(`academy[bachelor[${index}][to_year]]`, {
                                                rules: [
                                                  { type: 'string', required: true, message: 'Please select' },
                                                ],
                                              })(
                                                <select id={`academy[bachelor[${index}][to_year]]`} value={this.selectedYear} onChange={this.onHandleChange}> 
                                                  <option value="" selected disabled hidden>Choose a year</option>
                                                  {options}
                                              </select>
                                              )}
                                          </Form.Item>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                            <div className="edu-actions-add" data-role="load_more_link_wrapper">
                              <a className="button is-light is-small" onClick={() => this.handleChangeEdu("add", "bachelor", bachelorList)} data-role="load_more_link">+</a>
                              {bachelorList.length > 1 ?
                                  <a className="button is-light is-small button-delete" onClick={() => this.handleChangeEdu("delete", "bachelor", bachelorList)} data-role="load_more_link">-</a>
                                :
                                  null
                              }
                            </div>
                          </div>
                            : null
                          }
                          {academic_status === "posgraduate" ?
                          <div>
                          <div className="master-cont">
                            <ul>
                                {masterList.map((el, index) => {
                                  return(
                                    <li key={`master-${index}`}>
                                      <div className="master-row-cont">
                                        <div className="master-education">
                                          <div className="master-education-label">
                                            <label for="cars">Master's Degree</label>
                                          </div>
                                          <div>
                                            <Form.Item style={{marginBottom: "0px"}}>
                                              {getFieldDecorator(`academy[master[${index}][degree]]`, {
                                                rules: [
                                                  { type: 'string', required: true, message: 'Please select' },
                                                ],
                                                })(
                                                  <select id={`academy[master[${index}][degree]]`} name="cars">
                                                    <option value="" selected disabled hidden>Choose here</option>
                                                        {masters_degrees.map(el => {
                                                            return (
                                                              <option value={el.value}>{el.label}</option>
                                                            )
                                                          })
                                                        }
                                                  </select> 
                                                )}
                                            </Form.Item>
                                          </div>
                                        </div>
                                        <div className="master-institution">
                                          <div className="master-institution-label">
                                            <label for="cars">Institution</label>
                                          </div>
                                          <div>
                                          <Form.Item style={{marginBottom: "0px"}}>
                                            {getFieldDecorator(`academy[master[${index}][institution]]`, {
                                              rules: [
                                                { type: 'string', required: true, message: 'Please select' },
                                              ],
                                            })(
                                              <select id={`academy[master[${index}][institution]]`} name="cars">
                                                <option value="" selected disabled hidden>Choose here</option>
                                                      {universities.map(el => {
                                                      return (
                                                        <option value={el.value}>{el.label}</option>
                                                      )
                                                    })
                                                  }
                                                    </select> 
                                            )}
                                          </Form.Item>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="master-duration">
                                      <div className="master-duration-from">
                                        <label id="employment" for="employment">From</label>
                                        <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator(`academy[master[${index}][from_year]]`, {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                        <select id={`academy[master[${index}][from_year]]`} value={this.selectedYear} onChange={this.onHandleChange}>
                                            <option value="" selected disabled hidden>Choose a year</option> 
                                            {options}
                                          </select>
                                    )}
                                </Form.Item>
                                      </div>
                                      <div className="master-duration-to">
                                        <label id="employment" for="employment">To</label>
                                        <Form.Item style={{marginBottom: "0px"}}>
                                          {getFieldDecorator(`academy[master[${index}][to_year]]`, {
                                            rules: [
                                              { type: 'string', required: true, message: 'Please select' },
                                            ],
                                          })(
                                              <select id={`academy[master[${index}][to_year]]`} value={this.selectedYear} onChange={this.onHandleChange}> 
                                                <option value="" selected disabled hidden>Choose a year</option>
                                                {options}
                                              </select>
                                          )}
                                        </Form.Item>
                                      </div>
                                    </div>
                                    </li>
                                  )
                                })}
                            </ul>
                            <div className="edu-actions-add" data-role="load_more_link_wrapper">
                              <a className="button is-light is-small" onClick={() => this.handleChangeEdu("add", "master", masterList)} data-role="load_more_link">+</a>
                              {masterList.length > 1 ?
                                  <a className="button is-light is-small button-delete" onClick={() => this.handleChangeEdu("delete", "master", masterList)} data-role="load_more_link">-</a>
                                :
                                  null
                              }
                            </div>
                          </div>
                          <div className="phd-cont">
                            <ul>
                              {phdList.map((el, index) => {
                                return(
                                  <li key={`phd-${index}`}>
                                    <div className="phd-row-cont">
                                      <div className="phd-education">
                                        <div className="phd-education-label">
                                          <label for="cars">P.h.D Degree</label>
                                        </div>
                                        <div>
                                        <Form.Item style={{marginBottom: "0px"}}>
                                            {getFieldDecorator(`academy[phd[${index}][degree]]`, {
                                              rules: [
                                                { type: 'string', required: true, message: 'Please select' },
                                              ],
                                            })(
                                              <select id={`academy[phd[${index}][degree]]`} name="cars">
                                                <option value="" selected disabled hidden>Choose here</option>
                                                {phD_degrees.map(el => {
                                                    return (
                                                      <option value={el.value}>{el.label}</option>
                                                    )
                                                  })
                                                }
                                              </select> 
                                            )}
                                        </Form.Item>
                                        </div>
                                      </div>
                                      <div className="phd-institution">
                                      <div className="phd-institution-label">
                                        <label for="cars">Institution</label>
                                      </div>
                                      <div>
                                      <Form.Item style={{marginBottom: "0px"}}>
                                          {getFieldDecorator(`academy[phd[${index}][institution]]`, {
                                            rules: [
                                              { type: 'string', required: true, message: 'Please select' },
                                            ],
                                          })(
                                            <select id={`academy[phd[${index}][institution]]`} name="cars">
                                              <option value="" selected disabled hidden>Choose here</option>
                                                {universities.map(el => {
                                                    return (
                                                      <option value={el.value}>{el.label}</option>
                                                    )
                                                  })
                                                }
                                            </select> 
                                          )}
                                      </Form.Item>
                                      </div>
                                    </div>
                                  </div>
                                    <div className="phd-duration">
                                    <div className="phd-duration-from">
                                      <label id="employment" for="employment">From</label>
                                      <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator(`academy[phd[${index}][from_year]]`, {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                      <select id={`academy[phd[${index}][from_year]]`} value={this.selectedYear} onChange={this.onHandleChange}> 
                                          <option value="" selected disabled hidden>Choose a year</option>
                                          {options}
                                        </select>
                                    )}
                                </Form.Item>
                                    </div>
                                    <div className="phd-duration-to">
                                      <label id="employment" for="employment">To</label>
                                      <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator(`academy[phd[${index}][to_year]]`, {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                      <select id={`academy[phd[${index}][to_year]]}`} value={this.selectedYear} onChange={this.onHandleChange}> 
                                          <option value="" selected disabled hidden>Choose a year</option>
                                          {options}
                                        </select>
                                    )}
                                </Form.Item>
                                    </div>
                                  </div>
                                  </li>
                                  )
                                })}
                            </ul>
                            <div className="edu-actions-add" data-role="load_more_link_wrapper">
                                <a className="button is-light is-small" onClick={() => this.handleChangeEdu("add", "phd", phdList)} data-role="load_more_link">+</a>
                                {phdList.length > 1 ?
                                    <a className="button is-light is-small button-delete" onClick={() => this.handleChangeEdu("delete", "phd", phdList)} data-role="load_more_link">-</a>
                                  :
                                    null
                                }
                            </div>
                          </div>
                          </div>
                            :null
                          }
                          <div className="other-edu-cont">
                            <ul>
                                {otherEduList.map((el, index) => {
                                  return(
                                    <li key={`other-edu-${index}`}>
                                      <div className="other-edu-row-cont">
                                        <div className="other-education">
                                          <div className="other-education-label">
                                            <label for="cars">Diplomas and Certificates</label>
                                          </div>
                                          <div>
                                          <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator(`academy[other_edu[${index}][degree]]`, {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                      <select id={`academy[other_edu[${index}][degree]]`} name="cars">
                                              <option value="" selected disabled hidden>Choose here</option>
                                              <option value="volvo">Volvo</option>
                                              <option value="saab">Saab</option>
                                              <option value="fiat">Fiat</option>
                                              <option value="audi">Audi</option>
                                            </select> 
                                    )}
                                </Form.Item> 
                                          </div>
                                        </div>
                                        <div className="other-edu-institution">
                                          <div className="other-edu-institution-label">
                                            <label for="cars">Institution</label>
                                          </div>
                                          <div>
                                          <Form.Item style={{marginBottom: "0px"}}>
                                              {getFieldDecorator(`academy[other_edu[${index}][institution]]`, {
                                                rules: [
                                                  { type: 'string', required: true, message: 'Please select' },
                                                ],
                                              })(
                                                <select id={`academy[other_edu[${index}][institution]]`} name="cars">
                                                  <option value="" selected disabled hidden>Choose here</option>
                                                        {universities.map(el => {
                                                        return (
                                                          <option value={el.value}>{el.label}</option>
                                                        )
                                                      })
                                                    }
                                                      </select> 
                                              )}
                                          </Form.Item>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="other-edu-duration">
                                      <div className="other-edu-duration-from">
                                        <label id="employment" for="employment">From</label>
                                        <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator(`academy[other_edu[${index}][from_year]]`, {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                      <select id={`academy[other_edu[${index}][from_year]]`} value={this.selectedYear} onChange={this.onHandleChange}> 
                                          <option value="" selected disabled hidden>Choose a year</option>
                                            {options}
                                          </select>
                                    )}
                                </Form.Item>
                                      </div>
                                      <div className="other-edu-duration-to">
                                        <label id="employment" for="employment">To</label>
                                        <Form.Item style={{marginBottom: "0px"}}>
                                    {getFieldDecorator(`academy[other_edu[${index}][to_year]]`, {
                                      rules: [
                                        { type: 'string', required: true, message: 'Please select' },
                                      ],
                                    })(
                                      <select id={`academy[other_edu[${index}][to_year]]`} value={this.selectedYear} onChange={this.onHandleChange}> 
                                          <option value="" selected disabled hidden>Choose a year</option>
                                            {options}
                                          </select>
                                    )}
                                </Form.Item>
                                          
                                      </div>
                                    </div>
                                    </li>
                                  )
                                })}
                            </ul>
                            <div className="edu-actions-add" data-role="load_more_link_wrapper">
                                <a className="button is-light is-small" onClick={() => this.handleChangeEdu("add", "otherEdu",otherEduList)} data-role="load_more_link">+</a>
                                {otherEduList.length > 1 ?
                                    <a className="button is-light is-small button-delete" onClick={() => this.handleChangeEdu("delete", "otherEdu", otherEduList)} data-role="load_more_link">-</a>
                                  :
                                    null
                                }
                            </div>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div><Button type="primary" htmlType="submit">Submit</Button></div>
              <div className="resume#wrap_u">
              </div>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

const WrappedRegistrationForm = Form.create()(CustomLayoutContainer);
  
const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    username: state.auth.username,
    token: state.auth.token,
    is_active: state.auth.is_active_user,
    is_student: state.auth.is_student,
    is_teacher: state.auth.is_teacher,
    profileIA: state.profileInfo
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getProfileInfo: (token, userID) => dispatch(getProfileAccountInfo(token, userID)),
    // putProfileInfo: (token, username, data) => dispatch(putProfileAccountInfo(token, username, data)),
    putProfileInfo: (token, username, data) => dispatch(putProfileAccountDetail(token, username, data)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedRegistrationForm)
);
