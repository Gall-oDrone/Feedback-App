import React from "react";
import { Layout, Menu, Breadcrumb, Button, Icon, Avatar, Input, Dropdown, Row, Col, Tooltip } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import ProfileHeaderMenu from "../components/ProfileHeaderMenu"
import NotificationHeaderMenu from "../components/NotificationHeaderMenu"
import NavMenu from "../components/navBar";
import NavMenu2 from "../components/navBarWrapper";
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import {getProfileAccountDetail} from "../store/actions/profileAccountInfo"
import CreateHeaderMenu from "../components/CreateHeaderMenu";
import "../assets/main.css";
import "../assets/navBar.css";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;

const text = (avatar) => (<span>User Account <div style={{left: '50%'}}><Avatar src={avatar} /></div></span>);
const content = (username) => (
  <div>
    <p>Content</p>
    <p>{username}</p>
  </div>
);

class CustomLayout extends React.Component {
  state = {
    collapsed: true,
    current: '1'
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

  render() {
    console.log(" Layour this.props: ")
    console.log(this.props)

    let searchForm = this.state.showForm ? (
      <form className="menu__search-form" method="POST">
          <input className="menu__search-input" placeholder="Type and hit enter" />
      </form>
  ) : '';

    return (
      <Layout className="parent layout" >
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
                        <Icon style={{margin:0}} type="project" />
                        <span className="caption">ARTICLES</span>
                      </Link> 
                  </div>
                </Menu.Item>
                <Menu.Item key="3" style= {{float: 'left'}}>
                  <div className="navbar-item-in">
                      <Link to="/projects/">
                        <Icon style={{margin:0}} type="project" />
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
                {/* <Menu.Item key="7" style= {{float: 'left'}}>
                  <div className="navbar-item-in">
                      <Link to="/group-sessions/">
                        <Icon type="team" />
                        <span className="caption">GROUPS</span>
                      </Link>
                  </div>
                </Menu.Item> */}
                <Menu.Item key="8" style= {{float: 'right'}}>
                    <ProfileHeaderMenu auth={this.props.isAuthenticated} logout={this.props.logout} userId={this.props.userId}/>
                </Menu.Item>
                <Menu.Item key="9" style= {{float: 'right'}}>
                    <CreateHeaderMenu/>
                </Menu.Item>
                <Menu.Item key="" style= {{float: 'right'}}>
                  <NavMenu/>
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
          <div style={{ background: "#fff", padding: 24, minHeight: 480 }}>
            {this.props.children}
          </div>

        </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2019 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
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
