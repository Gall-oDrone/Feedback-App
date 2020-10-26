import React from 'react';
import { connect } from 'react-redux';
import Hoc from "../hoc/hoc";
import {
  Form,
  Select,
  InputNumber,
  Button,
  Upload,
  Icon,
  Input,
  Checkbox,
  Divider,
  Modal,
  Row,
  Cascader,
  Col,
  DatePicker,
  TimePicker
} from 'antd';
import {workshopCreateURL} from "../constants";
import SurveyQuestionForm from "../containers/WorkshopLessonForm"
import moment from "moment";
import axios from 'axios';
import lodash from "lodash";
import Lessons from "../containers/LessonCreate";
import "../assets/workshop.css"
import Pic from "../components/WorkshopPicUploader";

const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};
const TimeRelatedForm = () => {
  const onFinish = fieldsValue => {
    // Should format date value before submit.
    const rangeValue = fieldsValue['range-picker'];
    const rangeTimeValue = fieldsValue['range-time-picker'];
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
      'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
      'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      'range-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
  };
}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const i_type = [
  {
    value: 'homework review',
    label: 'Homework Review'
  },
  {
    value: 'admissions',
    label: 'Admissions'
  },
  {
    value: 'college information',
    label: 'College Information'
  },
  {
    value: 'scholarships',
    label: 'Scholarships'
  },
  {
    value: 'class review',
    label: 'Class Review'
  },
  {
    value: 'other',
    label: 'Other'
  }
]
const language = [
  {
    value: 'spanish',
    label: 'Spanish'
  },
  {
    value: 'english',
    label: 'English'
  },
]
const topic = [
  {
    value: 'Economics',
    label: 'Economics'
  },
  {
    value: 'Finance',
    label: 'Finance'
  },
  {
    value: 'Econometrics',
    label: 'Econometrics'
  },
  {
    value: 'Machine Learning',
    label: 'Machine Learning'
  },
  {
    value: 'AI',
    label: 'AI'
  }
]

class ArticleCustomForm extends React.Component {

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
      dateArray: [],
      currentMonth: moment().months(),
      monthArray: [],
      defaultSelectedWeekday: [1, 2, 3, 4, 5, 6, 0],
      defaultSelectedMonth: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      startTime:null,
      endTime:true,
      selectedImage:null,
      formCount: 1
    };
  }
  remove = () => {
    const {formCount} = this.state;
        this.setState({
            formCount: formCount - 1
        })
  };

  add = () => {
    const {formCount} = this.state;
    if(formCount < 6){
        this.setState({
            formCount: formCount + 1
        })
    };
  }
  handleLessonsList = (val) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({lessons:val})
  }
  handleSelectedPicture = (val) => {
    this.setState({selectedImage: val})
  }

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 5000);
  };

  priceOnChange(value) {
    console.log('changed', value);
  }

  handleTopic = value => {
    console.log('handleTopic', value);
    this.setState({ topic: value[0] })
  }

  handleInquiryType = value => {
    console.log('handleInquiryType', value);
    this.setState({ inquirty_type: value[0] })
  }

  handleLanguage = value => {
    console.log('handleLanguage', value);
    this.setState({ language: value[0] })
  }

  normFile = e => {
    console.log('Upload fileList:', (e), 
    // e.currentTarget, 
    // e.currentTarget.ref, 
    // e.target, 
    // e.currentTarget,
    // e.currentTarget.fileList,
    // e.target.files[0],
    // e.target.fileList,
    // e.currentTarget.files[0]);
    )
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);
    console.log('Upload fileList:', JSON.stringify(fileList));
    // console.log('Upload file.name:', fileList[0].name);
    if (Array.isArray(e)) {
      return e;
    }
    if (fileList.length == 0){
      this.setState({fileList: []})
    } else {
      this.setState({fileList: [...fileList]})
    }
    return e && fileList;
  };

  onTimeChange(time, timeString) {
    console.log("EHRENO: ", time.hour(), timeString);
    const { startTime, endTime} = this.state
    this.setState({startTime: time, endTime:false})
  }
  onTimeChange2(time, timeString) {
    console.log(time, timeString);
    const { startTime, endTime} = this.state
    if(startTime !== null){
      this.setState({endTime: false})
    }
  }

  onDateChange(date, dateString, e) {
    console.log("puto 1: ", date, dateString, date.date());
    let newDateArray = [...this.state.dateArray];
    let addSelectedDateClass = "selectedDate";
    if (lodash.includes(newDateArray, date) === false) {
      newDateArray.push(date);
    } else {
      lodash.remove(newDateArray, item => {
        return item === date;
      });
    }
    this.setState(
      {
        dateArray: newDateArray,
        currentMonth: date.months()
      },
      () => {
        // console.log(this.state.dateArray, "当前选中的日期")
      }
    );
    return (
      <div
        data-disabled={false}
        data-date={dateString}
        className={`ant-calendar-date multdate ${addSelectedDateClass}`}
      >
        {date.date()}
      </div>
    );
  }

  handleDefaultValue = currentDate => {
    const { defaultValue = [] } = this.props;
    this.state.dateArray = defaultValue;
  };

  handleDateArray = ({ date, ischecked }) => {
    let newDateArray = [...this.state.dateArray];
    if (ischecked === true) {
      newDateArray.push(date);
    } else {
      lodash.remove(newDateArray, item => {
        return item === date;
      });
    }

    this.setState(
      {
        dateArray: newDateArray
      },
      () => {
        // console.log(this.state.dateArray, "当前选中的日期")
      }
    );
  };

  handlePanelChange =  (value, mod) => {
    console.log("TIRA PA: ", value, mod)
    this.setState({
      currentMonth: value.months(),
      panel: mod
    });
  }

  handleOpenChange = open => {
    if (open) {
      this.setState({
        open
      });
    }
  };

  handleOnSelect(value, mode) {
    console.log("PUTO", value, mode);
  }


  disabledDate = date => {

    console.log("CHANGES: ", moment(date).format('MM-DD'), date.months(), date.days(), date, moment().year(), date.years() ===  moment().year())
    const { defaultSelectedWeekday, defaultSelectedMonth, dateArray, currentMonth } = this.state;

    if (defaultSelectedMonth.indexOf(date.months()) === -1 ) {
      return true;
    }

    console.log("CHANGES 2.5: ", dateArray)
    if (defaultSelectedWeekday.indexOf(date.days()) === -1) {
      return true;
    }

    var futureMonth = moment(date).add(1, 'M');
    var futureMonthEnd = moment(futureMonth).endOf('month');
    let index = dateArray.findIndex(dateV => moment(dateV).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
      return index !== -1 || date < moment().endOf('day') || date.years() !==  moment().year()
  };

  disableHour = value => {
    console.log(value)
    const { startTime, endTime} = this.state
    let disabled_hrs = []
    for(var i=0; i<=(startTime.hour()); i++){
      disabled_hrs.push(i)
    }
    return disabled_hrs;
  }

  dateRender = (currentDate, today) => {
    const { defaultSelectedWeekday, defaultSelectedMonth, panel, dateArray, monthArray } = this.state;
    let disabled = "false";
    let addSelectedDateClass = "";
    let addSelectedMonthClass = "";
    const style = {};
    const stringDate = currentDate.format("YYYY-MM-DD");
    const stringMonth = currentDate.format("MM");
    
    if (defaultSelectedWeekday.indexOf(currentDate.days()) === -1) {
      disabled = "true";
      //需要同步处理当前已选的日期, 把之前选择的日期剔除
      lodash.remove(this.state.dateArray, item => {
        return item === stringDate;
      });
    }

    if (defaultSelectedMonth.indexOf(currentDate.months()) === -1) {
      disabled = "true";
      addSelectedMonthClass = "ant-calendar-month-panel-cell-disabled";
      lodash.remove(this.state.monthArray, item => {
        return item === stringMonth;
      });
    }

    //输出日期的时候判断是否在选择的日期列表中 , 存在则添加一个样式
    if (dateArray.indexOf(stringDate) < -1) {
      disabled = "false";
      addSelectedDateClass = "selectedDate";
    }

    if (monthArray.indexOf(stringMonth) < -1) {
      disabled = "false";
      addSelectedMonthClass = "ant-calendar-month-panel-selected-cel";
    }

    return (
      <div
        data-disabled={disabled}
        data-date={stringDate}
        className={`ant-calendar-date multdate ${addSelectedDateClass}`}
        style={style}
      >
        {currentDate.date()}
      </div>
    );
  };

  //获取选择的 星期
  onChangeSelectWeekday = checked => {
    // console.log(checked, "onChangeSelectWeekday");
    this.setState({
      defaultSelectedWeekday: checked
    });
  };

  onChangeSelectMonth = checked => {
    // console.log(checked, "onChangeSelectWeekday");
    this.setState({
      defaultSelectedMonth: checked
    });
  };

  //关闭 隐藏显示 日历选择控件
  closeDatePicker = () => {
    const { dateArray } = this.state;
    this.setState(
      {
        open: false
      },
      () => {
        try {
          this.props.onChange(dateArray);
        } catch (error) {}
      }
    );

    // console.log(dateArray, "最终选择的日期");
  };

  //日历控件 底下的内容
  dateFooterContent = mode => {
    return (
      <div align="right">
        <Button
          onClick={this.closeDatePicker}
          type="primary"
          size="small"
          style={{ marginRight: 10 }}
        >
          OK
        </Button>

        <Button
          onClick={this.closeDatePicker}
          style={{ marginRight: 10 }}
          size="small"
        >
          Cancel
        </Button>

        <Button
          onClick={() => {
            this.setState({
              defaultSelectedWeekday: [1, 2, 3, 4, 5, 6, 0],
              defaultSelectedMonth: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
              dateArray: []
            });
          }}
          type="danger"
          size="small"
        >
          Restart
        </Button>
      </div>
    );
  };


  // disabledDate(current) {
  //   // Can not select days before today and today
  //   console.log("PUTO 2: ", current, moment('2020-06-16').format('YYYYMMDD')) ;
  //   const dates = ['2020-06-16', '2020-06-20', '2020-06-11', '2020-06-18', '2020-06-25', '2020-06-04'];
  //   let index = dates.findIndex(date => date === moment(current).format('YYYY-MM-DD'))
  //   return index !== -1 && true
  //   return current && current < moment().endOf('day') && !!dates.find(d=>current === moment(d));
  // }

  handleFileList = (thumbnail, fileList) => {
    console.log("IUO")
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

  handleCancel = () => this.setState({ previewVisible: false });

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

  handleChange(event) {
    var input = event.target.value;
    this.setState({
        chars_left: 200 - input.length
    });
  }

  handleFormSubmit =  (event) => {
    event.preventDefault();
    const { selectedImage } = this.state
    // console.log("handleFormSubmit", dateArray, defaultSelectedWeekday)
    let formData = new FormData();
     this.props.form.validateFields((err, values) => {
      console.log("handleFormSubmit values: ", JSON.stringify(values));
      const title =
        values["title"] === undefined ? null : values["title"];
      const content =
        values["content"] === undefined ? null : values["content"];
      const topic =
        values["topic"] === undefined ? null : values["topic"];
    //  const lessons = [];
    //   for (let i =0; i< values.lessons.length; i += 1) {
    //       lessons.push({
    //         title: values.lesson[i].title,
    //         desc: values.lesson[i].desc,
    //         media: values.lesson[i].media,
    //         topics: values.lesson[i].topics,
    //     });
    //   }
      // const datepicker =
      //   values["date-picker"] === undefined ? null : values["date-picker"];
      // const price =
      //   values["price"] === undefined ? null : values["price"];
      // const max_hours =
      //   values["max_hours"] === undefined ? null : values["max_hours"];
      // const start_time =
      //   values["start_time"] === undefined ? null : values["start_time"];
      // const end_time =
      //   values["end_time"] === undefined ? null : values["end_time"];
      const postObj = {
        user: this.props.username,
        title: "title",
        content: "content",
        topics: "topic",
        // lessons: lessons,
        // datepicker: values.datepicker,       
        // price: values.price,       
        // max_hours: values.max_hours,
        // start_time: values.start_time,
        // end_time: values.end_time,
        // weekdays: defaultSelectedWeekday,
        // months: defaultSelectedMonth,
        // dates: dateArray
      }
      console.log("postObj: ", JSON.stringify(postObj), selectedImage)
      if (selectedImage !== null){
        formData.append("file", selectedImage)
      }
      const lessons = [];
      const topics = [];
        for (let i =0; i< values.lesson.length; i += 1) {
          console.log("lessons2: ", JSON.stringify(values.lesson[i].topics[0].title), values.lesson[i].lesson_media[0].originFileObj)
          formData.append(`lesson_media_${i}`, values.lesson[i].lesson_media[0].originFileObj)

          // lessons.push({
          //   lesson_title: values.lesson[i].lesson_title,
          //   lesson_desc: values.lesson[i].lesson_desc,
          // });

          for (let j =0; j< values.lesson[i].topics.length; j += 1) {
            formData.append(`topic_media_${j}`, values.lesson[i].topics[j].media[0].originFileObj)
            topics.push({
              lesson_topic_title: values.lesson[i].topics[j].title,
              lesson_topic_desc: values.lesson[i].topics[j].desc,
            })
            lessons.push({
              lesson_title: values.lesson[i].lesson_title,
              lesson_desc: values.lesson[i].lesson_desc,
              lesson_topics: topics
            });
          }
        }
        // postObj["lessons"] = lessons
        // console.log("lessons2: ", JSON.stringify(lessons2))
      if (!err) {
        // const lessons2 = [];
        // for (let i =0; i< values.lesson.length; i += 1) {
        //     lessons2.push({
        //       lesson_title: values.lesson[i].title,
        //       lesson_desc: values.lesson[i].description,
        //       lesson_media: values.lesson[i].media,
        //       lesson_topics: {
        //         lesson_topic_title: values.lesson[i].topics.filter(el => el !== null && el === "title"),
        //         lesson_topic_desc: values.lesson[i].topics.filter(el => el !== null && el === "desc"),
        //         lesson_topic_media: values.lesson[i].topics.filter(el => el !== null && el === "media"),
        //       },
        //     });
        // }
        postObj["lessons"] = lessons
        console.log("postObj 2: ", JSON.stringify(postObj))
        formData.append("data", JSON.stringify(postObj))
        axios.defaults.headers = {
          "content-type": "multipart/form-data",
          Authorization: `Token ${this.props.token}`
        };
          axios.post(workshopCreateURL, 
          formData
          )
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fileList, previewVisible, previewImage, chars_left, endTime } = this.state;
    const contact_option = form.getFieldValue(`contact_options`);
    const lessons = [];
    for (let i=0; i < this.state.formCount; i+= 1) {
      lessons.push(
        <Hoc key= {i}>
          {lessons.length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type = "minus-circle-o"
              disabled={lessons.length === 0 || lessons.length === 6}
              onClick={() => this.remove()}
              />
          ) : null}
          <SurveyQuestionForm id={i} {...this.props} />
          <Divider />
        </Hoc>
        );
    }
    console.log("contact_option  I: "+ JSON.stringify(contact_option))
    const fields = getFieldValue("upload")
    console.log("upload  I: "+ JSON.stringify(fields))
    console.log("upload II: "+ getFieldValue("fileList"), getFieldValue("upload"), fileList.length, fileList)
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const uploadButton = (
      <div className="workshop-poster-pic-cont">
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Form {...formItemLayout} onSubmit={event => this.handleFormSubmit(
        event,
        this.props.requestType,
        this.props.articleID)}>

        <p>Title</p>
        <Form.Item label={"Workshop Title:"}>
          {getFieldDecorator(`title`, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: "C",
          rules: [
            {
              required: true,
              message: "Please input a title.",
            },
          ],
        })(<Input placeholder="Add a title" style={{ width: '60%', marginRight: 8 }} />)}
        </Form.Item>

          <p>Description about the Workshop</p>
        <Form.Item label="Description" hasFeedback>
          {getFieldDecorator('content', {
            initialValue: "C",
            rules: [{ required: true, message: 'Please enter a content' }],
          })(<Input.TextArea maxLength={200} onChange={this.handleChange.bind(this)} />
          )}
            <p>Characters Left: {chars_left}</p>
        </Form.Item>

        <p>Workshop Main Poster Photo</p>
        <Form.Item style={{justifyContent: "center", display: "flex"}} extra="1MB Max Size">
                {getFieldDecorator('upload', {
                  initialValue: this.handleFileList(null, null),
                  rules: [{ required: false, message: 'Please upload a photo'}],
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  setFieldsValue: "fileList"
                })(
                  <Pic profile_pic={this.handleSelectedPicture} />
                  // <Upload 
                  //   name="photo" 
                  //   key="workshop photo" 
                  //   onPreview={this.handlePreview} 
                  //   listType="picture-card" 
                  //   customRequest={this.dummyRequest}
                  //   className="upload-cont"
                  // >
                  //   {/* {fileList.length === 1 ? null : uploadButton} */}
                  // </Upload>
                )}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
        </Form.Item>

      <p>Workshop Categories</p>
       <Form.Item label="Topics">
          {getFieldDecorator('topics', {
            initialValue: ["C"],
                rules: [
                  { required: true, message: 'Please select or type a topic!', type: 'array' },
                ],
              })(
                <Select name="topics" mode="tags" placeholder="Please select or type a topic">
                </Select>,
              )
          }
        </Form.Item>
        <div>
          <Form layout="inline">
            <Form.Item label="Datepicker" />
              <RangePicker 
                disabledDate={this.disabledDate} 
                onOpenChange={this.handleOpenChange}  
                onPanelChange={this.handlePanelChange}
                onChange={this.onDateChange.bind(this)}
                dateRender={this.dateRender} size={"default"}
              />
          </Form>
        </div>

        <Form.Item label="Workshop Fee" hasFeedback>
            {getFieldDecorator('price', {
              initialValue: 50,
              rules: [{ required: true, message: 'Please enter a valid price' }],
            })(
              <InputNumber
                name="price"
                // defaultValue={50}
                min={0}
                max={100}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={this.priceOnChange}
              />
            )}
            </Form.Item>
              <div>
                  <h1>Workshop Lessons/Modules</h1>
                  {lessons}
                <Form.Item >
                  <Button type="secondary" onClick={this.add} >
                    <Icon type="plus" /> Add a lesson or module
                  </Button>
                </Form.Item>
              </div>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" >
            Post
          </Button>
        </Form.Item>
      </Form>
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