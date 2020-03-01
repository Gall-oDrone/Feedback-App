import React from 'react';
import Hoc from "../hoc/hoc";
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import { withRouter } from "react-router-dom";
import {getProfileNotificationList, putProfileNotificationList} from "../store/actions/profileNTFN"
import { Spin, Popover, Icon, Menu, Badge, List, message, Button, Col, Row} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
class ProfileHeaderMenu extends React.Component {
  state = { 
    visible: false,
    usersInfo: [],
    data: [],
    loading: false,
    hasMore: true,
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        this.props.getProfileNTFNList(this.props.token, this.props.username)
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      console.log("newProps.token !== this.props.token")
      this.props.getProfileNTFNList(newProps.token, newProps.username)
  } else {
      console.log("newProps.token !== this.props.token NOT")
      // this.props.getProfilAccountInfo(this.props.token, this.props.username)
  }   
  }

  handleViewNTFN = async (NTFN) => {
    console.log(JSON.stringify(NTFN))
    await this.props.putProfileNTFNList(this.props.token, this.props.username, NTFN)
    if(this.props.loadingPut == false){
      console.log("MR CORSO")
      console.log("MR CORSO")
      this.props.getProfileNTFNList(this.props.token, this.props.username)
    }
  }

  handleInfiniteOnLoad = (NTFN) => {
    // let { data } = this.state;
    // console.log("data at handleInfiniteOnLoad",JSON.stringify(data))
    // this.setState({
    //   loading: true,
    // });
    // console.log("WWWWW", data.length)
    if (NTFN.length > 3) {
      message.warning('Infinite List loaded all');
      // this.setState({
      //   hasMore: false,
      //   loading: false,
      // });
      // data = data.concat(NTFN.slice(data.length,NTFN.length))
      return;
    }
  };
  

  render() {
    console.log("PHDM this.props",JSON.stringify(this.props))
    console.log("PHDM this.state",JSON.stringify(this.state))
    let { data } = this.state
    const descrps = [];
    let unview = [];
    const {logout, userId, notificationList} = this.props
    if ( this.props.profileNTFN.notificationList !== undefined){
      this.props.profileNTFN.notificationList.forEach(el => {descrps.push(el.description)})
      unview = this.props.profileNTFN.notificationList.filter(el => el.view == false)
      // data = data.concat(descrps.slice(0,3))
      console.log("data at Render",JSON.stringify(data))
      
    }

    const text = () => {return(
      <div>
        <li>
        <span>Notifications</span>
        </li>
      </div>
    )};

      const content = (NTFN) => {
          return(
          <div className="parent">
            <Menu >
              <div className="list-container">
                <InfiniteScroll
                  dataLength={NTFN.length}
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad(NTFN)}
                  hasMore={!this.state.loading && this.state.hasMore}
                  useWindow={false}
                  height={150}
                >
                  <List
                    size="small"
                    bordered
                    dataSource={NTFN}
                    renderItem={(item, index) =><List.Item key={index}>{item}</List.Item>}
                  >
                    {this.state.loading && this.state.hasMore && (
                      <div className="demo-loading-container">
                        <Spin />
                      </div>
                    )}
                  </List>
                </InfiniteScroll>
              </div>
            </Menu>
          </div>
        )
      }
        return (
          this.props.profileNTFN.notificationList !== undefined ?
          <Hoc>
            <div className="demo">
                <Popover placement="bottomRight" trigger="click" onClick={()=>this.handleViewNTFN(this.props.profileNTFN.notificationList)} title={text()} content={content( descrps )}>
                  <Badge count={1} count={unview.length} >
                    <Icon type="notification" />
                  </Badge>
                </Popover>
            </div>
        </Hoc>
        : null
        )
    }
  }
  
    const mapStateToProps = state => {
      return {
        username: state.auth.username,
        token: state.auth.token,
        profileNTFN: state.profileNTFN,
        loadingGet: state.profileNTFN.loading,
        loadingPut: state.profileNTFN.loading2
      };
    };

    const mapDispatchToProps = dispatch => {
      return {
        logout: () => dispatch(actions.logout()),
        getProfileNTFNList: (token, username) => dispatch(getProfileNotificationList(token, username)),
        putProfileNTFNList: (token, username, data) => dispatch(putProfileNotificationList(token, username, data)),
      };
    };
    
    export default withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ProfileHeaderMenu)
    );