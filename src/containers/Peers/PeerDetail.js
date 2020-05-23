import React from 'react';
import { List, Avatar, Button, Layout, Divider, Menu, Modal, Select, Icon, Cascader, Collapse, Card, Input, Tag, Tabs, Skeleton, Checkbox, Upload, Row, Col } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import countryList from 'react-select-country-list'
import Comments from "../InquiryComment"

const { Search } = Input;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;
const { Header, Content, Footer } = Layout;

function callback(key) {
  console.log(key);
}

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

class PeerDetail extends React.Component {

    state = {
        loading: false,
        error: null,
        data: [],
        country: null,
        visible: this.props.visible,
        fileList: [
          {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: "http://127.0.0.1:8000/media/files/AyudaPagoVentanilla.pdf",
            thumbUrl: "http://127.0.0.1:8000/media/files/AyudaPagoVentanilla.pdf",
          },
        ]
    }
    componentDidMount() {
        this.setState({loading:true})
        axios.get("/some-url")
        .then(res => {
            this.setState.setState({
                data: res.data,
                loading: false
            });
        })
        .catch(err => {
            this.setState({error: err, loading: false})
        })
    }

    handleFileList = (thumbnail, fileList) => {
      console.log("IUOIU")
      console.log(JSON.stringify(thumbnail))
      console.log(JSON.stringify(fileList[0].thumbUrl))
      fileList[0].thumbUrl = thumbnail
      console.log(JSON.stringify(fileList[0].thumbUrl))
      return fileList
    }

    // handleOk = e => {
    //     console.log(e);
    //     // this.props.visible = false
    //     this.setState({
    //       visible: false,
    //     });
    //   };
    
    //   handleCancel = e => {
    //     console.log(e);
    //     // this.props.visible = false
    //     this.setState({
    //       visible: false,
    //     });
    //   };

    onChangeCountry = value => {
      console.log('Country changed', value);
      this.setState({ country: value[0] })
    }

        render () {
          console.log('this.props', JSON.stringify(this.props));
          console.log('this.state', JSON.stringify(this.state));
          const { previewVisible, previewImage, fileList, imageThumbUrl, imageUrl } = this.state;
                return(
                  <div>
                     {/* <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button> */}
                    {/* <Modal  title="Basic Modal"
                    width={820}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    key={this.props.id}
                    > */}
                        <div  key={this.props.id}>
                        <Layout key={this.props.id}>
                          <Content style={{ padding: '0 50px' }} key={this.props.id}>
                            <div className="site-card-border-less-wrapper">
                              <Card title={this.props.data[this.props.id].title} bordered={false} key={this.props.id}>
                                <Row>
                                  <Col>
                                    <p>{this.props.data[this.props.id].content}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={12}>
                                    <p>Target Audience:
                                      {Object.values(this.props.data[this.props.id].inquiry_audience).map(k => {
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
                                {this.props.data[this.props.id].language !== (null || undefined) &&
                                  this.props.data[this.props.id].language.length > 0 ? (
                                  <Row>
                                    <Col>
                                      <p>Spoken Language: {this.props.data[this.props.id].language}</p>
                                    </Col>
                                  </Row>
                                ):null}
                                {this.props.data[this.props.id].contact_option[0] !== (null || undefined) &&
                                this.props.data[this.props.id].contact_option.length > 0 ? (
                                  <Row>
                                    <Col>
                                    <p>Contact options: {this.props.data[this.props.id].contact_option[0]}</p>
                                    </Col>
                                  </Row>
                                ):null}
                                <Row>
                                  {this.props.data[this.props.id].rewards === true ? (
                                    <Col>
                                      <p>Rewards: {this.props.data[this.props.id].rewards === false ? "No":"Yes"}</p>
                                    </Col>
                                  ):(null)}
                                  
                                  {this.props.data[this.props.id].ufile !== null ? (
                                    <Col>
                                      <p>Upload</p>
                                        <Upload name="logo" customRequest={this.dummyRequest}//action="http://localhost:8001/media/images" //fileList={fileList} showUploadList={true}
                                          // onPreview={this.handleFileList(this.props.data[this.props.id].ufile, fileList)} 
                                          listType="picture"
                                          defaultFileList= {fileList} //onChange={this.handleFileChange} >
                                        />
                                    </Col>
                                ):null}
                                </Row>
                              </Card>
                            </div>
                            <Divider/>
                              <Card key={this.props.id}>
                                <Comments inquiryID={this.props.data[this.props.id].id}/>
                              </Card>
                          </Content>
                          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                        </div>
                    {/* </Modal> */}
                </div>
                )
            }
    }

export default PeerDetail;