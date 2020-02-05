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
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const ChildrenComment = ({ children, submitting, handleChange,
  handleSubmit, value, id, actions, username, props, index }) => (
  <Comment
    consoles = {console.log(JSON.stringify(id))}
    consoles2 = {console.log(JSON.stringify(index))}
    actions={actions}
    key={id}
    author={<a>{username}</a>}
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
    content={
      <Editor
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitting={submitting}
        value={value}
      />
    }
  >
    {
      children
    }
  </Comment>
)

class Comments extends React.Component {
  state = {
    comments: [],
    nestComments: [
      {
        parentId: null,
        parent: null,
        children: []
      }
    ],
    nestComments2: null,
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
    dataList: [
      // commentId: null,
      // likes2:0,
      // dislikes2: 0,
      // action2: null,
    ]
  };

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  };
  like2 = async (id, likeClic, dislikeClic) => {
    const data = this.state.dataList
    const data2 = this.props.data
    const addLike = data2[id].like_counter + 1
    const addDislike = data2[id].dislike_counter + 1
    let actions = {}
    console.log(JSON.stringify(likeClic))
    console.log(JSON.stringify(dislikeClic))
    console.log(JSON.stringify(actions))
    if (data2[id].liked == false && data2[id].disliked == false) {
      if (likeClic === true) {
        actions = {
          like_counter: addLike,
          liked: true
        }
      } else if (dislikeClic === true) {
        actions = {
          dislike_counter: addDislike,
          disliked: true
        }
      }
      console.log(JSON.stringify(actions))
      const uploadData = Object.assign(data2[id], actions)
      console.log(JSON.stringify(actions))
      await this.handleUpdate(uploadData)
    }
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  };

  nestComments = (commentList) => {
    const commentMap = {};
    let nestedComments = {};
    console.log(JSON.stringify(commentList))
  
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
      // this.props.getASNTSDetail(this.props.token, this.props.match.params.id, this.props.match.params.userId);
      console.log("ComponentDidMount after 1: " + JSON.stringify(this.props.token))
      console.log("ComponentDidMount after 2: " + JSON.stringify(this.props.match.params.articleID))
      console.log("ComponentDidMount after 3: " + JSON.stringify(this.props.getComment(this.props.token, this.props.match.params.articleID)))
      this.props.getComment(this.props.token, this.props.match.params.articleID)

      console.log("ComponentDidMount after 4: " + JSON.stringify(this.props))
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        // this.props.getASNTSDetail(newProps.token, this.props.match.params.id, this.props.match.params.userId);
        console.log("componentWillReceiveProps 1: " + JSON.stringify(this.props))
        console.log("componentWillReceiveProps 2: " + JSON.stringify(this.props.getComment(newProps.token, newProps.match.params.articleID)))
        this.props.getComment(newProps.token, newProps.match.params.articleID).then(res => {
          console.log("componentWillReceiveProps before assigning res to dataList: " + JSON.stringify(this.props))
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
      await axios.put(`http://127.0.0.1:8000/articles/${articleID}/update-comment/${commentID}/`, data)
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

  handleActions2 = (index, dataList) => {
    console.log(JSON.stringify(index))
    if (index != null) {
      dataList.push({
        commentId: index,
        likes2: 0,
        dislikes2: 0,
        action2: 0
      })
    } else {
      console.log("index is null")
    }
    console.log(JSON.stringify(Object.keys(dataList).map(((k => dataList[k])))))
  }

  handleReply = (id, reply) => {
    if(reply == true){
      this.setState({
        reply: false,
        replyId: null
      });
    } else {
      this.setState({
        reply: true,
        replyId: id
      });
    }
    return ChildrenComment(id={id})
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
    const { comments, submitting, value, reply, replyId, likes, dislikes, action, dataList, nestComments, nestComments2 } = this.state;
    const { username, data } = this.props;
    let NC
    console.log("2) nestComments: " + JSON.stringify(nestComments))

    const actions = (data, index) => {
      return ([
        <span key={`comment-basic-like ${index}`}>
          <Tooltip title="Like">
            <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={() => { this.like2(index, true, false) }}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data.like_counter}</span>
        </span>,
        <span key={`comment-basic-dislike ${index}`}>
          <Tooltip title="Dislike">
            <Icon
              type="dislike"
              theme={action === 'disliked' ? 'filled' : 'outlined'}
              onClick={() => { this.like2(index, false, true) }}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data.dislike_counter}</span>
        </span>,
        <span key="comment-basic-reply-to" onClick={() => this.handleReply(index, reply)} >Reply to</span>,
        <span key={`nest comments ${index}`} onClick={() => CommentNC(NC, reply)}>Replies</span>
      ]
      )
    }

    if (data !== null && data !== undefined){
      NC = this.nestComments(data, nestComments)
      console.log(" this.nestComments(data): " +JSON.stringify( this.nestComments(data, nestComments)))
    }
    
    const CommentNC =  (comment, reply) => {
      if (comment !== undefined && comment !== null) {
        console.log(" comment: " + JSON.stringify(comment))
        const nestedComments = comment.map(comment => {
          return <Comment content={comment.content} />;
        });
        return (
          <div key={reply}>
             <span>{nestedComments.content}</span>
            { nestedComments }
          </div>
        );
      }
    }
    // console.log(" function Comment: " +JSON.stringify( Comment()))
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
                // actions2= {this.handleActions2(index, dataList)}
                actions={actions(props, index)}
                author={console.log((actions(props, index))), props.user}
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
                {reply === true && index === replyId ? (
                <ChildrenComment handleChange={this.handleChange} handleSubmit={this.handleSubmit} submitting={submitting} value={value} id={replyId} key={replyId}>
                 
                </ChildrenComment>
                ): (null) }
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
)(Comments));