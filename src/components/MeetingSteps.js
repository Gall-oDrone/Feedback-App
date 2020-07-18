import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Steps, Button, message, notification } from 'antd';
import CalendarComponent from './Calendar';
import CategoryComponent from './CategorySelector';
import {createMeeting} from "../store/actions/meetings";
import {getDetailMeetingList} from "../store/actions/meetings";
import { lcroomCreateMeetingURL } from "../constants";
const { Step } = Steps;

const steps  = [
  {
    title: 'Select a date',
    content: <CalendarComponent date_to_appointment/>,
  },
  {
    title: 'Choose a discussion topic',
    content: <CategoryComponent category={"topic"}/>,
  },
  {
    title: 'Confirmation',
    content: 'Last-content',
  },
];

class MeetingSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      current: 0,
      schedule: false,
      confirmation: false,
      userAnswer: {
        date:null,
        topic:null
      }
    };
  }

  next(userAnswer) {
      if(Object.values(userAnswer)[this.state.current] === null) {
        return message.warning(`The field "${Object.keys(userAnswer)[this.state.current]}" is missing`)
      } else {
        const current = this.state.current + 1;
        this.setState({ current });
      }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onTabChange = (key, type) => {
    console.log("onTabChange:", key, type);
    this.setState({ [type]: key });
  };

  onSubmit = (userAnswer) => {
    return message.success('Meeting Request Sent!')
  }

  handleSubmit = (userAnswer) => {
    const { username, token, match: {parans: {projectID}} } = this.props
    const meeting_details = {
      user: username,
      topic: userAnswer.topic,
      date: userAnswer.date,
      projectId: projectID
    };
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .post(lcroomCreateMeetingURL, meeting_details)
        .then(res => {
          if(res.status == 201){
            this.setState({confirmation:true})
          }
        })
        .catch(err => {
            console.error(err);
        })
  };

  onStatus = (userAnswer) => {
    if(Object.values(userAnswer)[this.state.current] === null) {
      return "error"
    } else {
      return
    }
  }

//   componentDidMount() {
//     // console.log("this.props.match.params: " + JSON.stringify(this.props.match.params))
//     const projectID = this.props.match.params.projectID;
//     axios.get(articleDetailURL(projectID))
//         .then(res => {
//             console.log("res: " + JSON.stringify(res.data))
//             this.setState({
//                 article: res.data
//             });
//             console.log("Article Detail res data: " + res.data);
//         });
// }

// componentDidUpdate(prevProps, prevState) {
//       if (this.props.token !== undefined && this.props.token !== null) {
//         console.log("componentWillReceiveProps: " + JSON.stringify(this.props))
//         this.props.getComment(this.props.token, this.props.match.params.projectID).then(res => {
//           console.log(JSON.stringify(res))
//           this.setState({
//             comments: res.commentData,
//             dataList: res.commentData
//           });
//         });
//       }
//   }

  render() {
    const { current, userAnswer, confirmation} = this.state;
    console.log("steps: "+JSON.stringify(steps))
    
    const meetingPhases2 =(data, title) =>{
      if(title === "Select a date"){
        return <CalendarComponent date_to_appointment={data} />
      } else if (title === "Choose a discussion topic"){
        console.log(JSON.stringify(data))
        return <CategoryComponent category={data} />
      } else {
        console.log(JSON.stringify(data))
        return 'Confirmation'
      }
    }
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <br/>
        <div className="steps-content">{meetingPhases2(userAnswer, steps[current].title)}</div>
        <br/>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next(this.state.userAnswer)}>
              Next
            </Button>
          )}
          {current && (
            <Button type="primary" onClick={this.handleSubmit(this.state.userAnswer)}>
              Submit
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
          {confirmation && (
            message.success('Meeting Request Sent!')
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("this.sate at mapStateToProps: "+JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    // article: state.article.article,
    loading: state.meetings.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMeeting: (token, meeting) => dispatch(createMeeting(token, meeting)),
    getMeeting: (token, projectID, userID) => dispatch(getDetailMeetingList(token, projectID, userID))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingSteps));