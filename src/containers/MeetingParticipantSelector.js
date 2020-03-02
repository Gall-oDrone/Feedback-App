import React from "react";
import { connect } from "react-redux";
import Hoc from "../hoc/hoc";
import { Menu, Dropdown, Form, message, Icon, Button, Divider } from 'antd';
import SurveyQuestionForm from "./SurveyQuestionForm2"
import MeetingReview from "../components/MeetingReview"
import {postMeetingReview} from "../store/actions/reviewMeetings";
import {createSurvey} from "../store/actions/survey"
import InfiniteScroll from 'react-infinite-scroll-component';

const FormItem = Form.Item;

const success = () => {
  message.success('Thanks for your review');
};

const error = () => {
  message.error('Error while submitting review');
};

class MeetingReviewTester extends React.Component {
    state = {
        formCount: 1,
        showReview: false,
        userIndex: null,
        participant: null,
    };

  remove = () => {
    const {formCount} = this.state;
        this.setState({
            formCount: formCount - 1
        })
  };

  add = () => {
    const {formCount} = this.state;
    if(formCount < 6){
        this.setState({
            formCount: formCount + 1
        })
    };
  }

  onChangeTester = value => {
    console.log('Currency changed', value);
    this.setState({ participant: value[0] })
  }
  handleChange = (index, pa) => {
    if ( pa[index] !== this.props.username){
      this.setState({
        showReview: true,
        userIndex: index
    })
    }
  }
    handleSubmit = async e => {
        e.preventDefault();
        await this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("validateFields",JSON.stringify(values))
                console.log("validateFields II",JSON.stringify(Object.keys(values)))
                console.log("validateFields III",JSON.stringify(values.user))
                const peer = values.user
                const postObj = {
                  user: this.props.username,
                  room: "1",
                  participant: values.user,
                  attended: this.props.pa,
                  attendance: values[peer].attendance,
                  recommendation: values[peer].recommendation,
                  issues: values[peer].issues,
                  issue_type: values[peer].issue,
                  worthiness: values[peer].worthiness,
                  meeting_rate: values[peer].rate,
                  comment: values[peer].comment
                };
                console.log("Calling... 0");
                if (!err) {
                  this.props.postReview(this.props.token, this.props.username, postObj)
                  if(this.props.err1 !== null){
                    error()
          
                  } else {
                    // this.props.history.push('/');
                    success();
                  }
                }
            }
        });
    };
  render() {
    console.log("this.props",JSON.stringify(this.props))
    console.log("this.state",JSON.stringify(this.state))
    const { form, pa } = this.props;
    const { showReview, userIndex, participant } = this.state
    const reviews = [];
    for (let i=0; i < pa.length; i+= 1) {
      reviews.push(
        <Hoc key= {i}>
          <MeetingReview id={i} {...this.props} />
          <Divider />
        </Hoc>
        );
    }
    const menu2 = () => {
        return(
                <Menu>
                    {pa.map((item, index) => 
                    item !== this.props.username 
                    ?
                    <Menu.Item key={item}>
                        <a target="_blank" rel="noopener noreferrer" onChange={this.onChangeTester} onClick={() => this.handleChange(index, pa)}>
                        {item}
                        </a>
                    </Menu.Item>
                    :
                    null
                    )}
                </Menu>
        )    
    }
        return (
          <div>
            <Form onSubmit={this.handleSubmit}>
            {userIndex != null 
              ? <Button type="primary" htmlType="submit">
                  Submit {`${pa[userIndex]}`} Review
                </Button>
              :null}
            <h1>Select a user</h1>
                <Dropdown overlay={menu2}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {/* <Cascader onChange={this.onChangeTester} placeholder="Please select" /> */}
                    {userIndex != null ? pa[userIndex]:"USER"} <Icon type="down" />
                    </a>
                </Dropdown>
                {showReview === true ? (
                    reviews[userIndex]
                ): (null) }
                
                <br/>
            </Form>
          </div>
        );
    }
}

const WrappedSurveyCreate = Form.create()(MeetingReviewTester);

const mapStateToProps = state => {
    console.log("mapStateToProps",JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    loading: state.assignments.loading,
    err1: state.reviewMeeting.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postReview: (token, userID, data) => dispatch(postMeetingReview(token, userID, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedSurveyCreate);