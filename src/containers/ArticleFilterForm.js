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
import Results from './ArticleSearchResults';
import {filterURL} from "../constants";
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const category =
      values["category"] === undefined ? null : values["category"];
    const view_count_max =
      values["maximum-views"] === undefined ? null : values["maximum-views"];
    const view_count_min =
      values["minimum-views"] === undefined ? null : values["minimum-views"];
    let notReviewed = null;
    let reviewed =
      values["reviewed"] === undefined ? null : values["reviewed"];
    if (reviewed === "reviewed") {
      reviewed = "on";
      notReviewed = null;
    } else if (reviewed === "notReviewed") {
      reviewed = null;
      notReviewed = "on";
    }
    const title_contains =
      values["searchTitle"] === undefined ? null : values["searchTitle"];
    const id_exact =
      values["searchTitleID"] === undefined ? null : values["searchTitleID"];
    const title_or_author =
      values["searchTitleOrAuthor"] === undefined
        ? null
        : values["searchTitleOrAuthor"];
    const rangeValue = values["date-range"];
    const date_min =
      rangeValue === undefined ? null : rangeValue[0].format("YYYY-MM-DD");
    const date_max =
      rangeValue === undefined ? null : rangeValue[1].format("YYYY-MM-DD");

    this.setState({ loading: true });

    if (!err) {
      axios
        .get(filterURL, {
          params: {
            title_contains,
            id_exact,
            title_or_author,
            view_count_min,
            view_count_max,
            date_min,
            date_max,
            category,
            reviewed,
            notReviewed
          }
        })
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
            onSearch={value => console.log(value)}
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
                        <Checkbox value="C">Duke</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="D">CIDE</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="E">ITAM</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>

              </TabPane>
            <TabPane tab="Country" key="2">
              <Form.Item hasFeedback>
                  {getFieldDecorator("country")(
                    <Cascader options={countries} onChange={this.onChangeCountry} placeholder="Please select" />
                   )}
                </Form.Item>
            </TabPane>
            <TabPane tab="Assignment Type" key="3">
            <Form.Item hasFeedback>
                {getFieldDecorator("assignment_type")( 
                  <Row>
                    <Col span={8}>
                      <Checkbox value="A">Homework Review</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="B">Informative Session</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="C">Product Test</Checkbox>
                    </Col>
                  </Row>
                )}
              </Form.Item>
            </TabPane>
            <TabPane tab="Language" key="4">
            <Form.Item hasFeedback>
                {getFieldDecorator("language")(
                    <div>
                      <Cascader options={countries} onChange={this.onChangeCountry} placeholder="Please select" />
                    </div>
                 )}
            </Form.Item>
            </TabPane>
            </Tabs>
            <Form.Item>
              {getFieldDecorator("radio-group")(
                <Radio.Group>
                  <Radio value="reviewed">Reviewed</Radio>
                  <Radio value="notReviewed">Not Reviewed</Radio>
                </Radio.Group>
              )}
            </Form.Item>

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