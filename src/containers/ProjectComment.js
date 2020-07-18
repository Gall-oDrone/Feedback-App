import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Comments from "../components/ProjectComments"
import { Comment, Avatar, Form, Button, List, Input, Tooltip, Icon} from 'antd';
import { createComment, getComment } from '../store/actions/projectComments';
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
    const projectID = this.props.match.params.projectID;
    this.props.getComment(projectID)
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   if (prevState.comments.length < this.state.comments.length) {
  //     return this.state.comments;
  //   }
  //   return null;
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const projectID = this.props.match.params.projectID;
    // this.props.getComment(projectID)
    // if (snapshot !== null) {
    //   this.setState({
    //       comments: snapshot,
    //     });
    // }
  }

  // static getDerivedStateFromProps(props, state){
  //   const projectID = props.match.params.projectID;
  //   console.log("CACA: ", props.getComment(props.token, projectID))
  //   if(props.getComment(props.token, projectID) !== undefined){
  //     props.getComment(props.token, projectID).then(res => {
  //       console.log(JSON.stringify(res))
  //       this.setState({
  //         comments: res.commentData,
  //         dataList: res.commentData
  //       });
  //       console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
  //     });
  //   }
    
    // if(props !== this.props){
    //   props.getComment(props.token, projectID).then(res => {
    //     console.log(JSON.stringify(res))
    //     this.setState({
    //       comments: res.commentData,
    //       dataList: res.commentData
    //     });
    //     console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
    //   });
    // }
  // }

  handleSubmit = async () => {
    if (!this.state.value) {
      return;
    } else {
      const { match: {params: {projectID: {projectID}}},
              username, likes, dislikes, } = this.props;
      const { liked, content, disliked } = this.state
      const data = {
        username: username,
        projectID: projectID,
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
    await this.props.getComment(this.props.match.params.projectID)
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

  render() {
    console.log('this.PROPS: ' + JSON.stringify(this.props))
    console.log("1) this.state: " + JSON.stringify(this.state))
    const { comments, submitting, value, likes, dislikes, action } = this.state;
    const {username, data, showComments} = this.props;
    console.log("2) this.props.data AFTER: " + JSON.stringify(data))
    console.log("2) this.props.data AFTER: " + JSON.stringify(this.props.data))
    console.log("2) this.state AFTER: " + JSON.stringify(this.state))

    return (
      <div>
        {data !== null && data.length > 0 && showComments === true &&<Comments data={data}/>}
          
          <Comment
          author={<a>{username}`</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
            datetime=
              {submitting === true ? (
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
              ):( null )}
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
  console.log("PC mapStateToProps: ", JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    likes: state.like_counter,
    dislikes: state.dislike_counter,
    loading: state.loading,
    data: state.project_comments.commentData
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
)(CommentForm));