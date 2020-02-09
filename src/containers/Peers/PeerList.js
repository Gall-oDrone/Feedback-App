import React from 'react';
import { List, Avatar, Button, Card, Input, Skeleton, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

const { Search } = Input;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

class ProductList extends React.Component {

    state = {
        loading: false,
        error: null,
        data: []
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
        render () {
                return(

                  <div>
                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    
                    <br />

                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                      <Row>
                        <Col span={8}>
                          <Checkbox value="A">A</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="B">B</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="C">C</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="D">D</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="E">E</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>

                    <br/>
                    <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item
                    >
                        <List.Item.Meta
                        avatar={<Card > <img
                          width={170}
                          alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        /></Card>}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <Button type="primary">Reach out</Button>
                    </List.Item>
                    )}
                    />
                </div>
                )
            }
    }

export default ProductList;