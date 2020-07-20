import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Select, Checkbox, Upload, message, Icon, Button, Col, Row} from 'antd';
import {getProfileArticleDetail, putProfileArticleDetail} from "../store/actions/profile";
import { fetchCategoriesAndFeedbacksURL } from "../constants"

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const success = () => {
  message.success('Thanks for your review');
};

const error = () => {
  message.error('Error while submitting review');
};

const categories = [
  {
    value: '1',
    label: 'Data Science'
  },
  {
    value: '3',
    label: 'AI'
  },
  {
    id: '2',
    title: '2'
  },
  {
    value: '4',
    label: 'C1'
  }
]

const engagements = [
  {
    value: '3',
    label: 'phone call'
  },
  {
    value: '4',
    label: 'chat'
  },
  {
    value: '2',
    label: 'live chat'
  },
  {
    value: '1',
    label: 'survey'
  }
]

const CategorySelector = ({categories_array}) => {
  return(
    <Select name="categories" mode="multiple" placeholder="Please select a field">
      {categories_array.map(function (el){
        return (<Option key={el.id} value={el.id}>{el.title}</Option>)
      })}
    </Select>
  )
}

const FeedbackCheckbox = ({fb_array}) => {
  return (
    <Checkbox.Group style={{ width: '100%' }}>
      <Row>
        {fb_array.map(el => {
            return (
            <Col span={8}>
              <Option value={el.value}>{el.label}</Option>
            </Col>
            )
          })
        }
      </Row>
    </Checkbox.Group>
  )
}

class ProfileArticleDetail extends React.Component {
  
  state = { 
    visible: false,
    usersInfo: [] ,
    previewVisible: false,
    loading: false,
    previewImage: '',
    imageThumbUrl: null,
    imageUrl: null,
    fileList: null,
    imagePath: '',
    categories: null,
    feedback_types: null
  };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  // dummyRequest = (e) => {
  //   let fd= new FormData()
  //   const fileList = e.file
  //   fd.append('image', fileList[0])
  //   axios.defaults.headers = {
  //     // 'Accept': 'application/json, application/xml, application/pdf, text/plain, text/html, *.*',
  //     'Content-Type': 'multipart/form-data',
  //     Authorization: `Token ${this.props.token}`
  //   };
  //   axios
  //     .post(`http://127.0.0.1:8000/api/articles/create/images/`, fd)
  //     .then(res => {
  //       if (res.status === 201) {
  //         console.log("success");
  //         } else {
  //           console.log("error");
  //         }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  //   // setTimeout(() => {
  //   //   onSuccess("ok");
  //   // }, 0);
  // };

  normFile = e => {
    // e.preventDefault();
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);
    console.log('Upload event:', e);
    console.log('Upload fileList:', JSON.stringify(fileList));
    if (Array.isArray(e)) {
      return e;
    }

    // let fd= new FormData()

  // fd.append('image', fileList[0], fileList[0].name)
  // axios.post('/media/images', fd)
  //   .then(resp => {
  //      this.imagePath = resp.data.path
  //   })

    // axios.defaults.headers = {
    //   // 'Accept': 'application/json, application/xml, application/pdf, text/plain, text/html, *.*',
    //   'Content-Type': 'multipart/form-data',
    //   Authorization: `Token ${this.props.token}`
    // };
    // axios
    //   .post(`http://127.0.0.1:8000/api/media/images/`, fd)
    //   .then(res => {
    //     if (res.status === 201) {
    //       console.log("success");
    //       } else {
    //         console.log("error");
    //       }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
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

  handleFileChange = e => {
    console.log("handleFileChange")
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);
    console.log("handleFileChange fileList: "+ JSON.stringify(fileList))

    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    if (e.fileList.status === 'uploading') {
      console.log("handleFileChange uploading")
      this.setState({ loading: true });
      return;
    }
    if (e.file.status === 'done') {
      console.log("handleFileChange done")
      // Get this url from response in real world.
      getBase64(e.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }

    this.setState({ fileList });
  };

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

  handleEngagement = engagement => {
    const engageArray = []
    for (var i in engagement){
      for (var j in engagements){
        if( engagement[i] === engagements[j].label){
          engageArray.push(engagements[j].value)
        }
      }
    }
    console.log("YOU HA EVERYTHING!!")
    console.log(JSON.stringify(engageArray))
    return engageArray

  }

  handleCategory = category => {
    const categoryArray = []
    // const { categories } = this.state
    for (var i in category){
      for (var j in categories){
        if( category[i] === categories[j].title){
          categoryArray.push(categories[j].title)
        }
      }
    }
    console.log("YOU HA EVERYTHING 2!!")
    console.log(JSON.stringify(categoryArray))
    return categoryArray

  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    await this.props.form.validateFields((err, values) => {
      const title =
        values["title"] === undefined ? null : values["title"];
      const content =
        values["content"] === undefined ? null : values["content"];
      const categories =
        values["categories"] === undefined ? null : values["categories"];
      const feedback_type =
        values["feedback_type"] === undefined ? null : values["feedback_type"];
      const file = 
        values["upload"] === undefined ? null : values["upload"];
        // formData.append("file", file);
        // formData.append("file", file);
        // formData.append("file", file);
        // formData.append("file", file);
        // formData.append("file", file);
        // form_data.append('image', file[0], file[0].name);
        console.log("JSON.stringify(file)")
        console.log(JSON.stringify(file))
        console.log(JSON.stringify(file[0].originFileObj))
        console.log("JSON.stringify(file) 2")
      console.log(JSON.stringify(formData.append("file", file[0].originFileObj)))
      const postObj = {
        user: this.props.username,
        room: "1",
        // room: this.props.roomDetail.RoomDetail,
        title: values.title,
        content: values.content,
        categories: values.categories,
        feedback_type: values.feedback_type
      }
      formData.append("data", JSON.stringify(postObj))
      if (!err) {
        this.props.putPAD(this.props.token, this.props.match.params.articleID, this.props.username, formData)
        if(this.props.err1 !== null){
          error()

        } else {
          // this.props.history.push('/');
          success();
        }
            // .then(res => {
            //   if (res.status === 201) {
            //     this.props.history.push('/');
            //   }
            // })
            // .catch(error => console.err(error))
            // console.log('Error');
        }

        console.log('Received values of form: ', values);
    });
  }
  
