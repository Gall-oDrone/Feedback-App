import React from "react";
import { Form, Input, Icon, Button, Select, Radio, Upload, AutoComplete, Cascader, Divider } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {getProfileAccountDetail, putProfileAccountDetail} from "../store/actions/profileAccountInfo";
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

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    university: null,
    country: options2,
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  normFile = e => {
    // e.preventDefault();
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);
    console.log('Upload event:', e);
    console.log('Upload fileList:', JSON.stringify(fileList));
    console.log('Upload file.name:', fileList[0].name);
    if (Array.isArray(e)) {
      return e;
    }
  }

  handleFileList = (thumbnail, fileList) => {
    console.log("IUOIU")
    console.log(JSON.stringify(thumbnail))
    console.log(JSON.stringify(fileList[0].thumbUrl))
    fileList[0].thumbUrl = thumbnail
    console.log(JSON.stringify(fileList[0].thumbUrl))
    return fileList
  }

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

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        this.props.getProfileAccountDetail(this.props.token, this.props.userId)
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
      this.props.getProfileAccountDetail(newProps.token, newProps.userId)
  } else {
    // this.props.getProfileAccountDetail(newProps.token, newProps.username)
  }
      
  }

  render() {
      if (this.props.profileIA != undefined){
      const { getFieldDecorator, getFieldValue } = this.props.form;
      const { autoCompleteResult, fileList } = this.state;
      const { ProfileAccount} = this.props.profileIA;

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
        (ProfileAccount !== undefined ? (

        <Form onSubmit={this.handleSubmit}>
          <p style={pStyle}>Username</p>
          <FormItem label="usernamee">
            {getFieldDecorator("usernamee", {
              initialValue: "corso",
              rules: [{ required: true, message: "Please input your first name!" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="First name"
              />
            )}
          </FormItem>

          <Form.Item label="Upload a Profile Image" extra="2.5 MB Image">
          {getFieldDecorator('upload', {
            initialValue: this.handleFileList(ProfileAccount.profile_avatar, fileList),
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            setFieldsValue: "fileList"
          })(
            <Upload name="logo" customRequest={this.dummyRequest}
            onPreview={this.handlePreview} listType="picture"
            >
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          )}
        </Form.Item>

          {/* <Form.Item label="Country">
            {getFieldDecorator("university", {
              initialValue: [this.handleCountryChange(ProfileAccount.country)],
              rules: [
                { type: 'array', required: true, message: 'Please select your University' },
              ],
            })(<Cascader options={options2} />)}
          </Form.Item>

          <Form.Item label="Greeting Message">
            {getFieldDecorator("message", {
              initialValue: ProfileAccount.message,
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
              initialValue: [this.handleUniversityChange(ProfileAccount.university)],
              rules: [
                { type: 'array', required: true, message: 'Please select your University' },
              ],
            })(<Cascader options={universities} />)}
          </Form.Item>

          <Form.Item label="Academic status">
          {getFieldDecorator('attendace')(
            <Radio.Group >
              <Radio.Button value="undergraduate">Undergraduate</Radio.Button>
              <Radio.Button value="graduate">Graduate</Radio.Button>
            </Radio.Group>,
          )}
        </Form.Item>

          <Form.Item label="Website">
            {getFieldDecorator('website', {
              initialValue: [`${ProfileAccount.website}`],
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
            {getFieldDecorator('work-experience')(
              <Radio.Group >
                <Radio.Button value="True">Yes</Radio.Button>
                <Radio.Button value="False">No</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>

          <Form.Item label="Github">
            {getFieldDecorator('github', {
              initialValue: [`${ProfileAccount.github}`],
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
          </Form.Item> */}

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

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = state => {
  console.log("mapStateToProps: "+JSON.stringify(state))
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    username: state.auth.username,
    profileIA: state.profileAccountInfo
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getProfileAccountDetail: (token, userID) => dispatch(getProfileAccountDetail(token, userID)),
    putProfileInfo: (token, username, data) => dispatch(putProfileAccountDetail(token, username, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
