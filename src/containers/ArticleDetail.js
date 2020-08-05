import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import {articleDetailURL} from "../constants";
import { connect } from 'react-redux';
import { Menu, Card, Button, Skeleton, message, Divider, List, Tabs, Row, Col, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import {Editor, EditorState, convertToRaw, convertFromRaw} from "draft-js";

const { SubMenu } = Menu;
const { TabPane } = Tabs;

const content = {
    "blocks": [
        {
            "key": "8i090",
            "text": "Hello CodePulse!",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
                {
                    "offset": 0,
                    "length": 16,
                    "style": "BOLD"
                }
            ],
            "entityRanges": [],
            "data": {}
        },
        {
            "key": "42ncd",
            "text": "This text should be underlined.",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
                {
                    "offset": 0,
                    "length": 31,
                    "style": "UNDERLINE"
                }
            ],
            "entityRanges": [],
            "data": {}
        },
        {
            "key": "327r6",
            "text": "And this text should be italic.",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
                {
                    "offset": 0,
                    "length": 31,
                    "style": "ITALIC"
                }
            ],
            "entityRanges": [],
            "data": {}
        }
    ],
    "entityMap": {}
}
class ArticleDetail extends React.Component {

    state = {
        article: {},
        current: 'mail',
        content: null,
        // editorState: EditorState.createWithContent(stateFromHTML(props.data.description))
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
        axios.get(articleDetailURL(articleID))
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    article: res.data,
                    content: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.content)))
                    // content: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.content)))
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

    render() {
        console.log('this.PROPS: ' + JSON.stringify(this.props))
        console.log("1) this.state.article: " + JSON.stringify(this.state.article))
        console.log("2) this.state.article.title: " + this.state.article.title, typeof(this.state.article.content), typeof(content))
        console.log("3) this.state.article.engagement: " + this.state.article.engagement)
        // const parseContent = JSON.parse(this.state.article.content)
        // const contentState = convertFromRaw(this.state.article.content);
        // const editorState = EditorState.createWithContent(this.state.content);
        return (
            <div>
                <Card title={this.state.article.title}>
                    <Row>
                        <Col span={18}>
                            <p>Content: {this.state.article.content}</p>
                            {this.state.content !== undefined  &&
                            this.state.content !== null ?
                            <p>Description:  <Editor editorState={this.state.content} readOnly={true} /></p>
                            : null
                             }
                        </Col>
                        <Col span={6}>
                            <Tabs defaultActiveKey="1" tabPosition={"right"} style={{ height: 220 }}>
                                  <TabPane tab="Members" key="1">
                                    <p>Members</p>
                                    <ul>{this.state.article.author}</ul>
                                  </TabPane>
                                  <TabPane tab="Product" key="4">
                                    Web Page or Product Demo
                                  </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Card>
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