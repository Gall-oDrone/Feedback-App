import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import {sessionDetailURL} from "../constants";
import { connect } from 'react-redux';
import { Menu, Card, Button, DatePicker, TimePicker, Form, Modal, Skeleton, message, Divider, List, Tabs, Row, Col, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import ArticleCreate from './ArticleCreate';
import Checkout from "../components/MeetingCheckout";
import { sessionDirectBuyURL } from "../constants";
import { configConsumerProps } from 'antd/lib/config-provider';
import * as actions from "../store/actions/auth";
import { authAxios } from '../utils';
import "../assets/session.css"
import moment from 'moment';

const { SubMenu } = Menu;
const { TabPane } = Tabs;
const format = 'HH';
class ArticleDetail extends React.Component {

    state = {
        article: {},
        date: null,
        loading: false,
        startTime: null,
        endTime: null,
        disable: false,
        visible: false,
        weekdays: null,
        months:null,
        dates: null,
        maxHrs: null,
        startTime: null,
        endTime: null,
        orderId: null,
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      handleDateFormat(selectedDateTime, myDate){
        selectedDateTime.date(myDate.date());
        selectedDateTime.month(myDate.month());
        selectedDateTime.year(myDate.year());
        return selectedDateTime
      }

    componentDidMount() {
        console.log("componentDidMount THIPROPS: " + JSON.stringify(this.props))
        const sessionID = this.props.match.params.sessionID;
        //const sessionID = 11
        axios.get(sessionDetailURL(sessionID))
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    article: res.data,
                    weekdays: res.data.weekdays,
                    months: res.data.months,
                    dates: res.data.dates,
                    maxHrs: res.data.max_hrs_per_session,
                    startTime: res.data.start_time,
                    endTime: res.data.end_time

                });
                console.log("Article Detail res data: " + res.data);
            });
        // if(!(sessionID === "create")){
        // axios.get(`http://127.0.0.1:8000/articles/${sessionID}`)
        //     .then(res => {
        //         console.log("res: " + JSON.stringify(res.data))
        //         this.setState({
        //             article: res.data
        //         });
        //         console.log("Article Detail res data: " + res.data);
        //     });
        // }
    }

    // componentWillReceiveProps(newProps) {
    //     if (newProps.token !== this.props.token) {
    //         axios.defaults.headers = {
    //             "Content-Type": "aplication/json",
    //             Authorization: newProps.token
    //         }
    //         const sessionID = this.props.match.params.sessionID;
    //         axios.get(`http://127.0.0.1:8000/articles/${sessionID}/`)
    //             .then(res => {
    //                 this.setState({
    //                     article: res.data
    //                 });
    //                 console.log("Article Detail res data: " + res.data);
    //             })
    //     }

    // }

    // handleUpdate = event => {
    //     if (this.props.token !== null) {
    //         const sessionID = this.props.match.params.sessionID;
    //         axios.defaults.headers = {
    //             "Content-Type": "aplication/json",
    //             Authorization: `Token ${this.props.token}`
    //         }
    //         axios.post(`http://127.0.0.1:8000/articles/${sessionID}/update/`);
    //         this.props.history.push('/');
    //         this.forceUpdate();
    //     } else {
    //         // Could not update 
    //     }
    // }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({visible: true})
        this.props.form.validateFields((err, values) => {
        console.log("handleFormSubmit values: ", JSON.stringify(values));
        const hrs =
            values["hrs"] === undefined ? null : values["hrs"];
        const content =
            values["date_picker"] === undefined ? null : values["date_picker"];
        const topic =
            values["time_picker_start"] === undefined ? null : values["time_picker_start"];
        const inquiry =
            values["time_picker_end"] === undefined ? null : values["time_picker_end"];

        const postObj = {
            user: this.props.username,
            hrs: 1,
            session_id: this.props.match.params.sessionID,
            date: values.date_picker,
            start_time: this.handleDateFormat(topic, content),
            end_time: this.handleDateFormat(inquiry, content),  
        }
        console.log("handleFormSubmit postObj: ", postObj.start_time.month, postObj);
        if (!err) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.post(sessionDirectBuyURL, 
            postObj
            )
                .then(res => {
                    if (res.status === 200) {
                       this.setState({ orderId: res.data, loading: false, visible: true})
                     } else {
                       this.setState({ loading: false})
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
    
    onDateChange(date, dateString) {
        console.log(date, dateString);
        this.setState({ date: date})
    }

    onTimeChange(time, timeString) {
        console.log(time, timeString);
        // this.setState({ startTime: time, endTime:time})
      }
    
    onTimeChange2(time, timeString) {
        console.log(time, timeString);
        // this.setState({ startTime: time, endTime:time})
      }
    
    handleTimeDisable() {
        const { getFieldValue } = this.props.form;
        if( getFieldValue("time_picker_start") !== undefined &&
            getFieldValue("time_picker_start") !== null){
            return false
        } else {
            return true
        }
    }

    disableHour = value => {
        console.log(value)
        const { startTime, endTime} = this.state
        let disabled_hrs = []
        var end = parseInt((moment(endTime).format("HH")))
        
        for(var i=0; i<parseInt((moment(startTime).format("HH"))); i++){
          disabled_hrs.push(i)
        }
        for(var i=end; i<=24; i++){
            disabled_hrs.push(i)
          }
        
        // console.log("CHER: ",disabled_hrs, end )
        return disabled_hrs;
      }

      disableHour2 = value => {
        console.log(value)
        const { startTime, endTime, maxHrs} = this.state
        const { getFieldValue} = this.props.form
        let disabled_hrs2 = []
        var end2 = (moment(endTime).format("HH"))
        if(parseInt((moment(getFieldValue("time_picker_end")).format("HH"))) <= parseInt((moment(getFieldValue("time_picker_start")).format("HH")))){
            var minus = end2-parseInt((moment(getFieldValue("time_picker_start")).format("HH")))
        }
        
        for(var i=0; i<=parseInt((moment(getFieldValue("time_picker_start")).format("HH"))); i++){
          disabled_hrs2.push(i)
        }
        for(var i=end2; i<=24; i++){
            disabled_hrs2.push(i)
          }
        // console.log("CHER 2: ",disabled_hrs, end2, )
        return disabled_hrs2;
      }
    
    // handleDisable() {
    //     const { getFieldValue } = this.props.form;
    //       if(getFieldValue("time_picker_start") !== undefined){
    //             return false
    //         } else {
    //             return true
    //         }
    // }

    disabledDate = date => {
        const { weekdays, months, dates } = this.state;
    
        // if (months.indexOf(date.months()) === -1 ) {
        //   return true;
        // }
    
        if (weekdays.indexOf(date.days()) !== -1) {
          return true;
        }
        console.log("CHANGES: ", dates)
        let index = dates.findIndex(dateV => moment(dateV).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
          return index !== -1 || date < moment().endOf('day') || date.years() !==  moment().year()
      };

    render() {
        console.log('this.PROPS: ' + JSON.stringify(this.props))
        console.log("this.state: " + this.state, this.state.orderId)
        const { form } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { date, startTime, endTime, disable, visible, orderId, loading } = this.state
        const {user_name} = this.state.article
        return (
            <div>
                <Card title={user_name !== undefined ? <a href={`/profile-page/${user_name.profile_username}`}>{user_name.name}</a>:null}>
                    <Form onSubmit={this.handleSubmit}>
                    <Row gutter={[16, 40]}>
                    
                        <Col span={3}>
                            <b>${this.state.article.price_per_hour} per hour</b>
                        </Col>
                        <Col span={3}>
                            <Form.Item >
                                {getFieldDecorator('date_picker',
                                        { rules: [{ required: true, message: 'Filed required' }] }
                                    )
                                    (<DatePicker   disabledDate={this.disabledDate} onChange={this.onDateChange.bind(this)} />)}
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item >
                                {getFieldDecorator('time_picker_start',
                                        { rules: [{ required: true, message: 'Filed required' }] }
                                    )
                                    (
                                        <TimePicker onChange={this.onTimeChange.bind(this)}
                                        defaultOpenValue={moment('00', 'HH')}
                                        placeholder = {"Start Time"}
                                        disabledHours={this.disableHour}
                                        format={format} />
                                    )
                                }
                            </Form.Item>
                            </Col>
                            <Col span={3}>
                            <Form.Item >
                                {getFieldDecorator('time_picker_end',
                                        { rules: [{ required: true, message: 'Filed required' }] }
                                    )       
                                    (
                                        <TimePicker onChange={this.onTimeChange2.bind(this)}
                                        defaultOpenValue={moment('00', 'HH')}
                                        placeholder = {"End Time"}
                                        disabledHours={this.disableHour2}
                                        disabled= {this.handleTimeDisable()}
                                        format={format} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                <Button type="primary" htmlType="submit" loading={loading} disabled={visible} >
                                    Book a session
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    </Form>
                    <Row>
                        <Col span={15}>
                            <div id="session-div-2">
                            <img
                                className="contain"
                                alt="logo"
                                src={this.state.article.session_photo}
                            />
                            </div>
                        </Col>
                        <Col span={9}>
                            <Tabs defaultActiveKey="1" tabPosition={"right"}>
                                  <TabPane tab="University" key="1">
                                    <p>{user_name !== undefined ? user_name.university : null}</p>
                                    <p>{user_name !== undefined ? user_name.degree : null}</p>
                                  </TabPane>
                                  <TabPane tab="Course" key="2">
                                    <p>{user_name !== undefined ? user_name.course : null}</p>
                                  </TabPane>
                                  <TabPane tab="About me" key="3">
                                    <p>{this.state.article.content}</p>
                                  </TabPane>
                                  <TabPane tab="Topics guidance" key="4">
                                        <li>{this.state.article.topic}</li>
                                  </TabPane>
                                  <TabPane tab="Areas of expertice" key="5">
                                        <li>{this.state.article.experience}</li>
                                  </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Card>
                  {visible === true && orderId !== null ? (
                    <Modal  
                      visible={visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                      <Checkout orderID={orderId}/>
                    </Modal>
                  ):(null)}
            </div>
            
        )
    }
}

const WrappedArticleCreate = Form.create()(ArticleDetail);

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default withRouter(connect(mapStateToProps)(WrappedArticleCreate));