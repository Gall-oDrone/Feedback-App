import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton } from "antd";
import * as actions from "../store/actions/assignments";
import Hoc from "../hoc/hoc";

class AssignmentList extends React.PureComponent {
  componentDidMount() {
    console.log("1) componentDidMount: ")
    console.log("this.props: " + JSON.stringify(this.props))
    if (this.props.token !== undefined && this.props.token !== null) {
      console.log("2) this.props.token: " + this.props.token)
      console.log("this.props: " + JSON.stringify(this.props))
      console.log("this.props: " + JSON.stringify(this.props.getASNTS(this.props.token)))
      this.props.getASNTS(this.props.token);

    }
  }

  componentWillReceiveProps(newProps) {
    console.log("3) componentWillReceiveProps: ")
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        console.log("3.6) newProps.token !== this.props.token")
        console.log("3.7) CWRP newProps: " +JSON.stringify(newProps.token))
        console.log("3.8) CWRP Props: " +JSON.stringify(this.props.token))
        console.log("3.9) CWRP Props.username: " +JSON.stringify(this.props.username))
        console.log("3.9.1) CWRP newProps.username: " +JSON.stringify(newProps.username))
        console.log("4) newProps.token: " + newProps.token)
        console.log("this.props: " + JSON.stringify(this.props))
        console.log("this.props.getASNTS(...): " + JSON.stringify(this.props.getASNTS(this.props.token)))
        this.props.getASNTS(newProps.token);
      }
    }
  }

  renderItem(item) {
    console.log("5) renderItem(item): " + JSON.stringify(item))
    console.log("6) renderItem(item.title): " + item.title)
    return (
      <Link to={`/assignments/${item.id}`}>
        <List.Item>{item.title}</List.Item>
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
            <h3 style={{ margin: "16px 0" }}>Assignment List</h3>
            <List
              size="large"
              bordered
              dataSource={this.props.assignments}
              renderItem={item => this.renderItem(item)}
            />
          </div>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  /*console.log("1) ASNT List mapStateToProps containers state 1: "+ JSON.stringify(state.assignments.assignments))
  console.log("2) ASNT List mapStateToProps containers state 2: "+ JSON.stringify(state.assignments))
  console.log("2) ASNT List mapStateToProps containers state 3: "+ JSON.stringify(state))*/
  return {
    token: state.auth.token,
    assignments: state.assignments.assignments,
    loading: state.assignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getASNTS: token => dispatch(actions.getASNTS(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentList);