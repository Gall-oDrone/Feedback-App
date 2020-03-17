import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Button, Drawer, List, Avatar, Divider, Col, Row, Popover } from 'antd';
import {getProfileMeetingInfo} from "../store/actions/profileUserInfo";

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

class UserProfileInfo extends React.Component {
  state = { 
    visible: false,
    usersInfo: [] 
  };
  
  componentDidMount() {
    console.log("1) componentDidMount: ")
    console.log("this.props: " + JSON.stringify(this.props))
    console.log("this.state: " + JSON.stringify(this.state))
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null && this.props.getInfo(this.props.username, this.props.token) != undefined){
        console.log("this.props.getMeetings: " + JSON.stringify(this.props.getBM(this.props.username, this.props.token)))
          this.setState({
            usersInfo: [this.props.pInfo.ProfileMRI]
          });
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null && this.props.getInfo(newProps.username, newProps.token) !== undefined) {
        this.props.getInfo(newProps.username, newProps.token).then(res => {
          this.setState({
            dataList: res.BookedMeetingList
          });
        });
      } else {
        console.log("this.props.getMeetings was undefined")
      }
    }
  }

  showDrawer = (user, token) => {
    this.props.getInfo(user, token)
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    console.log("this.state: " + JSON.stringify(this.state))
    console.log("this.props.keys: " + JSON.stringify(this.props.keys))
    console.log("this.props.username: " + JSON.stringify(this.props.username))
    const {ProfileMRI} = this.props.pInfo
    return (
        <div>
          {this.props.username !== null ? (
            <div>
                     <Button onClick={() => this.showDrawer(this.props.username, this.props.token)} key={`a-${this.props.keys}`} block={true} >
                     {this.props.username}
                   </Button>
                   {ProfileMRI !== undefined ? (
                   <Drawer
                     width={640}
                     placement="right"
                     closable={false}
                     onClose={this.onClose}
                     visible={this.state.visible}
                   >
                     <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
                     <Row>
                       <Col span={12}>
                         <DescriptionItem title="Name" content={`${ProfileMRI.name}`} />
                       </Col>
                     </Row>
                     <Row>
                       <Col span={12}>
                         <DescriptionItem title="Country" content={`${ProfileMRI.country}`} />
                       </Col>
                     </Row>
                     <Row>
                       <Col span={12}>
                         <DescriptionItem title="Website" content="-" />
                       </Col>
                     </Row>
                     <Row>
                       <Col span={24}>
                         <DescriptionItem
                           title="Message"
                           content="Make things as simple as possible but no simpler."
                         />
                       </Col>
                     </Row>
                     <Divider />
                     <p style={pStyle}>Company</p>
                     <Row>
                       <Col span={12}>
                         <DescriptionItem title="Position" content="Programmer" />
                       </Col>
                       <Col span={12}>
                         <DescriptionItem title="Responsibilities" content="Coding" />
                       </Col>
                     </Row>
                     <Row>
                       <Col span={12}>
                         <DescriptionItem title="Department" content="XTech" />
                       </Col>
                       <Col span={12}>
                         <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
                       </Col>
                     </Row>
                     <Row>
                       <Col span={24}>
                         <DescriptionItem
                           title="Skills"
                           content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                         />
                       </Col>
                     </Row>
                     <Divider />
                     <p style={pStyle}>Academy</p>
                     <Row>
                       <Col span={12}>
                         <DescriptionItem title="University" content={`${ProfileMRI.university}`} />
                       </Col>
                     </Row>
                     <Row>
                       <Col span={24}>
                         <DescriptionItem
                           title="Github"
                           content={
                             <a href="http://github.com/ant-design/ant-design/">
                               github.com/ant-design/ant-design/
                             </a>
                           }
                         />
                       </Col>
                     </Row>
                   </Drawer>
                 ):(null)}
                 </div>
          ):(null)}
       
      </div>
    );
  }
}
  
  const mapStateToProps = state => {
    console.log("mapStateToProps: "+JSON.stringify(state))
    /*console.log("1) ASNT List mapStateToProps containers state 1: "+ JSON.stringify(state.assignments.assignments))
    console.log("2) ASNT List mapStateToProps containers state 2: "+ JSON.stringify(state.assignments))
    console.log("2) ASNT List mapStateToProps containers state 3: "+ JSON.stringify(state))*/
    return {
      token: state.auth.token,
      pInfo: state.profileInfo,
      // username: state.auth.username,
      // loading: state.meetings.loading
    };
  };

  const mapDispatchToProps = dispatch => {
    console.log("mapDispatchToProps: ")
    return {
      getInfo: (username, token) => dispatch(getProfileMeetingInfo(username, token)),
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  ) (UserProfileInfo);