import React from 'react';
import { connect } from 'react-redux';
import Hoc from "../hoc/hoc";
import {
  Form,
  Select,
  Slider,
  Button,
  Comment,
  Upload,
  Icon,
  Input,
  Menu,
  Cascader,
  Checkbox,
  Radio,
  message,
  Dropdown,
  Rate,
  Row,
  Col,
} from 'antd';
import {postMeetingReview} from "../store/actions/reviewMeetings";

const { Option } = Select;
const { TextArea } = Input;
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
  </div>
);

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const issue_type = [
    {
      value: '1',
      label: 'User',
    },
    {
      value: '3',
      label: 'Network and Connection',
    },
    {
      value: '4',
      label: 'Other',
    }
];

const success = () => {
  message.success('Thanks for your review');
};

const error = () => {
  message.error('Error while submitting review');
};

class ArticleCustomForm extends React.Component {

  state = {
    comments: [],
    submitting: false,
    value: null,
    issue: null,
    issues: false
  };
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });
  }
  
    handleChange = e => {
      this.setState({
        value: e.target.value,
      });
    };

  normFile = e => {
    e.preventDefault();
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handlerIssues(val) {
    if(val === "Y"){
      this.setState({
        issues: true,
      });
    } else {
      this.setState({
        issues: false
      });
    }
    
  }

  onChangeIssueType = value => {
    console.log('onChangeIssueType changed', value);
    this.setState({ issue: value[0] })
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    await this.props.form.validateFields((err, values) => {
      const attendace =
        values["attendace"] === undefined ? null : values["attendace"];
      const recommendation =
        values["recommendation"] === undefined ? null : values["recommendation"];
      const issues =
        values["issues"] === undefined ? null : values["issues"];
      const issueType =
        values["issues"] === undefined ? null : values["issues"];
      const worthiness =
        values["worthiness"] === undefined ? null : values["worthiness"];
      const rate =
        values["rate"] === undefined ? null : values["rate"];
        const comment =
          values["comment"] === undefined ? null : values["comment"];
      const postObj = {
        user: this.props.username,
        room: "1",
        // room: this.props.roomDetail.RoomDetail,
        attendace: values.attendace,
        meeting_rate: values.rate,
        recommendation: values.recommendation,
        issues: this.state.issues,
        issue_type: this.state.issue,
        worthiness: values.worthiness,
        comment: values.comment,
      }
      if (!err) {
        this.props.postReview(this.props.token, this.props.username, postObj)
        if(this.props.err1 !== null){
          error()

        } else {
          // this.props.history.push('/');
          success();
        }
            // .then(res => {
            //   if (res.status === 201) {
            //     this.props.history.push('/');
            //   }
            // })
            // .catch(error => console.err(error))
            // console.log('Error');
        }

        console.log('Received values of form: ', values);
    });
  }

  // add = (ID) => {
  //   const { form } = this.props;
  //   const user = form.getFieldValue(`user`);
  //   const found = this.props.s.some(el => el[ID] === this.props.pa[ID]);
  //   if (!found) {this.props.s[ID].push( this.props.pa[ID] );}
  //   console.log("user at add() I: ", JSON.stringify(user))
  //    let r = {
  //       "user": this.props.pa[ID],
  //     }
  //   // console.log("qs at add(): ", JSON.stringify(question_chs_id))
  //   console.log("r at add(): ", JSON.stringify(r))
  //   const nextKeys = question_chs_id[ID].choices;
  //   if(ID !== 0){
  //     let rr = null
  //     if(nextKeys.length>1){
  //       rr = globChois
  //       console.log("rr at add() I: ",  JSON.stringify(rr))
  //       console.log("rr at add() II: ",  JSON.stringify(rr.splice(ID, 1, nextKeys)))
  //       rr.splice(ID, 1, nextKeys) 
  //       console.log("rr at add() III: ",  JSON.stringify(rr))
  //     } 
  //     else{
  //       rr = [globChois]
  //       rr[ID]=(nextKeys)
  //     }
  //     console.log("rr at add() IV: ",  JSON.stringify(rr))
  //     globChois = rr
  //     console.log("globChois at add() III: ",  JSON.stringify(globChois))
  //     globChois = globChois.slice(globChois.length - (ID+1)) 
  //     // console.log("globChois splitted at add(): ", (globChois[globChois.length - (ID+1)]))
  //     form.setFieldsValue({
  //       keys: globChois
  //     });
  //   } else {
  //   globChois.push(nextKeys)
  //   console.log("globChois at add() II: ", JSON.stringify(globChois))
  //   globChois = globChois[globChois.length - (ID+1)] 
  //   console.log("globChois at add() III: ", (globChois))
  //   form.setFieldsValue({
  //     keys: [globChois]
  //   });
  //   }
  // };

  render() {
    const { comments, submitting, value } = this.state;
    console.log("this.props: "+ JSON.stringify(this.props))
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { pa, id } = this.props
    getFieldDecorator(`user`, { initialValue: pa[id] });
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    
    return (
        <Hoc>
          <div>
            <h4 style={{display: 'flex', justifyContent: 'center'}}>User attend meeting?</h4>
              <Form.Item key={`${id} attendance`} style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
            {getFieldDecorator(`${pa[id]}.attendance`)(
              <Radio.Group >
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>

            <h4 style={{display: 'flex', justifyContent: 'center'}}>Would your work with this user in future proyects?</h4>
              <Form.Item key={`${id} recommendation`} style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
            {getFieldDecorator(`${pa[id]}.recommendation`)(
              <Radio.Group >
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>

            <h4 style={{display: 'flex', justifyContent: 'center'}}>Issues during meeting?</h4>
              <Form.Item key={`${id} issues`} style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
            {getFieldDecorator(`${pa[id]}.issues`, {
              // initialValue: ['A', 'B'],
            })(
              <Radio.Group>
                <Radio.Button value={true} onClick={() => {this.handlerIssues("Y")}}>
                  Yes
                </Radio.Button>
                <Radio.Button value={false} onClick={() => {this.handlerIssues("N")}}>No</Radio.Button>
                {this.state.issues === true ? (
                  <div>
                  <Cascader options={issue_type} onChange={this.onChangeIssueType} placeholder="Issue">
                    <Button>
                      Issue type <Icon type="down" />
                    </Button>
                  </Cascader>
                  </div>
                ):(null)}
              </Radio.Group>
            )}
          </Form.Item>

            <h4 style={{display: 'flex', justifyContent: 'center'}}>Conversation fluency</h4>
              <Form.Item key={`${id} fluency`} style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
            {getFieldDecorator(`${pa[id]}.worthiness`, {
              initialValue: 3.5,
            })(<Rate tooltips={desc}/>)}
          </Form.Item>

            <h4 style={{display: 'flex', justifyContent: 'center'}}>Rate the meeting</h4>
              <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center'}}>
            {getFieldDecorator(`${pa[id]}.rate`, {
              initialValue: 3.5,
            })(<Rate tooltips={desc}/>)}
          </Form.Item>

            <h4 style={{display: 'flex', justifyContent: 'center'}}>Add Comment</h4>
              <Form.Item key={`${id} comment`} style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ span: 12}}>
            {getFieldDecorator(`${pa[id]}.comment`, {
              initialValue: 3.5,
            })(<Comment
              content={
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />)}
          </Form.Item>
          </div>
        
            {/* <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit">
                Done
              </Button>
            </Form.Item> */}
        </Hoc>
    );
  }
}

const WrappedArticleCreate = Form.create()(ArticleCustomForm);

const mapStateToProps = state => {
  console.log("mapStateToProps: "+JSON.stringify(state))
  /*console.log("1) ASNT List mapStateToProps containers state 1: "+ JSON.stringify(state.assignments.assignments))
  console.log("2) ASNT List mapStateToProps containers state 2: "+ JSON.stringify(state.assignments))
  console.log("2) ASNT List mapStateToProps containers state 3: "+ JSON.stringify(state))*/
  return {
    token: state.auth.token,
    username: state.auth.username,
    err1: state.reviewMeeting.error
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    postReview: (token, userID, data) => dispatch(postMeetingReview(token, userID, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (WrappedArticleCreate);