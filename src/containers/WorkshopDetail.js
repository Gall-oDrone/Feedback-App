import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import {workshopDetailURL} from "../constants";
import { connect } from 'react-redux';
import { Menu, Card, Button, DatePicker, TimePicker, Form, Modal, Skeleton, message, Divider, List, Tabs, Row, Col, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import ArticleCreate from './ArticleCreate';
import Checkout from "../components/MeetingCheckout";
import { workshopDirectBuyURL } from "../constants";
import { configConsumerProps } from 'antd/lib/config-provider';
import * as actions from "../store/actions/auth";
import { authAxios } from '../utils';
import "../assets/workshop.css"
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
        const workshopID = this.props.match.params.workshopID;
        //const workshopID = 11
        axios.get(workshopDetailURL(workshopID))
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    article: res.data,
                    weekdays: res.data.weekdays,
                    months: res.data.months,
                    dates: res.data.dates,
                    maxHrs: res.data.max_hrs_per_workshop,
                    startTime: res.data.start_time,
                    endTime: res.data.end_time

                });
                console.log("Article Detail res data: " + res.data);
            });
        // if(!(workshopID === "create")){
        // axios.get(`http://127.0.0.1:8000/articles/${workshopID}`)
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
    //         const workshopID = this.props.match.params.workshopID;
    //         axios.get(`http://127.0.0.1:8000/articles/${workshopID}/`)
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
    //         const workshopID = this.props.match.params.workshopID;
    //         axios.defaults.headers = {
    //             "Content-Type": "aplication/json",
    //             Authorization: `Token ${this.props.token}`
    //         }
    //         axios.post(`http://127.0.0.1:8000/articles/${workshopID}/update/`);
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
            workshop_id: this.props.match.params.workshopID,
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
            axios.post(workshopDirectBuyURL, 
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
               <div className="workshop-detail-block" id="overview">
                    <div className="workshop-detail-overview-block-color-overlay">
                    </div>
                    <div className="workshop-detail-overview-block-color-overlay-border-holder">
                        <div className="workshop-detail-overview-block-inner">
                            <div id="element-4460">
                                <div className="contents">
                                    <h1>
                                        <p></p>
                                        <p><b><font>5 Hand-on Labs</font></b></p>
                                        <p></p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-4461">
                                <div className="contents">
                                    <img src="//storage.googleapis.com/instapage-user-media/fc5bead4/49192380-0-Hands-on-icon-Hackst.png" alt="">
                                    </img>
                                </div>
                            </div>
                            <div className="page-element widget-container page-element-type-headline widget-headline" id="element-4383">
                                <div className="overview-contents">
                                    <h1>
                                        <p></p>
                                        <p><b><font>Workshop Overview</font></b></p>
                                        <p></p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-4462">
                                <div className="contents">
                                    <h1>
                                        <p></p>
                                        <p><b><font>Forum for Q/A</font></b></p>
                                        <p></p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-4463">
                                <div className="contents">
                                    <div className="cropped">
                                    </div>
                                </div>
                            </div>
                            <div id="element-4464">
                                <div className="contents">
                                    <h1>
                                        <p></p>
                                        <p><b><font>Video Instruction</font></b></p>
                                        <p></p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-4459">
                                <div className="contents">
                                    <div className="cropped">
                                    </div>
                                </div>
                            </div>
                            <div id="element-4466">
                                <div className="contents">
                                    <h1>
                                        <p></p>
                                        <p><b><font color="#717e8e">Time to Complete: 4 Hours</font></b></p>
                                        <p></p>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
               <div className="workshop-detail-block" id="lessons">
                   <div className="workshop-detail-lessons-block-color-overlay"></div>
                    <div className="workshop-detail-lessons-block-color-overlay-border-holder">
                        <div className="workshop-detail-lessons-block-inner">
                            <div className="page-element-widget-container-page-element-type-box-widget-box" id="element-3407">
                                <div className="box">
                                </div>
                            </div>
                            <div className="page-element-widget-container-page-element-type-box-widget-box" id="element-3434">
                                <div className="box">
                                </div>
                            </div>
                            <div className="page-element widget-container page-element-type-headline widget-headline" id="element-3405">
                                <div className="contents">
                                    <h1>
                                        <p>
                                            <b><font>MODULE 1</font></b>
                                        </p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-3432">
                                <div className="contents">
                                    <h1>
                                        <p><font>A Lap Around the Particle Ecosystem</font></p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-3410">
                                <div className="contents">
                                    <h1>
                                        <p><font>Why Particle?</font></p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-3411">
                                <div className="contents">
                                    <img src="//storage.googleapis.com/instapage-user-media/fc5bead4/31634666-0-check-mark-blue-thin.png"></img>
                                </div>
                            </div>
                            <div id="element-3446">
                                <div className="contents">
                                    <h1>
                                        <p><font>Particle Cloud And Friends</font></p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-3409">
                                <div className="contents">
                                    <img src="//storage.googleapis.com/instapage-user-media/fc5bead4/31634666-0-check-mark-blue-thin.png"></img>
                                </div>
                            </div>
                            <div id="element-3447">
                                <div className="contents">
                                    <h1>
                                        <p><font>Claiming Your First Device</font></p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-3448">
                                <div className="contents">
                                    <img src="//storage.googleapis.com/instapage-user-media/fc5bead4/31634666-0-check-mark-blue-thin.png"></img>
                                </div>
                            </div>
                            <div id="element-3453">
                                <div className="box">
                                </div>
                            </div>
                            <div id="element-3456">
                                <div className="contents">
                                        <p>Claiming your first Particle device* </p>
                                </div>
                            </div>
                            <div id="element-3458">
                                <div className="contents">
                                    <div className="cropped"></div>
                                </div>
                            </div>
                            <div id="element-4296">
                                <div className="line-horizontal">
                                </div>
                            </div>
                            <div id="element-4467">
                                <div className="contents">
                                    <h1>
                                        <p></p>
                                        <p><b><font>What You'll Learn</font></b></p>
                                        <p></p>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workshop-detail-block" id="signup">
                   <div className="workshop-detail-signup-block-color-overlay"></div>
                    <div className="workshop-detail-signup-block-color-overlay-border-holder">
                        <div className="workshop-detail-signup-block-inner">
                            <div id="element-4631">
                                <div className="box">
                                </div>
                            </div>
                            <div id="element-4632">
                                <div className="contents">
                                    <h1>
                                        <p><font><b>Free</b></font></p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-4633">
                                <div className="conversion_wrapper">
                                    <a>
                                        <div className="submit-btn">
                                            Sign Up Now
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div id="element-4634">
                                <div className="contents">
                                    <h1>
                                        <p></p>
                                        <p><font><b>Particle 101</b></font></p>
                                        <p><b>Workshop</b></p>
                                        <p></p>
                                    </h1>
                                </div>
                            </div>
                            <div id="element-4635">
                                <div className="line-horizontal">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workshop-detail-block" id="instructor">
                <div className="workshop-detail-instructor-block-color-overlay"></div>
                <div className="workshop-detail-instructor-block-color-overlay-border-holder">
                    <div className="workshop-detail-instructor-block-inner">
                        <div id="element-259">
                            <div className="contents">
                                <h1>
                                    <p><font><b>Meet the Instructor</b></font></p>
                                </h1>
                            </div>
                        </div>
                        <div id="element-260">
                                <div className="contents">
                                    <p><font>Brandon has over 20 years of experience as a technology professional and has worked extensively as both a software and hardware engineer across a variety of platforms, technology stacks, and industries. An avid tinkerer, explorer, and teacher, Brandon has spoken at events all over the world, has written four books, and is most at home when leading hands-on labs and workshops.</font></p>
                                </div>
                            </div>
                        <div id="element-1027">
                                <div className="circle">
                                </div>
                            </div>
                        <div id="element-1029">
                                <div className="contents">
                                    <h1>
                                        <p><b><font>Brandon Satrom</font></b></p>
                                    </h1>
                                </div>
                            </div>
                        <div id="element-1030">
                            <div className="contents">
                                {/* <p></p>
                                <p></p> */}
                                <p><font><b>Sr. Manager, Developer Relations</b></font></p>
                            </div>
                        </div>
                    </div>           
                </div>
                <div className="workshop-detail-block #earning" id="earning">
                    <div className="workshop-detail-earning-block-color-overlay"></div>
                    <div className="workshop-detail-earning-block-color-overlay-border-holder">
                        <div className="workshop-detail-earning-block-inner" >
                        <div id="element-3371">
                            <div className="contents">
                                <h1>
                                    <p><font><b>What You'll Get</b></font></p>
                                </h1>
                            </div>
                        </div>
                        <div id="element-3382">
                                <div className="box"></div>
                            </div>
                        <div id="element-3386">
                            <div className="box"></div>
                        </div>
                        <div id="element-3372">
                                <div className="contents">
                                    <h1>
                                        <p><b><font>Private forum where you can connect with the instructor and other attendees</font></b></p>
                                    </h1>
                                </div>
                            </div>
                        <div id="element-3383">
                            <div className="box"></div>
                        </div>
                        <div id="element-3375">
                            <div className="contents">
                                <div className="cropped"></div>
                            </div>
                        </div>
                        <div id="element-3384">
                            <div className="box"></div>
                        </div>
                        <div id="element-3373">
                            <div className="contents">
                                <h1>
                                    <p><b><font>PDF documentation of each lab performed during this workshop + resources for further learning</font></b></p>
                                </h1>
                            </div>
                        </div>
                        <div id="element-3385">
                            <div className="box"></div>
                        </div>
                        <div id="element-3376">
                            <div className="contents">
                                <div className="cropped"></div>
                            </div>
                        </div>
                        <div id="element-3374">
                            <div className="contents">
                                <h1>
                                    <p><font><b>A personalized Certificate of Completion in your inbox to use for advancing your career or bragging to your friends</b></font></p>
                                </h1>
                            </div>
                        </div>
                        <div id="element-3378">
                            <div className="contents">
                                <div className="cropped"></div>
                            </div>
                        </div>
                        <div id="element-3377">
                            <div className="contents">
                                <div className="cropped"></div>
                            </div>
                        </div>
                        <div id="element-3381">
                                <div className="contents">
                                    <h1>
                                        <p><b><font>Workshop instruction and labs taught by an industry professional</font></b></p>
                                    </h1>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="workshop-detail-block" id="questions">
                    <div className="workshop-detail-questions-block-color-overlay"></div>
                    <div className="workshop-detail-questions-block-color-overlay-border-holder">
                        <div className="workshop-detail-questions-block-inner">
                        <div id="element-545">
                            <div className="contents">
                                <h1>
                                    <p><font><b>Frequently Asked Questions</b></font></p>
                                </h1>
                            </div>
                        </div>
                        <div id="element-533">
                                <div className="contents">
                                    <p><b><font>WHEN DO I GET ACCESS TO THESE COURSES?</font></b></p>
                                </div>
                            </div>
                        <div id="element-535">
                            <div className="contents">
                                <p><font>The workshop is on-demand and can be accessed as soon as your purchase is complete via your Hackster profile. </font></p>
                            </div>
                        </div>
                        <div id="element-553">
                                <div className="contents">
                                    <h1>
                                        <p><b><font>Brandon Satrom</font></b></p>
                                    </h1>
                                </div>
                            </div>
                        <div id="element-554">
                            <div className="contents">
                                <h1>
                                    <p><b><font>DO I HAVE TO PURCHASE ANY HARDWARE OR SOFTWARE?</font></b></p>
                                </h1>
                            </div>
                        </div>
                        <div id="element-555">
                            <div className="contents">
                                {/* <p></p>
                                <p></p> */}
                                <p>
                                    <font>
                                        Yes, in order to participate in the labs you will need:
                                    </font>
                                    <ul>
                                        <li>
                                            <font>
                                                A computer running Windows, macOS or Linux with an available USB port 
                                            </font>
                                        </li>
                                    </ul>
                                </p>
                            </div>
                        </div>    
                        <div id="element-4470">
                            <div className="contents">
                                {/* <p></p>
                                <p></p> */}
                                <p><font><b>OTHER QUESTIONS?</b></font></p>
                            </div>
                        </div>    
                        <div id="element-4472">
                            <div className="contents">
                                {/* <p></p>
                                <p></p> */}
                                <p><font><b>Sr. Manager, Developer Relations</b></font></p>
                            </div>
                        </div>                            
                        </div>
                    </div>
                </div>
            </div>     
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