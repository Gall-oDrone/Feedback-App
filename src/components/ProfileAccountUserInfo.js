import axios from "axios";
import React from "react";
import { Form, Input, Icon, Button, Select, Radio, Upload, AutoComplete, Cascader, Divider } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {getProfileAccountInfo, putProfileAccountInfo} from "../store/actions/profileUserInfo";
import countryList from 'react-select-country-list'
import { fetchDegreesAndCoursesURL } from "../constants"

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

let id = 0;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
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

class UserProfileInfo extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    university: null,
    country: options2,
    academic_status: null,
    academic_degree: null,
    bachelors_degree: null,
    masters_degree: null,
    phD_degree: null,
    course: null
  };

  normFile = e => {
    e.preventDefault();
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { UserAccountInfo} = this.props.profileIA;
    this.props.form.validateFields((err, values) => {
      console.log("handleFormSubmit values: ", JSON.stringify(values));
      const university = 
        values["university"] === undefined 
        || values["university"][0] === UserAccountInfo.university ? null : values["university"][0];
      const attendace = 
        values["attendace"] === undefined 
        || values["attendace"] === UserAccountInfo.attendace ? null : values["attendace"];
      const degree = 
        values["degree"] === undefined 
        || values["degree"] === UserAccountInfo.degree ? null : values["degree"];
      const bachelor = 
        values["bachelor"] === undefined 
        || values["bachelor"][0] === UserAccountInfo.bachelor ? null : values["bachelor"][0];
      const master = 
        values["master"] === undefined 
        || values["master"][0] === UserAccountInfo.master ? null : values["master"][0];
      const doctorate = 
        values["doctorate"] === undefined 
        || values["doctorate"][0] === UserAccountInfo.doctorate ? null : values["doctorate"][0];
      const course = 
        values["course"] === undefined 
        || values["course"][0] === UserAccountInfo.course ? null : values["course"][0];
      const website = 
        values["website"] === undefined 
        || values["website"] === UserAccountInfo.website ? null : values["website"];
      const experience = 
        values["work-experience"] === undefined 
        || values["experience"] === UserAccountInfo.experience ? null : values["work-experience"];

      const postObj = {
        profile_username: this.props.username,
        university: university,
        attendace: attendace,
        degree: degree,
        bachelor: bachelor,
        master: master,
        doctorate: doctorate,
        course: course,
        website: website,
        experience: experience,
      }
      console.log("postObj: ", JSON.stringify(postObj), UserAccountInfo);
      if (!err) {
        this.props.putProfileInfo(this.props.token, this.props.userId, postObj)
      } else{
        console.error('Received error: ', err);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleCountryChange = value => {
    // console.log('Country changed', value);
    // this.setState({ country: value[0] })
    Object.values(options2).map((k) => {
      // console.log(JSON.stringify(k))
      if(k.value === value){
        return
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
    console.log("ERMAC", val, this.lab)
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
      academic_d = "Bachelor's degree"
    } else if (val === "Master's degree"){
      academic_d = "Master's degree"
    } else if (val === "Doctorate"){
      academic_d = "Doctorate"
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

  fetchData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    }
    axios.get(fetchDegreesAndCoursesURL)
    .then(res => {
      console.log("resData at UI: ", (res))
      this.setState({
        academic_degree:res.data[0].degree,
        bachelors_degree:res.data[0].bachelor,
        masters_degree:res.data[0].master,
        phD_degree:res.data[0].pHD,
        course:res.data[0].course
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
      if (this.props.profileIA != undefined){
      const { getFieldDecorator, getFieldValue, getFieldsValue } = this.props.form;
      const { autoCompleteResult, 
              academic_status, 
              university, 
              academic_degree, 
              bachelors_degree,
              masters_degree,
              phD_degree, course } = this.state;
      const { UserAccountInfo} = this.props.profileIA;
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption 
          key={website}>
            {website}
        </AutoCompleteOption>
      ));
      //phone number
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>,
      );
      // console.log("123, ", UserAccountInfo)

      return (
        (UserAccountInfo !== undefined ? (

        <Form onSubmit={this.handleSubmit}>
          <p style={pStyle}>Basic Information</p>
          <FormItem label="Name">
            {getFieldDecorator("firstName", {
              initialValue: (UserAccountInfo.name !== null?(`${UserAccountInfo.name}`):null),
              rules: [{ required: true, message: "Please input your full name!" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="E.g. John Stone"
              />
            )}
          </FormItem>
          <Form.Item label="Country">
            {getFieldDecorator("country", {
              initialValue: [this.handleCountryChange(UserAccountInfo.country)],
              rules: [
                { type: 'array', required: true, message: 'Please select your country' },
              ],
            })(<Cascader options={options2} />)}
          </Form.Item>

          <Form.Item label="Greeting Message">
            {getFieldDecorator("message", {
              initialValue: (UserAccountInfo.message !== null?`${UserAccountInfo.message}`:null),
              rules: [
                { type: 'string', required: true, message: 'Please type a welcome message' },
              ],
            })(<Input
              prefix={<Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Message"
            />)}
          </Form.Item>

          <Divider />
          <p style={pStyle}>Academic Information</p>

          <Form.Item label="College Institution">
            {getFieldDecorator("university", {
              initialValue: [this.handleUniversityChange(UserAccountInfo.university)],
              rules: [
                { type: 'array', required: true, message: 'Please select your university' },
              ],
            })(<Cascader options={universities} />)}
          </Form.Item>

          <Form.Item label="Academic status">
          {getFieldDecorator('attendace', {
            initialValue: this.handleAcademicStatus(UserAccountInfo),
            rules: [ { type: 'string' } ]
          })(
            <Radio.Group >
              <Radio.Button value="undergraduate">Undergraduate</Radio.Button>
              <Radio.Button value="graduate">Graduate</Radio.Button>
              <Radio.Button value="postgraduate">Postgraduate</Radio.Button>
            </Radio.Group>,
          )}
        </Form.Item>

        {getFieldValue("attendace") === "graduate" || 
          getFieldValue("attendace") ==="postgraduate" ? (
          // {academic_status === null ? (
          <>
            <Form.Item label="Degree">
              {getFieldDecorator('degree', {
                initialValue: this.handleDegree(UserAccountInfo.degree)
              })(
                <Radio.Group >
                  <Radio.Button value="Bachelor's degree">Bachelor's</Radio.Button>
                  <Radio.Button value="Master's degree">Master's</Radio.Button>
                  <Radio.Button value="Doctorate">pHD</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
          </>
        ):null}

        {getFieldValue("degree") === "Bachelor's degree" &&
          getFieldValue("attendace") === "graduate" ? (
          // {academic_degree === null ? (
            <>
              <Form.Item label="Bachelor Degree">
                {getFieldDecorator("bachelor", {
                  initialValue: [this.handleBachelorChange(UserAccountInfo.bachelor)],
                  rules: [
                    { type: 'array', required: true, message: 'Please select a Bachelors Degree' },
                  ],
                })(<Cascader options={bachelors_degree} />)}
              </Form.Item> 
            </>
          ):null}

        {getFieldValue("degree") === "Master's degree" &&
          getFieldValue("attendace") === "postgraduate" ? (
          // {academic_degree === null ? (
            <>
              <Form.Item label="Master Degree">
                {getFieldDecorator("master", {
                  initialValue: this.handleMasterChange(UserAccountInfo.master),
                  rules: [
                    { type: 'array', required: true, message: 'Please select a Masters Degree' },
                  ],
                })(<Cascader options={masters_degree} />)}
              </Form.Item> 
            </>
          ):null}

        {getFieldValue("degree") === "Doctorate" &&
          getFieldValue("attendace") === "postgraduate" ? (
          // {academic_degree === null ? (
            <>
              <Form.Item label="pHD Degree">
                {getFieldDecorator("doctorate", {
                  initialValue: this.handleDoctorateChange(UserAccountInfo.doctorate),
                  rules: [
                    { type: 'array', required: true, message: 'Please select a pHD Degree' },
                  ],
                })(<Cascader options={phD_degree} />)}
              </Form.Item>
            </>
        ):null}

          <Form.Item label="Course">
            {getFieldDecorator("course", {
              initialValue: [this.handleCourseChange(UserAccountInfo.course)],
              rules: [
                { type: 'array', required: true, message: 'Please select a course' },
              ],
            })(<Cascader options={course} />)}
          </Form.Item> 

          <Form.Item label="Website">
            {getFieldDecorator('website', {
              initialValue: (UserAccountInfo.website !== null?`${UserAccountInfo.website}`:null),
              rules: [
                {
                  required: false,
                  message: 'Please input website!'
                }
              ],
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
              >
                <Input />
              </AutoComplete>,
            )}
          </Form.Item>

          <Divider />
          <p style={pStyle}>Company</p>

          <Form.Item label="Working experience">
            {getFieldDecorator('work-experience', {
              initialValue: this.handleWorkExperience(UserAccountInfo.work_experience)
            })(
              <Radio.Group >
                <Radio.Button value="True">Yes</Radio.Button>
                <Radio.Button value="False">No</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>

          <Form.Item label="Github">
            {getFieldDecorator('github', {
              initialValue: (UserAccountInfo.github !== null?[`${UserAccountInfo.github}`]:null),
              rules: [
                {
                  required: false,
                  message: 'Please input a repository!'
                }
              ],
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="Git Repo"
              >
                <Input />
              </AutoComplete>,
            )}
          </Form.Item>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
          </FormItem>
        </Form>
         ) : null)
      );
    }
  }
}

const WrappedRegistrationForm = Form.create()(UserProfileInfo);

const mapStateToProps = state => {
  console.log("mapStateToProps: "+JSON.stringify(state))
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    username: state.auth.username,
    profileIA: state.profileInfo
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getProfileInfo: (token, userID) => dispatch(getProfileAccountInfo(token, userID)),
    putProfileInfo: (token, username, data) => dispatch(putProfileAccountInfo(token, username, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
