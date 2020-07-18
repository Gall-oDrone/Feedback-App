import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Select,
  AutoComplete,
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
import {projectCreateURL} from "../constants"

let M_id = 0;
const { Option } = Select;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;

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
    autoCompleteResult: [],
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
    const nextKeys = keys.concat(M_id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
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
      const member_emails =
        values["member_emails"] === undefined ? null : values["member_emails"];
      const website =
        values["project_website"] === undefined ? null : values["project_website"];
      const engagement =
        values["feedback_type"] === undefined ? null : values["feedback_type"];
      const phase =
        values["dev_phase"] === undefined ? null : values["dev_phase"];
      const crowdfunding_type =
        values["crowdfunding_type"] === undefined ? null : values["crowdfunding_type"];
      const file = 
        values["upload"] === undefined ? null : values["upload"];
      const file2 = 
        values["uploadV"] === undefined ? null : values["uploadV"];
      const postObj = {
        user: this.props.username,
        title: title,
        content: content,
        categories: categories,
        member_emails: member_emails,
        project_website: website,
        project_feedback: engagement,
        project_phase: phase,
        project_crowdfunding_type: crowdfunding_type,
      }
      if(file !== null){
        formData.append("file", file[0].originFileObj)
      } else if (file2 !== null){
        formData.append("media", file2[0].originFileObj)
      }
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
          axios.post(projectCreateURL, 
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

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    console.log("this.props: "+ JSON.stringify(this.props))
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fileList, autoCompleteResult } = this.state;
    const fields = getFieldValue("upload")
    const fields2 = getFieldValue("uploadV")
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption 
        key={website}>
          {website}
      </AutoCompleteOption>
    ));
    console.log("upload  I: "+ JSON.stringify(fields))
    console.log("upload II: "+ JSON.stringify(fields2))
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
        getFieldDecorator('keys', { initialValue: [''] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? 'Members' : ''}
            required={false}
            key={k}
          >
            {getFieldDecorator(`member_emails[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  type: "email",
                  required: false,
                  whitespace: true,
                  message: "Please add a member email or delete this field.",
                },
              ],
            })(<Input placeholder="Member email" style={{ width: '60%', marginRight: 8 }} />)}
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
          </Form.Item>
        ));
        return (
          <Form {...formItemLayout} onSubmit={event => this.handleFormSubmit(
            event,
            this.props.requestType,
            this.props.articleID)}>
            <Form.Item label="Project Title" hasFeedback>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'File required' }],
              })(<Input name="title" />
              )}
            </Form.Item>
            <Form.Item label="Project Description" hasFeedback>
              {getFieldDecorator('content', {
                rules: [{ required: true, message: 'File required' }],
              })(<TextArea rows={4} />
              )}
            </Form.Item>

            <Form.Item label="Project Website">
              {getFieldDecorator('project_website', {
                rules: [
                  {
                    required: false,
                    message: 'Please input a website!'
                  }
                ],
              })(
                <AutoComplete
                  dataSource={websiteOptions}
                  onChange={this.handleWebsiteChange}
                  placeholder="https://www.my-project.com"
                >
                  <Input />
                </AutoComplete>,
              )}
            </Form.Item>

            {formItems}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                  <Icon type="plus" /> Add field
                </Button>
              </Form.Item> 

            <Form.Item label="Related Fields">
              {getFieldDecorator('categories', {
                rules: [
                  { required: true, message: 'File required', type: 'array' },
                ],
              })(
                <Select name="categories" mode="multiple" placeholder="Please select a field">
                  <Option value="Data Science">Data Science</Option>
                  <Option value="AI">AI</Option>
                  <Option value="Business to Business">Business to Business (B2B)</Option>
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
                      <Checkbox value='live chat'>Live Video Chat Session</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value='chat' disabled>Chat Session</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value='phone call' disabled>Phone Call</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value='email' disabled>Email</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value='survey'>Survey</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>,
              )}
            </Form.Item>

            <Form.Item label="Development Phase">
              {getFieldDecorator('dev_phase', {
                rules: [
                  { required: true, message: 'File required', type: 'string' },
                ],
              })(
                <Select name="categories" placeholder="Please select a phase">
                  <Option value="idea">Validating/Testing anIdea</Option>
                  <Option value="mvp">Minimum Viable Product</Option>
                  <Option value="prototypes">Prototype</Option>
                  <Option value="beta">Beta</Option>
                  <Option value="launch">Launch</Option>
                  <Option value="venture">Venture Capital</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="Crowdfunding Type">
              {getFieldDecorator('crowdfunding_type', {
                rules: [
                  { required: true, message: 'File required', type: 'string'},
                ],
              })(
                <Select name="categories" placeholder="Please select a field">
                  <Option value="donation-based">Donation Based</Option>
                </Select>
              )}
            </Form.Item>


            <Row gutter={16} type="flex" justify="center">
              <Col span={8}>
                <Card title="Upload an Image" bordered={false}>
                  <Form.Item extra="1.2 MB Image">
                    {getFieldDecorator('upload', {
                      initialValue: this.handleFileList(null, null),
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                      setFieldsValue: "fileList"
                    })(
                      <Upload name="logo" key="Image" onPreview={this.handlePreview} listType="picture" customRequest={this.dummyRequest}>
                        <Button>
                          <Icon type="upload" /> Upload
                          </Button>
                      </Upload>,
                    )}
                  </Form.Item>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Upload a Demo Video" bordered={false}>
                  <Form.Item extra="2.5 MB Video">
                      {getFieldDecorator('uploadV', {
                        initialValue: this.handleFileList(null, null),
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                        setFieldsValue: "fileList"
                      })(
                        <Upload name="logo" key="Video" onPreview={this.handlePreview} listType="picture" customRequest={this.dummyRequest}>
                          <Button>
                            <Icon type="upload" /> Upload
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
    token: state.auth.token,
    username: state.auth.username
  }
}
export default connect(mapStateToProps)(WrappedArticleCreate);