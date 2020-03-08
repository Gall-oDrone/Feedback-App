import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Comment, Avatar, Form, Button, List, Input, Tooltip, Icon } from 'antd';
import { createComment, getComment, getCommentList } from '../store/actions/comments';
import moment from 'moment';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Reply
      </Button>
    </Form.Item>
  </div>
);

class ChildrenComment extends React.Component {
  state = {
    comments: [],
    nestComments: [
      {
        parentId: null,
        parent: null,
        children: []
      }
    ],
    content: {},
    submitting: false,
    reply: false,
    replyId: null,
    username: {},
    value: '',
    likes: 0,
    liked: false,
    dislikes: 0,
    disliked: false,
    action: null,
  };

  nestComments = (commentList) => {
    const commentMap = {};
    let nestedComments = {};
    console.log("commentList at nestComments", JSON.stringify(commentList))
  
    // move all the comments into a map of id => comment
    commentList.forEach(comment => commentMap[comment.id] = comment.content);
    console.log("commentMap: " + JSON.stringify(commentMap))
  
    // iterate over the comments again and correctly nest the children
    commentList.forEach(comment => {
      if(comment.reply_to !== null) {
        const parent = commentMap[comment.reply_to];
        console.log("parent: " + JSON.stringify(parent))
        let children = [{parentId: comment.reply_to, parentComment: parent, comments:[comment.content]}]
        nestedComments = children
        console.log("children: " + JSON.stringify(children))
        console.log("nestedComments: " + JSON.stringify(nestedComments))
        // (parent.children = parent.children || []).push(comment);
      }
    });
  
    // filter the list to return a list of correctly nested comments
    return commentList.filter(comment => {
      return [comment.reply_to === null, {nestedComments}];
    });
  }

  componentDidMount() {
    console.log(JSON.stringify(this.props))
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getComment(this.props.token, this.props.match.params.articleID)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getComment(newProps.token, newProps.match.params.articleID).then(res => {
          console.log(JSON.stringify(res))
          this.setState({
            comments: res.commentData,
            dataList: res.commentData
          });
          console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
        });
      }
    }
  }

  handleUpdate = async (data) => {
    if (this.props.token !== null) {
      const commentID = data.id;
      console.log("commentID: " + JSON.stringify(commentID))
      console.log("data: " + JSON.stringify(data))
      const articleID = this.props.match.params.articleID;
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      }
      await axios.put(`http://127.0.0.1:8000/api/articles/${articleID}/update-comment/${commentID}/`, data)
        .then((res) => {
          console.log("MR CROSO: " + JSON.stringify(res.data))
          // if (res.status === 200) {
          //   console.log("res.status 200: ")
          //   };
        }).catch((error) => {
          console.log("error: ")
          console.log(error);
        })
      await this.props.getComment(this.props.token, this.props.match.params.articleID)
    } else {
      // Could not update 
    }
  }

  handleSubmit = async () => {
    if (!this.state.value) {
      return;
    } else {
      const articleID = this.props.match.params.articleID;
      const username = this.props.username;
      const likes = this.props.likes;
      const dislikes = this.props.dislikes;
      let replyID = {};
      const liked = this.state.liked;
      const content = this.state.value
      const disliked = this.state.disliked;
      console.log(JSON.stringify(this.state.replyId))
      console.log(JSON.stringify(this.props.data[this.state.replyId].id))
      
      if (this.state.replyId !== null) {
        replyID = this.props.data[this.state.replyId].id
      }
      else {
        replyID = null
      }
      const data = {
        username: username,
        articleID: articleID,
        content: content,
        like: liked,
        dislike: disliked,
        reply_to: replyID
      };
      await this.props.createComment(
        this.props.token,
        data
      )
    }
    this.setState({
      submitting: true,
    });
    setTimeout(() => {
      this.setState({
        submitting: false,
        reply: false,
        value: '',
        comments: [
          {
            author: this.state.username,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    console.log('this.PROPS: ' + JSON.stringify(this.props))
    console.log("1) this.state: " + JSON.stringify(this.state))
    const { comments, submitting, value, reply, replyId, likes, dislikes, action, dataList, nestComments } = this.state;
    const { username, data } = this.props;
    let NC
    console.log("2) nestComments: " + JSON.stringify(nestComments))

    const actions = (data, index) => {
      return ([
        <span key={`comment-like ${index}`}>
          <Tooltip title="Like">
            <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={() => { this.like(index, true, false) }}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>
            {data.like_counter}
          </span>
        </span>,
        <span key={`comment-dislike ${index}`}>
          <Tooltip title="Dislike">
            <Icon
              type="dislike"
              theme={action === 'disliked' ? 'filled' : 'outlined'}
              onClick={() => { this.like(index, false, true) }}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{
            data.dislike_counter}
          </span>
        </span>,
        <span key={`comment-reply-to ${index}`} onClick={() => this.handleReply(index, reply)} >
          Reply to
        </span>
      ]
      )
    }
    console.log("1) this.state: " + JSON.stringify(actions))
    return (
      <div>
        {data !== null && data !== undefined ? (
          <List
            dataSource={data}
            header={`${data.length} ${data.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={(props, index) =>
              <Comment
                actions={actions(props, index)}
                author={props.user}
                content={props.content}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                datetime={
                  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                }
              >
              </Comment>
            }
          />
        ) : (null)
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    likes: state.like_counter,
    dislikes: state.dislike_counter,
    loading: state.loading,
    data: state.comments.commentData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getComment: (token, articleID) => dispatch(getComment(token, articleID)),
    createComment: (token, username, articleId, comments) => dispatch(createComment(token, username, articleId, comments)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildrenComment));