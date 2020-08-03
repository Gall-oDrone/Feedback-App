import React from "react";
import { Form, Input, Row, Col, Icon, Card, Button } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import {authResendConfirmationURL} from "../constants";
import * as actions from "../store/actions/auth";

const FormItem = Form.Item;

class Confirmation extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    college: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        const email =
          values["email"] === undefined ? null : values["email"];
        const postObj = {
          email: email
        }
        if (!err) {
          axios.defaults.headers = {
            "content-type": "multipart/form-data",
            Authorization: `Token ${this.props.token}`
          };
          axios.post(authResendConfirmationURL, postObj)
          .then(res => {
            if (res.status === 201) {
              // this.props.history.push('/');
            }
          })
          .catch(error => console.error(error))
          console.log('Error'); 
          }
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
    return (
        <div>
           <Row type="flex" justify="center">
            <Col>
              <Card  title={"Resend password email"}>
                  <Form  {...formItemLayout} onSubmit={this.handleSubmit}>
                      <Form.Item label="Email">
                          {getFieldDecorator('email', {
                              rules: [
                              {
                                  type: 'email',
                                  message: 'The input is not valid Email!',
                              },
                              {
                                  required: true,
                                  message: 'Please input your Email!',
                              },
                              ],
                          })(<Input />)}
                      </Form.Item>
                      <Button  type="primary" htmlType="submit"> Resend Email</Button>
                  </Form>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

const WrappedEmailConfirmationForm = Form.create()(Confirmation);

const mapStateToProps = state => {
    return {
      userId: state.auth.userId,
      token: state.auth.token,
      is_active: state.auth.is_active_user,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(actions.logout()),
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedEmailConfirmationForm);
