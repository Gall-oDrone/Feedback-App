import axios from "axios";
import React from 'react';
import Hoc from "../hoc/hoc";
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import { withRouter } from "react-router-dom";
import {getProfileNotificationList, putProfileNotificationList} from "../store/actions/profileNTFN"
import { Spin, Popover, Icon, Menu, Badge, List, message, Button, Col, Row} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { notificationListScrollerURL } from "../constants";
class ProfileHeaderMenu extends React.Component {
  state = { 
    visible: false,
    usersInfo: [],
    data: [],
    notifications: [],
    loading: false,
    hasMore: true,
    offset: 0,
    limit: 3,
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        this.props.getProfileNTFNList(this.props.token, this.props.username, this.state.limit, this.state.offset)
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      console.log("newProps.token !== this.props.token")
      this.props.getProfileNTFNList(newProps.token, newProps.username, this.state.limit, this.state.offset)
  } else {
      console.log("newProps.token !== this.props.token NOT")
      // this.props.getProfileNTFNList(this.props.token, this.props.username)
      // this.props.getProfilAccountInfo(this.props.token, this.props.username)
  }   
  }

  handleViewNTFN = async (NTFN) => {
    console.log(JSON.stringify(NTFN))
    Promise.resolve(this.props.putProfileNTFNList(this.props.token, this.props.username, NTFN)).then(() => {
      console.log("this.props.loadingPut: ", this.props.loadingPut )
      if(this.props.loadingPut == false){
        console.log("this.props.loadingPut: ", this.props.loadingPut )
        this.props.getProfileNTFNList(this.props.token, this.props.username, this.state.limit, this.state.offset)
        // this.props.getProfileNTFNList(this.props.token, this.props.username)
        // axios.get(`http://127.0.0.1:8000/notifications/list/${username}/`)
        // axios.get(`http://127.0.0.1:8000/notifications/list/${this.props.username}/?limit=${this.state.limit}&offset=${this.state.offset}`)
      }
    })
  }

  loadNotifications = () => {
    this.setState({ loading: true}, () => {
        const { offset, limit} = this.state;
        axios.get(notificationListScrollerURL(this.props.username, limit, offset))
        .then(res => {
            const newNotifications = res.data.notification;
            const hasMore = res.data.has_more;
            this.setState({
                hasMore,
                loading: false,
                notifications: [...this.state.notifications, ...newNotifications],
                offset: offset + limit
                
            });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            loading: false
          });
        });
    })
  };

  handleUnviewNTFN = async (unview, descrps, NTFNL) => {
    NTFNL.forEach(el => {descrps.push(el.description)})
      unview = NTFNL.filter(el => el.view == false)
  }
  

  render() {
    console.log("PHDM this.props",JSON.stringify(this.props))
    console.log("PHDM this.state",JSON.stringify(this.state))
    console.log("PHDM this.props.profileNTFN.notificationList",JSON.stringify(this.props.profileNTFN.notificationList))
    let { data, offset, limit } = this.state
    const descrps = [];
    let unview = [];
    const {logout, userId, notificationList} = this.props
    if ( this.props.profileNTFN.notificationList !== undefined){
      // this.handleUnviewNTFN(unview, descrps, this.props.profileNTFN.notificationList);
      console.log("this.props.profileNTFN.notificationList",JSON.stringify(this.props.profileNTFN.notificationList))
      this.props.profileNTFN.notificationList.notification.forEach(el => {descrps.push(el.description)})
      unview = this.props.profileNTFN.notificationList.notification.filter(el => el.view == false)
      // data = data.concat(descrps.slice(0,3))
      console.log("data at Render",JSON.stringify(data))
      
    }

    const text = () => {return(
      <div>
        <span>Notifications</span>
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
                  // pageStart={0}
                  loadMore={this.loadNotifications}
                  hasMore={this.state.hasMore}
                  loader={<Spin spinning={this.state.loading} delay={500} />}
                  useWindow={false}
                  // height={150}
                >
                  <List
                    size="small"
                    bordered
                    dataSource={NTFN}
                    renderItem={(item, index) =><List.Item key={index}>{item}</List.Item>}
                  >
                    {this.state.loading && this.state.hasMore && (
                      <div className="demo-loading-container">
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
                <Popover placement="bottomRight" trigger="click" onClick={()=>this.handleViewNTFN(this.props.profileNTFN.notificationList.notification)} title={text()} content={content( descrps )}>
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
        getProfileNTFNList: (token, username, limit, offset) => dispatch(getProfileNotificationList(token, username, limit, offset)),
        putProfileNTFNList: (token, username, data) => dispatch(putProfileNotificationList(token, username, data)),
      };
    };
    
    export default withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ProfileHeaderMenu)
    );