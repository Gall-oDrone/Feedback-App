import React from "react";
import { connect } from "react-redux";
import Hoc from "../hoc/hoc";
import { Form, Input, Icon, Button, Divider } from 'antd';
import SurveyQuestionForm from "./SurveyQuestionForm2"
import {createSurvey} from "../store/actions/survey"

const FormItem = Form.Item;

class SurveyCreate extends React.Component {
    state = {
        formCount: 1
    };

  remove = () => {
    const {formCount} = this.state;
        this.setState({
            formCount: formCount - 1
        })
  };

  add = () => {
    const {formCount} = this.state;
    if(formCount < 6){
        this.setState({
            formCount: formCount + 1
        })
    };
  }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const questions = [];
                for (let i =0; i< values.questions.length; i += 1) {
                  questions.push({
                    title: values.question[i],
                    choices: values.questions[i].choices.filter(el => el !== null),
                });
              }
              console.log("Calling... 0");
                const asnt = {
                  teacher: this.props.username,
                  title: values.title,
                  questions
                };
                this.props.createSurvey(this.props.token, asnt).then(res => {
                  if (res.status === "HTTP 200"){

                  } else {

                  }
                });
            }
        });
    };
  render() {
    const { getFieldDecorator } = this.props.form;
    const questions = [];
    for (let i=0; i < this.state.formCount; i+= 1) {
      questions.push(
        <Hoc key= {i}>
          {questions.length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type = "minus-circle-o"
              disabled={questions.length === 0 || questions.length === 6}
              onClick={() => this.remove()}
              />
          ) : null}
          <SurveyQuestionForm id={i} {...this.props} />
          <Divider />
        </Hoc>
        );
    }

    return (
      <Form onSubmit={this.handleSubmit}>
          <h1>Create a Survey</h1>
          <FormItem label={"Title:"}>
          {getFieldDecorator(`title`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              message: "Please input a title.",
            },
          ],
        })(<Input placeholder="Add a title" style={{ width: '60%', marginRight: 8 }} />)}
        </FormItem>
        {questions}
        <FormItem >
          <Button type="secondary" onClick={this.add} >
            <Icon type="plus" /> Add question
          </Button>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
      }
}

const WrappedSurveyCreate = Form.create()(SurveyCreate);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    loading: state.survey.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createSurvey: (token, asnt) => dispatch(createSurvey(token, asnt))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedSurveyCreate);