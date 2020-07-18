import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton } from "antd";
import { getSurvey } from "../store/actions/survey";
import Hoc from "../hoc/hoc";

class SurveyList extends React.PureComponent {
  componentDidMount() {
    console.log("1) componentDidMount: ")
    console.log("this.props: " + JSON.stringify(this.props))
    // if(this.props.surveys.length === 0){
      this.props.getSurveys();
    // }
  }

  // componentDidUpdate(prevProps, prevState){
  //   console.log("CACA: ", prevProps, this.props)

  // }

  static getDerivedStateFromProps(props, state){
    console.log("CACA: ", props)
    if(props.surveys.length === 0){
      props.getSurveys();
    }
  }

  renderItem(item) {
    console.log("5) renderItem(item): " + JSON.stringify(item))
    console.log("6) renderItem(item.title): " + item.title)
    return (
      <Link to={`/survey/detail/${item.id}`}>
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
            <h3 style={{ margin: "16px 0" }}>Survey List</h3>
            <List
              size="large"
              bordered
              dataSource={this.props.surveys}
              renderItem={item => this.renderItem(item)}
            />
          </div>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  // console.log("1) ASNT List mapStateToProps containers state 1: "+ JSON.stringify(state.surveys.surveys))
  // console.log("2) ASNT List mapStateToProps containers state 2: "+ JSON.stringify(state.surveys))
  console.log("2) ASNT List mapStateToProps containers state 3: "+ JSON.stringify(state))
  return {
    token: state.auth.token,
    surveys: state.survey.surveys,
    loading: state.survey.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSurveys: () => dispatch(getSurvey())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyList);