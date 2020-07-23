import React from 'react';
import { List, Avatar, Button, Select, Icon, Modal, Cascader, Collapse, Card, Input, Tag, Tabs, Skeleton, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
import Hoc from "../../hoc/hoc";
import { connect } from 'react-redux';
import countryList from 'react-select-country-list'
import Filter from "../FilterForm";
import PeerDetail from './PeerDetail';
import "../../assets/inquiries.css"
var moment = require('moment');
const { Search } = Input;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;
const countries = countryList().getData()
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

const data = [
  {
    title: 'Need help with Econometrics homework',
  },
  {
    title: 'University admissions for foreigners',
  },
  {
    title: 'Scholarships for European Universities',
  },
  {
    title: 'Working position for graduate',
  },
];

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

class ProductList extends React.Component {

    state = {
        loading: false,
        error: null,
        data: [],
        country: null,
        inquiries: [],
        visible: false,
        index: null
    }

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

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

    onChangeCountry = value => {
      console.log('Country changed', value);
      this.setState({ country: value[0] })
    }

    handleOpenModal = (i) => {
      this.setState({ visible: true, index: i })
    }

    handleOk = e => {
      console.log(e);
      // this.props.visible = false
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      // this.props.visible = false
      this.setState({
        visible: false,
      });
    };

        render () {
          console.log('this.props', JSON.stringify(this.props));
          console.log('this.state', JSON.stringify(this.state));
          const inquiries = [];
          for (let i=0; i < data.length; i++) {
            inquiries.push(
              <Hoc key= {i}>
                <PeerDetail id={i} visible={this.state.visible} {...this.props} />
              </Hoc>
              );
          }
          console.log('INQUIRIES', (inquiries));
                return(
                  <div>
                    <Filter/>
                    <List
                    itemLayout="horizontal"
                    dataSource={this.props.data}
                    renderItem={(item, index) => (
                    <List.Item
                    >
                        {/* <List.Item.Meta
                        title={
                          <Row>
                            <Col span={8}>
                              <p>
                                User: <a>{item.author}</a>
                              </p>
                              
                            </Col>
                            <Col span={8} offset={8}>
                              <Tag>
                                {item.user_university}
                              </Tag>
                            </Col>
                          </Row>
                      }
                        description={
                          <div className="Description" style={{display: 'block',  justifyContent:'center'}}>
                            <Row justify="start">
                              <Col span={24}>
                                <h4>{item.title}</h4>
                              </Col>
                            </Row>
                            <Row justify="center">
                              <Col span={4}>
                                <ul>
                                <h5>Category:</h5>
                                <Tag>
                                  {item.inquiry_type}
                                </Tag>
                                </ul>
                              </Col>
                              <Col span={5}>
                                <ul>
                                <h5>Topic:</h5>
                                <Tag>
                                  {item.inquiry_topic}
                                </Tag>
                                </ul>
                              </Col>
                              <Col span={5}>
                                  <span>Reviews: {item.rating_count}</span>
                              </Col>
                              <Col span={5}>
                                  <span>Views: {item.view_count}</span>
                              </Col>
                              <Col span={4}>
                                  <span>Status: </span>
                                  <br/>
                                  {item.status === true ? 
                                    <Tag color="green">Open</Tag>:<Tag color="red">Closed</Tag>}
                              </Col>
                            </Row>
                          </div>
                        }
                        /> */}
                        <div className="inquiry-summary-search-result">
                          <div className="statscontainer">
                            <div className="stats">
                                <div className="category">
                                  <span>
                                    {"Category:"}
                                  </span>
                                  <div className="status">
                                    <Tag>
                                      {item.inquiry_type}
                                    </Tag>
                                  </div>
                                </div>
                                <div className="topic">
                                  <span>
                                    {"Topic:"}
                                  </span>
                                  <div>
                                    <Tag>
                                      {item.inquiry_topic}
                                    </Tag>
                                  </div>
                                </div>
                                <div className="status">
                                  <span>
                                    {"Status:"}
                                  </span>
                                  <div>
                                      {item.status === true ? 
                                        <Tag color="green">Open</Tag>:<Tag color="red">Closed</Tag>
                                      }
                                      </div> 
                                </div>
                            </div>

                          </div>
                          <div className="summary">
                            <div className="author">
                              <a className="post-tag" style={{color:"black"}} href={`/profile-page/${item.author}`}><span>{item.author}</span></a>
                            </div>
                            <div className="time">
                              <span>{moment(item.timestamp).format("MMMM Do YYYY")}</span>
                            </div>
                            <div className="title">
                              <h3>
                                <a>
                                  {item.title}
                                </a>
                              </h3>
                            </div>
                            <div className="excerpt">
                              {item.content}
                            </div>
                            <div className="views">
                              <Icon type={"eye"}/> <span>{item.view_count}</span>
                            </div>
                            <div className="college">
                              <Tag color="blue">{item.user_university}</Tag>
                            </div>
                          </div>
                        </div>
                        <Button onClick={()=> this.handleOpenModal(index)}type="primary">Reach out</Button>
                        {/* {this.state.visible === true ?
                        inquiries[index]
                        :null
                        } */}
                         {/* {this.state.visible === true ?
                           <Modal  title="Basic Modal"
                           width={820}
                           visible={this.state.visible}
                           onOk={this.handleOk}
                           onCancel={this.handleCancel}
                           key={this.props.id}
                           >
                          {inquiries["1"]}
                          </Modal>
                        :null
                        } */}
                    </List.Item>
                    
                    )}
                    />
                    {this.state.visible === true ?
                           <Modal  title="Basic Modal"
                           width={820}
                           visible={this.state.visible}
                           onOk={this.handleOk}
                           onCancel={this.handleCancel}
                           key={this.props.id}
                           >
                          {inquiries[this.state.index]}
                          </Modal>
                        :null
                        }
                </div>
                )
            }
    }

export default ProductList;