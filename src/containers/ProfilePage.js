import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Menu, Card, Button, DatePicker, TimePicker, Form, Modal, Skeleton, message, Divider, List, Tabs, Row, Col, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import Checkout from "../components/MeetingCheckout";
import {getProfileAccountInfo, putProfileAccountInfo} from "../store/actions/profileUserInfo";
import {profilePageURL, profileFollowUser} from "../constants"
import MessengerBox from "../components/MessengerBox";
import "../assets/session.css";
import "../assets/collaboration.css";
import countryList from 'react-select-country-list';

const options2 = countryList().getData();
const universities = [
  {
    value: 'ITAM',
    label: 'Instituto Autónomo Tecnológico de México (ITAM)'
  },
  {
    value: 'Center of Teaching and Research in Economics',
    label: 'Centro de Investigación y Docencias Económicas (CIDE)'
  },
  {
    value: 'COLMEX',
    label: 'El Colegio de México (COLMEX)'
  },
  {
    value: 'TEC_MONTERREY',
    label: 'Instituto Tecnológico y de Estudios Superiores de Monterrey (ITESM)'
  },
  {
    value: 'IBERO',
    label: 'Universidad Iberoamericana (IBERO)'
  },
  {
    value: 'Massachusetts Institute of Technology',
    label: 'Massachusetts Institute of Technology (MIT)'
  }
]

class ArticleDetail extends React.Component {

    state = {
        username: null,
        university: null,
        country: options2,
        academic_status: null,
        academic_degree: null,
        bachelors_degree: null,
        masters_degree: null,
        phD_degree: null,
        course: null,
        profile_avatar: null,
        message: null,
        website: null,
        work_experience: null,
        open_messenger: false,
        visible: false,
    };

    handleOpenMessenger = e => {
      this.setState({
        open_messenger: true,
    });
    }

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

      handleCountryChange = value => {
        console.log('Country changed', value);
        // this.setState({ country: value[0] })
        Object.values(options2).map((k) => {
          // console.log(JSON.stringify(k))
          if(k.value === value){
            return k.label
          } 
        })
        return value
      }
    
      handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
          autoCompleteResult = [];
        } else {
          autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
      };
    
      handleUniversityChange = val => {
        var lab = null
        Object.values(universities).map((k, i) => {
          if(k.value === val){
            this.lab = val
            return
          } 
        })
        return this.lab
      };
    
      handleBachelorChange = val => {
        var lab = null
        this.lab = val
        return this.lab
      };
    
      handleMasterChange = val => {
        var lab = null
        this.lab = val
        return this.lab
      };
    
      handleDoctorateChange = val => {
        var lab = null
        this.lab = val
        return this.lab
      };
    
      handleCourseChange = val => {
        var lab = null
        this.lab = val
        return this.lab
      };
    
      handleAcademicStatus = val => {
        var academic_s = null
        if(val.undergraduate === true){
          this.academic_s = "undergraduate"
        } else if (val.graduate === true){
          this.academic_s = "graduate"
        } else if (val.postgraduate === true){
          this.academic_s = "postgraduate"
        }
        return this.academic_s
      }
    
      handleDegree = val => {
        var academic_d = null
        if(val === "Bachelor's degree"){
          academic_d = "bachelor"
        } else if (val === "Master's degree"){
          academic_d = "master"
        } else if (val === "Doctorate"){
          academic_d = "doctorate"
        }
        return academic_d
      }
    
      handleCourse = val => {
        var academic_c = null
        return this.academic_c
      }
    
      handleWorkExperience = val => {
        var work_e = null
        if(val === "True"){
          this.work_e = "True"
        } else if (val === "False"){
          this.work_e = "False"
        } else {
          return this.work_e
        }
        return this.work_e
      }

    componentDidMount() {
        console.log("componentDidMount THIPROPS: " + JSON.stringify(this.props))
        const user = this.props.match.params.user;
        //const sessionID = 11
        // this.props.getProfileInfo(this.props.token, this.props.match.params.user)
        axios.get(profilePageURL(user))
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                this.setState({
                    username: res.data.name,
                    university: res.data.university,
                    country: res.data.country,
                    academic_status: res.data.academic_status,
                    academic_degree: res.data.degree,
                    bachelors_degree: res.data.bachelor,
                    masters_degree: res.data.master,
                    phD_degree: res.data.doctorate,
                    course: res.data.course,
                    profile_avatar: res.data.profile_avatar,
                    message: res.data.message,
                    website: res.data.website,
                    work_experience: res.data.work_experience,
                });
                console.log("Article Detail res data: " + res.data);
            });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            axios.defaults.headers = {
                "Content-Type": "aplication/json",
                Authorization: newProps.token
            }
            const user = this.props.match.params.user;
            axios.get(profilePageURL(user))
                .then(res => {
                    this.setState({
                        username: res.data.name,
                        university: res.data.university,
                        country: res.data.country,
                        academic_status: res.data.academic_status,
                        academic_degree: res.data.degree,
                        bachelors_degree: res.data.bachelor,
                        masters_degree: res.data.master,
                        phD_degree: res.data.doctorate,
                        course: res.data.course,
                        profile_avatar: res.data.profile_avatar,
                        message: res.data.message,
                        website: res.data.website,
                        work_experience: res.data.work_experience,
                    });
                    console.log("Article Detail res data: " + res.data);
                })
        }

    }

    render() {
        console.log('this.PROPS: ' + JSON.stringify(this.props))
        console.log("this.state: " + this.state, this.state.orderId)
        const { UserAccountInfo} = this.props.profileIA;
        const { 
        username,
        university,
        country,
        academic_status,
        academic_degree,
        bachelors_degree,
        masters_degree,
        phD_degree,
        course,
        profile_avatar,
        message,
        website,
        work_experience,
        open_messenger,
        visible, orderId, loading } = this.state
        return (
            <div>
              <div className="layout-shadow">
                <div className="layout-content-is-white">
                  <div className="grid-row">
                    <div className="grid-row-inner">
                      <div className="resume_section resume_top-section" data-view="resumes#top-aligner">
                        <div className="resume_top-left" data-role="left_panel">
                          <div className="resume_top-photo_wrapper">
                            <img alt="Adrien Castelain, Designer in Wellington, New Zealand" className="resume_top-photo" src="http://127.0.0.1:8000/media/profileAvatar/IMG_20180723_230803_tKPJtyV.jpg"></img>
                          </div>
                        </div>
                        <div className="resume_top-right" data-role="right_panel">
                          <div className="resume_top-info">
                            <div className="resume_top-info_name" data-slug="adrien-castelain" data-target-role="Designer">Adrien Castelain</div>
                            <div className="resume_top-info_short_description" data-talent_title="Designer">
                              <h1 className="resume_top-info_location">Designer in Wellington, New Zealand</h1>
                              <div className="resume_top-info_since">Member since January 10, 2019</div>
                            </div>
                            <div className="resume_top-info_bio" data-role="description">Adrien is an award-winning designer and digital art director specialized in strategy, user experience (UX), user interface (UI), brand identity and interaction design. For the last 13 years, he's been crafting and delivering unique digital experiences for global companies and startups. His clients hire him for his UX and UI expertise, user-centered approach, strategic mindset, collaborative leadership, creativity, and effectiveness.</div>
                          </div>
                          <div className="resume_top-tags" data-max-rows="2" data-role="tags_list">
                            <a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg4NQ" data-role="tag" href="https://www.toptal.com/designers/ux">User Experience (UX)</a>
                            <a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg4Ng" data-role="tag" href="https://www.toptal.com/designers/ui">User Interface (UI)</a>
                            <a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg5Ng" data-role="tag" href="https://www.toptal.com/designers/web">Web UX Design</a>
                            <a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjcxMjgxNg" data-role="tag" href="https://www.toptal.com/designers/digital">Digital Design</a>
                            <a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjc5MzMyMw" data-role="tag" href="https://www.toptal.com/designers/visual">Visual Designer</a>
                            <a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg5NA" data-role="tag" href="https://www.toptal.com/designers/mobile">Mobile UI</a>
                            <a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjY5MzA0MA" data-role="tag" href="https://www.toptal.com/designers/wireframing">Wireframing</a>
                            <a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg4Nw" data-role="tag" href="https://www.toptal.com/designers/brand">Branding</a>
                            <a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjcxMjgwMw" data-role="tag" href="https://www.toptal.com/designers/digital-product-design">Digital Product Design</a><a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjc0MzMwNQ" data-role="tag" href="https://www.toptal.com/designers/product-design">Product Design</a><a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjcwOTA4MA" data-role="tag" href="https://www.toptal.com/designers/photoshop">Adobe Photoshop</a><a className="tag is-expert" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg3Ng" data-role="tag" href="https://www.toptal.com/designers/sketch">Sketch</a><a className="tag is-strong" data-gql-id="VjEtU2tpbGxTZXQtMjY5MzA0MQ" data-role="tag" href="https://www.toptal.com/designers/ia">Information Architecture (IA)</a><a className="tag is-strong" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg4OQ" data-role="tag" href="https://www.toptal.com/designers/prototyping">Prototyping</a><a className="tag is-strong" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg3Nw" data-role="tag" href="https://www.toptal.com/designers/illustrator">Adobe Illustrator</a>
                            <a className="tag is-more is-hidden" data-role="more_tags_link" href="#">Show more</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="grid-row">
                    <div class="grid-row-inner">
                      <div class="resume_section for-hire_block mobile_app-hide">
                        <div class="resume_hire_block">
                          <div class="resume_hire_block-text">Adrien is now <span class="resume_hire_block-availability is-green">available</span> for hire</div>
                          <div class="resume_hire_block-actions">
                            <a class="button is-green_candy is-default resume_top-hire_button" data-role="action_button" data-short-text="Hire" href="https://www.toptal.com/hire?interested_in=designers&amp;talent_full_name=Adrien+Castelain&amp;talent_slug=adrien-castelain">Hire Adrien</a>
                            <span style={{padding:"0 10px"}}/>
                            <a class="button is-green_candy is-default resume_top-hire_button" data-role="action_button" data-short-text="Hire" href="https://www.toptal.com/hire?interested_in=designers&amp;talent_full_name=Adrien+Castelain&amp;talent_slug=adrien-castelain">Send a Message</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid-row" id="Portfolio">
                    <div className="grid-row-inner">
                        <div className="resume_section" data-view="resumes#portfolio">
                          <div className="resume_section-inner">
                            <div className="resume_section-content is-wide">
                              <div className="resume_portfolio">
                                <div className="resume_portfolio-inner">
                                  <h2 className="resume_portfolio-title">Portfolio</h2>
                                  <div>
                                    <div className="resume_portfolio-nav">
                                        <div className="resume_portfolio-specializations_nav is-single-specialization">
                                          <div className="resume_portfolio-mobile_select" data-role="mobile_select">Digital Design</div>
                                          <div className="resume_portfolio-specializations js-specializations-list">
                                            <a className="resume_portfolio-specialization is-active" data-role="tab_link" data-tab-id="core" href="#">Digital Design</a>
                                          </div>
                                        </div>
                                        <div className="resume_portfolio-slides_nav" data-role="slides_nav">
                                          <span className="resume_portfolio-slides_nav_back is-inactive" data-role="scroll_left"></span>
                                          <span className="resume_portfolio-slides_nav_forward" data-role="scroll_right"></span>
                                        </div>
                                    </div>
                                    <div className="resume_portfolio-specialization-items is-active" data-role="tab" data-tab-id="core">
                                      <ul className="resume_portfolio-items">
                                        <li className="resume_portfolio-item" data-role="item">
                                          <a className="resume_portfolio-item_link" data-gql-id="VjEtUG9ydGZvbGlvSXRlbS0xNzU3NDM" data-role="item-link" data-slug="help-bring-your-goals-to-life-banking-app" data-src="https://uploads.toptal.io/portfolio/cover_image/175743/cover_Apple_TV_Copy_8-ecc51dc050b2da93e13f69be0ccee035.jpg" data-title="Help Bring Your Goals to Life | Banking App" href="#">
                                            <img alt="Help Bring Your Goals to Life | Banking App" className="resume_portfolio-item_image" src="https://uploads.toptal.io/portfolio/cover_image/175743/cover_Apple_TV_Copy_8-ecc51dc050b2da93e13f69be0ccee035.jpg" title="Help Bring Your Goals to Life | Banking App"></img>
                                            <div className="resume_portfolio-item_overlay for-designers">
                                              <span className="resume_portfolio-item_link_text">
                                                <span className="resume_portfolio-item_link_title">Help Bring Your Goals to Life | Banking App</span>
                                              </span>
                                            </div>
                                          </a>
                                          <ul className="resume_portfolio-item_tags">
                                            <li className="tag is-small is-link for-portfolio_project" title="User Experience (UX)">
                                              <a href="https://www.toptal.com/designers/ux">User Experience (UX)</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Interface (UI)">
                                              <a href="https://www.toptal.com/designers/ui">User Interface (UI)</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Branding">
                                              <a href="https://www.toptal.com/designers/brand">Branding</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="User-centered Design (UCD)">User-centered Design (UCD)
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="User Onboarding">User Onboarding</li>
                                          </ul>
                                        </li>
                                        <li className="resume_portfolio-item" data-role="item">
                                          <a className="resume_portfolio-item_link" data-gql-id="VjEtUG9ydGZvbGlvSXRlbS0xNzU3NDk" data-role="item-link" data-slug="rebranding-a-real-estate-agency" data-src="https://uploads.toptal.io/portfolio/cover_image/175749/cover_Desktop_HD-700bf243cc1729fe8b3e6b4518dfe289.png" data-title="Rebranding a Real Estate Agency" href="#">
                                            <img alt="Rebranding a Real Estate Agency" className="resume_portfolio-item_image" src="https://uploads.toptal.io/portfolio/cover_image/175749/cover_Desktop_HD-700bf243cc1729fe8b3e6b4518dfe289.png" title="Rebranding a Real Estate Agency"></img>
                                              <div className="resume_portfolio-item_overlay for-designers">
                                                <span className="resume_portfolio-item_link_text">
                                                  <span className="resume_portfolio-item_link_title">Rebranding a Real Estate Agency</span>
                                                </span>
                                              </div>
                                          </a>
                                          <ul className="resume_portfolio-item_tags">
                                            <li className="tag is-small is-link for-portfolio_project" title="Branding">
                                              <a href="https://www.toptal.com/designers/brand">Branding</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Logotype">
                                              <a href="https://www.toptal.com/designers/logo">Logotype</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Guidelines">Guidelines</li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Interface (UI)">
                                              <a href="https://www.toptal.com/designers/ui">User Interface (UI)</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Experience (UX)">
                                              <a href="https://www.toptal.com/designers/ux">User Experience (UX)</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Responsive Design">Responsive Design</li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Sketch">
                                              <a href="https://www.toptal.com/designers/sketch">Sketch</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Webflow">Webflow</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Real Estate">Real Estate</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Property investment">Property investment</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Digital Strategy">Digital Strategy</li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Website Redesigns">
                                              <a href="https://www.toptal.com/designers/web">Website Redesigns</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Responsive UI">
                                              <a href="https://www.toptal.com/designers/ui">Responsive UI</a>
                                            </li>
                                          </ul>
                                        </li>
                                        <li className="resume_portfolio-item" data-role="item">
                                          <a className="resume_portfolio-item_link" data-gql-id="VjEtUG9ydGZvbGlvSXRlbS0xNzYwOTU" data-role="item-link" data-slug="ai-powered-business-assistant-app" data-src="https://uploads.toptal.io/portfolio/cover_image/176095/cover_Desktop_HD_Copy-320ddfe8b432d4b276e0a87e7d595f39.png" data-title="AI-powered Business Assistant App" href="#">
                                            <img alt="AI-powered Business Assistant App" className="resume_portfolio-item_image" src="https://uploads.toptal.io/portfolio/cover_image/176095/cover_Desktop_HD_Copy-320ddfe8b432d4b276e0a87e7d595f39.png" title="AI-powered Business Assistant App"></img>
                                              <div className="resume_portfolio-item_overlay for-designers">
                                                <span className="resume_portfolio-item_link_text">
                                                  <span className="resume_portfolio-item_link_title">AI-powered Business Assistant App</span>
                                                </span>
                                              </div>
                                          </a>
                                          <ul className="resume_portfolio-item_tags">
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Mobile Apps">Mobile Apps</li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Interface (UI)">
                                              <a href="https://www.toptal.com/designers/ui">User Interface (UI)</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Experience (UX)">
                                              <a href="https://www.toptal.com/designers/ux">User Experience (UX)</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Flows">
                                              <a href="https://www.toptal.com/designers/user-flows">User Flows</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="User Onboarding">User Onboarding</li>
                                            <li className="tag is-small is-link for-portfolio_project" title="AI Design">
                                              <a href="https://www.toptal.com/designers/artificial-intelligence">AI Design</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Artificial Intelligence (AI)">
                                              <a href="https://www.toptal.com/designers/artificial-intelligence">Artificial Intelligence (AI)</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Business Applications">Business Applications</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Startups">Startups</li>
                                          </ul>
                                        </li>
                                        <li className="resume_portfolio-item" data-role="item">
                                          <a className="resume_portfolio-item_link" data-gql-id="VjEtUG9ydGZvbGlvSXRlbS0xNzYyMzY" data-role="item-link" data-slug="sustainable-housing-collaboration-platform" data-src="https://uploads.toptal.io/portfolio/cover_image/176236/cover_Desktop_HD_Copy_9-ea67fe26d5f89fcc7fb6f86421d92510.png" data-title="Sustainable Housing Collaboration Platform" href="#">
                                            <img alt="Sustainable Housing Collaboration Platform" className="resume_portfolio-item_image" src="https://uploads.toptal.io/portfolio/cover_image/176236/cover_Desktop_HD_Copy_9-ea67fe26d5f89fcc7fb6f86421d92510.png" title="Sustainable Housing Collaboration Platform"></img>
                                              <div className="resume_portfolio-item_overlay for-designers">
                                                <span className="resume_portfolio-item_link_text">
                                                  <span className="resume_portfolio-item_link_title">Sustainable Housing Collaboration Platform</span>
                                                </span>
                                              </div>
                                          </a>
                                          <ul className="resume_portfolio-item_tags">
                                            <li className="tag is-small is-link for-portfolio_project" title="Logotype">
                                              <a href="https://www.toptal.com/designers/logo">Logotype</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Brand Guidelines">
                                              <a href="https://www.toptal.com/designers/brand">Brand Guidelines</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Wireframing">
                                              <a href="https://www.toptal.com/designers/wireframing">Wireframing</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Experience (UX)">
                                              <a href="https://www.toptal.com/designers/ux">User Experience (UX)</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Interface (UI)">
                                              <a href="https://www.toptal.com/designers/ui">User Interface (UI)</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="property development">property development</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Digital Branding">Digital Branding</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Sustainability">Sustainability</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Collaboration">Collaboration</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Digital Strategy">Digital Strategy</li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Digital Design">
                                              <a href="https://www.toptal.com/designers/digital">Digital Design</a>
                                            </li>
                                          </ul>
                                        </li>
                                        <li className="resume_portfolio-item" data-role="item">
                                          <a className="resume_portfolio-item_link" data-gql-id="VjEtUG9ydGZvbGlvSXRlbS0xNzYwOTk" data-role="item-link" data-slug="pay-for-fuel-from-your-car" data-src="https://uploads.toptal.io/portfolio/cover_image/176099/cover_Desktop_HD-1e58cb10ca3e634c5f0f1062f3a4f577.png" data-title="Pay for Fuel From Your Car" href="#">
                                            <img alt="Pay for Fuel From Your Car" className="resume_portfolio-item_image" src="https://uploads.toptal.io/portfolio/cover_image/176099/cover_Desktop_HD-1e58cb10ca3e634c5f0f1062f3a4f577.png" title="Pay for Fuel From Your Car"></img>
                                              <div className="resume_portfolio-item_overlay for-designers">
                                                <span className="resume_portfolio-item_link_text">
                                                  <span className="resume_portfolio-item_link_title">Pay for Fuel From Your Car</span>
                                                </span>
                                              </div>
                                          </a>
                                          <ul className="resume_portfolio-item_tags">
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Advertising">Advertising</li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Mobile App Design">
                                              <a href="https://www.toptal.com/designers/mobile">Mobile App Design</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Experience (UX)">
                                              <a href="https://www.toptal.com/designers/ux">User Experience (UX)</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Interface (UI)">
                                              <a href="https://www.toptal.com/designers/ui">User Interface (UI)</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Branding">
                                              <a href="https://www.toptal.com/designers/brand">Branding</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Interaction Design (IxD)">Interaction Design (IxD)</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Advertising Campaigns">Advertising Campaigns</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Online Marketing">Online Marketing</li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Flows">
                                              <a href="https://www.toptal.com/designers/user-flows">User Flows</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="User Onboarding">User Onboarding</li>
                                          </ul>
                                        </li>
                                        <li className="resume_portfolio-item" data-role="item">
                                          <a className="resume_portfolio-item_link" data-gql-id="VjEtUG9ydGZvbGlvSXRlbS0xNzYxNDI" data-role="item-link" data-slug="promotional-traveling-web-app" data-src="https://uploads.toptal.io/portfolio/cover_image/176142/cover_Desktop_HD-041872008fe24ef97f4877d36cc7f5c1.png" data-title="Promotional Traveling Web App" href="#">
                                            <img alt="Promotional Traveling Web App" className="resume_portfolio-item_image" src="https://uploads.toptal.io/portfolio/cover_image/176142/cover_Desktop_HD-041872008fe24ef97f4877d36cc7f5c1.png" title="Promotional Traveling Web App"></img>
                                              <div className="resume_portfolio-item_overlay for-designers">
                                                <span className="resume_portfolio-item_link_text">
                                                  <span className="resume_portfolio-item_link_title">Promotional Traveling Web App</span>
                                                </span>
                                              </div>
                                          </a>
                                        </li>
                                        <li className="resume_portfolio-item is-hidden" data-role="item">
                                          <a className="resume_portfolio-item_link" data-gql-id="VjEtUG9ydGZvbGlvSXRlbS0xNzU5OTA" data-role="item-link" data-slug="collaborative-digital-transformation-app" data-src="https://uploads.toptal.io/portfolio/cover_image/175990/cover_Desktop_HD-35b775a4381d6a371a082767b8de9813.png" data-title="Collaborative Digital Transformation App" href="#">
                                            <img alt="Collaborative Digital Transformation App" className="resume_portfolio-item_image" src="https://uploads.toptal.io/portfolio/cover_image/175990/cover_Desktop_HD-35b775a4381d6a371a082767b8de9813.png" title="Collaborative Digital Transformation App"></img>
                                              <div className="resume_portfolio-item_overlay for-designers">
                                                <span className="resume_portfolio-item_link_text">
                                                  <span className="resume_portfolio-item_link_title">Collaborative Digital Transformation App</span>
                                                </span>
                                              </div>
                                          </a>
                                          <ul className="resume_portfolio-item_tags">
                                            <li className="tag is-small is-link for-portfolio_project" title="Digital Product Design">
                                              <a href="https://www.toptal.com/designers/digital-product-design">Digital Product Design</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Design Systems">Design Systems</li>
                                            <li className="tag is-small is-link for-portfolio_project" title="UX Flows">
                                              <a href="https://www.toptal.com/designers/ux">UX Flows</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Complex Application User Interfaces (UI)">
                                              <a href="https://www.toptal.com/designers/ui">Complex Application User Interfaces (UI)</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Branding">
                                              <a href="https://www.toptal.com/designers/brand">Branding</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="User-centered Design (UCD)">User-centered Design (UCD)
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Research">
                                              <a href="https://www.toptal.com/designers/user-research">User Research</a>
                                            </li>
                                          </ul>
                                        </li>
                                        <li className="resume_portfolio-item is-hidden" data-role="item">
                                          <a className="resume_portfolio-item_link" data-gql-id="VjEtUG9ydGZvbGlvSXRlbS0xNzY0NjQ" data-role="item-link" data-slug="kellogg-s-vr-experience" data-src="https://uploads.toptal.io/portfolio/cover_image/176464/cover_Artboard-01abe18a31d155ef4436ba2352ab637e.png" data-title="Kellogg's VR Experience" href="#">
                                            <img alt="Kellogg's VR Experience" className="resume_portfolio-item_image" src="https://uploads.toptal.io/portfolio/cover_image/176464/cover_Artboard-01abe18a31d155ef4436ba2352ab637e.png" title="Kellogg's VR Experience"></img>
                                              <div className="resume_portfolio-item_overlay for-designers">
                                                <span className="resume_portfolio-item_link_text">
                                                  <span className="resume_portfolio-item_link_title">Kellogg's VR Experience</span>
                                                </span>
                                              </div>
                                          </a>
                                          <ul className="resume_portfolio-item_tags">
                                            <li className="tag is-small is-link for-portfolio_project" title="VR Interfaces">
                                              <a href="https://www.toptal.com/designers/virtual-reality">VR Interfaces</a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Interface (UI)">
                                              <a href="https://www.toptal.com/designers/ui">User Interface (UI)
                                              </a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="User Experience (UX)">
                                              <a href="https://www.toptal.com/designers/ux">User Experience (UX)
                                              </a>
                                            </li>
                                            <li className="tag is-small is-link for-portfolio_project" title="Augmented Reality (AR)">
                                              <a href="https://www.toptal.com/designers/augmented-reality">Augmented Reality (AR)</a>
                                            </li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Google Cardboard">Google Cardboard</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Advertising">Advertising</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="kellogg's">kellogg's</li>
                                            <li className="tag is-small is-not_a_link for-portfolio_project" title="Retail &amp; Wholesale">Retail &amp; Wholesale</li>
                                          </ul>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>                                  
                  </div>
                  <div className="grid-row" id="Employment">
                    <div className="grid-row-inner">
                      <div className="resume_section js-employments" data-view="resumes#employment">
                        <div className="resume_section-inner">
                          <h2 className="resume_section-title has-default_offset">Employment</h2>
                          <div className="resume_section-content">
                            <ul>
                              <li className="resume_section-content_item" data-gql-id="VjEtRW1wbG95bWVudC0xNjIxNTQ" data-role="item" id="employment-162154">
                                <div className="resume_section-content_row">
                                  <h3 className="resume_section-content_title has-range">Consultant Digital Designer of UX/UI, Interaction, and Strategy</h3>
                                  <div className="resume_section-content_range">2016 - PRESENT</div>
                                  <div className="resume_section-content_subtitle">Bold&amp;Bald (New Zealand)</div>
                                </div>
                                <div className="muted">
                                  <ul>
                                    <li>Led UX and UI for an investment banking web app, delivering clean and uncluttered look and feel based on research, creating, testing and enhancing main user-flows (onboarding, investing, withdrawing, customer feedback, and so on), building the design system, working across different teams and in an agile environment, collaborating efficiently with multiple stakeholders.
                                    </li>
                                    <li>Developed creative concepts, UX and UI for innovative AI-powered experience startups, working closely with the production teams and the different stakeholders, using a design-thinking and user-centered approach to develop and improve user-flows and interactions.
                                    </li>
                                    <li>Directed user research, UX/UI and branding for an innovative crowdsourcing map application, running interviews, developing creative concepts, wireframing, prototyping, and testing, scaling the design system, iterating, and rebranding the overarching guidelines.
                                    </li>
                                    <li>Oversaw branding, UX/UI, and launch of an MVP for an online tutoring platform.</li><li>Implemented user research, wireframing, prototyping for and design for complex in-house software, using design thinking process.
                                    </li>
                                    <li>Designed the UX and UI for Air New Zealand's promotional app.
                                    </li>
                                  </ul>
                                  <div className="js-technologies">Technologies: Adobe Experience Design (XD), Webflow, MacOS, InVision, Adobe Photoshop, Zeplin, Sketch
                                  </div>
                                </div>
                              </li>
                              <li className="resume_section-content_item" data-gql-id="VjEtRW1wbG95bWVudC0xNjIxNTg" data-role="item" id="employment-162158">
                                <div className="resume_section-content_row">
                                  <h3 className="resume_section-content_title has-range">Senior Digital Designer | Digital Art Director</h3>
                                    <div className="resume_section-content_range">2013 - 2016</div>
                                    <div className="resume_section-content_subtitle">Ogilvy &amp; Mather (New Zealand)</div>
                                </div>
                                <div className="muted">
                                  <ul>
                                    <li>Led the UX and UI for an innovative VR experience for Kellogg's, from creative concepts and brand guidelines to user experience and production-ready UI.</li><li>Oversaw the art direction and design of various creative digital campaigns for Pernod Ricard.</li>
                                    <li>Designed the UX and UI for an innovative mobile app for called BPme (an app that allowed you to pay for your fuel from your phone).</li>
                                    <li>Designed hundreds of social media ads for global companies.</li>
                                  </ul>
                                  <div className="js-technologies">Technologies: MacOS, UXPin, InVision, Adobe Suite</div>
                                </div>
                              </li>
                              <li className="resume_section-content_item is-hidden" data-gql-id="VjEtRW1wbG95bWVudC0xNjIxNTk" data-role="item" id="employment-162159">
                                <div className="resume_section-content_row">
                                  <h3 className="resume_section-content_title has-range">Web Designer | UX/UI Designer</h3>
                                  <div className="resume_section-content_range">2009 - 2013</div>
                                  <div className="resume_section-content_subtitle">Freelance (Global)</div>
                                </div>
                                <div className="muted">
                                  <ul>
                                    <li>Designed interfaces for a variety of clients.</li>
                                    <li>Provided digital design services for agencies in France, Spain, Switzerland, and Australia.</li>
                                    <li>Delivered efficient and responsive support for digital and communication agencies via curated art direction and creative designs.</li>
                                  </ul>
                                  <div className="js-technologies">Technologies: WordPress, PHP, JavaScript, CSS, HTML, Adobe Photoshop</div>
                                </div>
                              </li>
                              <li className="resume_section-content_item is-hidden" data-gql-id="VjEtRW1wbG95bWVudC0xNjIxNjA" data-role="item" id="employment-162160">
                                <div className="resume_section-content_row">
                                  <h3 className="resume_section-content_title has-range">Web Designer</h3>
                                  <div className="resume_section-content_range">2007 - 2009</div>
                                  <div className="resume_section-content_subtitle">Quelinka (Spain)</div>
                                </div>
                                <div className="muted">
                                  <ul>
                                    <li>Designed and developed the front ends for various companies.</li>
                                    <li>Provided comprehensive digital solutions focusing on identity, websites, blogs, videos, and mobile applications, and so on.</li>
                                    <li>Managed accounts and client expectations.</li>
                                  </ul>
                                  <div className="js-technologies">Technologies: Drupal, WordPress, JavaScript, CSS, HTML, Adobe Photoshop</div>
                                  </div>
                              </li>
                              <li className="resume_section-content_item is-hidden" data-gql-id="VjEtRW1wbG95bWVudC0xNjIxNjE" data-role="item" id="employment-162161">
                                <div className="resume_section-content_row">
                                  <h3 className="resume_section-content_title has-range">Multimedia Designer</h3>
                                  <div className="resume_section-content_range">2006 - 2007</div>
                                  <div className="resume_section-content_subtitle">Mouss Production (France)</div>
                                </div>
                                <div className="muted">
                                  <ul>
                                    <li>Filmed and edited videos for international outdoor sports events (France, Spain, Italy, and Libya).</li>
                                    <li>Edited videos and implemented special effects and diffusion for web and TV.</li>
                                    <li>Designed, developed, and maintained a web TV.</li>
                                  </ul>
                                  <div className="js-technologies">Technologies: JavaScript, CSS, HTML, Adobe After Effects, Adobe Premiere Pro, Adobe Photoshop</div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="resume_section-actions" data-role="load_more_link_wrapper">
                          <a className="button is-light is-small" data-role="load_more_link" href="#">Load more...</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid-row #Education">
                    <div className="grid-row-inner">
                      <div className="resume_section js-educations">
                        <div className="resume_section-inner">
                          <h2 className="resume_section-title for-education">Education</h2>
                          <div className="resume_section-content">
                            <ul>
                              <li className="resume_section-content_item" data-gql-id="VjEtRWR1Y2F0aW9uLTEzMzU0MA" id="education-133540">
                                  <div className="resume_section-content_row">
                                    <div className="resume_section-content_title is-blue has-range">Master's degree in Communication and Marketing Strategy</div>
                                    <div className="resume_section-content_range">2004 - 2005</div>
                                    <div className="resume_section-content_subtitle">Wesford Grenoble Graduate Business School  - Grenoble, France</div>
                                  </div>
                              </li>
                              <li className="resume_section-content_item" data-gql-id="VjEtRWR1Y2F0aW9uLTEzMzU0MQ" id="education-133541">
                                <div className="resume_section-content_row">
                                  <div className="resume_section-content_title is-blue has-range">Postgraduate diploma in Multimedia Design and Direction</div>
                                    <div className="resume_section-content_range">2002 - 2004</div>
                                    <div className="resume_section-content_subtitle">Les Gobelins  - Annecy, France</div>
                                  </div>
                              </li>
                              <li className="resume_section-content_item" data-gql-id="VjEtRWR1Y2F0aW9uLTEzMzU0Mg" id="education-133542">
                                <div className="resume_section-content_row">
                                  <div className="resume_section-content_title is-blue has-range">Bachelor's degree in Digital Communication</div>
                                    <div className="resume_section-content_range">2000 - 2002</div>
                                    <div className="resume_section-content_subtitle">University of Savoie - Chambéry, France</div>
                                  </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid-row #SkillsandTools">
                    <div className="grid-row-inner">
                      <div className="resume_section has-no_bottom_border_on_mobile for-details" data-role="resume-details" data-view="resumes#details-height">
                        <div className="resume_details-col is-1_of_2 is-1_of_1_for_printing for-experience" data-role="details-cell">
                          <div className="resume_details-item">
                            <div className="resume_details-item_inner for-experience">
                              <h2 className="resume_details-title">Experience</h2>
                              <ul className="resume_details-list js-portfolio_section">
                                <li className="resume_details-list_item for-experience" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg4NQ">
                                  <a className="resume_details-list_item_name is-link" href="https://www.toptal.com/designers/ux">User Experience (UX)</a>
                                  <span className="resume_details-list_item_experience">13 years</span>
                                </li>
                                <li className="resume_details-list_item for-experience" data-gql-id="VjEtU2tpbGxTZXQtMjcxMjgxNg">
                                  <a className="resume_details-list_item_name is-link" href="https://www.toptal.com/designers/digital">Digital Design</a>
                                  <span className="resume_details-list_item_experience">13 years</span>
                                </li>
                                <li className="resume_details-list_item for-experience" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg4Ng">
                                  <a className="resume_details-list_item_name is-link" href="https://www.toptal.com/designers/ui">User Interface (UI)</a>
                                  <span className="resume_details-list_item_experience">13 years</span>
                                </li>
                                <li className="resume_details-list_item for-experience" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg5Nw">
                                  <span className="resume_details-list_item_name">Problem Solving</span>
                                  <span className="resume_details-list_item_experience">13 years</span>
                                </li>
                                <li className="resume_details-list_item for-experience" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg4Nw">
                                  <a className="resume_details-list_item_name is-link" href="https://www.toptal.com/designers/brand">Branding</a>
                                  <span className="resume_details-list_item_experience">7 years</span>
                                </li>
                                <li className="resume_details-list_item for-experience" data-gql-id="VjEtU2tpbGxTZXQtMjcxNzg5OA">
                                  <span className="resume_details-list_item_name">Design Leadership</span>
                                  <span className="resume_details-list_item_experience">7 years</span>
                                </li>
                                <li className="resume_details-list_item for-experience" data-gql-id="VjEtU2tpbGxTZXQtMjcxMjgwMw">
                                  <a className="resume_details-list_item_name is-link" href="https://www.toptal.com/designers/digital-product-design">Digital Product Design</a>
                                  <span className="resume_details-list_item_experience">7 years</span>
                                </li>
                                <li className="resume_details-list_item for-experience" data-gql-id="VjEtU2tpbGxTZXQtMjY5Mjg4NA">
                                  <span className="resume_details-list_item_name">User-centered Design (UCD)</span>
                                  <span className="resume_details-list_item_experience">5 years</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="resume_details-col is-beige resume_details-map_wrapper hide_in_webview is-1_of_2 is-hidden_for_printing" data-role="details-cell">
                          <h2 className="resume_details-title">Location</h2>
                          <div className="resume_details-item resume_details-map" data-view="resumes#talent-location">
                            <img className="resume_details-map_image" alt="Wellington, New Zealand" src="https://maps.googleapis.com/maps/api/staticmap?center=Wellington%2C+New+Zealand&amp;format=jpg&amp;key=AIzaSyDTGQ8g98f3gd_1o0aFRn0Hy05tbFLvvns&amp;maptype=roadmap&amp;markers=Wellington%2C+New+Zealand&amp;scale=2&amp;size=668x668&amp;zoom=3&amp;style=element:geometry%7Ccolor:0xf5f5f5&amp;style=element:labels.icon%7Cvisibility:off&amp;style=element:labels.text.fill%7Ccolor:0x616161&amp;style=element:labels.text.stroke%7Ccolor:0xf5f5f5&amp;style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&amp;style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&amp;style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&amp;style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&amp;style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&amp;style=feature:road%7Celement:geometry%7Ccolor:0xffffff&amp;style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&amp;style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&amp;style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&amp;style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&amp;style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&amp;style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&amp;style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&amp;style=feature:water%7Celement:geometry.fill%7Ccolor:0x95a8c3&amp;style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e" width="668" height="668"></img>
                            <div className="resume_details-fullscreen-map">
                                <div className="resume_details-fullscreen-map-close" data-role="fullscreen-map-close">
                                </div>
                                <div className="resume_details-fullscreen-map-container" data-location="Wellington, New Zealand" data-role="fullscreen-map-container">
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="resume#wrap_u"p></div>
                </div>
              </div>
            </div>
            
        )
    }
}

