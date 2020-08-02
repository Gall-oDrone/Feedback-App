import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { connect } from "react-redux";
import { authFacebookLogin } from "../store/actions/auth";
import "../assets/authentication.css"

class FacebookSocialAuth extends Component {
  
  fbResponse = (res) => {
    console.log("CANTION", res);
    this.props.onGoogleAuth(res.accessToken)
  }
  
  render() {
    
    return (
        <FacebookLogin
          appId="210613323710556"
          render={renderProps => (
            <button className="social-button" id="facebook-connect" onClick={renderProps.onClick} disabled={renderProps.disabled}> <span>Connect with Facebook</span></button>
          )}
          fields="name,email,picture"
          callback={res => this.fbResponse(res)}
        />
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGoogleAuth: (token) => dispatch(authFacebookLogin(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacebookSocialAuth);

// export default FacebookSocialAuth;