import React from "react";
import { Layout, Menu, Icon, Tabs } from 'antd';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ProfileInfo from "../components/ProfileAccountInfo"

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const { SubMenu } = Menu;

class ProfileMMenu extends React.Component {
    render() {
        console.log(" Layour this.props: ")
        console.log(this.props)
        return (
            <Content style={{ padding: '0px' }}>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                {/* <Tabs defaultActiveKey={"3"} tabPosition="left" style={{ marginRight: "90rem", height: 620, width:900}}>
                    <TabPane key={"1"} tab={
                            <span>
                            <Icon type="user" />
                                Account
                            </span>
                        }
                    >
                        <ProfileInfo/>
                    </TabPane>
                    <TabPane key={"2"} tab={
                            <span>
                            <Icon type="setting" />
                                Configuration
                            </span>
                        }
                    >
                    </TabPane>
                    <TabPane key={"3"} tab={
                            <span>
                            <Icon type="notification" />
                                Notifications
                            </span>
                        }
                    >
                    </TabPane>
                    <TabPane key={"4"} tab={
                            <span>
                            <Link to="/incentives/">
                                <Icon type="shop" />
                                    Buy Incentives
                            </Link>
                            </span>
                        }
                    >
                    </TabPane>
                    <TabPane key={"5"} tab={
                            <span>
                            <Icon type="gift" />
                                Incentive List
                            </span>
                        }
                    >
                    </TabPane>
                    <TabPane key={"6"} tab={
                            <span>
                            <Icon type="trophy" />
                                My Rewards
                            </span>
                        }
                    >
                    </TabPane>
                    </Tabs>    
               */}
                    <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%' }}
                    >
                        <Menu.Item key="sub1">
                            <span>
                            <Link to={`/profile/${this.props.userId}/account/info/`}>
                                <Icon type="user" />
                                    Profile
                            </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub2">
                            <span>
                            <Link to={`/profile/${this.props.userId}/account/user/info/`}>
                                <Icon type="setting" />
                                    Account Info
                            </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub12">
                            <span>
                            <Link to={`/profile/${this.props.userId}/account/user/resume/`}>
                                <Icon type="setting" />
                                    Resume
                            </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub3">
                            <span>
                            <Link to={`/profile/${this.props.userId}/account/survey/list/`}>
                                <Icon type="snippets" />
                                    Survey
                            </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub4">
                            <span>
                            <Link to="/incentives/">
                                <Icon type="shop" />
                                    Buy Incentives
                            </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub5">
                            <span>
                            <Link to={`/profile/${this.props.userId}/account/incentives/list/`}>
                                <Icon type="gift" />
                                    Incentive List
                            </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub6">
                            <span>
                            <Icon type="trophy" />
                                My Rewards
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub7">
                            <span>
                            <Link to={`/profile/${this.props.userId}/account/articles/list/`}>
                                <Icon type="book" />
                                My Articles
                            </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub8">
                            <span>
                            <Link to={`/profile/${this.props.userId}/account/inquiries/list/`}>
                                <Icon type="book" />
                                My Inquiries
                            </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub9">
                            <span>
                            <Link to={`/profile/${this.props.userId}/account/sessions/list/`}>
                                <Icon type="book" />
                                My Sessions
                            </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub10">
                            <span>
                            <Link to={"/address/"}>
                                <Icon type="book" />
                                My Address
                            </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="sub11">
                            <span>
                            <Link to={"/payments/"}>
                                <Icon type="account-book" />
                                My Payments
                            </Link>
                            </span>
                        </Menu.Item>
                    </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
                </Layout>
            </Content>
        )
    }
}

const mapStateToProps = state => {
    return {
      userId: state.auth.userId,
      token: state.auth.token,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
    //   logout: () => dispatch(actions.logout())
    };
  };
  
  export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProfileMMenu)
  );