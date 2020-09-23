import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import axios from 'axios';
import "../assets/home.css";
import "../assets/navBar.css";
import { homeListURL } from "../constants";

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
    const { articles, workshops, collabs, inquiries, projects } = this.state
    return (
     <div className="main_container">
         <main className="main_1">
          <div>
            <div>
              <div></div>
              <div className="nested_large_con">
                <div className="nested_large_header">
                  <span>Today</span>
                </div>
                <div className="nested_large_content">
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
              </div>
            </div>
          </div>
        </main>
        <aside className="sidebar_home">
          <div className="sidebar_fst_con">
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
        </aside>
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
