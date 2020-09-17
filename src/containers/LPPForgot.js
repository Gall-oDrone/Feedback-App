import React from "react";
import { Form, Icon, notification, Alert, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as actions from "../store/actions/auth";
import "../assets/authentication.css"

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const openNotification = (message) => {
  notification["success"]({
    className: "verified-notification",
    message: message,
  });
};

const RecoverPassword = ( {handlePF} ) => {
  console.log("CUERNOS: ", handlePF)
  return (
    <div className="login-row">
      <div className="forgot_password_con">
        <h3>Recover your password</h3>
        <div className="forgot_password_content">
          <div className="forgot_password_indications">
            We'll send your an email to reset your password
          </div>
          <input placeholder="Your email" className="forgot_password_inupt" id="email">
          </input>
          <button className="forgot_password_send_to_email">
            Send email
          </button>
          <div onClick={() => handlePF(false)}>
              <a>Cancel</a>
          </div>
        </div>
      </div>  
    </div>  
  )

}

export default RecoverPassword;

// class NormalLoginForm extends React.Component {

//   componentDidMount(){
//     if(this.props.location && this.props.location.state !== undefined){
//       openNotification("Thank you, your email has been confirmed!!")
//     }
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         this.props.onAuth(values.userName, values.password);
//         const {location} = this.props;
//         if(location.state && location.state.from) {
//            this.props.history.push(location.state.from);
//         } else {
//            this.props.history.push('/');
//         }
//       }
//     });
//   };

//   render() {
//     console.log("THIS.PROPS: ", this.props)
//     let errorMessage = null;
//     if (this.props.error) {
//       errorMessage = <p>{this.props.error.message}</p>;
//     }
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <div className="login-container">
//         {errorMessage}
//         {this.props.match &&
//           this.props.match.params.uid !== undefined &&
//           this.props.match.params.uid !== null &&
//           this.props.match.params.token !== undefined &&
//           this.props.match.params.token !== null ?
//            <Redirect to={{
//                pathname: '/login',
//                state: { verified: true },
//              }}
//              /> : null
//         }

//         {this.props.loading ? (
//           <div className="loading_spinner_con">
//             <Spin indicator={antIcon} />
//           </div>
//         ) : (
//                 <form onSubmit={this.handleSubmit}>
//                   <div className="login_b_con">
//                       <label><b>Username</b></label>
//                         {getFieldDecorator("userName", {
//                         rules: [
//                           { required: true, message: "Please input your username!" }
//                         ]
//                         })(
//                           <input 
//                               type="text"
//                               name='username' 
//                               id="fusername"
//                               placeholder="username"
//                           />
//                         )}
//                       <label><b>Password</b></label>
//                       {getFieldDecorator("password", {
//                           rules: [
//                             { required: true, message: "Please input your Password!" }
//                           ]
//                         })(
//                           <input 
//                               type="password"
//                               name='password' 
//                               id="pwd"
//                               placeholder="password"
//                           />
//                         )}
//                       <button type="submit">Login</button>
//                   </div>
//                 </form>
//         )}
//       </div>
//     );
//   }
// }

// const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

// const mapStateToProps = state => {
//   return {
//     loading: state.auth.loading,
//     error: state.auth.error
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAuth: (username, password) => dispatch(actions.authLogin(username, password))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(WrappedNormalLoginForm);
