import React from "react";
import { connect } from "react-redux";
import { Card, Skeleton, message } from "antd";
import Questions from "./Questions";
import Choices from "../components/Choices";
import { getASNTSDetail } from "../store/actions/assignments";
import { createGradedASNT } from "../store/actions/gradedAssignments";
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
      this.props.getASNTSDetail1(this.props.token, this.props.match.params.id, this.props.match.params.userId);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getASNTSDetail1(newProps.token, this.props.match.params.id, this.props.match.params.userId);
      }
    }
  }

  handleSubmit() {
    message.success("Submitting your assignment!");
    const { usersAnswers } = this.state;
    const asnt = {
      username: this.props.username,
      asntId: this.props.currentAssignment.id,
      answers: usersAnswers
    };
    this.props.createGradedASNT(
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
    const { currentAssignment } = this.props;
    console.log(currentAssignment);
    const { title } = currentAssignment;
    const { usersAnswers } = this.state;
    return (
      <Hoc>
        {Object.keys(currentAssignment).length > 0 ? (
          <Hoc>
            {this.props.loading ? (
              <Skeleton active />
            ) : (
              <Card title={title}>
                <Questions
                submit={this.handleSubmit()}
                  questions={currentAssignment.questions.map(q => {
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
  return {
    token: state.auth.token,
    username: state.auth.username,
    currentAssignment: state.assignments.currentAssignment,
    loading: state.assignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getASNTSDetail1: (token, id, userId) => dispatch(getASNTSDetail(token, id, userId)),
    createGradedASNT: (token, asnt) => dispatch(createGradedASNT(token, asnt)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentDetail);