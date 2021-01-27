import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import {workshopDetailURL} from "../constants";
import { connect } from 'react-redux';
import { Menu, Tabs, Form } from "antd";
import { Link, withRouter } from "react-router-dom";
import { workshopDirectBuyURL, workshopRegisterURL, workshopContentURL } from "../constants";
import * as actions from "../store/actions/auth";
import {getWorkshopContent} from  "../store/actions/workshops";
import WorkshopVC from "../components/WorkshopVideoContainer"
import { authAxios } from '../utils';
import "../assets/workshopContent.css"
import moment from 'moment';

const { SubMenu } = Menu;
const { TabPane } = Tabs;
const format = 'HH';
class WorkshopContent extends React.Component {

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
        author: null,
        author_pic: null,
        lessons: null,
        lessons_topic: null,
        registered: false,
        wsh_content: null,
        open: null,
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

      handleRegisterForm() {
            const workshopId = this.props.match.params.workshopID
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.post(workshopRegisterURL(workshopId))
                .then(res => {
                    if (res.status === 201) {
                    this.setState({ registered: true})
                    }
                })
                .catch(error => console.error(error))
                console.log('Error');
        }
    handleOpenLessonDetail = (e, i) => {
        if(this.state.open){
            this.setState({
                open: null,
              });
        } else {
            this.setState({
                open: e.target.innerText,
              });
        } 
    }

