import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Select,
  Slider,
  Button,
  Upload,
  Icon,
  Input,
  Checkbox,
  Radio,
  Row,
  Cascader,
  Col,
  DatePicker
} from 'antd';
import {inquiryCreateURL, inquirySelectableListURL} from "../constants";
import moment from "moment";
import axios from 'axios';

const { Option } = Select;
const { RangePicker } = DatePicker;
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
const topic = [
  {
    value: 'Economics',
    label: 'Economics'
  },
  {
    value: 'Finance',
    label: 'Finance'
  },
  {
    value: 'Econometrics',
    label: 'Econometrics'
  },
  {
    value: 'Machine Learning',
    label: 'Machine Learning'
  },
  {
    value: 'AI',
    label: 'AI'
  }
]

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

class ArticleCustomForm extends React.Component {

  state = { 
    visible: false,
    previewVisible: false,
    loading: false,
    previewImage: '',
    imageThumbUrl: null,
    imageUrl: null,
    topic: null,
    inquirty_type: null,
    language: null,
    inquiry_type: null,
    inquiry_audience: null,
    inquiry_topic: null,
    fileList: [
      {
        uid: '-1',
        name: 'x.png',
        status: 'done',
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
    imagePath: '',
  };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 5000);
  };

  handleTopic = value => {
    console.log('handleTopic', value);
    this.setState({ topic: value[0] })
  }
  handleInquiryType = value => {
    console.log('handleInquiryType', value);
    this.setState({ inquirty_type: value[0] })
  }
  handleLanguage = value => {
    console.log('handleLanguage', value);
    this.setState({ language: value[0] })
  }
  

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

