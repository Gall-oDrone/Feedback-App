import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Select, Layout, Divider, Tag, Collapse, Card, Checkbox, Upload, message, Icon, Button, Col, Row} from 'antd';
import {getProfileInquiryDetail, putProfileInquiryDetail} from "../store/actions/profileInquiry";
import Comments from "../containers/InquiryComment";
// import Col from 'antd/lib/table/Col';
const { TextArea } = Input;
const { Option } = Select;
const { Content, Footer } = Layout;

function TabContainer(key, id){
  const ListContent= {
    Comments: <div>                 
                    <Comments inquiryID={id}/>
              </div>,
    Responses: <div></div>
  };
  return ListContent[key]
}

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
    value: '2',
    label: 'AI'
  },
  {
    value: '3',
    label: 'B2B'
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

class ProfileInquiryDetail extends React.Component {
  
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
    titleKey: '',
    tabs: ['Comments', 'Responses'],
  };

  onTabChange = (key, type) => {
    console.log("onTabChange:", key, type);
    this.setState({ [type]: key });
  };

  handleTabList = (item) => {
    let array = []
    if (typeof item !== 'undefined' && item.length > 0) {
      // the array is defined and has at least one element
      item.forEach(val => {
        let tab = {
          key: `${val}`, tab: `${val.toUpperCase()}`
        }
        array.push(tab)
      }
      )
      return array
    } else {
      return
    }
  }

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
    for (var i in category){
      for (var j in categories){
        if( category[i] === categories[j].label){
          categoryArray.push(categories[j].value)
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
        this.props.putPAD(this.props.token, this.props.match.params.inquiryID, this.props.username, formData)
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
      if(this.props.username !== null != undefined){
        this.props.getPAD(this.props.token, this.props.match.params.inquiryID, this.props.username)
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null !== undefined) {
        this.props.getPAD(newProps.token, newProps.match.params.inquiryID, newProps.username)
      } else {
        console.log("this.props.getMeetings was undefined")
      }
    }
  }

  render() {
    console.log("this.props: "+ JSON.stringify(this.props))
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList, titleKey, tabs, imageThumbUrl, imageUrl } = this.state;
    const { inquiryDetail } = this.props.userPAD
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      (inquiryDetail !== undefined ? (
        <div>
           <div  key={inquiryDetail.id}>
           <Layout>
             <Content key={inquiryDetail.id}>
               <div className="site-card-border-less-wrapper">
                 <Card title={
                      <Row>
                        <Col span={6}>
                          {inquiryDetail.title}
                        </Col>
                        <Col style={{float: "right", textAlign:"right"}} span={6}> 
                          <Tag 
                            color={inquiryDetail.status === true ? "green": "red"} 
                            key={inquiryDetail.status}>
                              {inquiryDetail.status === true ? "OPEN":"CLOSED"} 
                          </Tag>
                        </Col>
                      </Row>} 
                    bordered={false} 
                    key={this.props.id}
                  >
                   <Row>
                     <Col>
                       <p>{inquiryDetail.content}</p>
                     </Col>
                   </Row>
                   <Row>
                     <Col span={12}>
                       <p>Target Audience:
                         {Object.values(inquiryDetail.inquiry_audience).map(k => {
                           return <li>{k}</li>
                         })}
                       </p>
                     </Col>
                       <Col span={12}>
                         <p>Target Universities </p>
                           <Tag>
                             MIT
                           </Tag>
                           <Tag>
                             Stanford
                           </Tag>
                       </Col>
                   </Row>
                   <Row>
                     <Col>
                       <p>Experienced</p>
                     </Col>
                   </Row>
                   {inquiryDetail.language !== (null || undefined) &&
                     inquiryDetail.language.length > 0 ? (
                     <Row>
                       <Col>
                         <p>Spoken Language: {inquiryDetail.language}</p>
                       </Col>
                     </Row>
                   ):null}
                   {inquiryDetail.contact_option[0] !== (null || undefined) &&
                   inquiryDetail.contact_option.length > 0 ? (
                     <Row>
                       <Col>
                       <p>Contact options: {inquiryDetail.contact_option[0]}</p>
                       </Col>
                     </Row>
                   ):null}
                   <Row>
                     {inquiryDetail.rewards === true ? (
                       <Col>
                         <p>Rewards: {inquiryDetail.rewards === false ? "No":"Yes"}</p>
                       </Col>
                     ):(null)}
                     
                     {inquiryDetail.ufile !== null ? (
                       <Col>
                         <p>Upload</p>
                           <Upload name="logo" customRequest={this.dummyRequest}//action="http://localhost:8001/media/images" //fileList={fileList} showUploadList={true}
                             // onPreview={this.handleFileList(inquiryDetail.ufile, fileList)} 
                             listType="picture"
                             defaultFileList= {fileList} //onChange={this.handleFileChange} >
                           />
                       </Col>
                   ):null}
                   </Row>
                 </Card>
               </div>
               {/* <Divider/> */}
                  <Card 
                    key={this.props.id}
                    tabList={this.handleTabList(tabs)}
                    activeTabKey={titleKey}
                    onTabChange={key => {
                      this.onTabChange(key, 'titleKey');
                    }}
                  >
                    {TabContainer(titleKey, inquiryDetail.id)}
                  </Card>
             </Content>
       </Layout>
           </div>
   </div>
   ) : null)
    )
  }
}

const WrappedRegistrationForm = Form.create()(ProfileInquiryDetail);

const mapStateToProps = state => {
  console.log("mapStateToProps: "+JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    userPAD: state.profileInquiry
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getPAD: (token, inquiryID, userID) => dispatch(getProfileInquiryDetail(token, inquiryID, userID)),
    putPAD: (token, inquiryID, username, data) => dispatch(putProfileInquiryDetail(token, inquiryID, username, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);