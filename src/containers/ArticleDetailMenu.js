import React from 'react';
import axios from "axios";
import {articleLikeUpdateURL, articleUpdateURL, articleDetailURL, articleLikeCreateURL} from "../constants";
import { Menu, Icon, Tabs, Tooltip, Avatar, Row } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import ArticleDetail from "./ArticleDetail";
import ArticleFeedback from "./ArticleFeedback";
import ArticleRating from "./ArticleRating";
import ArticleComment from "../containers/ArticleComment";
import Comments from "../components/Comments";
import { fetchLikeCounter, getLiked } from "../store/actions/likes";
import { fetchRating } from "../store/actions/rating";
import {Editor, EditorState, convertToRaw, convertFromRaw} from "draft-js";
import "../assets/articleTab.css"

var moment = require('moment');
const { SubMenu } = Menu;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type}/>
    {text}
  </span>
);

class ArticleDetailMenu extends React.Component {
  state = {
    loading: false,
    article: {},
    author_info: {},
    likes: null,
    showC: true,
    feedback_types: {},
    updated: false,
    activeClass: false,
    drawer_visible: false,
    modal_visible: false,
    key_id: null,
    feedback_t:null,
    disableB: false,
    content: null,
  };

  handleShowComments(show){
    this.setState({showC:!show})
  }

  handleDonation(keyId){
    this.setState({drawer_visible:true, disableB:true, key_id:keyId})
  }

  handleFeedback(keyId){
    this.setState({modal_visible:true, feedback_t:keyId})
  }

  handleActiveClass = () => {
    const node1 = this.topRef
    const node2 = this.webRef
    const node = this.designRef
    const node4 = this.photoRef
    const node5 = this.parentRef
    // window.scrollTo(0, node);
    // var scrollTargetIds = Object.values(node5.children).map(function(el){if(el.nodeName === "SECTION" && el.nodeName !== undefined){return el.id}})

    const { y = 0 } = (node && node.getBoundingClientRect()) || {};

    // this.setState({
    //   activeClass: y <= 100
    // });
  };

