import React from "react";
import {
  Form,
  Select,
  InputNumber,
  Input,
  Radio,
  Button,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Spin,
  Tabs,
  Row
} from "antd";
import axios from "axios";
import {filterGetURL} from "../constants";
import Results from './SessionSearchResults';
import countryList from 'react-select-country-list'
const countries = countryList().getData()
const Search = Input.Search;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

class FilterForm extends React.Component {
  state = {
    results: [],
    loading: false,
    error: null
  };

  handleSearch = (value, err) => {
    console.log(value)
    let postParams = {params: {
      title_contains: value
    }}
      axios
        .get(filterGetURL, postParams)
        .then(res => {
          this.setState({
            loading: false,
            results: res.data
          });
        })
        .catch(err => {
          this.setState({ error: "There was an error" });
          console.log(err);
        });
        console.log("Received values of form: ", value);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const university =
      values["university"] === undefined ? [null] : values["university"][0];
    const topic =
      values["topic"] === undefined ? null : values["topic"][0];
    const inquiry_type =
      values["assignment_type"] === undefined ? null : values["assignment_type"][0];
    let notReviewed = null;
    let language = values["language"] === undefined ? null : values["language"][0];
    const title_contains =
      values["searchTitle"] === undefined ? null : values["searchTitle"][0];
    const title_or_author =
      values["searchTitleOrAuthor"] === undefined
        ? null
        : values["searchTitleOrAuthor"];

    this.setState({ loading: true });
    let postParams = {params: {
      title_contains,
      university,
      inquiry_type,
      language,
      topic
    }}
    if (!err) {
      console.log("title_contains: ", JSON.stringify(title_contains))
      console.log("DATA: ", JSON.stringify(postParams))
      axios.defaults.headers = {
        "Content-Type": "application/json",
      }
      axios
        .get(filterGetURL, postParams)
        .then(res => {
          this.setState({
            loading: false,
            results: res.data
          });
        })
        .catch(err => {
          this.setState({ error: "There was an error" });
          console.log(err);
        });
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const {error, loading, results} = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      wrapperCol: { span: 12, offset: 6 }
    };
    return (
      <div>
        {error && <span>There was an error</span>}

        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item>
          <Search
            placeholder="Title contains..."
            onSearch={(value, error) => this.handleSearch(value, error)}
            enterButton
          />
        </Form.Item>
        <Collapse defaultActiveKey={['0']} onChange={callback}>
          <Panel header="Filter by" key="1">
            <Tabs type="card">
              <TabPane tab="University" key="1">
              <Form.Item hasFeedback>
                {getFieldDecorator("university")(
                  <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="A">MIT</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="B">Standford</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="El Colegio de México">COLMEX</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Center of Teaching and Research in Economics">CIDE</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="E">ITAM</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>

              </TabPane>
            <TabPane tab="Topic" key="2">
              <Form.Item hasFeedback>
                  {getFieldDecorator("topic")(
                    <Checkbox.Group>
                      <Row>
                        <Col span={8}>
                          <Checkbox value="Economics">Economics</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="Finance">Finance</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="Econometrics">Econometrics</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="Machine Learning">Machine Learning</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="AI">AI</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="other">other</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  )}
                </Form.Item>
            </TabPane>
            <TabPane tab="Assignment Type" key="3">
            <Form.Item hasFeedback>
                {getFieldDecorator("assignment_type")( 
                  <Checkbox.Group>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="homework review">Homework Review</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="class review">Class Review</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="C">Product Test</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </TabPane>
            <TabPane tab="Language" key="4">
            <Form.Item hasFeedback>
                {getFieldDecorator("language")(
                    <Checkbox.Group>
                      <Row>
                        <Col span={10}>
                          <Checkbox value="spanish">Spanish</Checkbox>
                        </Col>
                        <Col span={10}>
                          <Checkbox value="english">English</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                 )}
            </Form.Item>
            </TabPane>
            </Tabs>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Panel>
        </Collapse>
      </Form>
        {
          loading ? (
            <div className="loader-div">
              <Spin />
            </div> 
          ): (
          <Results journals={results}/>

          )}
      </div>
    );
  }
}

const WrappedFilterForm = Form.create({ name: "validate_other" })(FilterForm);

export default WrappedFilterForm;