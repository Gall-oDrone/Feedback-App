import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon, Tag, Tooltip, List, Skeleton } from "antd";
import Filter from "./SurveyFilterForm";
import { getSurvey } from "../store/actions/survey";
import Hoc from "../hoc/hoc";
import moment from "moment";

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
  //   if(prevProps.prevProps !== this.props){
  //     if(this.props.surveys !== null && this.props.surveys.length === 0){
  //       this.props.getSurveys();
  //     } 
  //   }
  // }

  renderItem(item) {
    console.log("5) renderItem(item): " + JSON.stringify(item))
    console.log("6) renderItem(item.title): " + item.title)
    return (
      <Link to={`/survey/detail/${item.id}`}>
        <List.Item>
          <List.Item.Meta
          title={item.title}
          description={item.overview}
          />
          <div style={{display:"block", flexDirection:"column"}}>
            <span>
              <span>
                {moment(item.timestamp).format("MMMM Do YYYY")}
              </span>
              <span>
                {item.reward === true ? <Icon type={"trophy"}/>:null}
              </span>
              <span>
                {<Tag>{item.survey_use_case}</Tag>}
              </span>
            </span>
          </div>
        </List.Item>
      </Link>
    );
  }

  render() {
    return (
      <Hoc>
        {this.props.loading ? (
          <Skeleton active />
        ) : (
          <div align="center">
            <Filter />
              <div style={{paddingTop: "10px", paddingBottom: "10px"}} />
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
  console.log("2) Survey List mapStateToProps containers state 3: "+ JSON.stringify(state))
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