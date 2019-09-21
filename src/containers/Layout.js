import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout className="layout">
            <Sider
                trigger = {null} collapsible collapsed= {this.state.collapsed}
                style={{
                    overflow: 'auto',
                    height: '80vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                        <Link to="/user">
                            <Icon type="user" />
                            <span className="nav-text">User</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/feedback">
                            <Icon type="video-camera" />
                            <span className="nav-text">Feeedback</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/survey">
                            <Icon type="video-camera" />
                            <span className="nav-text">Survey</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="video-camera" />
                        <span className="nav-text">Directory</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="video-camera" />
                        <span className="nav-text">My Subscribers</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Icon type="upload" />
                        <span className="nav-text">Feedbacks</span>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Icon type="upload" />
                        <span className="nav-text">Forum</span>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Icon type="bar-chart" />
                        <span className="nav-text">My Start-up</span>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <Icon type="bar-chart" />
                        <span className="nav-text">Deals and offers</span>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Icon type="bar-chart" />
                        <span className="nav-text">Settings</span>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Icon type="bar-chart" />
                        <span className="nav-text">Tags, Retos, StoryLines </span>
                    </Menu.Item>
                    <Menu.Item key="12">
                        <Icon type="bar-chart" />
                        <span className="nav-text">Help</span>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="nested_layout"
                style={{ marginLeft: 200 }}>
    
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        {
                            this.props.isAuthenticated ?

                                <Menu.Item key="2" onClick={this.props.logout}>
                                    Logout
                                </Menu.Item>

                                :

                                <Menu.Item key="2">
                                    <Link to="/login">Login</Link>
                                </Menu.Item>
                        }

                        <Menu.Item key="1">
                            <Link to="/">Posts</Link>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Link to="/">Deals and Discounts</Link>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Link to="/">Network</Link>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Link to="/">Post a project</Link>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Link to="/">Find advisors</Link>
                        </Menu.Item>

                    </Menu>
                </Header>
                        <div>
                         <Header style={{ background: '#fff', padding: 5 }}>
                         <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                         />
                         </Header>
                        </div>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
                        {/* <Breadcrumb.Item><Link to="/comments">Comentarios</Link></Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));