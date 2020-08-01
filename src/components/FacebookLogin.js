import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookSocialAuth extends Component {
  render() {
    const fbResponse = (response) => {
      console.log(response);
    }
    return (
      <div className="App">
        <h1>LOGIN WITH FACEBOOK</h1>

        <FacebookLogin
          textButton="LOGIN WITH FACEBOOK"
          appId= "<FACEBOOK APP ID>"
          fields="name,email,picture"
          callback={fbResponse}
        />
      </div>
    );
  }
}

export default FacebookSocialAuth;