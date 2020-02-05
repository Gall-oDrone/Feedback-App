import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { Menu, Card, Button, Skeleton, message, List, Icon, Form } from "antd";
import ArticleCreate from '../containers/ArticleCreate';
import { configConsumerProps } from 'antd/lib/config-provider';
import * as actions from "../store/actions/auth";

const { SubMenu } = Menu;

const Selector = ({ onChange, onSubmit, submitting, value, data, render }) => (
    <div>
        <Form.Item>
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
                dataSource={data}
                renderItem={item => render(item)}
            />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
        </Button>
        </Form.Item>
    </div>
);

  let tabListNoTitle = [];

  const contentListNoTitle = {
    article: <p>article content</p>,
    app: <p>app content</p>,
    project: <p>project content</p>,
  };

class ArticleFeedback extends React.Component {

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
        // console.log("this.props.match.params: " + JSON.stringify(this.props.match.params))
        // console.log("this.props.match.params.articleID: " + JSON.stringify(this.props.match.params.articleID))
        const articleID = this.props.match.params.articleID;
        //const articleID = 11
        axios.get(`http://127.0.0.1:8000/articles/${articleID}`)
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

    handleClick = () => {
        console.log("handleClick on Feedback type")
    }

    handleTabList = (item, list) => {
        item.forEach(val => {
            let tab = {
                key: `key ${val}`, tab: `${val}`
            }
            list.push(tab)
            } 
        )
        console.log("ehreno 4: " + JSON.stringify(list))
        return list
        
    }

    handleFeedbackIcon = (feedbackType) => {
        "live chat","phone call","survey"
        if (feedbackType === "live chat") {
            return "video-camera"
        }
        else if (feedbackType === "chat") {
            return "wechat"
        }
        else if (feedbackType === "phone call") {
            return "phone"
        }
        else if (feedbackType === "survey") {
            return "profile"
        }
    }

    renderItem(item) {
        const icons = ["phone", "mail", "profile"]
        console.log("item: " + item)
        return (
            <List.Item onClick={this.handleClick} key={`feedback-type: ${item}`}>
                <Card title={item} tabList={this.handleTabList(item)}><Icon type={this.handleFeedbackIcon(item)} theme="filled" /></Card>
            </List.Item>
        );
    }

    render() {
        console.log("3) this.state.article.engagement: " + this.state.article.engagement)
        return (
            <div>
                {this.state.article.engagement !== undefined ? (
                    <Card
                        style={{ width: '100%' }}
                        tabList={this.handleTabList(this.state.article.engagement, tabListNoTitle)}
                        activeTabKey={this.state.noTitleKey}
                        onTabChange={key => {
                            this.onTabChange(key, 'noTitleKey');
                        }}
                        >
                        {contentListNoTitle[this.state.noTitleKey]}
                    </Card>
                    ) : (null)
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default withRouter(connect(mapStateToProps)(ArticleFeedback));