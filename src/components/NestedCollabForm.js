import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Select,
  InputNumber,
  Button,
  Upload,
  Icon,
  Input,
  Checkbox,
  Modal,
  Radio,
  Row,
  Cascader,
  Col,
  DatePicker,
  TimePicker
} from 'antd';
import {fetchDisciplinesURL, workshopCreateURL} from "../constants";
import moment from "moment";
import axios from 'axios';
import lodash from "lodash";
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { MonthPicker } = DatePicker;
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};
const TimeRelatedForm = () => {
  const onFinish = fieldsValue => {
    // Should format date value before submit.
    const rangeValue = fieldsValue['range-picker'];
    const rangeTimeValue = fieldsValue['range-time-picker'];
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
      'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
      'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      'range-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
  };
}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const i_type = [
  {
    value: 'homework review',
    label: 'Homework Review'
  },
  {
    value: 'admissions',
    label: 'Admissions'
  },
  {
    value: 'college information',
    label: 'College Information'
  },
  {
    value: 'scholarships',
    label: 'Scholarships'
  },
  {
    value: 'class review',
    label: 'Class Review'
  },
  {
    value: 'other',
    label: 'Other'
  }
]
const language = [
  {
    value: 'spanish',
    label: 'Spanish'
  },
  {
    value: 'english',
    label: 'English'
  },
]

class ArticleCustomForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      academic_disciplines: null,
    };
  }

  fetchData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    }
    axios.get(fetchDisciplinesURL)
    .then(res => {
      console.log("resData at UI: ", (res))
      this.setState({
        academic_disciplines:res.data[0].academic_disc,
      });
    })
    .catch(err =>
      console.error("ERROR 123: ", err.message));
  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        // this.props.getProfileInfo(this.props.token, this.props.username)
        this.fetchData()
      }
    }
  }
  
  componentDidUpdate(newProps) {
    if (newProps.token !== this.props.token) {
      if (this.props.token !== undefined && this.props.token !== null) {
        // this.props.getProfileInfo(this.props.token, this.props.username)
        this.fetchData()
      } else {
        this.props.history.push('/');
      }
    }    
  }

  handleADChange = val => {
    var lab = null
    this.lab = val
    console.log("ERMAC", val, this.lab)
    return this.lab
  };

  render() {
    console.log("props & state: "+ JSON.stringify(this.props), this.state)
    const { form } = this.props;
    const { academic_disciplines } = this.state
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
    <div>
      <p>Project Area Field</p>
       <Form.Item label="Field">
       {getFieldDecorator("project_field", {
                  initialValue: [this.handleADChange()],
                  rules: [
                    { type: 'array', required: true, message: 'Please select a cateogry' },
                  ],
                })(<Cascader options={academic_disciplines} />)}
        </Form.Item>

        {/* <p>What are your areas of experience?</p>
        <Form.Item label="Areas of experience">
          {getFieldDecorator('areas_experience', {
            initialValue: ["developer"],
            rules: [
              { required: true, message: 'Field required', type: 'array' },
            ],
          })(
            <Select name="areas_experience" mode="tags" placeholder="Please type an area">
                <Option value="developer">Developer</Option>
                <Option value="designer">Designer</Option>
                <Option value="financeExpert">Finance Expert</Option>
                <Option value="projectManager">Project Manager</Option>
                <Option value="productManager">Product Manager</Option>
            </Select>,
          )}
        </Form.Item> */}
      </div>
      // </Form>
    );
  }
}

const WrappedArticleCreate = Form.create()(ArticleCustomForm);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username
  }
}
export default connect(mapStateToProps)(WrappedArticleCreate);


      // <Form {...formItemLayout} onSubmit={event => this.handleFormSubmit(
      //   event,
      //   this.props.requestType,
      //   this.props.articleID)}>
{/* 
      <p>Required Position</p>
       <Form.Item label="Position">
        {getFieldDecorator('position', {
              rules: [
                { required: true,  message: 'Please select a desired position!', type: 'array' },
              ],
            })(
              <Select name="positions" mode="tags" onChange={this.onChange} placeholder="Please select a position">
                  <Option value="developer">Developer</Option>
                  <Option value="designer">Designer</Option>
                  <Option value="financeExpert">Finance Expert</Option>
                  <Option value="projectManager">Project Manager</Option>
                  <Option value="productManager">Product Manager</Option>
              </Select>,
            )
        }
        </Form.Item> 
        
       <p>Request Type</p>
        <Form.Item label="Request for: ">
          {getFieldDecorator('request_type', {
                rules: [
                  { required: true, message: 'Please select a field!', type: 'string' },
                ],
              })(
            <Radio.Group defaultValue="a" buttonStyle="solid">
              <Radio.Button value="a"> My project</Radio.Button>
              <Radio.Button value="b"> An user project </Radio.Button>
            </Radio.Group>,
              )
            }
        </Form.Item> */}