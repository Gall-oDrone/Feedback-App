import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Table, Divider, Tag, DatePicker, Tabs, Result, Card } from 'antd';
import { getUserCollaborations } from "../store/actions/collaborations";
import ProfileMRSent from "./ProfileCRS"
import ProfileMRR from "./ProfileCRR"
import ProfileMRB from "./ProfileCRB"

class ProfileCollaborations extends React.PureComponent {

  state = {
    article: ['sent', 'received', 'team' ],
    noTitleKey: 'sent',
  }
  tabListContent= {
    sent: <div><ProfileMRSent sent={this.props.collabs.collabs.sent}/></div>,
    received: <div><ProfileMRR received={this.props.collabs.collabs.received}  /></div>,
    booked: <div><ProfileMRB /></div>,
  }

  onTabChange = (key, type) => {
    console.log("onTabChange:", key, type);
    this.setState({ [type]: key });
  };

  componentDidMount() {
    if (this.props.token && this.props.username) {
        this.props.getCollab(this.props.username, this.props.token)
    } else {
      console.log("there was an error while Fetching")
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('LOADING: ' + "MIERDA", prevProps.collabs.collabs, this.props.collabs.collabs)
    if (prevProps.collabs.collabs.length !== this.props.collabs.collabs.length) {
      this.tabListContent= {
        sent: <div><ProfileMRSent sent={this.props.collabs.collabs.sent}/></div>,
        received: <div><ProfileMRR received={this.props.collabs.collabs.received}  /></div>,
        booked: <div><ProfileMRB /></div>,
      }
    }
  }


  handleTabList = (item) => {
    let array = []
    if (item && item.length > 0) {
      // the array is defined and has at least one element
      item.forEach(val => {
        let tab = {
          key: `${val}`, tab: `${val.toUpperCase()}`
        }
        array.push(tab)
      }
      )
      return array
    } else {
      return
    }
  }

  render() {
    console.log('this.PROPS & this.state: ' + JSON.stringify(this.props), this.state)
    const { username, token, collabs, loading } = this.props;
    
    return (
      <div>
        {loading === false ? (
          <div>
              <Card
              style={{ width: '100%' }}
              tabList={this.handleTabList(this.state.article)}
              activeTabKey={this.state.noTitleKey}
              onTabChange={key => {
                this.onTabChange(key, 'noTitleKey');
              }}
            >
              {this.tabListContent[(this.state.noTitleKey)]}
            </Card>
          </div>    
          ) : null
        }
      </div>
    )
  };
}

const mapStateToProps = state => {
  console.log("mapStateToProps: " + JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    collabs: state.collaboration,
    loading: state.collaboration.loading
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getCollab: (username, token) => dispatch(getUserCollaborations(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCollaborations);