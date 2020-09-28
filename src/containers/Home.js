import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import axios from 'axios';
import "../assets/home.css";
import "../assets/navBar.css";
import { homeListURL } from "../constants";
import ProfileContainer from "../components/profile-slider";
import ProfileSlider from "../components/profile-slider";

class CustomLayout extends React.Component {
  state = {
    collapsed: true,
    current: '1',
    alertClosed: false,
    articles: null,
    workshops: null,
    collabs: null,
    inquiries  : null,
    projects: null,
    sessions: null,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClick = (e) => {
    console.log('click ', e);
    if(e.key === "3"){
      console.log('e.key ', e.key);
    }
  };

  handleCloseAlert = () => {
    this.setState({alertClosed: true})
  }

  componentDidMount(){
    axios.defaults.headers = {
      "content-type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
      axios.get(homeListURL)
        .then(res => {
          if (res.status === 200) {
            console.log('res.Data: ', res.data);  
            this.setState({
              articles: res.data.articles,
              workshops: res.data.workshops,
              collabs: res.data.collabs,
              inquiries: res.data.inquiries,
              projects: res.data.projects,
              sessions: res.data.sessions
            })
          }
        })
        .catch(error => console.error(error))
    
  }

  componentDidUpdate(){
    if(this.props.is_active !== undefined &&
    this.props.is_active !== null){
      console.log("Is active", this.props.is_active)
    }
  }

  render() {
    const { articles, workshops, collabs, inquiries, projects, sessions } = this.state
    return (
      
      <div>
        <header>
          {sessions && <ProfileSlider props={sessions}/>}
        </header>
        <div className="main_container">
            <main className="main_1">
              <div>
                <div>
                  <div></div>
                  <div className="nested_large_con">
                    <div className="nested_large_header">
                      <span>Today</span>
                    </div>     
                    <div id="articles" className="nested_large_content">
                      <div>
                        <ul>
                          {articles && articles.map(el => {
                            return(
                          <li>  
                            <div className="item">
                              <a href={`articles/detailmenu/${el.id}`} className="link">
                                <div className="thumbnail">
                                  <span><img src={el.thumbnail}></img></span>
                                </div>
                                <div className="list_content">
                                  <h3>{el.title}</h3>
                                  <p>{el.overview}</p>
                                  <div className="metaShadow"></div>
                                </div>
                                <div className="voteButtonWrap_4c515">
                                  <button className="button_30e5c smallSize_5216f simpleVariant_8a863 newVoteButton_dac5c" data-test="vote-button">
                                    <span className="font_9d927 xSmall_1a46e semiBold_e201b buttonContainer_b6eb3 lineHeight_042f1 underline_57d3c uppercase_a49b4">
                                      <div className="icon_f5f81 blackOrange_56e54"></div>
                                      <span className="font_9d927 small_231df semiBold_e201b lineHeight_042f1 underline_57d3c">1680</span>
                                    </span>
                                  </button>
                                </div>
                              </a>
                                <div className="meta_data">
                                  <div className="nested_large_actions">
                                    <a className="action_button">
                                      <span className="font_1">
                                        <span className="font_2"><svg></svg></span>
                                        61
                                      </span>
                                    </a>
                                  </div>
                                  <div className="nested_large_actions_info">
                                    <a className="info_topic">
                                      <span className="info_font_1">
                                        {el.categories.map(el => {
                                          return(
                                                el
                                          )})
                                        }
                                      </span>
                                    </a>
                                  </div>
                                </div>
                            </div>
                          </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="nested_large_header">
                      <span>Projects</span>
                    </div>
                    <div id="projects" className="nested_large_content">
                      <div>
                        <ul>
                          {projects && projects.map(el => {
                            return(
                          <li>
                            <div className="item">
                              <a href={`projects/detailmenu/${el.id}`} className="link">
                                {el.media.image ?
                                  <div className="thumbnail">
                                    <span><img src={el.media.image}></img></span>
                                  </div>
                                  :
                                  <div className="thumbnail">
                                    <span><video src={el.media.video}></video></span>
                                  </div>
                                }
                                <div className="list_content">
                                  <h3>{el.title}</h3>
                                  <p>{el.content}</p>
                                  <div className="metaShadow"></div>
                                </div>
                              </a>
                                <div className="meta_data">
                                  <div className="nested_large_actions">
                                    <a className="action_button">
                                      <span className="font_1">
                                        <span className="font_2"><svg></svg></span>
                                        61
                                      </span>
                                    </a>
                                  </div>
                                  <div className="nested_large_actions_info">
                                    <a className="info_topic">
                                      <span className="info_font_1">
                                        {el.category.map(el => {
                                          return(
                                                <span>{el}</span>
                                          )})
                                        }
                                      </span>
                                    </a>
                                  </div>
                                </div>
                            </div>
                          </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <aside className="sidebar_home">
              <div id="workshops" className="sidebar_fst_con">
                <div className="sidebar_fst_header">
                  <span className="fst_header_font"><span>On Demand Workshops</span></span>
                </div>
                <div className="sidebar_fst_content">
                  <ul>
                    {workshops && workshops.map(el => {
                      return(
                          <li>
                            <a href={`workshops/${el.id}`}>
                              <div>
                                <div className="fst_font">
                                  {el.title}
                                </div>
                                <div className="snd_font">
                                  {el.categories.map(el => {return(el)})}
                                </div>
                                <div className="trd_font">
                                  <svg></svg>FOLLOW
                                </div>
                              </div>
                              <div className="fth_font">
                                <img className="aside_img" src={el.image}></img>
                              </div>
                            </a>
                          </li>
                      )
                    })}
                  </ul>
                  <a href="workshops/" className="sider_button">
                    <span className="view_all">
                      View All
                    </span>
                  </a>
                </div>
              </div>
              <div id="inquiries" className="sidebar_fst_con">
                <div className="sidebar_fst_header">
                  <span className="fst_header_font"><span>Top Inquiries</span></span>
                </div>
                <div className="sidebar_snd_content">
                  <ul>
                    {inquiries && inquiries.map(el => {
                      return(
                          <li className="sidebar_snd_item">
                            <div className="nested_con">
                              <span>
                                {el.title}
                              </span>
                              <div className="nested_con_actions">
                                <span className="nested_font_1"><svg className="nested_icon_1"></svg>30</span>
                                <a href={`inquiry/${el.id}`} className="nested_font_2">View</a>
                              </div>
                            </div>
                            <div className="userImage">
                              <span className="lazyload-wrapper">
                                <img className="inquiryUserImg" src={el.profile_avatar}>
                                </img>
                              </span>
                            </div>
                          </li>
                      )
                    })}
                  </ul>
                  <a href="inquiries/" className="sider_button">
                    <span className="view_all">
                      View More
                    </span>
                  </a>
                </div>
              </div>
            
            </aside>
        </div> 
      </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    username: state.auth.username,
    token: state.auth.token,
    is_active: state.auth.is_active_user,
    is_student: state.auth.is_student,
    is_teacher: state.auth.is_teacher,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);




{/* <div className="item" data-test="post-item-261966">
<a className="link" href="/posts/synthesia-2" target="">
  <div className="thumbnail" data-test="post-thumbnail">
    <span className="lazyload-wrapper">
      <img src="https://ph-files.imgix.net/5cde46ee-290b-4743-b2a8-574664158117.gif?auto=format&amp;auto=compress&amp;codec=mozjpeg&amp;cs=strip&amp;w=80&amp;h=80&amp;fit=crop" srcset="https://ph-files.imgix.net/5cde46ee-290b-4743-b2a8-574664158117.gif?auto=format&amp;auto=compress&amp;codec=mozjpeg&amp;cs=strip&amp;w=80&amp;h=80&amp;fit=crop&amp;dpr=2 2x, https://ph-files.imgix.net/5cde46ee-290b-4743-b2a8-574664158117.gif?auto=format&amp;auto=compress&amp;codec=mozjpeg&amp;cs=strip&amp;w=80&amp;h=80&amp;fit=crop&amp;dpr=3 3x" alt="Synthesia" />
    </span>
  </div>
  <div className="list_content">
    <h3 className="font_9d927 medium_51d18 semiBold_e201b title_9ddaf lineHeight_042f1 underline_57d3c">Synthesia</h3>
    <p className="font_9d927 grey_bbe43 small_231df normal_d2e66 tagline_619b7 lineHeight_042f1 underline_57d3c">Generate professional-looking AI videos from text in minutes</p>
    <div className="metaShadow"></div>
  </div>
</a>
<div className="voteButtonWrap_4c515">
<button className="button_30e5c smallSize_5216f simpleVariant_8a863 newVoteButton_dac5c" data-test="vote-button">
  <span className="font_9d927 xSmall_1a46e semiBold_e201b buttonContainer_b6eb3 lineHeight_042f1 underline_57d3c uppercase_a49b4">
    <div className="icon_f5f81 blackOrange_56e54"></div>
    <span className="font_9d927 small_231df semiBold_e201b lineHeight_042f1 underline_57d3c">1680</span>
  </span>
</button>
</div>
<div className="meta_data">
<div className="nested_large_actions">
<a className="action_button" href="/posts/synthesia-2">
<span class="font_1">
  <span>
    <svg width="12" height="11" viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.012 7.832C1.21 7.052.727 6.045.727 4.946c0-2.48 2.463-4.491 5.5-4.491 3.038 0 5.5 2.01 5.5 4.491 0 2.48-2.462 4.492-5.5 4.492a6.562 6.562 0 0 1-2.13-.35c-1.07.62-3.166 1.44-3.166 1.44s.7-1.685 1.081-2.696z" fill="#FFF" fill-rule="evenodd"></path>
    </svg>
  </span>
</span>
</a>
<div className="nested_large_actions_info">
<a className="info_topic" rel="noopener" target="_blank" href="/r/p/261966">
  <span class="info_font_1">
    <span>
      <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.982 1.042h2.232L3.898 5.358l.745.744 4.316-4.316v2.233h1.04V.52A.508.508 0 0 0 9.48 0H5.982v1.042zM9 9H1V1h2.978V0H.51A.51.51 0 0 0 0 .51v8.98c0 .282.228.51.51.51h8.98a.51.51 0 0 0 .51-.51V6.026H9V9z" fill="#FFF" fill-rule="evenodd">
        </path>
      </svg>
    </span>
  </span>
</a>
</div>
</div>
<div className="nested_large_actions_info">
<a className="info_topic" href="/topics/productivity">
<span className="info_font_1">Productivity</span>
</a>
</div>
</div>
</div> */}
