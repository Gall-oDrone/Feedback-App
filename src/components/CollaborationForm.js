import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Button,
} from 'antd';
import {collabCreateURL} from "../constants";
import axios from 'axios';
import Types from "./CollaborationTypes";
import JoinForms from "./CollaborationJoinForm";
import NestedForms from "./NestedCollabForm";
import "../assets/collaboration.css"

class ArticleCustomForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      type: null,
      join: null
    };
  }

  handleType = (val) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({project_type:val})
    this.setState({type: val})
  }

  handleJF = (val) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({recruitment:val})
    this.setState({join: val})
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    await this.props.form.validateFields((err, values) => {
      console.log("handleFormSubmit values: ", JSON.stringify(values));
      const type =
        values["project_type"] === undefined ? null : values["project_type"];
      const recruitment =
        values["recruitment"] === undefined ? null : values["recruitment"];
      const category =
        values["collab_category"] === undefined ? null : values["collab_category"];
      const academic =
        values["project_academic_field"] === undefined ? null : values["project_academic_field"];
      const industry =
        values["project_industry_field"] === undefined ? null : values["project_industry_field"];
      const position =
        values["project_position"] === undefined ? null : values["project_position"];
      const postObj = {
        user: this.props.username,
        type: type,
        recruitment: recruitment,
        category: category,
        academic: academic,
        industry: industry,
        position: position,
        
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
    const { getFieldValue } = this.props.form;
    const { type, join } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
   
    return (
      <Form {...formItemLayout} onSubmit={event => this.handleFormSubmit(
        event,
        this.props.requestType,
        this.props.articleID)}>
          {type && join ?
            <NestedForms form={form}/>
            :   
                type ? 
                  <JoinForms props={form} val={this.handleJF}/>
                : <Types props={form} val={this.handleType}/>
            
          }

        {
          (getFieldValue("project_academic_field") && getFieldValue("project_academic_field")[0]) ||
          (getFieldValue("project_position") && getFieldValue("project_position")[0])
          ?
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit" >
                Post
              </Button>
            </Form.Item>
          : null
        }
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