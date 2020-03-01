import React from 'react';
import Hoc from "../hoc/hoc";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import SurveyQuestionForm from "../containers/SurveyQuestionForm"
import { Form, Input, Select, Checkbox, Upload, message, Icon, Divider, Button, Col, Row} from 'antd';
import {getProfileSurveyDetail, putProfileSurveyDetail} from "../store/actions/profileSurvey";

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const success = () => {
  message.success('Thanks for your review');
};

const error = () => {
  message.error('Error while submitting review');
};

class ProfileArticleDetail extends React.Component {
  
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

  handleFormSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    await this.props.form.validateFields((err, values) => {
      const title =
        values["title"] === undefined ? null : values["title"];
      const content =
        values["content"] === undefined ? null : values["content"];
      const categories =
        values["categories"] === undefined ? null : values["categories"];
      const feedback_type =
        values["feedback_type"] === undefined ? null : values["feedback_type"];
      const file = 
        values["upload"] === undefined ? null : values["upload"];
        // formData.append("file", file);
        // formData.append("file", file);
        // formData.append("file", file);
        // formData.append("file", file);
        // formData.append("file", file);
        // form_data.append('image', file[0], file[0].name);
        console.log("JSON.stringify(file)")
        console.log(JSON.stringify(file))
        console.log(JSON.stringify(file[0].originFileObj))
        console.log("JSON.stringify(file) 2")
      console.log(JSON.stringify(formData.append("file", file[0].originFileObj)))
      const postObj = {
        user: this.props.username,
        room: "1",
        // room: this.props.roomDetail.RoomDetail,
        title: values.title,
        content: values.content,
        categories: values.categories,
        feedback_type: values.feedback_type
      }
      formData.append("data", JSON.stringify(postObj))
      if (!err) {
        this.props.putPSD(this.props.token, this.props.match.params.surveyID, this.props.username, formData)
        if(this.props.err1 !== null){
          error()

        } else {
          // this.props.history.push('/');
          success();
        }
            // .then(res => {
            //   if (res.status === 201) {
            //     this.props.history.push('/');
            //   }
            // })
            // .catch(error => console.err(error))
            // console.log('Error');
        }

        console.log('Received values of form: ', values);
    });
  }
  
  componentDidMount() {
    console.log("1) componentDidMount: ")
    console.log("this.props: " + JSON.stringify(this.props))
    console.log("this.state: " + JSON.stringify(this.state))
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null != undefined){
        this.props.getPSD(this.props.token, this.props.match.params.articleID, this.props.username)
      } else {
        console.log("this.props.getMeetings was undefined at CDM")
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null !== undefined) {
        this.props.getPSD(newProps.token, this.props.match.params.articleID, newProps.username)
      } else {
        console.log("this.props.getMeetings was undefined")
      }
    }
  }

  render() {
    console.log("this.props: "+ JSON.stringify(this.props))
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
    const { getFieldDecorator } = this.props.form;
    const { surveyDetail } = this.props.userPSD
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      (surveyDetail !== undefined ? (
        <Form onSubmit={this.handleSubmit}>
          <h1>Create a Survey</h1>
            <Form.Item label={"Title:"}>
            {getFieldDecorator(`title`, {
            initialValue: `${surveyDetail.title}`,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                message: "Please input a title.",
              },
            ],
            })(<Input placeholder="Add a title" style={{ width: '60%', marginRight: 8 }} />)}
            </Form.Item>
            {questions}
            <Form.Item >
              <Button type="secondary" onClick={this.add} >
                <Icon type="plus" /> Add question
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
          </Form.Item>
      </Form>
      ) : null)
    )
  }
}

const WrappedRegistrationForm = Form.create()(ProfileArticleDetail);

const mapStateToProps = state => {
  console.log("mapStateToProps: "+JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    userPSD: state.profileSurvey
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    getPSD: (token, surveyID, userID) => dispatch(getProfileSurveyDetail(token, surveyID, userID)),
    putPSD: (token, surveyID, username, data) => dispatch(putProfileSurveyDetail(token, surveyID, username, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);