    openList = (elements) => {
        console.log("DUCKMAN: ", elements)
        return (
            <div style={{display:"initial"}} className="pro-workshop-lesson-details show-on-open">
                <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                    <WorkshopVC video={elements.lesson_video? elements.lesson_video.videofile: null} />
                    <h3 className="hckui__typography__h3">Lab 1 - Claiming Your Particle Argon</h3>
                    <p className="hckui__typography__bodyL hckui__layout__marginBottom15 hckui__layout__marginTop5"></p>
                    <p><strong>Project goal:</strong> To get your Particle Argon online and claimed to your account</p>
                    <p><strong>What you'll learn:</strong> How to claim a new Particle Argon using a browser and the Particle mobile app<br/>
                        <strong>Tools you'll need:</strong> A Particle Argon, USB cable, and the Particle mobile app for iOS or Android<br/>
                        <strong>Time needed to complete:</strong> 15 minutes
                    </p>
                    <p><em>To complete lab 1:</em><br/>
                        1. Open the <strong>Particle_101.zip</strong> folder that you downloaded during your workshop set-up.<br/>
                        2. Open the <strong>Lab1_ClaimDevice.pdf</strong> file<br/>
                        3, Follow the step-by-step instructions to complete the lab<br/>
                        4. Final code for the lab can be found <a href="https://build.particle.io/shared_apps/5bfefd038bf964af88000409" rel="noopener noreferrer" target="_blank">here</a> 
                    </p>
                    <p>If you haven’t downloaded the lab instruction folder for this workshop yet, you can download it here:</p>
                    <p><strong><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Download Lab Files</a></strong></p>
                    <hr/>
                    <p><strong>Watch the video below to follow-along with the lab!</strong></p>
                    <p></p>
                    </div>
                    <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                    <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                        <script async="" src="//fast.wistia.com/embed/medias/mx2f8322fv.jsonp"></script>
                        <div className="wistia_embed wistia_async_mx2f8322fv wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-mx2f8322fv-1">
                            <div id="wistia_chrome_32" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                <div id="wistia_grid_62_wrapper" corso="display: block;">
                                <div id="wistia_grid_62_above"></div>
                                <div id="wistia_grid_62_main">
                                    <div id="wistia_grid_62_behind"></div>
                                    <div id="wistia_grid_62_center">
                                        <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                        <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                    </div>
                                    <div id="wistia_grid_62_front"></div>
                                    <div id="wistia_grid_62_top_inside">
                                        <div id="wistia_grid_62_top"></div>
                                    </div>
                                    <div id="wistia_grid_62_bottom_inside">
                                        <div id="wistia_grid_62_bottom"></div>
                                    </div>
                                    <div id="wistia_grid_62_left_inside">
                                        <div id="wistia_grid_62_left"></div>
                                    </div>
                                    <div id="wistia_grid_62_right_inside">
                                        <div id="wistia_grid_62_right"></div>
                                    </div>
                                </div>
                                <div id="wistia_grid_62_below"></div>
                                {/* <corso id="wistia_63_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_62_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                    #wistia_grid_62_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                    #wistia_grid_62_above{position:relative;}
                                    #wistia_grid_62_main{display:block;height:100%;position:relative;}
                                    #wistia_grid_62_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                    #wistia_grid_62_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                    #wistia_grid_62_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                    #wistia_grid_62_top_inside{position:absolute;left:0;top:0;width:100%;}
                                    #wistia_grid_62_top{width:100%;position:absolute;bottom:0;left:0;}
                                    #wistia_grid_62_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                    #wistia_grid_62_bottom{width:100%;position:absolute;top:0;left:0;}
                                    #wistia_grid_62_left_inside{height:100%;position:absolute;left:0;top:0;}
                                    #wistia_grid_62_left{height:100%;position:absolute;right:0;top:0;}
                                    #wistia_grid_62_right_inside{height:100%;right:0;position:absolute;top:0;}
                                    #wistia_grid_62_right{height:100%;left:0;position:absolute;top:0;}
                                    #wistia_grid_62_below{position:relative;}
                                </corso> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
            );
      }
    
    componentDidMount() {
        console.log("componentDidMount THIPROPS: " + JSON.stringify(this.props))
        const workshopID = this.props.match.params.workshopID;
        //const workshopID = 11
        // this.getWorkshopContent(this.props.token, workshopID, this.props.username)
        axios.get(workshopContentURL(11, this.props.username))
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                // res.data.lesson.map((el, i) => {console.log("denge", el.lesson_topic)})
                // res.data.lesson.map((el, i) => {console.log("denge 2", el.lesson_title)})
                this.setState({
                    // article: res.data,
                    // weekdays: res.data.weekdays,
                    // months: res.data.months,
                    // dates: res.data.dates,
                    // maxHrs: res.data.max_hrs_per_workshop,
                    // startTime: res.data.start_time,
                    // endTime: res.data.end_time,
                    // author: res.data.user_name,
                    // author_pic: res.data.user_pic,
                    // lessons_topic: 
                    wsh_content: res.data
                });
                console.log("Article Detail res data: " + res.data);
            });
    }

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
        console.log("this.state: " + this.state, this.state.orderId, "this.state.lessons ==> ", this.state.lessons)
        const { wsh_content, author_pic, loading, lessons } = this.state
        const {user_name} = this.state.article
        return (
            <div>
                <div className="hckui__layout__wrapper960">
                <div className="hckui__layout__marginBottom45">
                    <div className="alert alert-info">
                        <p>
                            <i className="hckui__typography__iconWrapper">
                            <svg className="hckui__typography__icon hckui__typography__icon16">
                                {/* <use xlink:href="#svg-checkmark"></use> */}
                            </svg>
                            </i>
                            <span>You're enrolled in this workshop!</span>
                        </p>
                    </div>
                </div>
                <h1 className="hckui__typography__h1">Particle 101 Workshop</h1>
                <p className="hckui__typography__bodyL">In this workshop, you will learn the basics of connecting a Particle Argon device to the Internet, exploring essential features of the Particle Device OS and Cloud, leveraging cutting-edge features like BLE and on-device debugging, and integrating with 3rd party services. </p>
                <div className="hckui__layout__marginTop15" corso="height:0;padding-top:56%;position:relative">
                    <div corso="position:absolute;top:0;left:0;width:100%;height:100%;background:no-repeat;background-image:url(https://hackster.imgix.net/uploads/attachments/1087214/_MNo5bE6Dtd.blob?auto=compress%2Cformat&amp;w=900&amp;h=675&amp;fit=min);background-size: cover;">
                        
                    </div>
                </div>
                <div className="hckui__layout__marginTop45" id="lessons">
                    <h2 className="hckui__typography__h2 hckui__layout__marginBottom10">Lessons</h2>
                    <div id="prerequisites">
                        <div className="pro-workshop-lesson">
                            <a className="toggle" href="javascript:void(0);">
                            <h3 className="hckui__typography__h3">
                                <span>Prerequisites</span>
                                <i className="hckui__typography__iconWrapper vertical-align-middle">
                                    {/* <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open"> */}
                                        {/* <use xlink:href="#svg-arrow-down"></use> */}
                                    {/* </svg> */}
                                    {/* <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open"> */}
                                        {/* <use xlink:href="#svg-arrow-up"></use> */}
                                    {/* </svg> */}
                                </i>
                            </h3>
                            </a>
                            <div className="pro-workshop-lesson-details show-on-open">
                            <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                                <p><strong>Required Hardware</strong></p>
                                <ul>
                                    <li>
                                        <p><a href="https://store.particle.io/products/iot-starter-kit?_pos=3&amp;_sid=8e4180592&amp;_ss=r" rel="noopener noreferrer" target="_blank">IoT Starter Kit</a> ($99) </p>
                                        <p>Get an extra $20 off the price of the hardware by using the code <strong>HACKSTER$20OFF</strong> at checkout. Kit includes:</p>
                                        <ul>
                                        <li>Particle Argon</li>
                                        <li>Grove Starter Kit </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p>A computer running Windows, macOS or Linux with an available USB port</p>
                                    </li>
                                </ul>
                                <p><strong>You'll also need the following:</strong></p>
                                <p><em>Software:</em> </p>
                                <ul>
                                    <li>Particle <a href="https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&amp;mt=8" rel="noopener noreferrer" target="_blank">iOS</a> or <a href="https://play.google.com/store/apps/details?id=io.particle.android.app" rel="noopener noreferrer" target="_blank">Android</a> App</li>
                                    <li><a href="https://docs.particle.io/tutorials/developer-tools/cli/" rel="noopener noreferrer" target="_blank">Particle CLI</a></li>
                                    <li><a href="https://www.particle.io/workbench#installation" rel="noopener noreferrer" target="_blank">Particle Workbench</a></li>
                                </ul>
                                <p><em>Accounts:</em> </p>
                                <ul>
                                    <li><a href="https://login.particle.io/signup" rel="noopener noreferrer" target="_blank">Particle Account</a></li>
                                    <li><a href="https://ifttt.com/particle" rel="noopener noreferrer" target="_blank">IFTTT Account</a></li>
                                    <li><a href="https://azure.microsoft.com/en-us/get-started/" rel="noopener noreferrer" target="_blank">Azure IoT Account</a></li>
                                    <li><a href="https://accounts.google.com/signup" rel="noopener noreferrer" target="_blank">Google Account</a></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="pro-workshop-group-container">
                        <div className="pro-workshop-group">
                            <a className="pro-workshop-group-title toggle" href="javascript:void(0);">
                            <h3 className="hckui__typography__h3">
                                <span></span>
                                <i className="hckui__typography__iconWrapper vertical-align-middle">
                                    {/* <svg className="hckui__typography__icon hckui__typography__icon16 group-hide-on-open"> */}
                                        {/* <use xlink:href="#svg-arrow-down"></use> */}
                                    {/* </svg> */}
                                    {/* <svg className="hckui__typography__icon hckui__typography__icon16 group-show-on-open"> */}
                                        {/* <use xlink:href="#svg-arrow-up"></use> */}
                                    {/* </svg> */}
                                </i>
                            </h3>
                            </a>
                            {wsh_content?wsh_content.map((el, index) => {
                                return(
                                    <div className="pro-workshop-lesson">
                                        <a className="toggle" href="javascript:void(0);" onClick={(e)=>this.handleOpenLessonDetail(e, index)}>
                                            <h3 className="hckui__typography__h3">
                                                <span>{el.lesson_title}</span>
                                                <i className="hckui__typography__iconWrapper vertical-align-middle">
                                                {/* <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open"> */}
                                                    {/* <use xlink:href="#svg-arrow-down"></use> */}
                                                {/* </svg> */}
                                                {/* <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open"> */}
                                                    {/* <use xlink:href="#svg-arrow-up"></use> */}
                                                {/* </svg> */}
                                                </i>
                                            </h3>
                                        </a>
                                            { el.lesson_title === this.state.open ? this.openList(el) : null }
                                        </div>
                                )
                            }):null}
                            <div className="pro-workshop-lesson-details show-on-open">
                                <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                                    <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                    <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                        <script async="" src="//fast.wistia.com/embed/medias/9sunhzsyee.jsonp"></script>
                                        <div className="wistia_embed wistia_async_9sunhzsyee wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-9sunhzsyee-1">
                                            <div id="wistia_chrome_26" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                <div id="wistia_grid_41_wrapper" corso="display: block;">
                                                <div id="wistia_grid_41_above"></div>
                                                <div id="wistia_grid_41_main">
                                                    <div id="wistia_grid_41_behind"></div>
                                                    <div id="wistia_grid_41_center">
                                                        <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                        <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                    </div>
                                                    <div id="wistia_grid_41_front"></div>
                                                    <div id="wistia_grid_41_top_inside">
                                                        <div id="wistia_grid_41_top"></div>
                                                    </div>
                                                    <div id="wistia_grid_41_bottom_inside">
                                                        <div id="wistia_grid_41_bottom"></div>
                                                    </div>
                                                    <div id="wistia_grid_41_left_inside">
                                                        <div id="wistia_grid_41_left"></div>
                                                    </div>
                                                    <div id="wistia_grid_41_right_inside">
                                                        <div id="wistia_grid_41_right"></div>
                                                    </div>
                                                </div>
                                                <div id="wistia_grid_41_below"></div>
                                                {/* <corso id="wistia_42_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_41_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                    #wistia_grid_41_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                    #wistia_grid_41_above{position:relative;}
                                                    #wistia_grid_41_main{display:block;height:100%;position:relative;}
                                                    #wistia_grid_41_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                    #wistia_grid_41_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                    #wistia_grid_41_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                    #wistia_grid_41_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                    #wistia_grid_41_top{width:100%;position:absolute;bottom:0;left:0;}
                                                    #wistia_grid_41_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                    #wistia_grid_41_bottom{width:100%;position:absolute;top:0;left:0;}
                                                    #wistia_grid_41_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                    #wistia_grid_41_left{height:100%;position:absolute;right:0;top:0;}
                                                    #wistia_grid_41_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                    #wistia_grid_41_right{height:100%;left:0;position:absolute;top:0;}
                                                    #wistia_grid_41_below{position:relative;}
                                                </corso> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hckui__layout__marginTop45" id="resources">
                    <h2 className="hckui__typography__h2 hckui__layout__marginBottom10">Resources</h2>
                </div>
                <div className="pro-workshop-lesson">
                    <a className="toggle" href="javascript:void(0);">
                        <h3 className="hckui__typography__h3">
                            <span>Required Hardware </span>
                            <i className="hckui__typography__iconWrapper vertical-align-middle">
                            {/* <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open"> */}
                                {/* <use xlink:href="#svg-arrow-down"></use> */}
                            {/* </svg> */}
                            {/* <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open"> */}
                                {/* <use xlink:href="#svg-arrow-up"></use> */}
                            {/* </svg> */}
                            </i>
                        </h3>
                    </a>
                    <div className="pro-workshop-lesson-details show-on-open">
                        <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                            <p><strong>To participate in the labs you will need the following hardware</strong></p>
                            <ul>
                            <li>
                                <p><a href="https://store.particle.io/products/iot-starter-kit?_pos=3&amp;_sid=8e4180592&amp;_ss=r" rel="noopener noreferrer" target="_blank">IoT Starter Kit</a> ($99) </p>
                                <p>Get an extra $20 off the price of the hardware by using the code <strong>HACKSTER$20OFF</strong> at checkout. Kit includes:</p>
                                <ul>
                                    <li>Particle Argon</li>
                                    <li>Grove Starter Kit </li>
                                </ul>
                            </li>
                            <li>
                                <p>A computer running Windows, macOS or Linux with an available USB port</p>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pro-workshop-lesson">
                    <a className="toggle" href="javascript:void(0);">
                        <h3 className="hckui__typography__h3">
                            <span>Lab Files</span>
                            <i className="hckui__typography__iconWrapper vertical-align-middle">
                            {/* <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open"> */}
                                {/* <use xlink:href="#svg-arrow-down"></use> */}
                            {/* </svg> */}
                            {/* <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open"> */}
                                {/* <use xlink:href="#svg-arrow-up"></use> */}
                            {/* </svg> */}
                            </i>
                        </h3>
                    </a>
                    <div className="pro-workshop-lesson-details show-on-open">
                        <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                            <ul>
                            <li><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Download Lab Documentation</a>(11MB)
                                Includes step-by-step instructions for labs 1-5.<br/>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pro-workshop-lesson">
                    <a className="toggle" href="javascript:void(0);">
                        <h3 className="hckui__typography__h3">
                            <span>Technical Support</span>
                            <i className="hckui__typography__iconWrapper vertical-align-middle">
                            {/* <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open"> */}
                                {/* <use xlink:href="#svg-arrow-down"></use> */}
                            {/* </svg> */}
                            {/* <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open"> */}
                                {/* <use xlink:href="#svg-arrow-up"></use> */}
                            {/* </svg> */}
                            </i>
                        </h3>
                    </a>
                    <div className="pro-workshop-lesson-details show-on-open">
                        <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                            <ul>
                            <li>
                                <p>Workshop Support:</p>
                                <ul>
                                    <li>Particle 101 Hackster Forum - (<a href="https://forums.hackster.io" rel="noopener noreferrer" target="_blank">https://forums.hackster.io</a>)</li>
                                </ul>
                            </li>
                            <li>
                                <p>Additional support:</p>
                                <ul>
                                    <li>Particle Documentation - (<a href="https://docs.particle.io/" rel="noopener noreferrer" target="_blank">https://docs.particle.io/</a>) </li>
                                    <li>Particle Community Forum - (<a href="https://community.particle.io/" rel="noopener noreferrer" target="_blank">https://community.particle.io/</a>)</li>
                                </ul>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="certificate">
                    <div className="pro-workshop-lesson">
                        <a className="toggle" href="javascript:void(0);">
                            <h3 className="hckui__typography__h3">
                            <span>Completion Certificate</span>
                            <i className="hckui__typography__iconWrapper vertical-align-middle">
                                {/* <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open"> */}
                                    {/* <use xlink:href="#svg-arrow-down"></use> */}
                                {/* </svg> */}
                                {/* <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open"> */}
                                    {/* <use xlink:href="#svg-arrow-up"></use> */}
                                {/* </svg> */}
                            </i>
                            </h3>
                        </a>
                        <div className="pro-workshop-lesson-details show-on-open">
                            <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                            <p className="hckui__typography__bodyL hckui__layout__marginTop15">Click below to take the quiz and obtain your completion certificate:</p>
                            <p className="hckui__typography__bodyL"><a className="hckui__buttons__md" href="/workshops/particle-101-course/certificate">Get my completion certificate</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>


            </div>                  
        )
    }
}

const mapStateToProps = state => {
    console.log("mapStateToProps: " + JSON.stringify(state))
    return {
      token: state.auth.token,
      username: state.auth.username,
      wsp: state.profileWorkshop.currentWorkshop
    };
  };
  
  const mapDispatchToProps = dispatch => {
    console.log("mapDispatchToProps: ")
    return {
      getWorkshopContent: (token, workshopID, userID) => dispatch(getWorkshopContent(token, workshopID, userID)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkshopContent);
  