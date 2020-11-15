import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Button,
} from 'antd';
import {collabCreateURL} from "../constants";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Types from "./CollaborationTypes";
import JoinForms from "./CollaborationJoinForm";
import NestedForms from "./NestedCollabForm";
import FetchProjects from "../components/CollaborationActivity";
import { getProfileArticleList } from "../store/actions/profile";
import { getProfileProjectList } from "../store/actions/profileProject";
import { getProfileWorkshopList } from "../store/actions/profileWorkshop";
import "../assets/collaboration.css"

class ArticleCustomForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      type: null,
      pull: null,
      join: null,
      activity: null,
    };
  }

  joinF = (props, pull, val) => {
    return(<JoinForms props={props} pull={pull} val={val}/>)
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.projects.length < this.props.projects.length) {
      const projects = this.props.projects;
      return projects;
    }
    else if(prevProps.workshops.length < this.props.workshops.length) {
      const workshops = this.props.workshops;
      return workshops;
    }
    else if(prevProps.articles.length < this.props.articles.length) {
      const articles = this.props.articles;
      return articles;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { pull, joinF } = this.state;
    const { form } = this.props;
    if (snapshot !== null) {
      console.log("EHRENO: ", pull, this.props.workshops)
      this.setState({pull: snapshot})
      this.joinF(form, pull, this.handleJF)
    }
  }

  handleType = (val) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({project_type:val})
    this.setState({type: val})
    this.collab_type(val)

  }

  collab_type = async (collabType) => {
    switch (collabType) {
      case "Project":
        console.log("casio projects")
        return this.props.getProjects(this.props.token, this.props.username);
      case "Articles":
        console.log("casio articles")
        return this.props.getArticles(this.props.token, this.props.username);
      case "Workshop":
        console.log("casio workshop")
        return this.props.getWorkshops(this.props.token, this.props.username);
      case "Seed Grand":
        // "EPXLORACIÓN DE PROYECTOS"
        console.log("seed grand")
        return this.props.getProjects(this.props.token, this.props.username);
      default:
        return null;
    }
  };

  handleJF = (val) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({recruitment:val})
    this.setState({join: val})
  }

  handleActivity = (val) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({selected_project:val})
    console.log("CHAVA: ", val)
    this.setState({activity: val})
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    await this.props.form.validateFields((err, values) => {
      console.log("handleFormSubmit values: ", JSON.stringify(values));
      const type =
        values["project_type"] === undefined ? null : values["project_type"];
      const recruitment =
        values["recruitment"] === undefined ? null : values["recruitment"];
      const project =
        values["selected_project"] === undefined ? null : values["selected_project"];
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
        project: project,
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
    const { type, join, pull, activity } = this.state;
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
                join === "Pull" ?
                    activity ?
                      <NestedForms pull={pull} form={form}/>
                    :  <FetchProjects props={form} pull={pull} val={this.handleActivity} />
                :
                  <NestedForms pull={pull} form={form}/>
            :   
                type ? 
                  this.joinF(form, pull, this.handleJF)
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
    username: state.auth.username,
    articles: state.profile.articleList,
    projects: state.profileProject.projectList,
    workshops: state.profileWorkshop.workshopList,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getArticles: (token, username) => dispatch(getProfileArticleList(token, username)),
    getProjects: (token, username) => dispatch(getProfileProjectList(token, username)),
    getWorkshops: (token, username) => dispatch(getProfileWorkshopList(token, username)),
  };
};

export default withRouter(connect(
  mapStateToProps, 
  mapDispatchToProps
  )(WrappedArticleCreate));