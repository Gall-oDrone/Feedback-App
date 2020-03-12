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
import Results from './InquiryResults';
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
      const audience =
      values["university"] === undefined ? null : values["university"];
    const view_count_max =
      values["country"] === undefined ? null : values["country"];
    const itype =
      values["assignment_type"] === undefined ? null : values["assignment_type"];
    let notReviewed = null;
    let reviewed =
      values["language"] === undefined ? null : values["language"];
    const title_contains =
      values["searchTitle"] === undefined ? null : values["searchTitle"];
    const title_or_author =
      values["searchTitleOrAuthor"] === undefined
        ? null
        : values["searchTitleOrAuthor"];

    this.setState({ loading: true });

    if (!err) {
      console.log("DATA: ", JSON.stringify(itype))
      axios
        .get("http://127.0.0.1:8000/api/filter", {
          params: {
            title_contains,
            audience,
            itype
            
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
        <Collapse defaultActiveKey={['1']} onChange={callback}>
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