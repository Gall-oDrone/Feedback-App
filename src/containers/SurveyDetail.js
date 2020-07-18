import React from "react";
import { connect } from "react-redux";
import { Card, Skeleton, message } from "antd";
import Questions from "./SurveyQuestions";
import Choices from "../components/Choices";
import { getSurveySDetail } from "../store/actions/survey";
import { createGradedSurvey } from "../store/actions/gradedSurvey";
import Hoc from "../hoc/hoc";

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px"
};

class AssignmentDetail extends React.Component {
  state = {
    usersAnswers: {}
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      const articleID = this.props.arId;
      this.props.getSurveySDetail1(this.props.token, articleID);
    }
  }

  componentDidUpdate(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        const articleID = this.props.arId;
        this.props.getSurveySDetail1(newProps.token, articleID);
      }
    }
  }

  async handleSubmit() {
    message.success("Submitting your assignment!");
    const { usersAnswers } = this.state;
    const asnt = {
      username: this.props.username,
      asntId: this.props.currentSurvey.id,
      respondent_answers: usersAnswers
    };
    this.props.createGradedSurvey(
      this.props.token,
      asnt
    )
  }

  onChange = (e, qId) => {
    console.log("radio checked", e.target.value);
    const { usersAnswers } = this.state;
    usersAnswers[qId] = e.target.value;
    this.setState({ usersAnswers });
  };

  render() {
    const { currentSurvey } = this.props;
    console.log("this.props: ", JSON.stringify(this.props))
    const { title } = currentSurvey;
    const { usersAnswers } = this.state;
    return (
      <Hoc>
        {Object.keys(currentSurvey).length > 0 ? (
          <Hoc>
            {this.props.loading ? (
              <Skeleton active />
            ) : (
              <Card title={title}>
                <Questions
                submit={() => this.handleSubmit()}
                  questions={currentSurvey.survey_questions.map(q => {
                    return (
                      <Card
                        style={cardStyle}
                        type="inner"
                        key={q.id}
                        title={`${q.order}. ${q.question}`}
                      >
                        <Choices
                          questionId={q.order}
                          choices={q.choices}
                          change={this.onChange}
                          usersAnswers={usersAnswers}
                        />
                      </Card>
                    );
                  })}
                />
              </Card>
            )}
          </Hoc>
        ) : null}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  console.log("mapStateToProps: ", JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    currentSurvey: state.survey.currentSurvey,
    loading: state.survey.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSurveySDetail1: (token, id) => dispatch(getSurveySDetail(token, id)),
    createGradedSurvey: (token, asnt) => dispatch(createGradedSurvey(token, asnt)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentDetail);