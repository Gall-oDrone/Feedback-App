import React from "react";
import { connect } from "react-redux";
import Questions from "./Questions";
import Choices from "../components/Choices";
import { getASNTSDetail } from "../store/actions/assignments";
import Hoc from "../hoc/hoc";
import { Form, Input, Icon, Button } from 'antd';

let id = 0;
const FormItem = Form.Item;

class QuestionForm extends React.Component {
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        label={index === 0 ? 'Choices' : ''}
        key={k} >
        {getFieldDecorator(`question[${this.props.id}] choices[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input a choice  to the question ",
            },
          ],
        })(<Input placeholder="Answer choice" />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Hoc>
        <FormItem label="Question: ">
          {getFieldDecorator(`question[${this.props.id}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                message: "Please input a question",
              },
            ],
          })(<Input placeholder="Add a question" />)}
        </FormItem>
          <Form.Item label="Answer: ">
          {getFieldDecorator(`answers[${this.props.id}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                message: "Answer question",
              },
            ],
          })(<Input placeholder="What is the answer?" />)}
          </Form.Item>
          {formItems}
          <FormItem>
            <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
              <Icon type="plus" /> Add an answer choice
            </Button>
          </FormItem>
      </Hoc>
    );
  }
}

export default QuestionForm