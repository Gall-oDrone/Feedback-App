import React from "react";
import { Form, Input, Icon, Button, Select, Radio, Upload, AutoComplete, Cascader, Divider } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {getProfileAccountInfo, putProfileAccountInfo} from "../store/actions/profileUserInfo";
import countryList from 'react-select-country-list'

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
    value: 'CIDE',
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_student = false;
        if (values.userType === "student") is_student = true;
        this.props.onAuth(
          values.userName,
          values.email,
          values.university,
          values.password,
          values.confirm,
          is_student
        );
        // this.props.history.push("/");
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
    console.log('Country changed', value);
    // this.setState({ country: value[0] })
    Object.values(options2).map((k) => {
      console.log(JSON.stringify(k))
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

  handleAcademicStatus = val => {
    var academic_s = null
    if(val === "True"){
      this.academic_s = "undergraduate"
    } else {
      this.academic_s = "graduate"
    }
    return this.academic_s
  }

  handleWorkExperience = val => {
    var work_e = null
    if(val === "True"){
      this.work_e = "True"
    } else {
      this.work_e = "False"
    }
    return this.work_e
  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        this.props.getProfileInfo(this.props.token, this.props.username)
        // .then(res => {
        //   console.log("6) componentWillReceiveProps before assigning res to dataList: " + JSON.stringify(this.props))
        //   console.log(JSON.stringify(res))
        //   this.setState({
        //     dataList: res.BookedMeetingList
        //   });
        //   console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
        // });
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      console.log("componentWillReceiveProps newProps: ")
      console.log(newProps)
      this.props.getProfileInfo(newProps.token, newProps.username)
  } else {
    // this.props.getProfileInfo(newProps.token, newProps.username)
  }
      
  }

  render() {
      if (this.props.profileIA != undefined){
      const { getFieldDecorator, getFieldValue } = this.props.form;
      const { autoCompleteResult } = this.state;
      const { UserAccountInfo} = this.props.profileIA;
      if(UserAccountInfo != undefined){
        console.log("XXX: "+JSON.stringify(this.handleUniversityChange(UserAccountInfo.university)))
      }
      
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
      
      //team members
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };

      return (
        (UserAccountInfo !== undefined ? (

        <Form onSubmit={this.handleSubmit}>
          <p style={pStyle}>Personal</p>
          <FormItem label="First name">
            {getFieldDecorator("firstName", {
              initialValue: [`${UserAccountInfo.name}`],
              rules: [{ required: true, message: "Please input your first name!" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="First name"
              />
            )}
          </FormItem>
          <Form.Item label="Country">
            {getFieldDecorator("university", {
              initialValue: [this.handleCountryChange(UserAccountInfo.country)],
              rules: [
                { type: 'array', required: true, message: 'Please select your University' },
              ],
            })(<Cascader options={options2} />)}
          </Form.Item>

          <Form.Item label="Greeting Message">
            {getFieldDecorator("message", {
              initialValue: UserAccountInfo.message,
              rules: [
                { type: 'string', required: true, message: 'Please type a welcome message' },
              ],
            })(<Input
              prefix={<Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Message"
            />)}
          </Form.Item>

          <Divider />
          <p style={pStyle}>Academy</p>

          <Form.Item label="College Institution">
            {getFieldDecorator("university", {
              initialValue: [this.handleUniversityChange(UserAccountInfo.university)],
              rules: [
                { type: 'array', required: true, message: 'Please select your University' },
              ],
            })(<Cascader options={universities} />)}
          </Form.Item>

          <Form.Item label="Academic status">
          {getFieldDecorator('attendace', {
            initialValue: this.handleAcademicStatus(UserAccountInfo.graduate)
          })(
            <Radio.Group >
              <Radio.Button value="undergraduate">Undergraduate</Radio.Button>
              <Radio.Button value="graduate">Graduate</Radio.Button>
            </Radio.Group>,
          )}
        </Form.Item>

          <Form.Item label="Website">
            {getFieldDecorator('website', {
              initialValue: [`${UserAccountInfo.website}`],
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
              initialValue: [`${UserAccountInfo.github}`],
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
