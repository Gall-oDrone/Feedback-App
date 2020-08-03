import React from "react";
import { Form, Icon, notification, Alert, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as actions from "../store/actions/auth";
import "../assets/authentication.css"
import GoogleLogin from '../components/GoogleLogin';
import FacebookLogin from '../components/FacebookLogin';

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const openNotification = (message) => {
  notification["success"]({
    className: "verified-notification",
    message: message,
  });
};

class NormalLoginForm extends React.Component {

  componentDidMount(){
    if(this.props.location.state !== undefined){
      openNotification("Thank you, your email has been confirmed!!")
    }
    // this.props.location.state !== undefined &&
    // this.props.location.state !== null &&
    // this.props.location.state.verified === true && 
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
        const {location} = this.props;
        if(location.state && location.state.from) {
           this.props.history.push(location.state.from);
        } else {
           this.props.history.push('/');
        }
      }
    });
  };

  render() {
    console.log("THIS.PROPS: ", this.props)
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        {errorMessage}
        {this.props.match.params.uid !== undefined &&
         this.props.match.params.uid !== null &&
         this.props.match.params.token !== undefined &&
         this.props.match.params.token !== null ?
          <Redirect to={{
              pathname: '/login',
              state: { verified: true },
            }}
            /> : null
        }

        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <div className="login-row">

            <div className="login-col-1">
              <div className="social-login-box">
                <h2>Social Login</h2>
                    <FacebookLogin/>
                    <GoogleLogin/>
                  
                  {/* <a href="#" className="social-button" id="twitter-connect"> <span>Connect with Twitter</span></a>
                  <a href="#" className="social-button" id="linkedin-connect"> <span>Connect with LinkedIn</span></a> */}
              </div>
            </div>
            <div className="login-col-2">
              <div className="login-vl">
                <span className="login-inner">or</span>
              </div>
            </div>
            <div className="login-col-3">
              <div className="hide-md-lg">
                <p>Or sign in manually:</p>
              </div>
                <div className="login-box">
                <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </FormItem>

              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px" }}
                >
                  Login
                </Button>
                Or
                <NavLink style={{ marginRight: "10px" }} to="/signup/">
                  {" "}
                  <Button  type="primary"> Signup</Button>
                </NavLink>
              </FormItem>
            </Form>
                </div>
            </div>
              
		      </div>
        )}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
