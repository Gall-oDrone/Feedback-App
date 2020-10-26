import React from "react";
import { connect } from "react-redux";
import Hoc from "../hoc/hoc";
import { Form, Input, Icon, Button, Divider } from 'antd';
import SurveyQuestionForm from "./WorkshopLessonForm"
import {createSurvey} from "../store/actions/survey"

const FormItem = Form.Item;

class LessonCreate extends React.Component {
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
            console.log("handleFormSubmit values: ", JSON.stringify(values));
            console.log("handleFormSubmit values II: ", values.lesson[0].topics.filter(el => el !== null));
            // if (!err) {
            //     const lessons = [];
            //     for (let i =0; i< values.lessons.length; i += 1) {
            //       lessons.push({
            //         title: values.question[i],
            //         choices: values.lessons[i].choices.filter(el => el !== null),
            //     });
            //   }
            //   console.log("Calling... 0");
            //     const asnt = {
            //       teacher: this.props.username,
            //       lessons
            //     };
            //     this.props.createSurvey(this.props.token, asnt).then(res => {
            //       if (res.status === "HTTP_200"){

            //       } else {

            //       }
            //     });
            // }
        });
    };

  render() {
    const { handleLessons } = this.props;
    const lessons = [];
    handleLessons(lessons)
    for (let i=0; i < this.state.formCount; i+= 1) {
      lessons.push(
        <Hoc key= {i}>
          {lessons.length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type = "minus-circle-o"
              disabled={lessons.length === 0 || lessons.length === 6}
              onClick={() => this.remove()}
              />
          ) : null}
          <SurveyQuestionForm id={i} {...this.props} />
          <Divider />
        </Hoc>
        );
    }

    return (
        <div>
          <h1>Workshop Lessons/Modules</h1>
          {lessons}
        <FormItem >
          <Button type="secondary" onClick={this.add} >
            <Icon type="plus" /> Add a lesson or module
          </Button>
        </FormItem>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" >
            Post
          </Button>
        </Form.Item>
      </div>
    );
      }
}

const WrappedLessonCreate = Form.create()(LessonCreate);

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
)(WrappedLessonCreate);