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
  Row,
  Col,
} from 'antd';
import axios from 'axios';

const { Option } = Select;

class ArticleCustomForm extends React.Component {

  normFile = e => {
    e.preventDefault();
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleFormSubmit = async (event, requestType, articleID) => {
    event.preventDefault();
    await this.props.form.validateFields((err, values) => {
      const title =
        values["title"] === undefined ? null : values["title"];
      const content =
        values["content"] === undefined ? null : values["content"];
      const categories =
        values["categories"] === undefined ? null : values["categories"];
      const engagement =
        values["feedback_type"] === undefined ? null : values["feedback_type"];
      const postObj = {
        user: this.props.username,
        title: values.title,
        content: values.content,
        engagement: values.feedback_type,
        categories: values.categories
      }

      if (!err) {
        // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        // axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        };

        if (requestType === "post") {
          console.log("params: " + title + " " + content + " "+ engagement)
          console.log("before posting article")
          axios.post("http://127.0.0.1:8000/articles/create/", 
            postObj
          )
            .then(res => {
              if (res.status === 201) {
                this.props.history.push('/');
              }
            })
            .catch(error => console.err(error))
            console.log('Error');
        }

        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    console.log("this.props: "+ JSON.stringify(this.props))
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={event => this.handleFormSubmit(
        event,
        this.props.requestType,
        this.props.articleID)}>
        <Form.Item label="Project/Product Name" hasFeedback>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please enter your project/product name!' }],
          })(<Input name="title" />
          )}
        </Form.Item>
        <Form.Item label="Content" hasFeedback>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please enter article content' }],
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
            initialValue: ['2', '3'],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={8}>
                  <Checkbox value="3">Phone Call</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="2">
                    Email
                    </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="4">Chat session</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="5">Live chat sessions</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="1">Survey</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>,
          )}
        </Form.Item>

        <Form.Item label="Upload a Video/Image" extra="2.5 MB Image">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
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