  handleClickLike = async (like_counter) => {
    const articleID = this.props.match.params.articleID;
    const { username, userId, token } = this.props
    let likedVal = this.props.liked
    if(likedVal !== null){
      likedVal = likedVal.like
    }
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
      Authorization: `Token ${token}`
    }
    console.log("likedVal after clic: "+ likedVal)
    console.log("like_counter: "+ JSON.stringify(like_counter))
    if(likedVal !== null){
      await axios.put(articleLikeUpdateURL(articleID, userId), { user_id: userId, user: username, article: articleID, liked: likedVal })
      this.props.getLikeCounter(articleID)
      this.props.getLiked(token, articleID, userId)
    } else {
      // await axios.post(articleLikeCreateURL(articleID), { user_id: userId, user: username, article: articleID, liked: true })
      axios.put(articleLikeUpdateURL(articleID, userId), { user_id: userId, user: username, article: articleID, liked: likedVal })
      .then(res => {
        console.log(JSON.stringify(res));
        console.log("Receive data from res.data");
        console.log(res.data);
        console.log(articleID, token);
        console.log("After gettingLikes");
        this.props.getLikeCounter(articleID)
        this.props.getLiked(token, articleID, userId)
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
        console.log('Error');
      });
    }
  };

  handleUpdate = event => {
    if (this.props.token !== null) {
      const articleID = this.props.match.params.articleID;
      axios.defaults.headers = {
        "Content-Type": "aplication/json",
        Authorization: `Token ${this.props.token}`
      }
      axios.post(articleUpdateURL(articleID));
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
    window.addEventListener("scroll", this.handleActiveClass);
    const { token, userId, match:{params: { articleID }} } = this.props;
    axios.get(articleDetailURL(articleID))
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    article: res.data,
                    author_info: res.data.author_info,
                    content: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.content)))
                });
                console.log("Article Detail res data: " + res.data);
            })
              .then(() => {
                    if(token !== undefined && token !== null && userId !== null && userId !== undefined) {
                    this.props.getLiked(token, articleID, userId)}
                    }) 
    if (token !== undefined && token !== null) {
    // this.setState({ loading: true });
    console.log("CDM passed conditional ");
    // this.props.getLikeCounter(this.props.match.params.articleID)
    // axios.get(articleDetailURL(articleID))
    //         .then(res => {
    //             console.log("res: " + JSON.stringify(res.data))
    //             this.setState({
    //                 article: res.data
    //             });
    //             console.log("Article Detail res data: " + res.data);
    //         });
      // .then(res => {
      //   console.log("getLikeCounter res: " + JSON.stringify(res.data))
      //   this.setState({
      //     article: res.data,
      //     loading: false
      //   });
      //   console.log("Article Detail Menu res data AFTER: " + res.data);
      // })
    //   }).then(this.props.getLiked(this.props.token, this.props.match.params.articleID)
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

  componentDidUpdate(prevProps, prevState) {
    console.log("Static X CDU", prevProps.token, this.props.token)
    const { token, userId, match:{params: { articleID }} } = this.props;
    this.props.getLikeCounter(articleID)
    if(prevProps.token !== this.props.token && userId !== null && userId !== undefined){
      this.props.getLiked(token, articleID, userId)
      axios.get(articleDetailURL(articleID))
      .then(res => {
          console.log("res: " + JSON.stringify(res.data))
          this.setState({
              article: res.data,
              content: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.content)))
          });
          console.log("Article Detail res data: " + res.data);
      });
    }
  }

  // static getDerivedStateFromProps(props, state){
  //   const articleID = props.match.params.articleID;
  //   if(props.token !== undefined){
  //     props.getLiked(props.token, articleID)
  //   };
  //     // axios.get(articleDetailURL(articleID))
  //     // .then(res => {
  //     //     console.log("res: " + JSON.stringify(res.data))
  //     //         state.article= res.data
  //     //     console.log("Article Detail res data: " + res.data);
  //     // })
  // }

  render() {
    const articleID = this.state.article
    const {liked, like_counter, rating_counter} = this.props
    const { article, author_info, content, drawer_visible, modal_visible, key_id, feedback_t, disableB, showC } = this.state
    const { keyId} = this.props.match.params.articleID
    // let {like_counter} = this.props
    console.log(JSON.stringify(articleID))
    console.log("like_counter: ", JSON.stringify(like_counter))
    console.log("liked: ", JSON.stringify(liked))
    console.log("this.PROPS: "+ JSON.stringify(this.props))
    console.log("this.STATE: "+ JSON.stringify(this.state) )
    return (
      <div>
        {/* <List >
          <IconText type="like-o" onClick={() => this.handleClickLike(like_counter)} text={like_counter } key={"like_counter"} />,
          <IconText type="star-o" text={rating_counter} key={"rating_counter"} />,
        </List> */}

        <Row>
        <div className="article-columns">
          {/* <Col span={10}> */}
          
            <div className="left-column">
              <nav>
                  <ul>
                      <li><a className={this.state.activeClass ? "current" : "hidden"} ref={node => (this.topRef = node)} href="#overview">Overview</a></li>
                      <li><a className={this.state.activeClass ? "current" : "hidden"} ref={node => (this.webRef = node)} href="#content">Content</a></li>
                      <li><a className={this.state.activeClass ? "current" : "hidden"} ref={node => (this.webRef = node)} href="#contributing">Contributing</a></li>
                      <li><a className={this.state.activeClass ? "current" : "hidden"} ref={node => (this.designRef = node)} href="#credits">Credits</a></li>
                      <li><a className={this.state.activeClass ? "current" : "hidden"} ref={node => (this.photoRef = node)} href="#feedback">Feedback</a></li>
                      <li><a className={this.state.activeClass ? "current" : "hidden"} ref={node => (this.photoRef = node)} href="#comments">Comments</a></li>
                  </ul>
              </nav>
              <div className={"left-column-buttons"}>
                <Tooltip placement="bottom" title={"Like"} trigger="hover">
                  <span>
                    <button disabled={disableB} onClick={() => this.handleClickLike(like_counter)}>
                      <Icon type="like-o"/> 
                      {like_counter !== null ? like_counter: null}
                    </button>
                  </span>
                </Tooltip>
                <Tooltip placement="bottom" title={"Donate"} trigger="hover">
                  <span style={{padding: "2px 5px"}}/>
                    <span>
                      <button onClick={() => this.handleDonation(keyId)}>
                        <Icon type="money-collect" />
                      </button>
                    </span>
                </Tooltip>
              </div>
            </div>
          {/* </Col>
          <Col span={12}> */}
            <div className="middle-column" ref={node => (this.parentRef = node)}>
                <section id="authors" style={{display:"flex", flexDirection: "row"}}>
                  <div id="image" style={{display: "flex", alignItems: "center", paddingRight:"10px"}}>
                  <Avatar icon={<Icon type="user"/>} src={article.user_thumbnail}/>
                  </div>
                  <div id="author">
                  <a style={{color:"black"}} href={`/profile-page/${article.user_name}`}>{article.user_name}</a>
                    <div id="timestamp">
                      <span>Published: {moment(article.timestamp).format("MMMM Do YYYY")}</span>
                    </div>
                  </div>
                </section>
                <div className="article-header"><h1>{article.title}</h1></div>
                <div id="article-details">
                  {/* <span id="university">University: {author_info.university}</span> */}
                  <span id="category">Category: {article.category}</span>
                  <span id="views">
                    <Icon type="eye"/> 
                    :
                      {article.view_count}
                  </span>
                </div>
                {/* <section id="overview"><h2>Overview</h2></section> */}
                {/* <h1>Smooth Scrolling Sticky ScrollSpy Navigation</h1> */}
                <section id="introduction">
                  {/* <h2>Introduction</h2> */}
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <div className="article-image-container">
                        <img src={article.thumbnail}>
                        </img>
                      </div>
                    </div>
                    {content !== null ?
                        <p><Editor editorState={content} readOnly={true} /></p>
                      :
                        null
                    }
                </section>

                {/* <section id="contributing"><h2>Contributing</h2></section> */}

                <section id="credits">
                  <h2>Credits</h2>
                    <div id="image" style={{display: "flex", alignItems: "center", paddingRight:"10px"}}>
                      <Avatar size={64} icon={<Icon type="user"/>} src={article.user_thumbnail}/>
                      <div id="author-name">
                        <a style={{color:"black"}} href={`/profile-page/${article.author}`}>{article.user_name}</a>
                        <br/>
                        {/* <span>{author_info.degree}</span> */}
                      </div>
                    </div>
                </section>
                <section id="comments">
                <h2><a onClick={() => {this.handleShowComments(showC)}}>Comments: {article.comment_count}</a></h2>
                    {/* <Comments/> */}
                   {/* <ArticleComment showComments={showC}/> */}
                </section>
            </div>
          {/* </Col> */}
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("mapStateToProps: " + JSON.stringify(state))
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
    getLikeCounter: (articleID) => dispatch(fetchLikeCounter(articleID)),
    getLiked: (token, articleID, userID) => dispatch(getLiked(token, articleID, userID)),
    getRatingCounter: (token, articleID) => dispatch(fetchRating(token, articleID))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDetailMenu));