import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Select, Popover, Checkbox, Upload, message, Icon, Button, Col, Row} from 'antd';

const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const buttonWidth = 70;

const ProfileHeaderMenu = (username) => {
        return (
        <div className="demo">
            <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
            <Popover placement="bottomRight" title={text} content={content} trigger="click">
            </Popover>
            </div>
        </div>)
    }

export default ProfileHeaderMenu

// const mapStateToProps = state => {
//     console.log("mapStateToProps: "+JSON.stringify(state))
//     return {
//       token: state.auth.token,
//       username: state.auth.username,
//       userPAD: state.profile
//     };
//   };
  
//   const mapDispatchToProps = dispatch => {
//     console.log("mapDispatchToProps: ")
//     return {
//       getPAD: (token, articleID, userID) => dispatch(getProfileArticleDetail(token, articleID, userID)),
//       putPAD: (token, articleID, username, data) => dispatch(putProfileArticleDetail(token, articleID, username, data)),
//     };
//   };
  
//   export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(ProfileHeaderMenu);