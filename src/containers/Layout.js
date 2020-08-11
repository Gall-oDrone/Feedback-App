import React from "react";
import { Layout, Menu, Breadcrumb, Button, Icon, Avatar, Alert, Input, Dropdown, Row, Col, Tooltip } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import ProfileHeaderMenu from "../components/ProfileHeaderMenu"
import NotificationHeaderMenu from "../components/NotificationHeaderMenu"
import NavMenu from "../components/navBar";
import NavMenu2 from "../components/navBar2";
import NavMenu3 from "../components/navBarWrapper";
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import {getProfileAccountDetail} from "../store/actions/profileAccountInfo"
import CreateHeaderMenu from "../components/CreateHeaderMenu";
import Landing from "./LandingPage";
import "../assets/main.css";
import "../assets/navBar.css";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;

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
      // <Link to={`/profile/${this.props.userId}/meetings`}>Meetings</Link>
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
    // this.props.logout()
    console.log("Layout this.props: ", this.props)
    if(this.props.username === ""){
      this.props.logout()
    }
  //   let searchForm = this.state.showForm ? (
  //     <form className="menu__search-form" method="POST">
  //         <input className="menu__search-input" placeholder="Type and hit enter" />
  //     </form>
  // ) : '';

    return (
     
      <Layout className="parent layout" >
        {this.props.is_active === false &&
          this.state.alertClosed === false ? 
            <Header style={{ height: "30px"}}>
              <Alert 
                style={{ textAlign:"center", height:"inherit"}}
                closable
                onClose={this.handleCloseAlert}
                message={
                  <p>Hi! Please confirm your email address by clicking the link in the email we sent you.
                    <a className="resend-email" href={"/confirmation/new/"}> Resend me the link, please</a>
                  </p>
                } 
                type="info" />
            </Header>
            : null 
        }
               <Header style={{ height: "50px", padding: "0 15px"}}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            style={{ lineHeight: "50px" }}
          >
                {/* <Menu.Item key="3" style= {{height: 40}}>
                <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                </Menu.Item> */}
                
                <Menu.Item key="1" style= {{float: 'left'}}>
                  <div className="navbar-item-in">
                    <Link to="/">
                        <Icon style={{margin:0}} type="home" />
                        <span className="caption">HOME</span>
                    </Link>
                  </div>
                  </Menu.Item>
                  <Menu.Item key="2" style= {{float: 'left'}}>
                  <div className="navbar-item-in">
                      <Link to="/articles/">
                        <Icon style={{margin:0}} type="edit" />
                        <span className="caption">ARTICLES</span>
                      </Link> 
                  </div>
                </Menu.Item>
                <Menu.Item key="3" style= {{float: 'left'}}>
                  <div className="navbar-item-in">
                      <Link to="/projects/">
                        <Icon style={{margin:0}} type="rocket" />
                        <span className="caption">PROJECTS</span>
                      </Link> 
                  </div>
                </Menu.Item>
                <Menu.Item key="4" style= {{float: 'left'}}>
                  <div className="navbar-item-in">
                      <Link to="/inquiries/">
                          <Icon style={{margin:0}} type="solution" />
                          <span className="caption">INQUIRIES</span>
                      </Link>
                  </div>
                  </Menu.Item>
                <Menu.Item key="5" style= {{float: 'left'}}>
                  <div className="navbar-item-in">
                        <Link to="/incentives/">
                          <Icon style={{margin:0}} type="shop" />
                          <span className="caption">SHOP</span>
                        </Link>
                  </div>
                </Menu.Item>
                <Menu.Item key="6" style= {{float: 'left'}}>
                  <div className="navbar-item-in">
                        <Link to="/sessions/">
                          <Icon style={{margin:0}} type="team" />
                          <span className="caption">MEET AND TALK</span>
                        </Link>
                  </div>
                </Menu.Item>
                <Menu.Item key="7" style= {{float: 'left'}}>
                  <div className="navbar-item-in">
                      <Link to="/survey/">
                        <Icon style={{margin:0}} type="reconciliation" />
                        <span className="caption">SURVEY</span>
                      </Link>
                  </div>
                </Menu.Item>
                <Menu.Item key="8" style= {{float: 'left'}}>
                  <div className="navbar-item-in">
                      <Link to="/workshops/">
                        <Icon style={{margin:0}} type="schedule" />
                        <span className="caption">WORKSHOPS</span>
                      </Link>
                  </div>
                </Menu.Item>
                <Menu.Item key="8" style= {{float: 'right', paddingLeft: "15px", paddingRight: "15px"}}>
                    <ProfileHeaderMenu auth={this.props.isAuthenticated} logout={this.props.logout} userId={this.props.userId}/>
                </Menu.Item>
                <Menu.Item key="9" style= {{float: 'right', paddingLeft: "15px", paddingRight: "15px"}}>
                    <CreateHeaderMenu/>
                </Menu.Item>
                <Menu.Item key="10" style= {{float: 'right'}}>
                    <NavMenu/>
                </Menu.Item>
                <Menu.Item key="11" style= {{float: 'right'}}>
                    <NavMenu2/>
                </Menu.Item>
                
          </Menu> 
        </Header>

          <Layout className="children layout">
          {this.props.isAuthenticated ? (
            <Sider style={{paddingTop: "50.1px"}}trigger={null} collapsible collapsed={true} >
              
              <Menu theme="dark" mode="inline">
              <Menu.Item key="1">
                  <Link to={`/profile/${this.props.userId}/account/user/info/`}>
                    <Icon type="user"/>
                    <span> My Profile Page</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={`profile/${this.props.userId}/account/articles/list/`}>
                    <Icon type="project" />
                    <span>My articles</span>
                  </Link>
                </Menu.Item>
                
                <Menu.Item key="3">
                  <Link to={`/profile/${this.props.userId}/meetings`}>
                    <Icon type="book" />
                    <span> Meetings </span>
                  </Link>
                </Menu.Item>
              
                <Menu.Item key="5">
                  <Link to={`/profile/${this.props.userId}/menu`}>
                    <Icon type="setting"/>
                    <span> userAccount </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to={`/rm`}>
                    <Icon type="team"/>
                    <span> meetingRoom Demo</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to={`/chat/`}>
                    <Icon type="message"/>
                    <span> Chat</span>
                  </Link>
                </Menu.Item>
                {/* <Menu.Item key="8">
                  <Link to={`/video-chat/`}>
                    <Icon type="video-camera"/>
                    <span> Video-Chat</span>
                  </Link>
                </Menu.Item> */}
              </Menu>
            </Sider>
          ):(null
          )}
      {this.props.location.pathname === "/" ?
      <Landing/>
      :
        <Content style={{ padding: "0 50px", display:"inline"}}>        
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item>
              <Link to="/articles/">Home</Link>
            </Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>
              <Link to="/peers/">Peers</Link>
            </Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>
              <Link to="/inquiries/">Inquiries</Link>
            </Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>
              <Link to="/peers3/">Peers3</Link>
            </Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>
              <Link to="/articles/">Articles and Proyects</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/incentives/">Gift Card Shop</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={"/create/survey/"}>Create Survey</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={"/survey/"}>Survey Questions</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={"/create-inquiry/"}>Post an Inquiry</Link>
            </Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>
                <Link to={"/sessions/"}>Meet and Talk</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={"/wallet/"}>User Wallet</Link>
            </Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>
                <Link to={"/order-summary/"}>Order Summary</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={"/checkout/"}>Checkout</Link>
            </Breadcrumb.Item> */}
            {/* {this.props.token !== null ? (
              <Breadcrumb.Item>
                <Link to={`/profile/${this.props.userId}`}>Profile</Link>
              </Breadcrumb.Item>
            ) : null} */}
            {/* {this.props.token !== null && this.props.is_student ? (
              <Breadcrumb.Item>
                <Link to={"/assignments/"}>Assignments</Link>
              </Breadcrumb.Item>
            ) : null}
            {this.props.token !== null && this.props.is_teacher ? (
              <Breadcrumb.Item>
                <Link to={"/create"}>Create</Link>
              </Breadcrumb.Item>
            ) : null} */}
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 580 }}>
            {this.props.children}
          </div>

        </Content>
  }
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Footer
        </Footer>
      </Layout>
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
