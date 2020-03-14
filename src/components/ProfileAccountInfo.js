import React from "react";
import { Form, Input, Icon, Button, Select, Radio, Upload, AutoComplete, Cascader, Divider } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {getProfileAccountDetail, putProfileAccountDetail} from "../store/actions/profileAccountInfo";
import countryList from 'react-select-country-list';
import axios from 'axios';
import {profileAccountUserUpdateInfoURL} from "../constants";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

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
    fileList: null
  };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  handlePreview = async file => {
    console.log("CORSO 555555")
    console.log(JSON.stringify(file))
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    // });
  };

  normFile = e => {
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);
    console.log('Upload event:', e);
    // console.log('Upload fileList:', JSON.stringify(fileList));
    // console.log('Upload file.name:', fileList[0].name);
    if (Array.isArray(e)) {
      return e;
    }
    return e && fileList;
  };

  handleFileList = (thumbnail, fileList) => {
    console.log("IUOIU")
    console.log(JSON.stringify(thumbnail))
    if (fileList !== null){
      console.log(JSON.stringify(fileList[0].thumbUrl))
      fileList[0].thumbUrl = thumbnail
      console.log(JSON.stringify(fileList[0].thumbUrl))
      return fileList
    } else if (thumbnail !== null){
      this.setState({
        fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: thumbnail,
          thumbUrl: thumbnail,
        },
      ]})
    } else {
      return
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleFormSubmit")
    let formData = new FormData();
    await this.props.form.validateFields((err, values) => {
      console.log("handleFormSubmit values: ", JSON.stringify(values));
      const file = 
        values["upload"] === undefined ? null : values["upload"];
      console.log("CCS")
      const postObj = {
        user_id: this.props.userId,
        profile_avatar: file
      }
      const putObj = Object.assign(postObj, this.props.profileIA.ProfileAccount)
      console.log("postObj: ", JSON.stringify(postObj))
      console.log("file: ", JSON.stringify(file))
      if (file !== null){
        formData.append("file", file[0].originFileObj)
        console.log("formData I: ", JSON.stringify(formData))
        console.log("formData II: ", JSON.stringify(file[0].originFileObj))
      }
        formData.append("data", JSON.stringify(putObj))
      // console.log("formData: ", JSON.stringify(formData))
      // console.log("postObj: ", JSON.stringify(postObj))
      if (!err) {
        console.log("formData III: ", JSON.stringify(formData))
        console.log("before posting article")
        this.props.putProfileInfo(this.props.token, this.props.username, formData)
        console.log('Received values of form: ', values);
      } else{
        console.log('Received error: ', err);
      }
    });
  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        this.props.getProfileAccountDetail(this.props.token, this.props.userId)
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
          <h3>My Account</h3>
          <h4>Username: {this.props.username}</h4>
          <Form.Item label="Upload a Profile Image" extra="2.5 MB Image">
          {getFieldDecorator('upload', {
            initialValue: this.handleFileList(ProfileAccount.profile_avatar, fileList),
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            setFieldsValue: "fileList"
          })(
            <Upload name="logo" onPreview={this.handlePreview} customRequest={this.dummyRequest}
            listType="picture"
            >
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
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
