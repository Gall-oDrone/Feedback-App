import React, { Component } from 'react';
import { connect } from "react-redux";
import GoogleLogin from 'react-google-login';
import { authGoogleLogin } from "../store/actions/auth";
import "../assets/authentication.css"

class GoogleSocialAuth extends Component {

  handleSuccessGoogleLogin = (res) => {
    // e.preventDefault()
    console.log("res: ", res.accessToken);
    this.props.onGoogleAuth(res.accessToken)
  }

  render() {
    const googleResponse = (response) => {
      console.log("response: ", response);
    }
    return (
        <GoogleLogin
           clientId="118813996961-299488kaabb61u41645jf9915qi3f0dl.apps.googleusercontent.com"
           render={renderProps => (
             <button className="social-button" id="google-connect" onClick={renderProps.onClick} disabled={renderProps.disabled}> <span>Connect with Google</span></button>
           )}
          //  buttonText="Login"
           onSuccess={res => this.handleSuccessGoogleLogin(res)}
           onFailure={googleResponse}
           cookiePolicy={'single_host_origin'}
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
    onGoogleAuth: (token) => dispatch(authGoogleLogin(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleSocialAuth);

// export default GoogleSocialAuth;