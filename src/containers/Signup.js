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
    college: null
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  onChangeCollege = value => {
    console.log('Currency changed', value);
    const { form } = this.props;
    let keys = form.getFieldValue('university');
    this.setState({ college: value[0] })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_student = false;
        if (values.userType === "student") is_student = true;
        this.props.onAuth(
          values.userName,
          values.email,
          values.university[0],
          values.password,
          values.confirm,
          is_student
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

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { autoCompleteResult, college } = this.state;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption 
        key={website}>
          {website}
      </AutoCompleteOption>
    ));
    //phone number
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="55">+55</Option>
      </Select>,
    );
    
    //team members
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [''] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Members' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              type: "email",
              required: false,
              whitespace: true,
              message: "Please input member email or delete this field.",
            },
          ],
        })(<Input placeholder="Member email" style={{ width: '60%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

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
        {/* <FormItem>
          {getFieldDecorator("first_name", {
            rules: [{ required: true, message: "Please input your first name!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="First Name"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("last_name", {
            rules: [{ required: true, message: "Please input your last name!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Last Name"
            />
          )}
        </FormItem> */}

        {/* {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item> */}

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

        <Form.Item label="College Institution">
          {getFieldDecorator("university", {
            initialValue: "",
            rules: [
              { type: 'array', required: true, message: 'Please select your University' },
            ],
          })(<Cascader options={universities} onChange={this.onChangeCollege} />)}
        </Form.Item>

        <Form.Item label="Phone number">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: false,
                message: 'Please input your phone number!'
              }
            ],
          })(<Input addonBefore={prefixSelector} style={{ width: '50%' }} />)}
        </Form.Item>

        <Form.Item label="Website">
          {getFieldDecorator('website', {
            rules: [
              {
                required: false,
                message: 'Please input website!'
              }
            ],
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>,
          )}
        </Form.Item>

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
          {getFieldDecorator("userType", {
            rules: [
              {
                required: true,
                message: "Please select a user!"
              }
            ]
          })(
            <Select placeholder="Select a user type">
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher/Instructor</Option>
            </Select>
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
          <NavLink style={{ marginRight: "10px" }} to="/login/">
            Login
          </NavLink>
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
