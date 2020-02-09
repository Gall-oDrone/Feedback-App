import React from 'react';
import { List, Avatar, Button, Card, Skeleton } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

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
                )
            }
    }

export default ProductList;