import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Button,
} from 'antd';
import {collabCreateURL} from "../constants";
import axios from 'axios';
import Types from "./CollaborationTypes";
import NestedForms from "./NestedCollabForm";
import "../assets/collaboration.css"

class ArticleCustomForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      type: null,
    };
  }

  handleType = (val) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({project_type:val})
    this.setState({type: val})
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    await this.props.form.validateFields((err, values) => {
      console.log("handleFormSubmit values: ", JSON.stringify(values));
      const type =
        values["project_type"] === undefined ? null : values["project_type"];
      const field =
        values["project_field"] === undefined ? null : values["project_field"];
      const experience =
        values["areas_experience"] === undefined ? null : values["areas_experience"];
      const postObj = {
        user: this.props.username,
        type: type,
        field: field,
        experience: experience,
      }
      if (!err) {
        axios.defaults.headers = {
          "content-type": "application/json",
          Authorization: `Token ${this.props.token}`
        };
          axios.post(collabCreateURL, postObj)
            .then(res => {
              if (res.status === 201) {
                this.props.history.push('/');
              }
            })
            .catch(error => console.error(error))
            console.log('Error');        
        console.log('Received values of form: ', values);
      } else{
        console.log('Received error: ', err);
      }
    });
  }

  render() {
    console.log("props & state: "+ JSON.stringify(this.props), this.state)
    const { form } = this.props;
    const { type } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
   
    return (
      <Form {...formItemLayout} onSubmit={event => this.handleFormSubmit(
        event,
        this.props.requestType,
        this.props.articleID)}>
          {type ?
            <NestedForms form={form}/>
            :<Types props={form} val={this.handleType}/>
          }

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" >
            Post
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedArticleCreate = Form.create()(ArticleCustomForm);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username
  }
}
export default connect(mapStateToProps)(WrappedArticleCreate);