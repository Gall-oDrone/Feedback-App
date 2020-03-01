import React from "react";
import { connect } from "react-redux";
import Questions from "./SurveyQuestions";
import Choices from "./SurveyChoices";
import { getASNTSDetail } from "../store/actions/assignments";
import Hoc from "../hoc/hoc";
import { Form, Input, Icon, Button } from 'antd';

let id = 0;
let question_chs_id = [{id:0, adder: 0, choices:[]}];
let globChois = [];
const FormItem = Form.Item;

class QuestionForm extends React.Component {
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    console.log("keys at remove() I: ", JSON.stringify(keys))
    console.log("k at remove() I: ", JSON.stringify(k))

    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = (ID) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys`);
    const found = question_chs_id.some(el => el.id === ID);
    if (!found) {question_chs_id.push({ "id":ID, "adder": 0, choices: keys[ID].concat(0) });}
    console.log("keys at add() I: ", JSON.stringify(keys))
     let r = {
        "id": ID,
        "adder": question_chs_id[ID].adder,
        "choices": keys[ID].concat(question_chs_id[ID].adder++)
      }
    r.adder += 1
    question_chs_id[ID] = r
    // console.log("qs at add(): ", JSON.stringify(question_chs_id))
    console.log("r at add(): ", JSON.stringify(r))
    const nextKeys = question_chs_id[ID].choices;
    console.log("qs chois at add() II: ", JSON.stringify(question_chs_id[ID].choices))
    console.log("nextKeys: ", JSON.stringify(nextKeys))
    console.log("keys at add() II: ", JSON.stringify(keys))
    console.log("globChois at add() I: ", JSON.stringify(globChois))
    if(ID !== 0){
      let rr = null
      if(nextKeys.length>1){
        rr = globChois
        console.log("rr at add() I: ",  JSON.stringify(rr))
        console.log("rr at add() II: ",  JSON.stringify(rr.splice(ID, 1, nextKeys)))
        rr.splice(ID, 1, nextKeys) 
        console.log("rr at add() III: ",  JSON.stringify(rr))
      } 
      else{
        rr = [globChois]
        rr[ID]=(nextKeys)
      }
      console.log("rr at add() IV: ",  JSON.stringify(rr))
      globChois = rr
      console.log("globChois at add() III: ",  JSON.stringify(globChois))
      globChois = globChois.slice(globChois.length - (ID+1)) 
      // console.log("globChois splitted at add(): ", (globChois[globChois.length - (ID+1)]))
      form.setFieldsValue({
        keys: globChois
      });
    } else {
    globChois.push(nextKeys)
    console.log("globChois at add() II: ", JSON.stringify(globChois))
    globChois = globChois[globChois.length - (ID+1)] 
    console.log("globChois at add() III: ", (globChois))
    form.setFieldsValue({
      keys: [globChois]
    });
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { survey_questions } = this.props.userPSD.surveyDetail;
    let q_arr = [];
    survey_questions.forEach(el => {
      q_arr.push([el.question])
    })
    console.log("q_arr VALUES", JSON.stringify(q_arr))
    for (let i=0; i < survey_questions; i+= 1) {
      console.log("XXX", JSON.stringify(survey_questions[i].choices))

    }
    getFieldDecorator(`keys[${this.props.id}]`, { initialValue: [] });
    const keys = getFieldValue("keys");
    console.log("keys at render", JSON.stringify(keys))
    console.log("THIS PROPS AT SQF2", JSON.stringify(this.props))
    const formItems = keys[this.props.id].map((k, index) => (
      <Form.Item
        label={index === 0 ? 'Option' : ''}
        key={k}>
        {getFieldDecorator(`questions[${this.props.id}]choices[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input a choice  to the question ",
            },
          ],
        })(<Input placeholder="Answer option" />)}
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
            initialValue: q_arr,
            rules: [
              {
                required: true,
                message: "Please input a question",
              },
            ],
          })(<Input placeholder="Add a question" />)}
        </FormItem>
          {formItems}
          <FormItem>
            <Button type="dashed" onClick={() => this.add(this.props.id)} style={{ width: "60%" }}>
              <Icon type="plus" /> Add an answer option
            </Button>
          </FormItem>
      </Hoc>
    );
  }
}

export default QuestionForm