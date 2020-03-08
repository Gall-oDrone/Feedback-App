import React from 'react';
import axios from "axios";
import { Menu, Icon, Tabs, List } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import InquiryDetail from "./InquiryDetail";
import InquiryFeedback from "./InquiryFeedback";
import InquiryRating from "./InquiryRating";
import InquiryComment from "../containers/InquiryComment";
import Comments from "../components/Comments";
import { fetchLikeCounter, getLiked } from "../store/actions/likes";
import { fetchRating } from "../store/actions/rating";
const { SubMenu } = Menu;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const IconText = ({ type, text, onClick }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} onClick={onClick} />
    {text}
  </span>
);

class InquiryDetailMenu extends React.Component {
  state = {
    current: 'mail',
    loading: false,
    inquiry: {},
    likes: null,
    feedback_types: {},
    updated: false
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  handleClickLike = async (like_counter) => {
    const inquiryID = this.props.match.params.inquiryID;
    const username = this.props.username
    const userId = this.props.userId
    let likedVal = this.props.liked.liked
    console.log("handleLike")
    console.log("userId: "+ JSON.stringify(userId))
    console.log("likedVal: "+ JSON.stringify(likedVal))
    console.log("like_counter: "+ JSON.stringify(like_counter))
    if (likedVal == false) {
      console.log("User liked is False")
      likedVal = true
      like_counter = like_counter + 1
    } else if (likedVal == true){
      console.log("User liked is True")
      likedVal = false
      like_counter = like_counter - 1
    }
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    }
    console.log("likedVal after clic: "+ likedVal)
    console.log("like_counter: "+ JSON.stringify(like_counter))
    if(likedVal !== null){
      await axios.put(`http://127.0.0.1:8000/inquiries/${inquiryID}/likes/${userId}/`, { user_id: userId, user: username, inquiry: inquiryID, liked: likedVal })
      this.props.getLikeCounter(this.props.token, this.props.match.params.inquiryID)
      this.props.getLiked(this.props.token, this.props.match.params.inquiryID, this.props.userId)
    } else {
      await axios.post(`http://127.0.0.1:8000/inquiries/${inquiryID}/likes/`, { user_id: userId, user: username, inquiry: inquiryID, liked: true })
      .then(res => {
        console.log(JSON.stringify(res));
        console.log("Receive data from res.data");
        console.log(res.data);
        console.log(inquiryID, this.props.token);
        console.log("After gettingLikes");
        this.props.getLikeCounter(this.props.token, this.props.match.params.inquiryID)
        this.props.getLiked(this.props.token, this.props.match.params.inquiryID, this.props.userId)
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
        console.log('Error');
      });
    }
  };

  handleUpdate = event => {
    if (this.props.token !== null) {
      const inquiryID = this.props.match.params.inquiryID;
      axios.defaults.headers = {
        "Content-Type": "aplication/json",
        Authorization: `Token ${this.props.token}`
      }
      axios.post(`http://127.0.0.1:8000/inquiries/${inquiryID}/update/`);
      this.props.history.push('/');
      this.forceUpdate();
    } else {
      // Could not update 
    }
  }

  handleLikedExists = async (username, likeSet) => {
    const AL = Object.keys(likeSet).map(k => {
      console.log("likeSet[k]: " + JSON.stringify(likeSet[k]))
      if(likeSet[k] = username){
        return true
      }
    });
    console.log("AL: " + JSON.stringify(AL))
    if(AL == true){
      return true
    } else {
      return false
    }
  }

  componentDidMount() {
    console.log("Starting componentDidMount: ")
    console.log(JSON.stringify(this.props))
    console.log("Props token: " + this.props.token)
    if (this.props.token !== undefined && this.props.token !== null) {
    this.setState({ loading: true });
    console.log("CDM passed conditional ");
    const inquiryID = this.props.match.params.inquiryID;
    //this.props.getLikeCounter(this.props.token, inquiryID)
    this.props.getLikeCounter(this.props.token, this.props.match.params.inquiryID)
      // .then(res => {
      //   console.log("getLikeCounter res: " + JSON.stringify(res.data))
      //   this.setState({
      //     inquiry: res.data,
      //     loading: false
      //   });
      //   console.log("Inquiry Detail Menu res data AFTER: " + res.data);
      // })
    //   }).then(this.props.getLiked(this.props.token, this.props.match.params.inquiryID)
    //   .then(res => {
    //     if(res.liked === true){
    //       this.setState({
    //         updated: true,
    //         loading: false
    //       });
    //     } else {
    //       this.setState({
    //         updated: false,
    //         loading: false
    //       });
    //     }
    //   }));
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        console.log("componentWillReceiveProps 1): " + JSON.stringify(this.props))
        console.log("componentWillReceiveProps 2): " + JSON.stringify(newProps))
        console.log("componentWillReceiveProps 3): " + JSON.stringify(newProps.token))
        console.log("componentWillReceiveProps 4): " + JSON.stringify(newProps.match.params.inquiryID))
        console.log("componentWillReceiveProps 5): " + JSON.stringify(this.props.getLikeCounter(newProps.token, newProps.match.params.inquiryID)))
        this.props.getLikeCounter(newProps.token, newProps.match.params.inquiryID)
        this.props.getRatingCounter(newProps.token, newProps.match.params.inquiryID)
        this.props.getLiked(newProps.token, newProps.match.params.inquiryID, newProps.userId)
        // .then(res => {
        //   console.log("componentWillReceiveProps before assigning res: " + JSON.stringify(this.props))
        //   console.log(JSON.stringify(res))
        //   console.log("getLikeCounter res: " + JSON.stringify(res.data))
        //   this.setState({
        //     inquiry: res.data,
        //     loading: false
        //   });
        //   console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
        // });
      }
    }
  }

  render() {
    const inquiryID = this.state.inquiry
    const {liked, rating_counter} = this.props
    let {like_counter} = this.props
    console.log("CORSO")
    console.log(JSON.stringify(inquiryID))
    console.log(JSON.stringify(like_counter))
    console.log("this.props: "+ JSON.stringify(this.props))
    console.log("this.state: "+ JSON.stringify(this.state))
    return (
      <div>
        <List >
          <IconText type="like-o" onClick={() => this.handleClickLike(like_counter)} text={like_counter } key={"like_counter"} />,
          <IconText type="star-o" text={rating_counter} key={"rating_counter"} />,
        </List>

        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Info" key="1" >
            <InquiryDetail />
          </TabPane>
          <TabPane tab="Feedback" key="2">
            <InquiryFeedback />
          </TabPane>
          <TabPane tab="Rating" key="3">
            <InquiryRating />
          </TabPane>
          <TabPane tab="Comments" key="4">
            <InquiryComment/>
          </TabPane>
          <TabPane tab="Comments List" key="5">
            <Comments/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("JSON.stringify(state): " + JSON.stringify(state))
  return {
    userId: state.auth.userId,
    username: state.auth.username,
    token: state.auth.token,
    like_counter: state.like.like_counter,
    liked: state.like.liked,
    likedId: state.like.likedId,
    rating_counter: state.rating.ratingCount
  }
}

const mapDispatchToProps = dispatch => {
  console.log("AR")
  return {
    getLikeCounter: (token, inquiryID) => dispatch(fetchLikeCounter(token, inquiryID)),
    getLiked: (token, inquiryID, userID) => dispatch(getLiked(token, inquiryID, userID)),
    getRatingCounter: (token, inquiryID) => dispatch(fetchRating(token, inquiryID))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InquiryDetailMenu));