import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Select,
  InputNumber,
  Button,
  Upload,
  Icon,
  Input,
  Checkbox,
  Modal,
  Row,
  Cascader,
  Col,
  DatePicker,
  TimePicker
} from 'antd';
import {workshopCreateURL} from "../constants";
import moment from "moment";
import axios from 'axios';
import lodash from "lodash";
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { MonthPicker } = DatePicker;
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
      chars_left: 400,
      panel: null,
      open: false,
      dateArray: [],
      currentMonth: moment().months(),
      monthArray: [],
      defaultSelectedWeekday: [1, 2, 3, 4, 5, 6, 0],
      defaultSelectedMonth: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      startTime:null,
      endTime:true,
    };
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
      this.setState({endTime: time})
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

    // if (dateArray.indexOf(stringDate) > -1) {
    //   addSelectedDateClass = "selectedDate";
    // }

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
    //根据选择的日期判断是否要禁用日期选择
    //1-6为周一到周六, 周日为0
    console.log("CHANGES: ", moment(date).format('MM-DD'), date.months(), date.days(), date, moment().year(), date.years() ===  moment().year())
    const { defaultSelectedWeekday, defaultSelectedMonth, dateArray, currentMonth } = this.state;

    if (defaultSelectedMonth.indexOf(date.months()) === -1 ) {
      return true;
    }

    console.log("CHANGES 2.5: ", dateArray)
    if (defaultSelectedWeekday.indexOf(date.days()) === -1) {
      return true;
    }
    let index = dateArray.findIndex(dateV => moment(dateV).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
      return index !== -1 || date < moment().endOf('day') || date.years() !==  moment().year()
  };

  disabledMonth = date => {
    //根据选择的日期判断是否要禁用日期选择
    //1-6为周一到周六, 周日为0
    // console.log("CHANGES 2: ", moment(date).format('MM-DD'), date.months(), currentMonth, date.days())
    // const { defaultSelectedWeekday, dateArray, currentMonth } = this.state;
    // if (defaultSelectedWeekday.indexOf(date.days()) === -1 && date.months() === currentMonth) {
    //   return true;
    // }
    // let index = dateArray.findIndex(dateV => moment(dateV).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
    //   return index !== -1 || date < moment().startOf('day')
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
    // let selected = false,
    //   disabled = false;
    // if (currentDate.date() === 1) {
    //   style.border = "1px solid #1890ff";
    //   style.borderRadius = "50%";
    // }
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

    // console.log(
    // 	"日期:",
    // 	stringDate,
    // 	" / 星期:",
    // 	currentDate.day(),
    // 	"    ",
    // 	currentDate.days(),
    // 	this.state.dateArray
    // );

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
        chars_left: 400 - input.length
    });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { defaultSelectedWeekday, defaultSelectedMonth, dateArray } = this.state
    console.log("handleFormSubmit", dateArray, defaultSelectedWeekday)
    let formData = new FormData();
    await this.props.form.validateFields((err, values) => {
      console.log("handleFormSubmit values: ", JSON.stringify(values));
      const content =
        values["content"] === undefined ? null : values["content"];
      const topic =
        values["topic"] === undefined ? null : values["topic"];
      const inquiry =
        values["topics"] === undefined ? null : values["topics"];
      const university =
        values["areas_experience"] === undefined ? null : values["areas_experience"];
      const datepicker =
        values["date-picker"] === undefined ? null : values["date-picker"];
      const price =
        values["price"] === undefined ? null : values["price"];
      const max_hours =
        values["max_hours"] === undefined ? null : values["max_hours"];
      const start_time =
        values["start_time"] === undefined ? null : values["start_time"];
      const end_time =
        values["end_time"] === undefined ? null : values["end_time"];
      const file = 
        values["upload"] === undefined ? null : values["upload"];
      const postObj = {
        user: this.props.username,
        content: values.content,
        topics: values.topics,
        areas_experience: values.areas_experience,
        datepicker: values.datepicker,       
        price: values.price,       
        max_hours: values.max_hours,
        start_time: values.start_time,
        end_time: values.end_time,
        weekdays: defaultSelectedWeekday,
        months: defaultSelectedMonth,
        dates: dateArray
      }
      console.log("postObj: ", JSON.stringify(postObj))
      if (file !== null){
        formData.append("file", file[0].originFileObj)
      }
      formData.append("data", JSON.stringify(postObj))
      if (!err) {
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
    console.log("contact_option  I: "+ JSON.stringify(contact_option))
    const fields = getFieldValue("upload")
    console.log("upload  I: "+ JSON.stringify(fields))
    console.log("upload II: "+ getFieldValue("fileList"), getFieldValue("upload"), fileList.length, fileList)
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Form {...formItemLayout} onSubmit={event => this.handleFormSubmit(
        event,
        this.props.requestType,
        this.props.articleID)}>
          <p>Write a brief description about yourself</p>
        <Form.Item label="Description" hasFeedback>
          {getFieldDecorator('content', {
            initialValue: "C",
            rules: [{ required: true, message: 'Please enter a content' }],
          })(<Input.TextArea maxLength={400} onChange={this.handleChange.bind(this)} />
          )}
            <p>Characters Left: {chars_left}</p>
        </Form.Item>

      <p>What topics would you be most likely to answer?</p>
       <Form.Item label="Topics">
        {getFieldDecorator('topics', {
              initialValue: ["undergraduates"],
              rules: [
                { required: true, message: 'Please select or type a topic!', type: 'array' },
              ],
            })(
              <Select name="topics" mode="tags" placeholder="Please select or type a topic">
              </Select>,
            )
        }
        </Form.Item>

        <p>What are your areas of experience?</p>
        <Form.Item label="Areas of experience">
          {getFieldDecorator('areas_experience', {
            initialValue: ["undergraduates"],
            rules: [
              { required: true, message: 'Field required', type: 'array' },
            ],
          })(
            <Select name="areas_experience" mode="tags" placeholder="Please type an area">
            </Select>,
          )}
        </Form.Item>

        {/* <Form.Item label={"Date-picker"}>
          {getFieldDecorator('date-picker',
                  { rules: [{ required: true, message: 'Filed required' }] }
              )
              (<DatePicker  disabledDate={this.disabledDate.bind(this)} onChange={this.onDateChange.bind(this)} />)}
        </Form.Item> */}

        <div>
        <Form layout="inline">
          <Form.Item label="Datepicker" />
          <Form.Item>
            <CheckboxGroup
              key={Math.random()}
              defaultValue={this.state.defaultSelectedWeekday}
              onChange={this.onChangeSelectWeekday}
            >
              <Checkbox value={1}>Mo</Checkbox>
              <Checkbox value={2}>Tu</Checkbox>
              <Checkbox value={3}>We</Checkbox>
              <Checkbox value={4}>Th</Checkbox>
              <Checkbox value={5}>Fr</Checkbox>
              <Checkbox value={6}>Sa</Checkbox>
              <Checkbox value={0}>Su</Checkbox>
            </CheckboxGroup>
          </Form.Item>
          <Form.Item>
            <CheckboxGroup
              key={Math.random()}
              defaultValue={this.state.defaultSelectedMonth}
              onChange={this.onChangeSelectMonth}
            >
              <Checkbox value={0}>Ja</Checkbox>
              <Checkbox value={1}>Fe</Checkbox>
              <Checkbox value={2}>Ma</Checkbox>
              <Checkbox value={3}>Ap</Checkbox>
              <Checkbox value={4}>May</Checkbox>
              <Checkbox value={5}>Ju</Checkbox>
              <Checkbox value={6}>Jl</Checkbox>
              <Checkbox value={7}>Au</Checkbox>
              <Checkbox value={8}>Se</Checkbox>
              <Checkbox value={9}>Oc</Checkbox>
              <Checkbox value={10}>No</Checkbox>
              <Checkbox value={11}>De</Checkbox>
            </CheckboxGroup>
          </Form.Item>
        </Form>
        <div className="">
          <DatePicker
            disabledDate={this.disabledDate}
            showToday={false}
            open={this.state.open}
            onOpenChange={this.handleOpenChange}
            onPanelChange={this.handlePanelChange}
            onChange={this.onDateChange.bind(this)}
            dateRender={this.dateRender}
            renderExtraFooter={this.dateFooterContent}
          />
        </div>
      </div>

        <Form.Item label="Session Price Per Hour" hasFeedback>
            {getFieldDecorator('price', {
              initialValue: 50,
              rules: [{ required: true, message: 'Please enter a valid price' }],
            })(
              <InputNumber
                name="price"
                defaultValue={50}
                min={50}
                max={100}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={this.priceOnChange}
              />
            )}
          </Form.Item>
          <Form.Item label="Maximum hours per workshop" hasFeedback>
            {getFieldDecorator('max_hours', {
              initialValue: 1,
              rules: [{ required: true, message: 'Field require' }],
            })(
              <InputNumber
                name="hours"
                defaultValue={1}
                min={1}
                max={3}
                formatter={value => value>1 ? `${value} Hrs`:`${value} Hr`}
                // parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={this.hourOnChange}
              />
            )}
          </Form.Item>
          <Form.Item label="Start Time" hasFeedback>
            {getFieldDecorator('start_time', {
              // initialValue: 1,
              rules: [{ required: true, message: 'Field require' }],
            })(
              <TimePicker 
                onChange={this.onTimeChange.bind(this)} 
                defaultOpenValue={moment('00', 'HH')} 
                format={"HH"}
              />
            )}
          </Form.Item>
          <Form.Item label="End Time" hasFeedback>
            {getFieldDecorator('end_time', {
              // initialValue: 1,
              rules: [{ required: true, message: 'Field require' }],
            })(
              <TimePicker 
                onChange={this.onTimeChange2.bind(this)} 
                defaultOpenValue={moment('00', 'HH')} 
                disabledHours={this.disableHour}
                format={"HH"}
                disabled={endTime}
              />
            )}
          </Form.Item>
        <Form.Item label="Upload Photo" extra="2.5 MB Field">
                {getFieldDecorator('upload', {
                  initialValue: this.handleFileList(null, null),
                  rules: [{ required: false, message: 'Please upload a photo'}],
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  setFieldsValue: "fileList"
                })(
                  // <div className="clearfix">
                  <Upload name="photo" key="workshop photo" onPreview={this.handlePreview}  listType="picture-card" customRequest={this.dummyRequest}>
                    {fileList.length === 1 ? null : uploadButton}
                    {/* <Button>
                      <Icon type="upload" /> Click to upload
                      </Button> */}
                  </Upload>
                        //   <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        //   <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        // </Modal>
                        // </div>
                )}
                     <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                           <img alt="example" style={{ width: '100%' }} src={previewImage} />
                         </Modal>
        </Form.Item>
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