import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter  from "./routes";
import LPRouter from "./routes2";
import "antd/dist/antd.css";
import * as actions from "./store/actions/auth";

import CustomLayout from "./containers/Layout";
import LandingPage from "./containers/LandingPage";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    console.log("AUTH => ", this.props.isAuthenticated, this.props.loading)
    return (
      // <Router>
      //   <CustomLayout {...this.props}>
      //     <BaseRouter />
      //   </CustomLayout>
      // </Router>
      
      <Router>
        {this.props.isAuthenticated ?
        <CustomLayout key="main" {...this.props}>
          <BaseRouter />
        </CustomLayout>
        : <LandingPage key="landing" {...this.props}>
            <LPRouter />
          </LandingPage>
        }
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
