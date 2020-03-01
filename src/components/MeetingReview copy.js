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

  render() {
    const { comments, submitting, value } = this.state;
    console.log("this.props: "+ JSON.stringify(this.props))
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { pa } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    getFieldDecorator(`user[${this.props.id}]`, { initialValue: [] });
    const userL = getFieldValue("user");
    console.log("GETFIELD VALUE USERL: "+ JSON.stringify(userL))
    console.log("GETFIELD VALUE USERL: "+ JSON.stringify(userL[0]))
    console.log("GETFIELD VALUE USERL: "+ JSON.stringify(this.props.id))
    const formItems = userL[this.props.id].map((k, index) => (
      <div>
      <h4 style={{display: 'flex', justifyContent: 'center'}}>User attend meeting?</h4>
       <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
         {getFieldDecorator(`user[${this.props.id}]attendace[${k}]`)(
           <Radio.Group >
             <Radio.Button value={true}>Yes</Radio.Button>
             <Radio.Button value={false}>No</Radio.Button>
           </Radio.Group>,
         )}
       </Form.Item>

       <h4  style={{display: 'flex', justifyContent: 'center'}}>Would your work with this user in future proyects?</h4>
       <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
         {getFieldDecorator(`user[${this.props.id}]recommendation[${k}]`)(
           <Radio.Group >
             <Radio.Button value={true}>Yes</Radio.Button>
             <Radio.Button value={false}>No</Radio.Button>
           </Radio.Group>,
         )}
       </Form.Item>

       <h4 style={{display: 'flex', justifyContent: 'center'}}>Issues during meeting?</h4>
       <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
         {getFieldDecorator(`user[${this.props.id}]issues[${k}]`, {
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
       <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
         {getFieldDecorator(`user[${this.props.id}]worthiness[${k}]`, {
           initialValue: 3.5,
         })(<Rate tooltips={desc}/>)}
       </Form.Item>

       <h4 style={{display: 'flex', justifyContent: 'center'}}>Rate the meeting</h4>
       <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center'}}>
         {getFieldDecorator(`user[${this.props.id}]rate[${k}]`, {
           initialValue: 3.5,
         })(<Rate tooltips={desc}/>)}
       </Form.Item>

       <h4 style={{display: 'flex', justifyContent: 'center'}}>Add Comments</h4>
       <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ span: 12}}>
         {getFieldDecorator(`user[${this.props.id}]comment[${k}]`, {
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
    ));
    return (
      // <Form {...formItemLayout} onSubmit={event => this.handleFormSubmit(event)} key={this.props.id}>
        <Hoc>
          {/* <h4 style={{display: 'flex', justifyContent: 'center'}}>User attend meeting?</h4>
        <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
          {getFieldDecorator(`attendace[${this.props.id}]`)(
            <Radio.Group >
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>,
          )}
        </Form.Item>

        <h4  style={{display: 'flex', justifyContent: 'center'}}>Would your work with this user in future proyects?</h4>
        <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
          {getFieldDecorator(`recommendation[${this.props.id}]`)(
            <Radio.Group >
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>,
          )}
        </Form.Item>

        <h4 style={{display: 'flex', justifyContent: 'center'}}>Issues during meeting?</h4>
        <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
          {getFieldDecorator(`issues[${this.props.id}]`, {
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
        <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
          {getFieldDecorator(`worthiness[${this.props.id}]`, {
            initialValue: 3.5,
          })(<Rate tooltips={desc}/>)}
        </Form.Item>

        <h4 style={{display: 'flex', justifyContent: 'center'}}>Rate the meeting</h4>
        <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center'}}>
          {getFieldDecorator(`rate[${this.props.id}]`, {
            initialValue: 3.5,
          })(<Rate tooltips={desc}/>)}
        </Form.Item>

        <h4 style={{display: 'flex', justifyContent: 'center'}}>Add Comments</h4>
        <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ span: 12}}>
          {getFieldDecorator(`comment[${this.props.id}]`, {
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
        </Form.Item> */}
        {formItems}
        <Form.Item style={{display: 'flex', justifyContent: 'center'}} wrapperCol={{ justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form.Item>
        </Hoc>
      // </Form>
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