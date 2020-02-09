import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Skeleton, Col, Row, List } from 'antd';
import * as actions from "../store/actions/assignmentsChoices";
import Hoc from "../hoc/hoc";
import _default from "antd/lib/notification";

let choices_array = [];
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

class AssignmentChoices extends React.PureComponent {

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getASNTSChoices(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getASNTSChoices(newProps.token);
      }
    }
  }

  renderItem(item) {
    choices_array.push(item.assignment_choices)
    // choices_array.forEach(item.assignment_choices, choice => {
    //   console.log("1) renderItem(item) Choices: " + choice)
    // });
    console.log("0) choices_array: " + JSON.stringify(choices_array))
    console.log("0) choices_array LAST: " + JSON.stringify(choices_array[choices_array.length-1]))
    console.log("0) renderItem(item) Item: " + JSON.stringify(item))
    console.log("1) renderItem(item) Choices: " + item.assignment_choices)
    console.log("1) renderItem(item) Choices [0]: " + item.assignment_choices[0])
    console.log("1) renderItem(this.props.assignmentChoices) : " + JSON.stringify(this.props.assignmentChoices))
    console.log("1) renderItem(this.props.assignmentChoices.assignment_choices) : " + JSON.stringify(this.props.assignmentChoices.assignment_choices))
    //console.log("1) renderItem(this.props.assignmentChoices.assignment_choices.length) : " + JSON.stringify(this.props.assignmentChoices.assignment_choices).length)
    console.log("1) renderItem(this.props.assignmentChoices[0]) : " + JSON.stringify(this.props.assignmentChoices[0]))
    console.log("1) renderItem(this.props.assignmentChoices) LENGTH: " + (this.props.assignmentChoices.length))
    for (var i = 0, keys = Object.keys(this.props.assignmentChoices), ii = keys.length; i < ii; i++) {
      console.log("Printing key T.P.AC: ", keys + '|' + ii);
    }
    for (var i = 0, keys = Object.entries(item.assignment_choices), ii = keys.length; i < ii; i++) {
      console.log("Printing key entries: ", keys + '|' + item.assignment_choices);
    }
    for (var i = 0, keys = Object.keys(item.assignment_choices), ii = keys.length; i < ii; i++) {
      console.log("Printing key from map: ", keys + '|' + item.assignment_choices);
    }
    for (var i = 0, keys = choices_array, ii = keys.length; i < ii; i++) {
      console.log("Printing array: ", keys[i] + '|');
    }
    return (
        <Link to="/create/survey/">
          {item.assignment_choices}
        </Link>
    );
  }

  render() {
    return (
      <Hoc>
        {this.props.loading ? (
          <Skeleton active />
        ) : (
            <div>
                  <Card title="Create a Feedback request" text-align={"center"} bordered={true} hoverable={true}>
                    <Card.Grid style={gridStyle}>
                        <Link to="/create/liveChat/">Live Chat</Link>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Link to="/create/chat/">Chat</Link>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Link to="/create/phoneCall/">Phone Call</Link>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Link to="/create/email/">Email</Link>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Link to="/create/survey/">Survey</Link>
                    </Card.Grid>
                  </Card>
            </div>

          )}
      </Hoc>
    );
  }

}

const mapStateToProps = state => {
  console.log("2) ASNT Choices containers: ")
  console.log("3) ASNT Choices containers state.choices 1: "+ JSON.stringify(state.choices))
  console.log("4) ASNT Choices containers state.choices 2: "+ JSON.stringify(state))
  console.log("5) ASNT Choices containers state.choices 3: "+ JSON.stringify(state.assignmentsChoices.choices))
  //console.log("4) ASNT Choices containers state.choices.loading: " + state.assignments.loading)
  console.log("6) ASNT Choices containers state.auth.token: " + state.auth.token)
  return {
    token: state.auth.token,
    assignmentChoices: state.assignmentsChoices.choices,
    loading: state.assignmentsChoices.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getASNTSChoices: token => dispatch(actions.getASNTSChoices(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentChoices);
