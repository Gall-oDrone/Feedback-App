import React from 'react';
import Hoc from "../hoc/hoc";
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import { Link, withRouter } from "react-router-dom";
import {getProfileAccountDetail} from "../store/actions/profileAccountInfo"
import { Avatar, Popover, Icon, Menu, Dropdown, Button, Col, Row} from 'antd';

class CreateHeaderMenu extends React.Component {
  
  render() {
    const menu = () => {return(
        <Menu >
          <Menu.Item key="3" style= {{float: 'left'}}>
            <div className="navbar-item-in">
                <Link to="/articles/" style={{color: "black"}}>
                  <Icon style={{margin:0}} type="edit" />
                  <span className="caption">ARTICLES</span>
                </Link> 
            </div>
          </Menu.Item>
          <Menu.Item key="4" style= {{float: 'left'}}>
            <div className="navbar-item-in">
                <Link to="/projects/" style={{color: "black"}}>
                  <Icon style={{margin:0}} type="rocket" />
                  <span className="caption">PROJECTS</span>
                </Link> 
            </div>
          </Menu.Item>
          <Menu.Item key="5" style= {{float: 'left'}}>
            <div className="navbar-item-in">
                <Link to="/inquiries/" style={{color: "black"}}>
                    <Icon style={{margin:0}} type="solution" />
                    <span className="caption">INQUIRIES</span>
                </Link>
            </div>
            </Menu.Item>
          <Menu.Item key="6" style= {{float: 'left'}}>
            <div className="navbar-item-in">
                  <Link to="/incentives/" style={{color: "black"}}>
                    <Icon style={{margin:0}} type="shop" />
                    <span className="caption">SHOP</span>
                  </Link>
            </div>
          </Menu.Item>
          <Menu.Item key="7" style= {{float: 'left'}}>
            <div className="navbar-item-in">
                  <Link to="/sessions/" style={{color: "black"}}>
                    <Icon style={{margin:0}} type="team" />
                    <span className="caption">MEET AND TALK</span>
                  </Link>
            </div>
          </Menu.Item>
          <Menu.Item key="8" style= {{float: 'left'}}>
            <div className="navbar-item-in">
                <Link to="/survey/" style={{color: "black"}}>
                  <Icon style={{margin:0}} type="reconciliation" />
                  <span className="caption">SURVEY</span>
                </Link>
            </div>
          </Menu.Item>
          <Menu.Item key="9" style= {{float: 'left'}}>
            <div className="navbar-item-in">
                <Link to="/workshops/" style={{color: "black"}}>
                  <Icon style={{margin:0}} type="schedule" />
                  <span className="caption">WORKSHOPS</span>
                </Link>
            </div>
          </Menu.Item>
          <Menu.Item key="10" style= {{float: 'left'}}>
            <div className="navbar-item-in">
                <Link to="/collaborations/" style={{color: "black"}}>
                  <Icon style={{margin:0}} type="deployment-unit" />
                  <span className="caption">COLLABORATIONS</span>
                </Link>
            </div>
          </Menu.Item>
        </Menu>
    )}
        return (
          <Hoc>
            <div className="demo">
              <Popover placement="bottomRight" trigger="hover" content={menu()}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <span>DISCOVER</span>
                  </a>
              </Popover>
            </div>
        </Hoc>
        )
    }
  }
  
    const mapStateToProps = state => {
      return {
        username: state.auth.username,
        token: state.auth.token,
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
      )(CreateHeaderMenu)
    );