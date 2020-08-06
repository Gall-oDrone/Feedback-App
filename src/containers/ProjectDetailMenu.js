import React from 'react';
import axios from "axios";
import {projectLikeUpdateURL, projectUpdateURL, projectLikeCreateURL} from "../constants";
import { Menu, Icon, Tabs, List, Row, Col, Modal, Avatar, Tooltip } from 'antd';
import { connect } from 'react-redux';
import {media_endpoint} from "../constants";
import { Link, withRouter } from "react-router-dom";
import ArticleDetail from "./ProjectDetail";
import ArticleFeedback from "./ProjectFeedback";
import ArticleRating from "./ProjectRating";
import ArticleComment from "./ProjectComment";
import Comments from "../components/Comments";
import {projectDetailURL} from "../constants";
import { fetchLikeCounter, getLiked } from "../store/actions/projectLikes";
import { fetchRating } from "../store/actions/rating";
import DonationDrawer from "../components/DonationDrawer";
import "../assets/projectTab.css"

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
    project: {},
    author_info: {},
    likes: null,
    showC: true,
    feedback_types: {},
    updated: false,
    activeClass: null,
    drawer_visible: false,
    modal_visible: false,
    key_id: null,
    feedback_t:null,
    disableB: false,
    items: null
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

  handleFeedbackType(type){
    if(type === "live chat"){
      return "video-camera"
    } 
    else if (type === "chat"){
      return "message"
    } 
    else if (type === "email"){
      return "mail"
    } 
    else if (type === "survey"){
      return "reconciliation"
    }
    else if (type === "phone call"){
      return "phone"
    }  
    else {return null}
  }

  isInView = (element: HTMLElement) => {
    const { offset } = this.props;
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
    return rect.top >= 0 - offset && rect.bottom <=     
      window.innerHeight + offset;
 };

  handleActiveClass = () => {
    const node1 = this.topRef
    const node2 = this.webRef
    const node = this.designRef
    const node4 = this.photoRef
    const node5 = this.parentRef
    // window.scrollTo(0, node);
    if(node5 !== null){
      var scrollTargetIds = Object.values(node5.children).map(function(el){if(el.nodeName === "SECTION" && el.nodeName !== undefined){return el.id;}})
      var activeClass = null;
      const items = scrollTargetIds.map((el, i) => {
        console.log("EHRENO -1: ", el)
        if(el !== undefined){
          const element = document.getElementById(el);
          if (element) {
            if(this.isInView(element) === true){
              activeClass = element.id
            }
            return {
              inView: this.isInView(element),
              element
            } //as SpyItem;
          } else {
            return;
          }
        }
      })
      console.log("EHRENO 0: ", items)
      console.log("EHRENO: ", scrollTargetIds, node)
      this.setState({ items: items, activeClass: activeClass});
    }
    const { y = 0 } = (node && node.getBoundingClientRect()) || {};

    // this.setState({
    //   activeClass: y <= 100
    // });
  };

  handleClickLike = async (like_counter) => {
    const projectID = this.props.match.params.projectID;
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
      await axios.put(projectLikeUpdateURL(projectID, userId), { user_id: userId, user: username, project: projectID, liked: likedVal })
      this.props.getLikeCounter(projectID)
      this.props.getLiked(token, projectID, userId)
    } else {
      // await axios.post(projectLikeCreateURL(projectID), { user_id: userId, user: username, project: projectID, liked: true })
      axios.put(projectLikeUpdateURL(projectID, userId), { user_id: userId, user: username, project: projectID, liked: likedVal })
      .then(res => {
        console.log(JSON.stringify(res));
        console.log("Receive data from res.data");
        console.log(res.data);
        console.log(projectID, token);
        console.log("After gettingLikes");
        this.props.getLikeCounter(projectID)
        this.props.getLiked(token, projectID, userId)
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
        console.log('Error');
      });
    }
  };

  handleUpdate = event => {
    if (this.props.token !== null) {
      const projectID = this.props.match.params.projectID;
      axios.defaults.headers = {
        "Content-Type": "aplication/json",
        Authorization: `Token ${this.props.token}`
      }
      axios.post(projectUpdateURL(projectID));
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
    // this.timer = window.setInterval(() => this.spy(), 100);
    window.addEventListener("scroll", this.handleActiveClass);
    const { token, userId, match:{params: { projectID }} } = this.props;
    axios.get(projectDetailURL(projectID))
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    project: res.data,
                    author_info: res.data.author_info
                });
                console.log("Article Detail res data: " + res.data);
            })
              .then(() => {
                    if(token !== undefined && token !== null && userId !== null && userId !== undefined) {
                    this.props.getLiked(token, projectID, userId)}
                    }) 
    if (token !== undefined && token !== null) {
    // this.setState({ loading: true });
    console.log("CDM passed conditional ");
    // this.props.getLikeCounter(this.props.match.params.projectID)
    // axios.get(projectDetailURL(projectID))
    //         .then(res => {
    //             console.log("res: " + JSON.stringify(res.data))
    //             this.setState({
    //                 project: res.data
    //             });
    //             console.log("Article Detail res data: " + res.data);
    //         });
      // .then(res => {
      //   console.log("getLikeCounter res: " + JSON.stringify(res.data))
      //   this.setState({
      //     project: res.data,
      //     loading: false
      //   });
      //   console.log("Article Detail Menu res data AFTER: " + res.data);
      // })
    //   }).then(this.props.getLiked(this.props.token, this.props.match.params.projectID)
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
    const { token, userId, match:{params: { projectID }} } = this.props;
    this.props.getLikeCounter(projectID)
    if(prevProps.token !== this.props.token && userId !== null && userId !== undefined){
      this.props.getLiked(token, projectID, userId)
      axios.get(projectDetailURL(projectID))
      .then(res => {
          console.log("res: " + JSON.stringify(res.data))
          this.setState({
              project: res.data
          });
          console.log("Article Detail res data: " + res.data);
      });
    }
  }

  // static getDerivedStateFromProps(props, state){
  //   const projectID = props.match.params.projectID;
  //   if(props.token !== undefined){
  //     props.getLiked(props.token, projectID)
  //   };
  //     // axios.get(projectDetailURL(projectID))
  //     // .then(res => {
  //     //     console.log("res: " + JSON.stringify(res.data))
  //     //         state.project= res.data
  //     //     console.log("Article Detail res data: " + res.data);
  //     // })
  // }

  render() {
    const projectID = this.state.project
    const {liked, like_counter, rating_counter} = this.props
    const { project, author_info, drawer_visible, modal_visible, key_id, feedback_t, disableB, showC } = this.state
    const { keyId} = this.props.match.params.projectID
    // let {like_counter} = this.props
    console.log(JSON.stringify(projectID))
    console.log("like_counter: ", JSON.stringify(like_counter))
    console.log("liked: ", JSON.stringify(liked))
    console.log("this.PROPS: "+ JSON.stringify(this.props))
    // console.log("this.STATE: "+ JSON.stringify(this.state) )
    return (
      <div>
        {/* <List >
          <IconText type="like-o" onClick={() => this.handleClickLike(like_counter)} text={like_counter } key={"like_counter"} />,
          <IconText type="star-o" text={rating_counter} key={"rating_counter"} />,
        </List> */}

        <Row>
        <div className="project-columns">
          {/* <Col span={10}> */}
          
            <div className="left-column">
              <nav>
                  <ul>
                      <li><a className={this.state.activeClass === "overview"  ? "current" : "hidden"} ref={node => (this.topRef = node)} name="#overview" href="#overview">Overview</a></li>
                      <li><a className={this.state.activeClass === "contributing" ? "current" : "hidden"} ref={node => (this.webRef = node)} name="#contributing" href="#contributing">Contributing</a></li>
                      <li><a className={this.state.activeClass === "credits" ? "current" : "hidden"} ref={node => (this.designRef = node)} name="credits" href="#credits">Credits</a></li>
                      <li><a className={this.state.activeClass === "feedback" ? "current" : "hidden"} ref={node => (this.photoRef = node)} name="#feedback" href="#feedback">Feedback</a></li>
                      <li><a className={this.state.activeClass === "comments" ? "current" : "hidden"} ref={node => (this.photoRef = node)} name="#comments" href="#comments">Comments</a></li>
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
                  <Avatar icon={<Icon type="user"/>} src={author_info.profile_avatar}/>
                  </div>
                  <div id="author">
                  <a style={{color:"black"}} href={`/profile-page/${project.author}`}>{project.author}</a>
                    <div id="timestamp">
                      <span>Published: {moment(project.timestamp).format("MMMM Do YYYY")}</span>
                    </div>
                  </div>
                </section>
                <div className="project-header"><h1>{project.title}</h1></div>
                <div id="project-details">
                  <span id="university">University: {author_info.university}</span>
                  <span id="category">Category: {project.category}</span>
                  <span id="views">
                    <Icon type="eye"/> 
                    :
                      {project.view_count}
                  </span>
                </div>
                <section id="overview"><h2>Overview</h2></section>
                <h1>Smooth Scrolling Sticky ScrollSpy Navigation</h1>
                <section id="introduction">
                  <h2>Introduction</h2>
                    <p>{project.content}</p>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <div className="project-image-container">
                        <img src={project.project_image}>
                        </img>
                      </div>
                    </div>
                </section>

                <section id="contributing"><h2>Contributing</h2></section>

                <section id="credits">
                  <h2>Credits</h2>
                    <div id="image" style={{display: "flex", alignItems: "center", paddingRight:"10px"}}>
                      <Avatar size={64} icon={<Icon type="user"/>} src={author_info.profile_avatar}/>
                      <div id="author-name">
                        <a style={{color:"black"}} href={`/profile-page/${project.author}`}>{author_info.name}</a>
                        <br/>
                        <span>{author_info.degree}</span>
                      </div>
                    </div>
                </section>

                <section id="feedback"><h2>Feedback Options</h2>
                  {project.project_feedback && (
                    <div className="project-feedback-options">
                        <ArticleFeedback dModal={modal_visible} type={project.project_feedback}/>
                        {/* <ul>
                          {project.project_feedback.map((el, i) => 
                              <li key={i}>
                                <span>
                                  <button onClick={() => this.handleFeedback(el)} key={el}>
                                    <Icon type={this.handleFeedbackType(el)}/>
                                      {el.toUpperCase()}
                                  </button>
                                </span>
                                <span style={{padding: "2px 5px"}}/>
                              </li>
                            )
                          }
                        </ul> */}
                      </div>
                    )
                  }
                </section>

                <section id="comments">
                <h2><a onClick={() => {this.handleShowComments(showC)}}>Comments: {project.comment_count}</a></h2>
                    {/* <Comments/> */}
                   <ArticleComment showComments={showC}/>
                </section>
            </div>
          {/* </Col> */}
          </div>
        </Row>

        {/* <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Info" key="1" >
            <ArticleDetail />
          </TabPane>
          <TabPane tab="Feedback" key="2">
            <ArticleFeedback />
          </TabPane>
          <TabPane tab="Rating" key="3">
            <ArticleRating />
          </TabPane>
          <TabPane tab="Comments" key="4">
            <ArticleComment/>
          </TabPane>
          <TabPane tab="Comments List" key="5">
            <Comments/>
          </TabPane>
        </Tabs> */}
        {drawer_visible ?
                        <div>
                            <DonationDrawer dDrawer={drawer_visible} id={key_id}/>
                        </div>
                    :null}
      {modal_visible ?
                        <div>
                            <Modal 
                              visible={modal_visible} 
                              onOk={()=>this.setState({modal_visible:false})} 
                              onCancel={()=>this.setState({modal_visible:false})}
                            >
                                <ArticleFeedback dModal={modal_visible} type={project.project_feedback}/>
                            </Modal>
                        </div>
                    :null}
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
    like_counter: state.project_like.like_counter,
    liked: state.project_like.liked,
    likedId: state.like.likedId,
    rating_counter: state.rating.ratingCount
  }
}

const mapDispatchToProps = dispatch => {
  console.log("AR")
  return {
    getLikeCounter: (projectID) => dispatch(fetchLikeCounter(projectID)),
    getLiked: (token, projectID, userID) => dispatch(getLiked(token, projectID, userID)),
    getRatingCounter: (token, projectID) => dispatch(fetchRating(token, projectID))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDetailMenu));