import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Comments from "../components/Comments"
import { Comment, Avatar, Form, Button, List, Input, Tooltip, Icon} from 'antd';
import { createComment, getComment, getCommentList } from '../store/actions/comments';
import moment from 'moment';

const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     renderItem={console.log("Comment List does received dataList: "), props => 
//       <Comment 
//         author={props.user}
//         content={props.content}
//         avatar={
//           <Avatar
//             src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
//             alt="Han Solo"
//           />
//         }
//         datetime={
//           <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
//             <span>{moment().fromNow()}</span>
//           </Tooltip>
//         }
//         content={
//           props.content
//         }
//       />
//     }
//   />
// );

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

class CommentForm extends React.Component {
  state = {
    comments: [],
    content: {},
    submitting: false,
    username: {},
    value: '',
    likes: 0,
    liked: false,
    dislikes: 0,
    disliked: false,
    action: null,
    dataList: null
  };

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
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
    if (this.props.token !== undefined && this.props.token !== null) {
      // this.props.getASNTSDetail(this.props.token, this.props.match.params.id, this.props.match.params.userId);
      console.log("ComponentDidMount after: " + JSON.stringify(this.props.token))
      console.log("ComponentDidMount after: " + JSON.stringify(this.props.match.params.articleID))
      this.props.getComment(this.props.token, this.props.match.params.articleID)
      
      console.log("ComponentDidMount after: " + JSON.stringify(this.props))
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        // this.props.getASNTSDetail(newProps.token, this.props.match.params.id, this.props.match.params.userId);
        console.log("componentWillReceiveProps: " + JSON.stringify(this.props))
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

  handleSubmit = async () => {
    if (!this.state.value) {
      return;
    } else {
      const articleID = this.props.match.params.articleID;
      const username = this.props.username;
      const likes = this.props.likes;
      const dislikes = this.props.dislikes;
      const liked = this.state.liked;
      const content = this.state.value
      const disliked = this.state.disliked;
      const data = {
        username: username,
        articleID: articleID,
        content: content,
        like: liked,
        dislike: disliked,
      };
       await this.props.createComment(
        this.props.token,
        data
      )
      
    }
    this.setState({
      submitting: true,
    });
    await this.props.getComment(this.props.token, this.props.match.params.articleID)
    setTimeout(() => {
      this.setState({
        submitting: false,
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

  renderCommentData = (data) => {
    return (
      <Comment 
        author={data.user}
        content={data.content}
      />
    );
  };

  render() {
    console.log('this.PROPS: ' + JSON.stringify(this.props))
    console.log("1) this.state: " + JSON.stringify(this.state))
    const { comments, submitting, value, likes, dislikes, action } = this.state;
    const {username, data} = this.props;
    console.log("2) this.props.data AFTER: " + JSON.stringify(data))
    console.log("2) this.props.data AFTER: " + JSON.stringify(this.props.data))
    console.log("2) this.state AFTER: " + JSON.stringify(this.state))

    const actions = [
        <span key="comment-basic-like">
          <Tooltip title="Like">
            <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={this.like}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
        </span>,
        <span key=' key="comment-basic-dislike"'>
          <Tooltip title="Dislike">
            <Icon
              type="dislike"
              theme={action === 'disliked' ? 'filled' : 'outlined'}
              onClick={this.dislike}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
        </span>,
        <span key="comment-basic-reply-to" onClick={this.handleReply}>Reply to</span>,
      ];

    return (
      <div>
        {data !== null && data.length > 0 && <Comments />}
          
          <Comment
          author={<a>{username}`</a>}
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
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
          />
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
)(CommentForm));