  componentDidMount() {
    console.log("1) componentDidMount: ")
    console.log("this.props: " + JSON.stringify(this.props))
    console.log("this.state: " + JSON.stringify(this.state))
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        axios.get(fetchCategoriesAndFeedbacksURL).then(res => {
          console.log("res data: ", res.data)
          this.setState({
            categories: res.data[0].category,
            feedback_types: res.data[0].feedback_type
          })
        }).then(() => {this.props.getPAD(this.props.token, this.props.match.params.articleID, this.props.username)})
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null !== undefined) {
        axios.get(fetchCategoriesAndFeedbacksURL).then(res => {
          console.log("res data: ", res.data)
          this.setState({
            categories: res.data[0].category,
            feedback_types: res.data[0].feedback_type
          })
        }).then(() => {this.props.getPAD(newProps.token, newProps.match.params.articleID, newProps.username)})
      } else {
        console.log("this.props.getMeetings was undefined")
      }
    }
  }

  render() {
    // console.log("this.props: "+ JSON.stringify(this.props))
    // console.log("this.state: "+ JSON.stringify(this.state))
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList, categories, feedback_types, imageThumbUrl, imageUrl } = this.state;
    const { articleDetail } = this.props.userPAD
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      (articleDetail !== undefined ? (
      <Form {...formItemLayout} onSubmit={event => this.handleFormSubmit(
        event,
        this.props.requestType,
        this.props.articleID)}>
        <Form.Item label="Article Title" hasFeedback>
          {getFieldDecorator('title', {
            initialValue: `${articleDetail.title}`,
            rules: [{ required: true, message: 'Please enter article title!' }],
          })(<Input name="title" />
          )}
        </Form.Item>
        <Form.Item label="Content" hasFeedback>
          {getFieldDecorator('content', {
             initialValue: `${articleDetail.content}`,
            rules: [{ required: true, message: 'Please enter article content' }],
          })(<Input name="content" />
          )}
        </Form.Item>

        <Form.Item label="Related fields">
          {getFieldDecorator('categories', {
            initialValue: this.handleCategory(articleDetail.categories),
            rules: [
              { required: true, message: 'Please select a field for your project!', type: 'array' },
            ],
          })(
            // <Select name="categories" mode="multiple" placeholder="Please select a field">
            //   <Option value="1">Data Science</Option>
            //   <Option value="2">AI</Option>
            //   <Option value="3">Business to Business (B2B)</Option>
            //   <Option value="4">C1</Option>
            // </Select>,
              // <CategorySelector categories_array={categories}/>
              <Select name="categories" mode="multiple" placeholder="Please select a field">
                {categories.map(function (el){
                  return (<Option key={el.id} value={el.title}>{el.title}</Option>)
                })}
              </Select>
            
          )}
        </Form.Item>

        <Form.Item label="Feedback type">
          {getFieldDecorator('feedback_type', {
            initialValue: this.handleEngagement(articleDetail.engagement),
          })(

            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={8}>
                  <Checkbox disabled value="3">Phone Call</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox disabled value="4">Chat session</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="2">Live chat sessions</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="1">Survey</Checkbox>
                </Col>
                {/* <FeedbackCheckbox fb_array={feedback_types} /> */}
              </Row>
            </Checkbox.Group>,
          )}
        </Form.Item>

        <Form.Item label="Upload a Video/Image" extra="2.5 MB Image">
        {/* <Upload name="logo" action="/upload.do" fileList={this.handleFileList(articleDetail.thumbnail, fileList)}
        // fileList={fileList}
            onPreview={this.handlePreview} listType="picture" >
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload> */}
          {getFieldDecorator('upload', {
            initialValue: this.handleFileList(articleDetail.thumbnail, fileList),
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            setFieldsValue: "fileList"
          })(
            <Upload name="logo" customRequest={this.dummyRequest}//action="http://localhost:8001/media/images" //fileList={fileList} showUploadList={true}
            onPreview={this.handlePreview} listType="picture" //onChange={this.handleFileChange} >
            >
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
              {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <img src={articleDetail.thumbnail} alt="avatar" style={{ width: '10%' }}/>} */}
            </Upload>,
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      ) : null)
    )
  }
}

const WrappedRegistrationForm = Form.create()(ProfileArticleDetail);

const mapStateToProps = state => {
  console.log("mapStateToProps: "+JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    userPAD: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getPAD: (token, articleID, userID) => dispatch(getProfileArticleDetail(token, articleID, userID)),
    putPAD: (token, articleID, username, data) => dispatch(putProfileArticleDetail(token, articleID, username, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);