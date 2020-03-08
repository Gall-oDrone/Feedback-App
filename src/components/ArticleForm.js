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
  Card,
  Row,
  Col,
} from 'antd';
import axios from 'axios';

const { Option } = Select;

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
          axios.post("http://127.0.0.1:8000/api/articles/create/", 
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fileList } = this.state;
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
        <Form.Item label="Article Name" hasFeedback>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please enter your project/product name!' }],
          })(<Input name="title" />
          )}
        </Form.Item>
        <Form.Item label="Content" hasFeedback>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please enter a content' }],
          })(<Input name="content" />
          )}
        </Form.Item>

        <Form.Item label="Related fields">
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
        </Form.Item>

        <Form.Item label="Feedback type">
          {getFieldDecorator('feedback_type', {
            initialValue: ['1'],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={8}>
                  <Checkbox value='live chat' disabled>Live Video Chat Session</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value='chat' disabled>Chat Session</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value='phone call' disabled>Phone Call</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value='email'>Email</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value='survey'>Survey</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>,
          )}
        </Form.Item>
        <Row gutter={16} type="flex" justify="center">
          <Col span={8}>
            <Card title="Upload an Image" bordered={false}>
              <Form.Item extra="2.5 MB Image">
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
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Upload a Video" bordered={false}>
              <Form.Item extra="2.5 MB Image">
                  {getFieldDecorator('uploadV', {
                    initialValue: this.handleFileList(null, null),
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                    setFieldsValue: "fileList"
                  })(
                    <Upload name="logo" key="Video" onPreview={this.handlePreview} listType="picture" customRequest={this.dummyRequest}>
                      <Button>
                        <Icon type="upload" /> Click to upload
                        </Button>
                    </Upload>,
                  )}
              </Form.Item>
            </Card>
          </Col>
        </Row>   

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