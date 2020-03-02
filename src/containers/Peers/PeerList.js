import React from 'react';
import { List, Avatar, Button, Select, Icon, Cascader, Collapse, Card, Input, Tag, Tabs, Skeleton, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import countryList from 'react-select-country-list'
import peerDetail from "./PeerDetail";
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
        visible: false
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

        render () {

          const callModal = () => {
            return([
            <peerDetail/>
            ])
          }
                return(

                  <div>
                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    
                    <br />
                    <Collapse defaultActiveKey={['1']} onChange={callback}>
                      <Panel header="Filter by" key="1">
                        <Tabs type="card">
                          <TabPane tab="University" key="1">
                        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                          <Row>
                            <Col span={8}>
                              <Checkbox value="A">MIT</Checkbox>
                            </Col>
                            <Col span={8}>
                              <Checkbox value="B">Standford</Checkbox>
                            </Col>
                            <Col span={8}>
                              <Checkbox value="C">Duke</Checkbox>
                            </Col>
                            <Col span={8}>
                              <Checkbox value="D">CIDE</Checkbox>
                            </Col>
                            <Col span={8}>
                              <Checkbox value="E">ITAM</Checkbox>
                            </Col>
                          </Row>
                        </Checkbox.Group>
                        </TabPane>
                        <TabPane tab="Country" key="2">
                          <div>
                            <Cascader options={countries} onChange={this.onChangeCountry} placeholder="Please select" />
                          </div>
                        </TabPane>
                        <TabPane tab="Assignment Type" key="3">
                          <Row>
                              <Col span={8}>
                                <Checkbox value="A">Homework Review</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="B">Informative Session</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="C">Product Test</Checkbox>
                              </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Language" key="4">
                          <div>
                            <Cascader options={countries} onChange={this.onChangeCountry} placeholder="Please select" />
                          </div>
                        </TabPane>
                        </Tabs>
                      </Panel>
                    </Collapse>

                    <br/>
                    <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item
                    >
                        <List.Item.Meta
                        avatar={<Card size={"small"}> <img
                          width={100}
                          alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        /></Card>}
                        title={
                          <Row>
                            <Col span={8}>
                              <a href="https://ant.design">{item.title}</a>
                            </Col>
                            <Col span={8} offset={8}>
                              <Tag>
                                MIT
                              </Tag>
                            </Col>
                          </Row>
                      }
                        description={
                          <div>
                            <Row>
                              <Col>
                                "Ant Design, a design language for background applications, is refined by Ant UED Team"
                              </Col>
                            </Row>
                            <Row justify="center">
                              <Col span={4}>
                                <h5>Category:</h5>
                                <Tag>
                                  Homework Review
                                </Tag>
                              </Col>
                              <Col span={4}>
                                  <span>Reviews: </span>
                              </Col>
                              <Col span={4}>
                                  <span>Views: </span>
                              </Col>
                            </Row>
                          </div>
                        }
                        />
                        <Button onClick={()=> callModal()}type="primary">Reach out</Button>
                    </List.Item>
                    )}
                    />
                </div>
                )
            }
    }

export default ProductList;