  normFile2 = e => {
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
    } else {
      return
    }
  }

  handlePreview = async file => {
    console.log("CORSO 555555")
    console.log(JSON.stringify(file))
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("handleFormSubmit")
    let formData = new FormData();
    await this.props.form.validateFields((err, values) => {
      console.log("handleFormSubmit values: ", JSON.stringify(values));
      const title =
        values["title"] === undefined ? null : values["title"];
      const content =
        values["content"] === undefined ? null : values["content"];
      const topic =
        values["topic"] === undefined ? null : values["topic"];
      const inquiry =
        values["inquiry_type"] === undefined ? null : values["inquiry_type"];
      const university =
        values["university"] === undefined ? null : values["university"];
      const language =
        values["language"] === undefined ? null : values["language"];
        const rewards =
        values["rewards"] === undefined ? null : values["rewards"];
      const contact =
        values["contact_options"] === undefined ? null : values["contact_options"];
      const audience =
        values["audience"] === undefined ? null : values["audience"];
      const range =
        values["rangePicker"] === undefined ? null : values["rangePicker"];
      const file = 
        values["upload"] === undefined ? null : values["upload"];
      console.log("CCS")
      const postObj = {
        user: this.props.username,
        title: values.title,
        content: values.content,
        inquiry_type: values.inquiry_type,
        university: values.university,
        language: values.language,
        topic: values.topic,
        contact: values.contact_options,
        range: values.rangePicker,
        audience: values.audience,
        rewards: values.rewards,
        // ufile: values.upload
      }
      console.log("postObj: ", JSON.stringify(postObj))
      if (file !== null){
        formData.append("file", file[0].originFileObj)
      }
      formData.append("data", JSON.stringify(postObj))
      console.log("formData: ", JSON.stringify(formData))
      console.log("postObj: ", JSON.stringify(postObj))
      if (!err) {
        // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        // axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
          "content-type": "multipart/form-data",
          // "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        };
        console.log("formData: ", JSON.stringify(postObj))
        console.log("before posting article")
          axios.post(inquiryCreateURL, 
          formData
          )
            .then(res => {
              if (res.status === 201) {
                this.props.history.push('/');
              }
            })
            .catch(error => console.error(error))
            console.log('Error');
        
        console.log('Received values of form: ', values);
      } else{
        console.log('Received error: ', err);
      }
    });
  }

  fetchData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    }
    axios.get(inquirySelectableListURL)
    .then(res => {
      console.log("resData at UI: ", (res))
      this.setState({
        inquiry_type:res.data[0].Itype,
        inquiry_audience:res.data[0].audience,
        inquiry_topic:res.data[0].topic,
      });
      console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
    })
    .catch(err =>
      console.error("ERROR 123: ", err.message));
  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        this.fetchData()
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      this.fetchData()
  } else {
  }
      
  }

  render() {
    console.log("this.props: "+ JSON.stringify(this.props))
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fileList, inquiry_type, inquiry_audience, inquiry_topic } = this.state;
    const contact_option = form.getFieldValue(`contact_options`);
    console.log("contact_option  I: "+ JSON.stringify(contact_option))
    const fields = getFieldValue("upload")
    const fields2 = getFieldValue("uploadV")
    console.log("upload  I: "+ JSON.stringify(fields))
    console.log("upload II: "+ JSON.stringify(fields2))
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={event => this.handleFormSubmit(
        event,
        this.props.requestType,
        this.props.articleID)}>
        <Form.Item label="Post Title" hasFeedback>
          {getFieldDecorator('title', {
            initialValue: "C",
            rules: [{ required: true, message: 'Please enter title!' }],
          })(<Input name="title" />
          )}
        </Form.Item>
        <Form.Item label="Content" hasFeedback>
          {getFieldDecorator('content', {
            initialValue: "C",
            rules: [{ required: true, message: 'Please enter a content' }],
          })(<Input.TextArea />
          )}
        </Form.Item>

        <Form.Item label="Inquiry Type">
          {getFieldDecorator('inquiry_type', {
            initialValue: ["Homework Review"],
            rules: [
              { type:"array", required: true, message: 'Please select a field for your project!', type: 'array' },
            ],
          })(
            <Cascader options={inquiry_type} />
          )}
        </Form.Item>
        <Form.Item label="Topic">
          {getFieldDecorator('topic', {
            initialValue: ["Econometrics"],
            rules: [
              { type: "array", required: true, message: 'Please select a field for your project!', type: 'array' },
            ],
          })(
            <Cascader options={inquiry_topic} />
          )}
        </Form.Item>
        <Form.Item label="Select a target University">
          {getFieldDecorator('university', {
            initialValue: ["TEC_MONTERREY"],
            rules: [
              { required: true, message: 'Please select a field for your project!', type: 'array' },
            ],
          })(
            <Cascader options={universities} />
          )}
        </Form.Item>
        <Form.Item label="Select a target Audience">
          {getFieldDecorator('audience', {
            initialValue: ["undergraduates"],
            rules: [
              { required: true, message: 'Please select a field for your project!', type: 'array' },
            ],
          })(
            <Select name="categories" mode="multiple" placeholder="Please select a field">
              <Option value="graduates">Graduates</Option>
              <Option value="undergraduates">Undergraduates</Option>
              <Option value="pHD">pHD</Option>
              <Option value="MBA">MBA</Option>
              <Option value="MS">MS</Option>
            </Select>,
          )}
        </Form.Item>
          <Form.Item label="Offer Rewards">
        {getFieldDecorator(`rewards`)(
              <Radio.Group >
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>
        <Form.Item label="Prefer Contact options">
          {getFieldDecorator('contact_options', {
            initialValue: [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={8}>
                  <Checkbox value="3" disabled>Phone Call</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="2" disabled>
                    Email
                    </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="4" disabled>Chat Session</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="5">Live Video Chat Session</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>,
          )}
        </Form.Item>
        { contact_option !== undefined ? (
          contact_option.some(el => el === "5") ? (
            <div>
            <Form.Item label="Prefered Spoken Languagues">
              {getFieldDecorator('language', {
                rules: [
                  { type: "array", required: true, message: 'Please select a field for your project!' },
                ],
              })(
                <Cascader options={language} />
              )}
            </Form.Item>,
            <Form.Item name="range-time-picker" label="RangePicker" {...rangeConfig}>
              {getFieldDecorator('rangePicker', {
                  rules: [
                    { type: "array", required: true, message: 'Please select an availability range!'},
                  ],
                })(
                  <RangePicker 
                    showTime 
                    format="YYYY-MM-DD HH:mm:ss" 
                    disabledDate={(current) => {
                      return moment().add(-1, 'days')  >= current ||
                          moment().add(1, 'month')  <= current;
                      }}
                  />
                )}
              
          </Form.Item>
            </div>
          ):null
        ):(null)}
        <Form.Item label="Upload File (Optional)" extra="2.5 MB Field">
                {getFieldDecorator('upload', {
                  initialValue: this.handleFileList(null, null),
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  setFieldsValue: "fileList"
                })(
                  <Upload name="logo" key="Image" onPreview={this.handlePreview} listType="picture" customRequest={this.dummyRequest}>
                    <Button>
                      <Icon type="upload" /> Click to upload
                      </Button>
                  </Upload>,
                )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" >
            Post
          </Button>
        </Form.Item>
      </Form>
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