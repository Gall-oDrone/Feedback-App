import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import { connect } from 'react-redux';
import { Menu, Card, Button, Skeleton, message, Divider, List, Tabs, Row, Col, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import ArticleCreate from '../containers/ArticleCreate';
import { configConsumerProps } from 'antd/lib/config-provider';
import * as actions from "../store/actions/auth";

const { SubMenu } = Menu;
const { TabPane } = Tabs;
class ArticleDetail extends React.Component {

    state = {
        article: {},
        current: 'mail'
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    componentDidMount() {
        console.log("componentDidMount THIPROPS: " + JSON.stringify(this.props))
        const articleID = this.props.match.params.articleID;
        //const articleID = 11
        axios.get(`http://127.0.0.1:8000/api/articles/${articleID}`)
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    article: res.data
                });
                console.log("Article Detail res data: " + res.data);
            });
        // if(!(articleID === "create")){
        // axios.get(`http://127.0.0.1:8000/articles/${articleID}`)
        //     .then(res => {
        //         console.log("res: " + JSON.stringify(res.data))
        //         this.setState({
        //             article: res.data
        //         });
        //         console.log("Article Detail res data: " + res.data);
        //     });
        // }
    }

    // componentWillReceiveProps(newProps) {
    //     if (newProps.token !== this.props.token) {
    //         axios.defaults.headers = {
    //             "Content-Type": "aplication/json",
    //             Authorization: newProps.token
    //         }
    //         const articleID = this.props.match.params.articleID;
    //         axios.get(`http://127.0.0.1:8000/articles/${articleID}/`)
    //             .then(res => {
    //                 this.setState({
    //                     article: res.data
    //                 });
    //                 console.log("Article Detail res data: " + res.data);
    //             })
    //     }

    // }

    // handleUpdate = event => {
    //     if (this.props.token !== null) {
    //         const articleID = this.props.match.params.articleID;
    //         axios.defaults.headers = {
    //             "Content-Type": "aplication/json",
    //             Authorization: `Token ${this.props.token}`
    //         }
    //         axios.post(`http://127.0.0.1:8000/articles/${articleID}/update/`);
    //         this.props.history.push('/');
    //         this.forceUpdate();
    //     } else {
    //         // Could not update 
    //     }
    // }

    render() {
        console.log('this.PROPS: ' + JSON.stringify(this.props))
        console.log("1) this.state.article: " + JSON.stringify(this.state.article))
        console.log("2) this.state.article.title: " + this.state.article.title)
        console.log("3) this.state.article.engagement: " + this.state.article.engagement)
        return (
            // <Menu onClick={this.handleClick}
            //     selectedKeys={[this.state.current]}
            //     mode="horizontal"
            // >
            //     <Menu.Item key="mail">
            //         <Icon type="mail" />
            //         
                        // <Link to="/login">Detail</Link>
            //     </Menu.Item>
            //     <Menu.Item key="app">
            //         <Icon type="appstore" />
            // <Link to="/login">Feedback</Link>
            //     </Menu.Item>
            // </Menu>
            <div>
                <Card title={this.state.article.title}>
                    {/* <Row type="flex" justify="center">
                        <Button>
                            Open Call To Join Project
                        </Button>
                    </Row> */}
                    <Row>
                        <Col span={18}>
                            <p>Content: {this.state.article.content}</p>
                            <p>Description: {this.state.article.description}</p>
                        </Col>
                        <Col span={6}>
                            <Tabs defaultActiveKey="1" tabPosition={"right"} style={{ height: 220 }}>
                                  <TabPane tab="Members" key="1">
                                    <p>Members</p>
                                    <ul>{this.state.article.author}</ul>
                                  </TabPane>
                                  {/* <TabPane tab="Requirements" key="2">
                                    What we are looking for
                                  </TabPane>
                                  <TabPane tab="Restrictions" key="3">
                                    Call Restrictions
                                  </TabPane> */}
                                  <TabPane tab="Product" key="4">
                                    Web Page or Product Demo
                                  </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                    {/* <div>
                        <h3 align="center"> Feedback options</h3>
                        <div>
                            <List
                                grid={{
                                    gutter: 16,
                                    xs: 1,
                                    sm: 2,
                                    md: 4,
                                    lg: 4,
                                    xl: 6,
                                    xxl: 3,
                                }}
                                size="small"
                                bordered
                                dataSource={this.state.article.engagement}
                                renderItem={item => this.renderItem(item)}
                            />
                        </div>
                    </div> */}
                </Card>
                {/* <br />
                {this.props.token !== null ? (
                    <div>
                            <form onSubmit={this.handleUpdate}>
                                <Button type="primary" htmlType="submit" href="/articles/update/">
                                    Update
                            </Button>
                            </form>
                            <form onSubmit={this.handleDelete}>
                                <Button type="danger" htmlType="submit">
                                    Delete
                            </Button>
                            </form>
                        
                    </div>
                ) : (
                        null
                    )} */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default withRouter(connect(mapStateToProps)(ArticleDetail));