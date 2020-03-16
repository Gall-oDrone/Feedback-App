import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Skeleton, message, Rate, List, Divider, Statistic, Row, Col, Button, Icon} from "antd";
import Questions from "./Questions";
import Choices from "../components/Choices";
// import { getASNTSDetail } from "../store/actions/assignments";
// import { createGradedASNT } from "../store/actions/gradedAssignments";
import { fetchRating } from "../store/actions/rating";
import { createRating } from "../store/actions/rating";
import Hoc from "../hoc/hoc";

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px"
};

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class ArticleRating extends React.Component {
  state = {
    usersAnswers: {},
    value: 3,
    userRatings: [{}],
    userRating: {},
    ratingCount: {},
    ratingAvg: {},
    rated: false
  };

  componentDidMount() {
    console.log(JSON.stringify(this.props))
    this.props.fetchRating("this.props.token", this.props.match.params.articleID)
    if (this.props.token !== undefined && this.props.token !== null) {
      // this.props.getASNTSDetail(this.props.token, this.props.match.params.id, this.props.match.params.userId);
      console.log("ComponentDidMount after 1: " + JSON.stringify(this.props.fetchRating(this.props.token, this.props.match.params.articleID)))
      this.props.fetchRating(this.props.token, this.props.match.params.articleID)
      console.log("ComponentDidMount after 2: " + JSON.stringify(fetchRating(this.props.token, "15")))
      console.log("ComponentDidMount after 3: " + JSON.stringify(this.props))
    }
  }

  componentWillReceiveProps(newProps) {
    this.props.fetchRating("newProps.token", newProps.match.params.articleID)
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        // this.props.getASNTSDetail(newProps.token, this.props.match.params.id, this.props.match.params.userId);
        this.props.fetchRating(newProps.token, newProps.match.params.articleID).then(res => {
          this.setState({
            ratingCount: res.rating_count,
            ratingAvg: res.avg_rating
          });
        });
      }
    }
  }

  handleSubmit(val) {
    const articleID = this.props.match.params.articleID;
    const username = this.props.username
    const data = {
      username: username,
      articleID: articleID,
      rate: val,
    };
    console.log("DATA BEFORE POSTING", JSON.stringify(data));
    this.props.createRating(
      this.props.token,
      data
    )
    message.success("Thanks for rating!");
    this.setState({ rated:true });
  }

  handleChange = val => {
    if (this.props.token !== undefined || this.props.username !== null) {
      console.log(JSON.stringify(this.state.rated))
      if (this.state.rated === false) {
        this.setState({ value:val });
        this.handleSubmit(val);
        console.log("Corso2")
      } else {
        message.warning("You already rated this article!");
      }
    } else {
      message.error("You have to be signed in to rate!");
    }
  };

  onChange = (e, qId) => {
    console.log("radio checked", e.target.value);
    const { usersAnswers } = this.state;
    usersAnswers[qId] = e.target.value;
    this.setState({ usersAnswers });
  };

  render() {
    console.log("this.PROPS", JSON.stringify(this.props));
    console.log("this.STATE", JSON.stringify(this.state));
    // const { currentAssignment } = this.props;
    // console.log(currentAssignment);
    // const { title } = currentAssignment;
    const { value } = this.state;
    const ratingAvg = this.props.avgRating;
    const ratingCount = this.props.ratingCount;
    return (
      <Hoc>
        <Hoc>
          {this.props.loading ? (
            <Skeleton active />
          ) : (
              < Card //title={title}> 
              style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Row >
                  <Col span={12}>
                    <Statistic title="Average" value={ratingAvg} />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Total" value={ratingCount} />
                  </Col>
                </Row>
                <Row >
                  <Col >
                    {this.props.username !== null && this.props.token !== undefined ? (
                      <span>
                        <Rate tooltips={desc} onChange={this.handleChange} value={value} />
                        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                      </span>
                    ):(<div>Signed Up to Rate</div>)}
                  </Col>
                </Row>
              </Card>
            )}
        </Hoc>
      </Hoc >
    );
  }
}

const mapStateToProps = state => {
  console.log(JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    avgRating: state.rating.avgRating,
    ratingCount: state.rating.ratingCount,
    // currentAssignment: state.assignments.currentAssignment,
    // loading: state.assignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRating: (token, articleID) => dispatch(fetchRating(token, articleID)),
    createRating: (token, username, articleId, rate) => dispatch(createRating(token, username, articleId, rate)),
    // createGradedASNT: (token, asnt) => dispatch(createGradedASNT(token, asnt)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleRating));
