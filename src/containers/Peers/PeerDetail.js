import React from 'react';
import { List, Avatar, Button, Layout, Menu, Modal, Select, Icon, Cascader, Collapse, Card, Input, Tag, Tabs, Skeleton, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import countryList from 'react-select-country-list'

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

const data = [
  {
    title: 'Need help with Econometrics homework',
  },
  {
    title: 'University admissions for foreigners',
  },
  {
    title: 'Need tester for product Beta',
  },
  {
    title: 'Respond this survey an get a $100 Amazon Gift Card',
  },
];

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

class PeerDetail extends React.Component {

    state = {
        loading: false,
        error: null,
        data: [],
        country: null,
        visible: true
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

    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    onChangeCountry = value => {
      console.log('Country changed', value);
      this.setState({ country: value[0] })
    }

        render () {
                return(
                  <div>
                     <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
                    <Modal  title="Basic Modal"
                    width={820}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                        <div>
                        <Layout>
                        <Content style={{ padding: '0 50px' }}>
                          <div className="site-card-border-less-wrapper">
                            <Card title="Request title" bordered={false} >
                              <p>Description</p>
                              <p>Instructions</p>
                              <p>Rewards</p>
                            </Card>
                          </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                        </div>
                    </Modal>
                </div>
                )
            }
    }

export default PeerDetail;