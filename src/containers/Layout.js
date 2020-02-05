import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const { Header, Content, Footer, Sider } = Layout;


class CustomLayout extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

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
              <Menu.Item key="2">
                <Icon type="solution" />
                <span>Testers</span>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : (
            null
          )}
          <Layout >
        <Header style={{ height: "50px"}}>
          <div className="logo" />
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
              <Link to="/articles/">Rewards</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/articles/">Reviews</Link>
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
    is_teacher: state.auth.is_teacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