const WrappedArticleCreate = Form.create()(ArticleDetail);

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username,
        profileIA: state.profileInfo
    }
}

const mapDispatchToProps = dispatch => {
    console.log("mapDispatchToProps: ")
    return {
      getProfileInfo: (token, userID) => dispatch(getProfileAccountInfo(token, userID)),
    };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedArticleCreate));



              // <Card title={username}>
              //       <Row type="flex" style={{ alignItems: 'left' }} >
              //           <Col span={1}>
              //             <Button>
              //               Follow
              //             </Button>
              //           </Col>
              //       </Row>
              //       <Row type="flex" style={{ alignItems: 'center' }} justify="center">
              //           <Col span={12}>
              //             <Row type="flex" style={{ alignItems: 'center' }} justify="center">
              //               <div id="session-div-2">
              //               <img
              //                   className="contain"
              //                   alt="logo"
              //                   src={profile_avatar}
              //               />
              //               </div>
              //               </Row>
              //               <Row type="flex" style={{ alignItems: 'center' }} justify="center">
              //                 <Button disabled={open_messenger} onClick={() => this.handleOpenMessenger()}>
              //                   Send Message
              //                 </Button>
              //               </Row>
              //           </Col>
              //           <Col span={12}>
              //             <div>
              //                 <p style={pStyle}>Basic Information</p>
              //                 <p>{username}</p>
              //                 <p>{message}</p>

              //                 <Divider />
              //                 <p style={pStyle}>Academic Information</p>
              //                 <p>University: {university}</p>
              //                 <p>{academic_status}</p>
              //                 <p>Degree: {academic_degree}</p>
              //                 <p>{bachelors_degree}</p>
              //                 <p>{masters_degree}</p>
              //                 <p>{phD_degree}</p>
              //                 <p>Course: {course}</p>

              //                 <Divider />
              //                 <p style={pStyle}>Working experience</p>
              //                 <p>Website: {website}</p>
              //                 <p>Experience: {work_experience}</p>
              //                 </div>
              //           </Col>
              //       </Row>
              //         <MessengerBox op={open_messenger}/>
              //   </Card>