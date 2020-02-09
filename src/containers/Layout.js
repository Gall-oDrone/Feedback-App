import React from "react";
import { Layout, Menu, Breadcrumb, Popover, Icon, Avatar, Badge, Dropdown } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import {ProfileHeaderMenu} from "../components/ProfileHeaderMenu"
import {getProfileAccountDetail} from "../store/actions/profileAccountInfo"

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

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.userId !== null){
        this.props.getProfilAccountInfo(this.props.token, this.props.userId)
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      console.log("newProps.token !== this.props.token")
      this.props.getProfilAccountInfo(newProps.token, newProps.userId)
  } else {
      console.log("newProps.token !== this.props.token NOT")
      // this.props.getProfilAccountInfo(this.props.token, this.props.userId)
  }
      
  }

  render() {
    console.log(" Layour this.props: ")
    console.log(this.props)
    return (
      <Layout className="layout" >
        {this.props.isAuthenticated ? (
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="project" />
                <span>My articles</span>
              </Menu.Item>
              <Menu.Item key="2" >
                <Icon type="solution" />
                <span>Testers</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={`/profile/${this.props.userId}/meetings`}>
                  <Icon type="contacts"/>
                  <span> Meetings </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to={`/userProfile`}>
                  <Icon type="eye"/>
                  <span> userInfoDrawer </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to={`/profile/${this.props.userId}/menu`}>
                  <Icon type="user"/>
                  <span> userAccount </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to={`/rm`}>
                  <Icon type="user"/>
                  <span> userAccount </span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : (
            null
          )}
          <Layout >
        <Header style={{ height: "50px", padding: "0 15px"}}>
          {/* <div className="logo" /> */}
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "50px" }}
          >
            {this.props.isAuthenticated ? (
            <Menu.Item key="0">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Menu.Item>
            ) : (
              null
            )}
            {this.props.isAuthenticated ? (
              <Menu.Item key="2" onClick={this.props.logout}>
                Logout
              </Menu.Item>
            ) : (
                <Menu.Item key="2">
                  <Link to="/login">Login</Link>
                </Menu.Item>
              )}
                <Menu.Item key="3" onClick={this.props.logout} style= {{float: 'right'}}>
                  <Icon type="message" />
                </Menu.Item>
                <Menu.Item key="4" onClick={this.props.logout} style= {{float: 'right'}}>
                  <Badge count={1} count={5} >
                    <Icon type="notification" />
                  </Badge>
                </Menu.Item>
               {this.props.isAuthenticated && this.props.profileAI.ProfileAccount != undefined ? (
                <Menu.Item key="5" onClick={"Corso"} style= {{float: 'right'}}>
                    <Popover title={text(this.props.profileAI.ProfileAccount.profile_avatar)} content={content(this.props.userId)}>
                      <Icon type="user" />
                    </Popover>
                </Menu.Item>
               ) : (null)}

              {/* <Menu.Item key="3" onClick={this.props.logout} style= {{float: 'right'}}>
                <Icon type="message" />
              </Menu.Item>
              <Menu.Item key="4" onClick={this.props.logout} style= {{float: 'right'}}>
                <Badge count={1} count={5} >
                  <Icon type="notification" />
                </Badge>
              </Menu.Item>

              <Menu.Item key="5" onClick={"Corso"} style= {{float: 'right'}}>
                  <Popover title={text(this.props.profileAI.UserAccountInfo.profile_avatar)} content={content(this.props.userId)}>
                    <Icon type="user" />
                  </Popover>
              </Menu.Item> */}
          </Menu>
          
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/articles/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/peers/">Peers</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/peers2/">Peers2</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/articles/">Rewards</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/articles/">Reviews</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={"/create/survey/"}>Create Survey</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={"/calendar/"}>Cale</Link>
            </Breadcrumb.Item>
            {this.props.token !== null ? (
              <Breadcrumb.Item>
                <Link to={`/profile/${this.props.userId}`}>Profile</Link>
              </Breadcrumb.Item>
            ) : null}
            {this.props.token !== null && this.props.is_student ? (
              <Breadcrumb.Item>
                <Link to={"/assignments/"}>Assignments</Link>
              </Breadcrumb.Item>
            ) : null}
            {this.props.token !== null && this.props.is_teacher ? (
              <Breadcrumb.Item>
                <Link to={"/create"}>Create</Link>
              </Breadcrumb.Item>
            ) : null}
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>

        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
        </Layout>
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
    profileAI: state.profileAccountInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    getProfilAccountInfo: (token, userID) => dispatch(getProfileAccountDetail(token, userID)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
