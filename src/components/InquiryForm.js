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
  Col,
  DatePicker, TimePicker
} from 'antd';
import axios from 'axios';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
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

class ArticleCustomForm extends React.Component {

  state = { 
    visible: false,
    previewVisible: false,
    loading: false,
    previewImage: '',
    imageThumbUrl: null,
    imageUrl: null,
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

  handleFormSubmit = async (event, requestType, articleID) => {
    event.preventDefault();
    let formData = new FormData();
    await this.props.form.validateFields((err, values) => {
      const title =
        values["title"] === undefined ? null : values["title"];
      const content =
        values["content"] === undefined ? null : values["content"];
      const categories =
        values["categories"] === undefined ? null : values["categories"];
      const engagement =
        values["feedback_type"] === undefined ? null : values["feedback_type"];
      const file = 
        values["upload"] === undefined ? null : values["upload"];
      const file2 = 
        values["uploadV"] === undefined ? null : values["uploadV"];
      const postObj = {
        user: this.props.username,
        title: values.title,
        room: "1",
        content: values.content,
        engagement: values.feedback_type,
        categories: values.categories,
      }
      formData.append("file", file[0].originFileObj)
      formData.append("media", file2[0].originFileObj)
      formData.append("data", JSON.stringify(postObj))
      if (!err) {
        // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        // axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
          "content-type": "multipart/form-data",
          Authorization: `Token ${this.props.token}`
        };
        console.log("formData: ", JSON.stringify(formData))
        if (requestType === "post") {
          console.log("params: " + title + " " + content + " "+ engagement)
          console.log("before posting article")
          axios.post("http://127.0.0.1:8000/articles/create/", 
          formData
          )
            .then(res => {
              if (res.status === 201) {
                this.props.history.push('/');
              }
            })
            .catch(error => console.error(error))
            console.log('Error');
        }

        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    console.log("this.props: "+ JSON.stringify(this.props))
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fileList } = this.state;
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
            rules: [{ required: true, message: 'Please enter title!' }],
          })(<Input name="title" />
          )}
        </Form.Item>
        <Form.Item label="Content" hasFeedback>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please enter a content' }],
          })(<Input.TextArea />
          )}
        </Form.Item>

        <Form.Item label="Inquiry Type">
          {getFieldDecorator('inquiry_type', {
            rules: [
              { required: true, message: 'Please select a field for your project!', type: 'array' },
            ],
          })(
            <Select name="categories" mode="multiple" placeholder="Please select a field">
              <Option value="1">Data Science</Option>
              <Option value="2">AI</Option>
              <Option value="3">Business to Business (B2B)</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Topic">
          {getFieldDecorator('topic', {
            rules: [
              { required: true, message: 'Please select a field for your project!', type: 'array' },
            ],
          })(
            <Select name="categories" mode="multiple" placeholder="Please select a field">
              <Option value="1">Data Science</Option>
              <Option value="2">AI</Option>
              <Option value="3">Business to Business (B2B)</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Select a target University">
          {getFieldDecorator('university', {
            rules: [
              { required: true, message: 'Please select a field for your project!', type: 'array' },
            ],
          })(
            <Select name="categories" mode="multiple" placeholder="Please select a field">
              <Option value="1">Data Science</Option>
              <Option value="2">AI</Option>
              <Option value="3">Business to Business (B2B)</Option>
            </Select>,
          )}
        </Form.Item>
          {/* <Form.Item label="Experienced Users?">
        {getFieldDecorator(`experienced`)(
              <Radio.Group >
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
                <Radio.Button value={"Indifferent"}>Indifferent</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item> */}
          <Form.Item label="Offer Rewards">
        {getFieldDecorator(`attendance`)(
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
              {getFieldDecorator('categories', {
                rules: [
                  { required: true, message: 'Please select a field for your project!', type: 'array' },
                ],
              })(
                <Select name="categories" mode="multiple" placeholder="Please select a field">
                  <Option value="1">Data Science</Option>
                  <Option value="2">AI</Option>
                  <Option value="3">Business to Business (B2B)</Option>
                </Select>,
              )}
            </Form.Item>,
            <Form.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
            </div>
          ):null
        ):(null)}
        <Form.Item label="Upload File" extra="2.5 MB Field">
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
          <Button type="primary" htmlType="submit">
            {this.props.btnText}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedArticleCreate = Form.create()(ArticleCustomForm);

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}
export default connect(mapStateToProps)(WrappedArticleCreate);