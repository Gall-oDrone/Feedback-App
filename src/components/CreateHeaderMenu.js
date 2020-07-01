import React from 'react';
import Hoc from "../hoc/hoc";
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import { withRouter } from "react-router-dom";
import {getProfileAccountDetail} from "../store/actions/profileAccountInfo"
import { Avatar, Popover, Icon, Menu, Dropdown, Button, Col, Row} from 'antd';

class CreateHeaderMenu extends React.Component {
  
  render() {
    const menu = () => {return(
      <div>
        <Menu >
          <Menu.Item key="CreateHeader 0">
            <a target="_blank" rel="noopener noreferrer" href={`/create-article/`}>
              Post a project/article
            </a>
          </Menu.Item>
          <Menu.Item key="CreateHeader 1">
            <a target="_blank" rel="noopener noreferrer" href={`/create/survey/`}>
              Post a Survey
            </a>
          </Menu.Item>
          <Menu.Item key="CreateHeader 1">
            <a target="_blank" rel="noopener noreferrer" href={`/create-inquiry/`}>
              Post an inquiry
            </a>
          </Menu.Item>
          <Menu.Item key="CreateHeader 1">
            <a target="_blank" rel="noopener noreferrer" href={`/create-session/`}>
              Post a session
            </a>
          </Menu.Item>
        </Menu>
      </div>
    )}
        return (
          <Hoc>
            <div className="demo">
              <Popover placement="bottomRight" trigger="click" content={menu()}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Icon type="plus" />
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