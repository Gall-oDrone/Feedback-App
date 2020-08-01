import React from 'react';
import Hoc from "../hoc/hoc";
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import { Link, withRouter } from "react-router-dom";
import {getProfileAccountDetail} from "../store/actions/profileAccountInfo"
import { Avatar, Popover, Icon, Menu, Dropdown, Button, Col, Row} from 'antd';

class ProfileHeaderMenu extends React.Component {
  state = { 
    visible: false,
    usersInfo: [] 
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        this.props.getProfilAccountInfo(this.props.token, this.props.userId)
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.token !== undefined && newProps.token !== null) {
      if(newProps.token !== this.props.token){
        this.props.getProfilAccountInfo(newProps.token, newProps.userId)
        console.log("newProps.token !== this.props.token")
      }
  } else {
      console.log("newProps.token !== this.props.token NOT")
      // this.props.getProfilAccountInfo(this.props.token, this.props.username)
  }   
  }

  handleLogOut = (e) => {
    if(this.props.token !== null){
      this.props.logout()
      // window.location.reload(false);
    } else {
      this.props.logout()
    }
    this.props.history.push("/login");
  }
  

  render() {
    console.log("PHDM this.props",JSON.stringify(this.props))
    console.log("PHDM this.state",JSON.stringify(this.state))
    const {logout, userId} = this.props
    const text = (username) => {return(
      <div>
        <Row align="middle">
          <Col span={12} style={{paddingTop:5}}>
              <span>Hi {username}!</span>
          </Col>
        </Row>
      </div>
      )};
    const content = (logout, uId) => {return(
      <div>
        <Menu className="profile-menu">
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href={`/profile/${uId}/menu/`}>
              My Profile
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href={`/profile/${uId}/menu/`}>
              My Account
            </a>
          </Menu.Item>
          {this.props.auth === true ? (
              <Menu.Item key="2" onClick={this.handleLogOut}>
                Logout
              </Menu.Item>
            ) : (
                <Menu.Item key="2">
                  <Link to="/login">Login</Link>
                </Menu.Item>
          )}
            {/* <a target="_blank" rel="noopener noreferrer" onClick={logout}>
              Log out
            </a> */}
        </Menu>
      </div>
    )}

        return (
          this.props.username !== undefined &&
          this.props.username !== null &&
          this.props.profileAI.ProfileAccount !== undefined ?
            <Hoc>
              <div className="demo" style={{justifyContent:"center"}}>
                  <Popover placement="bottomRight" title={text(this.props.username)} content={content(logout, userId)}>
                    <Avatar src={this.props.profileAI.ProfileAccount.profile_avatar} style={{backgroundColor:"#b0b0b0"}}>
                      <span>
                        {this.props.username[0].toUpperCase()}
                      </span>
                    </Avatar>
                  </Popover>
              </div>
            </Hoc>
          : 
            <Link to="/login">Login</Link>
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
      )(ProfileHeaderMenu)
    );