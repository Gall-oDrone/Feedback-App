import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Select,
  Cascader,
} from 'antd';
import {fetchDisciplinesURL, fetchCollabAllChoices} from "../constants";
import moment from "moment";
import axios from 'axios';
import lodash from "lodash";
import FetchProject from "./CollaborationActivity";
const { Option } = Select;

class ArticleCustomForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      academic_disciplines: null,
      industry_fields: null,
      collab_position: null,
      collab_categories: null,
      children:null,
    };
  }

  fetchData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    }
    // axios.get(fetchDisciplinesURL)
    axios.get(fetchCollabAllChoices)
    .then(res => {
      console.log("resData at UI: ", (res))
      const children = [];
      for (let i = 0; i < res.data[0].collab_position.length; i++) {
        children.push(<Option key={res.data[0].collab_position[i].value}>{res.data[0].collab_position[i].label}</Option>);
      }
      this.setState({
        academic_disciplines:res.data[0].academic_disc,
        industry_fields:res.data[0].industry_fields,
        collab_position:res.data[0].collab_position,
        collab_categories:res.data[0].collab_categories,
        children: children
      });
    })
    .catch(err =>
      console.error("ERROR 123: ", err.message));
  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      if(this.props.username !== null){
        // this.props.getProfileInfo(this.props.token, this.props.username)
        this.fetchData()
      }
    }
  }
  
  componentDidUpdate(newProps) {
    if (newProps.token !== this.props.token) {
      if (this.props.token !== undefined && this.props.token !== null) {
        // this.props.getProfileInfo(this.props.token, this.props.username)
        this.fetchData()
      } else {
        this.props.history.push('/');
      }
    }    
  }

  handleADChange = val => {
    var lab = null
    this.lab = val
    console.log("ERMAC", val, this.lab)
    return this.lab
  };

  render() {
    console.log("props & state: "+ JSON.stringify(this.props), this.state)
    const { collab_categories, academic_disciplines, industry_fields, collab_position, children } = this.state
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const joinFrom = getFieldValue("recruitment")

    return (
      <div>
        <p>Project Category</p>
        <Form.Item label="Field">
        {getFieldDecorator("collab_category", {
                    initialValue: [this.handleADChange()],
                    rules: [
                      { type: 'array', required: true, message: 'Please select a cateogry' },
                    ],
                  })(<Cascader options={collab_categories} />)}
          </Form.Item>
        
        {getFieldValue("collab_category").map(el => {
          if(!el){return}
          if(el === "academic"){
            return (
                <div>
                  <p>Academic Field</p>
                    <Form.Item label="Field">
                    {getFieldDecorator("project_academic_field", {
                                initialValue: [this.handleADChange()],
                                rules: [
                                  { type: 'array', required: true, message: 'Please select a discipline' },
                                ],
                              })(<Cascader options={academic_disciplines} />)}
                      </Form.Item>
                </div>
            )
          } else {
            return(
                <div>
                  <p>Industry Field</p>
                  <Form.Item label="Field">
                  {getFieldDecorator("project_industry_field", {
                              initialValue: [this.handleADChange()],
                              rules: [
                                { type: 'array', required: true, message: 'Please select a field' },
                              ],
                            })(<Cascader options={industry_fields} />)}
                    </Form.Item>
                </div>
            )
          }
        })
      }

        {getFieldValue("project_industry_field") && getFieldValue("project_industry_field").map(el => {
          if(!el){return}
          else{
            return(
                <div>
                  <p>Project Position</p>
                  {joinFrom === "Push" ? 
                    <Form.Item label="Collaborate as">
                      {getFieldDecorator("project_position", {
                                  initialValue: [this.handleADChange()],
                                  rules: [
                                    { type: 'array', required: true, message: 'Please select a position' },
                                  ],
                                })(<Cascader options={collab_position} />)
                      }
                    </Form.Item>
                    :
                    <Form.Item label="Required Roles">
                      {getFieldDecorator("project_position", {
                                  initialValue: [],
                                  rules: [
                                    { type: 'array', required: true, message: 'Please select a position' },
                                  ],
                                })(
                                  <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                  >
                                    {children}
                                  </Select>,
                                  )
                      }
                    </Form.Item>
                  }
                </div>
            )
          }
        })}
        </div>
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