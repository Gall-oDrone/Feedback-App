import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import "../assets/home.css";
import "../assets/navBar.css";

class CustomLayout extends React.Component {
  state = {
    collapsed: true,
    current: '1',
    alertClosed: false
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

  componentDidUpdate(){
    if(this.props.is_active !== undefined &&
    this.props.is_active !== null){
      console.log("Is active", this.props.is_active)
    }
  }

  render() {
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
                      <li>
                        <div className="item">
                          <a className="link">
                            <div className="thumbnail">
                              <span><img src="https://ph-files.imgix.net/d13cede3-f250-477a-840a-5ddb36eeb515.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop"></img></span>
                            </div>
                            <div className="list_content">
                              <h3>New Mailbrew</h3>
                              <p>Here's an all-new Mailbrew, re-made from the ground up.</p>
                              <div className="metaShadow"></div>
                            </div>
                          </a>
                            <div className="meta_data">
                              <div className="nested_large_actions">
                                <a>
                                  <span>
                                    <span><svg></svg>61</span>
                                  </span>
                                </a>
                              </div>
                            </div>
                            <div className="nested_large_actions_info">
                              <a>
                                <span>
                                  Productivity
                                </span>
                              </a>
                            </div>
                        </div>
                      </li>
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
              <span className="fst_header_font"><span>Upcoming Products</span></span>
            </div>
            <div className="sidebar_fst_content">
              <ul>
                <li>
                  <a>
                    <div>
                      <div className="fst_font">
                        Booommm
                      </div>
                      <div className="snd_font">
                        Senior and Executive job offers for developers
                      </div>
                      <div className="trd_font">
                        <svg></svg>FOLLOW
                      </div>
                    </div>
                    <div className="fth_font">
                      <img src="https://ph-files.imgix.net/6a9301fb-0120-426f-8ebf-6303950245bd?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=40&h=40&fit=crop&bm=normal&bf=max&bh=20&bw=20"></img>
                    </div>
                  </a>
                </li>
              </ul>
              <a className="sider_button">
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
