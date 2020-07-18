import React, { useState } from 'react';
import { connect } from "react-redux";
import Hoc from "../hoc/hoc";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Comment, Avatar, Form, Button, List, Input, Tooltip, Icon } from 'antd';
import { createComment, getComment, getCommentList } from '../store/actions/projectComments';
import {projectUpdateCommentURL3} from "../constants"
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

const ReplyToComment = ({ submitting, handleChange,
  handleSubmit, value, id, actions, username, index }) => (
  <Comment
    key={id}
    author={<a>{username}</a>}
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo Children Comment"
      />
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
  </Comment>
)

function ListComments(props, id){
  const [commentId, setId] = useState(null);
  const [replyId, setReplyId] = useState(null);
  const [reply, setReplyStatus] = useState(false);
  const data = props.props;
  var chl_match = data.filter(function(el) {return el.reply_to === props.id})
  if(chl_match.length === 0){
    return
  }
  console.log("eh: ", JSON.stringify(chl_match))

  const actions = (data, index) => {
    return ([
      <span key={`comment-basic-like ${index}`}>
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={'outlined'}
            onClick={() => { this.like(index, true, false) }}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data.like_counter}</span>
      </span>,
      <span key={`comment-basic-dislike ${index}`}>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={'outlined'}
            onClick={() => { this.like(index, false, true) }}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data.dislike_counter}</span>
      </span>,
      <span key={`comment-basic-reply-to-${index}`} onClick={() => handleNestedReply(data.id)} >Reply to</span>,
      <span key={`nest-comments-${index}`} onClick={() => CommentNC(data.replies, data.id)}>{`Replies ${data.replies.length}`}</span>
    ]
    )
  }
  const CommentNC =  (replies, commentID) => {
      if(replies.length === 0){
        return
      }
      setId(commentID)
    }
  
  const handleNestedReply = (id) => {
    if(reply == true){
      setReplyStatus(!reply)
      setReplyId(null)
    } else {
      setReplyStatus(!reply)
      setReplyId(id)
    }
    return 
  }

  return (
    <div>
      {data !== null && data !== undefined ? (
        <List
          dataSource={data.filter(function(el) {return el.reply_to === props.id})}
          header={`${data.filter(function(el) {return el.reply_to === props.id}).length} ${data.filter(function(el) {return el.reply_to === props.id}).length > 1 ? 'replies' : 'reply'}`}
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
                <Tooltip title={moment(new Date(props.timestamp)).format('YYYY-MM-DD HH:mm')}>
                  <span>{moment(new Date(props.timestamp)).fromNow()}</span>
                </Tooltip>
              }
            >
                  {reply === true && props.id === replyId ? (
                    <ReplyToComment
                      // handleChange={this.handleChange} 
                      // handleSubmit={this.handleSubmit} 
                      submitting={false} 
                      index={index}
                      value={''} 
                      id={replyId} 
                      key={replyId} 
                    />
                  ):null}

                  {props.id === commentId ? (
                    <ListComments props={data} id={props.id}/>
                  ):null}
                  
            </Comment>
          }
        />
      ) : (null)
      }
    </div>
  );
}

class Comments extends React.Component {
  state = {
    comments: [],
    nestComments: false,
    content: {},
    submitting: false,
    reply: false,
    replyId: null,
    parentId: null,
    corso: {reply: false,
      replyId: null,},
    username: {},
    value: '',
    likes: 0,
    liked: false,
    dislikes: 0,
    disliked: false,
    action: null,
    ncCount: 1
  };

