import React from "react";
import { Form, Input, Icon, Button, Select, AutoComplete, Cascader } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";

let id = 0;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const universities = [
  {
    value: 'Center of Teaching and Research in Economics',
    label: 'Centro de Investigación y Docencias Económicas (CIDE)'
  },
  {
    value: 'Instituto Tecnológico Autónomo de México',
    label: 'Instituto Autónomo Tecnológico de México (ITAM)'
  },
  {
    value: 'El Colegio de México',
    label: 'El Colegio de México (COLMEX)'
  },
  {
    value: 'Instituto Tecnológico y de Estudios Superiores de Monterrey',
    label: 'Instituto Tecnológico y de Estudios Superiores de Monterrey (ITESM)'
  },
  {
    value: 'Universidad Iberoamericana',
    label: 'Universidad Iberoamericana (IBERO)'
  },
]

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_student = false;
        if (values.userType === "student") is_student = true;
        this.props.onAuth(
          values.userName,
          values.email,
          "None",
          values.password,
          values.confirm,
          true
        );
        this.props.history.push("/");
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Signup
          </Button>
          Or
          {" "}
          <Button onClick={() => this.props.register(false)} style={{ marginRight: "10px" }} >
            Login
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, university, password1, password2, is_student) =>
      dispatch(
        actions.authSignup(username, email, university, password1, password2, is_student)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
