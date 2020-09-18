import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Button,
} from 'antd';
import {workshopCreateURL} from "../constants";
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
    this.setState({type: val})
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { defaultSelectedWeekday, defaultSelectedMonth, dateArray } = this.state
    console.log("handleFormSubmit", dateArray, defaultSelectedWeekday)
    let formData = new FormData();
    await this.props.form.validateFields((err, values) => {
      console.log("handleFormSubmit values: ", JSON.stringify(values));
      const content =
        values["content"] === undefined ? null : values["content"];
      const topic =
        values["topic"] === undefined ? null : values["topic"];
      const inquiry =
        values["topics"] === undefined ? null : values["topics"];
      const university =
        values["areas_experience"] === undefined ? null : values["areas_experience"];
      const datepicker =
        values["date-picker"] === undefined ? null : values["date-picker"];
      const price =
        values["price"] === undefined ? null : values["price"];
      const max_hours =
        values["max_hours"] === undefined ? null : values["max_hours"];
      const start_time =
        values["start_time"] === undefined ? null : values["start_time"];
      const end_time =
        values["end_time"] === undefined ? null : values["end_time"];
      const file = 
        values["upload"] === undefined ? null : values["upload"];
      const postObj = {
        user: this.props.username,
        content: values.content,
        topics: values.topics,
        areas_experience: values.areas_experience,
        datepicker: values.datepicker,       
        price: values.price,       
        max_hours: values.max_hours,
        start_time: values.start_time,
        end_time: values.end_time,
        weekdays: defaultSelectedWeekday,
        months: defaultSelectedMonth,
        dates: dateArray
      }
      console.log("postObj: ", JSON.stringify(postObj))
      if (file !== null){
        formData.append("file", file[0].originFileObj)
      }
      formData.append("data", JSON.stringify(postObj))
      if (!err) {
        axios.defaults.headers = {
          "content-type": "multipart/form-data",
          Authorization: `Token ${this.props.token}`
        };
          axios.post(workshopCreateURL, 
          formData
          )
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { visible, type } = this.state;
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
            <NestedForms/>
            :<Types val={this.handleType}/>
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