  like = async (id, likeClic, dislikeClic) => {
    const data = this.state.dataList
    const data2 = this.props.data
    const addLike = data2[id].like_counter + 1
    const addDislike = data2[id].dislike_counter + 1
    let actions = {}
    console.log(JSON.stringify(likeClic))
    console.log(JSON.stringify(dislikeClic))
    console.log(JSON.stringify(actions))
    if (data2[id].liked === false && data2[id].disliked === false) {
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

  componentDidMount() {
    console.log(JSON.stringify(this.props))
    this.props.getComment(this.props.match.params.projectID)
    // if (this.props.token !== undefined && this.props.token !== null) {
    //   console.log("ComponentDidMount after 1: " + JSON.stringify(this.props.token))
    //   console.log("ComponentDidMount after 2: " + JSON.stringify(this.props.match.params.projectID))
    //   this.props.getComment(this.props.match.params.projectID)
    //   console.log("ComponentDidMount after 4: " + JSON.stringify(this.props))
    // }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        console.log("componentWillReceiveProps 1: " + JSON.stringify(this.props))
        this.props.getComment(newProps.match.params.projectID).then(res => {
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
      const projectID = this.props.match.params.projectID;
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      }
      await axios.put(projectUpdateCommentURL3(projectID, commentID), data)
        .then((res) => {
          console.log("MR CROSO: " + JSON.stringify(res.data))
          // if (res.status === 200) {
          //   console.log("res.status 200: ")
          //   };
        }).catch((error) => {
          console.log("error: ")
          console.log(error);
        })
      await this.props.getComment(this.props.token, this.props.match.params.projectID)
    } else {
      // Could not update 
    }
  }

  handleReply = (id, reply) => {
    if(reply === true){
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
    return 
  }

  handleSubmit = async () => {
    if (!this.state.value) {
      return;
    } else {
      const projectID = this.props.match.params.projectID;
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
        replyID = this.state.replyId
      }
      else {
        replyID = null
      }
      const data = {
        username: username,
        projectID: projectID,
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
        value: ''
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    console.log('PCs this.PROPS: ' + JSON.stringify(this.props))
    console.log("1) this.state: " + JSON.stringify(this.state))
    const { submitting, value, reply, replyId, action, nestComments, parentId } = this.state;
    const { data } = this.props;
    const parents = data.filter(el => el.reply_to === null)
    const children = data.filter(el => el.reply_to !== null)

    const actions = (data, index) => {
      return ([
        <span key={`comment-basic-like ${index}`}>
          <Tooltip title="Like">
            <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={() => { this.like(index, true, false) }}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data.like_counter}</span>
        </span>,
        <span key={`comment-basic-dislike ${index}`}>
          <Tooltip title="Dislike">
            <Icon
              type="dislike"
              theme={action === 'disliked' ? 'filled' : 'outlined'}
              onClick={() => { this.like(index, false, true) }}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data.dislike_counter}</span>
        </span>,
        <span key={`comment-basic-reply-to-${index}`} onClick={() => this.handleReply(data.id, reply)} >Reply to</span>,
        <span key={`nest-comments-${index}`} onClick={() => CommentNC(data.replies, data.id, data.reply_to)}>{`Replies ${data.replies.length}`}</span>
      ]
      )
    }

    const CommentNC =  (replies, parentID, isNested) => {
      console.log("POLLY; ", isNested, parentID)
        if(replies.length === 0){
          return
        }
        if(replies !== null){
          if(this.state.nestComments == true){
            if(isNested !== null){
              this.setState({
                corso: {reply:true,  parentId:parentID}
              });
            } else {
              this.setState({
                nestComments: false,
                parentId: null
              });
            }
          } else {
            this.setState({
              nestComments: true,
              parentId: parentID
            });
          }
        }
      }
    console.log("1) this.state: " + JSON.stringify(actions))
    return (
      <div>
        {data !== null && data !== undefined ? (
          <List
            dataSource={parents}
            header={`${parents.length} ${parents.length > 1 ? 'replies' : 'reply'}`}
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
                    <Tooltip title={moment(new Date(props.timestamp)).format('YYYY-MM-DD HH:mm')}>
                      <span>{moment(new Date(props.timestamp)).fromNow()}</span>
                    </Tooltip>
                  }
                >
                  {reply === true && props.id === replyId ? (
                    <ReplyToComment
                      handleChange={this.handleChange} 
                      handleSubmit={this.handleSubmit} 
                      submitting={submitting} 
                      index={index}
                      value={value} 
                      id={replyId} 
                      key={replyId} 
                    />
                    ): (null) }
                    {nestComments === true && props.id === parentId ? (
                      <ListComments props={data} id={parentId}/>
                    ): null }
                    
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
    // data: state.comments.commentData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getComment: (projectID) => dispatch(getComment(projectID)),
    createComment: (token, username, articleId, comments) => dispatch(createComment(token, username, articleId, comments)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments));