import React from "react";
import { connect } from "react-redux";
import Questions from "./SurveyQuestions";
import Choices from "./SurveyChoices";
import { getASNTSDetail } from "../store/actions/assignments";
import Hoc from "../hoc/hoc";
import { Form, Input, Icon, Button, Upload } from 'antd';
import TextArea from "antd/lib/input/TextArea";

let id = 0;
let question_chs_id = [{id:0, adder: 0, topics:[]}];
let globChois = [];
const FormItem = Form.Item;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class QuestionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      previewVisible: false,
      loading: false,
      previewImage: '',
      imageThumbUrl: null,
      imageUrl: null,
      topic: null,
      inquirty_type: null,
      language: null,
      fileList: [],
      imagePath: '',
      disbled_dates: [],
      chars_left: 200,
      panel: null,
      open: false,
      // fileList: [
      //   {
      //     uid: '-1',
      //     name: 'x.png',
      //     status: 'done',
      //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      //     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //   },
      // ],
      // imagePath: '',
      };
  }

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 5000);
  };

  normFile = e => {
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);
    console.log('Upload event:', e);
    // console.log('Upload fileList:', JSON.stringify(fileList));
    // console.log('Upload file.name:', fileList[0].name);
    if (Array.isArray(e)) {
      return e;
    }
    return e && fileList;
  };

  normFile2 = e => {
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);
    console.log('Upload event:', e);
    // console.log('Upload fileList:', JSON.stringify(fileList));
    // console.log('Upload file.name:', fileList[0].name);
    if (Array.isArray(e)) {
      return e;
    }
    return e && fileList;
  };

  handleFileList = (thumbnail, fileList) => {
    console.log("IUOIU")
    console.log(JSON.stringify(thumbnail))
    if (fileList !== null){
      console.log(JSON.stringify(fileList[0].thumbUrl))
      fileList[0].thumbUrl = thumbnail
      console.log(JSON.stringify(fileList[0].thumbUrl))
      return fileList
    } else {
      return
    }
  }

  handlePreview = async file => {
    console.log("CORSO 555555")
    console.log(JSON.stringify(file))
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

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
    if (!found) {question_chs_id.push({ "id":ID, "adder": 0, topics: keys[ID].concat(0) });}
    console.log("keys at add() I: ", JSON.stringify(keys))
     let r = {
        "id": ID,
        "adder": question_chs_id[ID].adder,
        "topics": keys[ID].concat(question_chs_id[ID].adder++)
      }
    r.adder += 1
    question_chs_id[ID] = r
    // console.log("qs at add(): ", JSON.stringify(question_chs_id))
    console.log("r at add(): ", JSON.stringify(r))
    const nextKeys = question_chs_id[ID].topics;
    console.log("qs chois at add() II: ", JSON.stringify(question_chs_id[ID].topics))
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
    const { fileList } = this.state;
    getFieldDecorator(`keys[${this.props.id}]`, { initialValue: [] });
    const keys = getFieldValue("keys");
    getFieldDecorator(`keys2`);
    // console.log("keys at render", JSON.stringify(keys))
    // console.log("THIS PROPS AT SQF2", JSON.stringify(this.props))
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const formItems = keys[this.props.id].map((k, index) => (
      <Form.Item
        label={index === 0 ? 'Topic Title' : ''}
        key={k}>
        {getFieldDecorator(`lesson[${this.props.id}]topics[${k}][title]`, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: `Lesson Topic Title ${k}`,
          preserve: true,
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input a title for this topic ",
            },
          ],
        })(<Input placeholder="Title" />)}
        <FormItem label="Topic Description: ">
          {getFieldDecorator(`lesson[${this.props.id}]topics[${k}][desc]`, {
            validateTrigger: ['onChange', 'onBlur'],
            initialValue: `Lesson Topic Description ${k}`,
            preserve: true,
            rules: [
              {
                required: true,
                message: "Please input a description",
              },
            ],
          })(<TextArea placeholder="Topic Description" />)}
        </FormItem>
        <FormItem style={{display:"flex", flexDirection:"row", justifyContent:"center"}} label="Topic Media: ">
          {getFieldDecorator(`lesson[${this.props.id}]topics[${k}][media]`, {
            initialValue: this.handleFileList(null, null),
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            setFieldsValue: "fileList",
            preserve: true,
            rules: [
              {
                required: false,
                message: "Please upload a video for this topic",
              },
            ],
          })(
            <Upload 
              name="topic_media" 
              key={`topic_media_${this.props.id}`}
              onPreview={this.handlePreview} 
              listType="picture-card" 
              customRequest={this.dummyRequest}
            >
              {fileList.length === 1 ? null : uploadButton}
            </Upload>
          )}
        </FormItem>
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
        <FormItem label="Lesson: ">
          {getFieldDecorator(`lesson[${this.props.id}][lesson_title]`, {
            validateTrigger: ['onChange', 'onBlur'],
            initialValue: `Lesson Title ${this.props.id}`,
            preserve: true,
            rules: [
              {
                required: true,
                message: "Please input a lesson",
              },
            ],
          })(<Input placeholder="Lesson Title" />)}
        </FormItem>
        <FormItem label="Lesson Description: ">
          {getFieldDecorator(`lesson[${this.props.id}[lesson_desc]`, {
            validateTrigger: ['onChange', 'onBlur'],
            initialValue: `Lesson Description ${this.props.id}`,
            preserve: true,
            rules: [
              {
                required: true,
                message: "Please input a lesson",
              },
            ],
          })(<TextArea placeholder="Lesson Description" />)}
        </FormItem>
        <FormItem style={{display:"flex", flexDirection:"row", justifyContent:"center"}} label="Lesson Media: ">
          {getFieldDecorator(`lesson[${this.props.id}[lesson_media]`, {
            validateTrigger: ['onChange', 'onBlur'],
            initialValue: this.handleFileList(null, null),
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            setFieldsValue: "fileList",
            preserve: true,
            rules: [
              {
                required: true,
                message: "Please upload a video",
              },
            ],
          })(
            <Upload 
              name="media" 
              key={`lesson_media_${this.props.id}`}
              onPreview={this.handlePreview} 
              listType="picture-card" 
              customRequest={this.dummyRequest}
            >
              {fileList.length === 1 ? null : uploadButton}
            </Upload>
          )}
        </FormItem>
          {formItems}
          <FormItem>
            <Button type="dashed" onClick={() => this.add(this.props.id)} style={{ width: "60%" }}>
              <Icon type="plus" /> Add another topic
            </Button>
          </FormItem>
      </Hoc>
    );
  }
}

// export default QuestionForm
const WrappedLessonCreate = Form.create({})(QuestionForm);
export default WrappedLessonCreate

// const mapStateToProps = state => {
//   return {
//     token: state.auth.token,
//     username: state.auth.username,
//     loading: state.survey.loading
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     createSurvey: (token, asnt) => dispatch(createSurvey(token, asnt))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(WrappedLessonCreate);