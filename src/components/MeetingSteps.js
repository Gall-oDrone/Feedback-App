import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Steps, Button, message, notification } from 'antd';
import CalendarComponent from './Calendar';
import CategoryComponent from './CategorySelector';
import {createMeeting} from "../store/actions/meetings"
import {getDetailMeetingList} from "../store/actions/meetings"

const { Step } = Steps;

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

const steps  = [
  {
    title: 'Schedule a meeting',
    content: <CalendarComponent date_to_appointment/>,
  },
  {
    title: 'Choose a discussion topic',
    content: <CategoryComponent category={"topic"}/>,
  },
  {
    title: 'Book',
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
      userAnswer: {
        date:null,
        topic:null
      }
      // order: [
      //   order0: date: {},
      //   order1: topic: {},
      //   order2: confirm:{}
      // ]
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
    return message.success('Processing complete!')
  }

  handleSubmit = (userAnswer) => {
    console.log("this.state.article: "+JSON.stringify(this.state.article))
    const meeting = {
      user: this.props.username,
      topic: userAnswer.topic,
      date: userAnswer.date,
      article: this.state.article.title,
      articleId: this.state.article.id,
      recipient: this.state.article.author
    };
    this.props.createMeeting(this.props.token, meeting)
    // if(res.status == 201){
    //   return message.success('Processing complete!')
    // }
};

  onStatus = (userAnswer) => {
    if(Object.values(userAnswer)[this.state.current] === null) {
      return "error"
    } else {
      return
    }
  }

  componentDidMount() {
    // console.log("this.props.match.params: " + JSON.stringify(this.props.match.params))
    // console.log("this.props.match.params.articleID: " + JSON.stringify(this.props.match.params.articleID))
    const articleID = this.props.match.params.articleID;
    //const articleID = 11
    axios.get(`http://127.0.0.1:8000/articles/${articleID}`)
        .then(res => {
            console.log("res: " + JSON.stringify(res.data))
            this.setState({
                article: res.data
            });
            console.log("Article Detail res data: " + res.data);
        });
}

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        // this.props.getASNTSDetail(newProps.token, this.props.match.params.id, this.props.match.params.userId);
        console.log("componentWillReceiveProps: " + JSON.stringify(this.props))
        this.props.getComment(newProps.token, newProps.match.params.articleID).then(res => {
          console.log("componentWillReceiveProps before assigning res to dataList: " + JSON.stringify(this.props))
          console.log(JSON.stringify(res))
          this.setState({
            comments: res.commentData,
            dataList: res.commentData
          });
          console.log("componentWillReceiveProps after : " + JSON.stringify(this.props))
        });
      }
    }
  }

  render() {
    const { current, userAnswer, steps2} = this.state;
    console.log("steps: "+JSON.stringify(steps))
    const { date } = this.props;
    
    const meetingPhases2 =(data, title) =>{
      if(title === "Schedule a meeting"){
        return <CalendarComponent date_to_appointment={data} />
      } else if (title === "Choose a discussion topic"){
        console.log(JSON.stringify(data))
        return <CategoryComponent category={data} />
      } else {
        console.log(JSON.stringify(data))
        return 'Last-content'
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
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => this.handleSubmit(this.state.userAnswer)}>
              Submit
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
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
    getMeeting: (token, articleID, userID) => dispatch(getDetailMeetingList(token, articleID, userID))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingSteps));