import React from 'react';
import { List, Avatar, Button, Select, Icon, Cascader, Collapse, Card, Input, Tag, Tabs, Skeleton, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
import Hoc from "../../hoc/hoc";
import { connect } from 'react-redux';
import countryList from 'react-select-country-list'
import Filter from "../FilterForm";
import PeerDetail from './PeerDetail';
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

        render () {
          console.log('this.props', JSON.stringify(this.props));
          console.log('this.state', JSON.stringify(this.state));
          const inquiries = [];
          for (let i=0; i < data.length; i+= 1) {
            inquiries.push(
              <Hoc key= {i}>
                <PeerDetail id={i} visible={this.state.visible} {...this.props} />
              </Hoc>
              );
          }
                return(

                  <div>
                    <Filter/>
                    <List
                    itemLayout="horizontal"
                    dataSource={this.props.data}
                    renderItem={(item, index) => (
                    <List.Item
                    >
                        <List.Item.Meta
                        avatar={
                          <Card size={"small"}> 
                          <p>{item.author}</p>
                           {
                            // item.ufile !== null ? (
                            //   <img
                            //       width={100}
                            //       alt={item.ufile}
                            //       src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            //   />
                            // ):(null)
                           }
                          </Card>}
                        title={
                          <Row>
                            <Col span={8}>
                              <a href="https://ant.design">{item.title}</a>
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
                                <h4>{item.content}</h4>
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
                                  {item.opened === "True"? 
                                    <Tag color="green">Opened</Tag>:<Tag color="red">Closed</Tag>}
                              </Col>
                            </Row>
                          </div>
                        }
                        />
                        <Button onClick={()=> this.handleOpenModal(index)}type="primary">Reach out</Button>
                        {/* {this.state.visible === true ?
                        inquiries[index]
                        :null
                        } */}
                    </List.Item>
                    
                    )}
                    />
                    {this.state.visible === true ?
                        inquiries[this.state.index]
                        :null
                        }
                </div>
                )
            }
    }

export default ProductList;