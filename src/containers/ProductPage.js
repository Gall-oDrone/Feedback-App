import React from "react";
import "../assets/landing.css";
import Sphere from "../components/WorldSphere3D";
import Sphere2 from "../components/WorldSphere3D copy";
import { ReactComponent as ArticleIcon } from '../icons/article.svg';
import { ReactComponent as VideoChatIcon } from '../icons/video-chat.svg';
import { ReactComponent as ProjectsIcon } from '../icons/projects.svg';
import { ReactComponent as AnswerIcon } from '../icons/answers.svg';
import { ReactComponent as SurveyIcon } from '../icons/surveys.svg';
import { ReactComponent as WorkShopIcon } from '../icons/workshops.svg';
import { ReactComponent as BrandIcon } from '../icons/brand.svg';
import VideoPlayer from "./ProductPageVideoPlayer";
// https://py3-test-app-bucket.s3.amazonaws.com/media/assets/universities/Oxford-Logo.png
// https://py3-test-app-bucket.s3.amazonaws.com/media/assets/universities/University-Cambridge-Logo.png
import a from "../assets2/u-munich-logo.png"
import b from "../assets2/university-ba-logo.png"
import c from "../assets2/university-france-logo.png"
import d from "../assets2/university-oxford-logo.png"
import e from "../assets2/university-sao-pablo-logo.png"

import f from "../assets2/university-toronto-logo.png"
import g from "../assets2/university-unam-logo.png"
import h from "../assets2/university-harvard-logo.png";
import i from "../assets2/university-mit-logo.png";
import j from "../assets2/University-Cambridge-Logo.png";
import k from "../assets2/University-Duke-Logo.png";
import l from "../assets2/University-LSE-Logo.png";
import m from "../assets2/university-tec-logo.png";

class ProductPage extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = { 
      VideoPlayerModal: false,
    };
  }
  handleVideoBanner = (action) => {
    if (action === "open"){
      this.setState({VideoPlayerModal: true})
    }else {
      this.setState({VideoPlayerModal: false})
    }
  }
  render() {
    return (
      <div id="product-page">
          <div className="top-banner-container" id="product">
            <div className="first-section"> 
                  <div className="top-banner-text-container">
                    <div className="top-banner-text-container-2">
                      <h1>Mate Crunch</h1>
                      <p>Guidance, collaboration, interaction, and communication between local and international students</p>
                    </div>
                  </div>
                  <div className="top-banner-image-container">
                      <div className="top-banner-image-container-svg">
                        <svg className="main-icon-svg"><BrandIcon/></svg>
                      </div>
                  </div>
            </div>
          </div>
            <section className="second-section">
              <div className="second-flex-container">
                {this.state.VideoPlayerModal === true ? 
                    <VideoPlayer showVideo={this.handleVideoBanner} />
                      : null 
                }
                  <div className="description-container">
                    <h2>What is Mate Crunch?</h2>
                      <div className="description-video-container">
                        <button className="WatchVideoButton" onClick={()=> this.handleVideoBanner("open")} data-ae-button="ae home - cards banner - watch the video">
                          <div className="WatchVideoButton-slideInBg">
                            <div className="WatchVideoButton-slideInBgContent">
                              <img className="WatchVideoButton-icon" src="data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJwbGF5LWNpcmNsZSIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLXBsYXktY2lyY2xlIGZhLXctMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0yNTYgOEMxMTkgOCA4IDExOSA4IDI1NnMxMTEgMjQ4IDI0OCAyNDggMjQ4LTExMSAyNDgtMjQ4UzM5MyA4IDI1NiA4em0xMTUuNyAyNzJsLTE3NiAxMDFjLTE1LjggOC44LTM1LjctMi41LTM1LjctMjFWMTUyYzAtMTguNCAxOS44LTI5LjggMzUuNy0yMWwxNzYgMTA3YzE2LjQgOS4yIDE2LjQgMzIuOSAwIDQyeiIvPjwvc3ZnPg==" alt=""/>
                                <span className="WatchVideoButton-text WatchVideoButton-text--white">Watch the Video</span>
                            </div>
                          </div>
                          <img class="WatchVideoButton-icon" src="data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJwbGF5LWNpcmNsZSIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLXBsYXktY2lyY2xlIGZhLXctMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiMwMjIwM2MiIGQ9Ik0yNTYgOEMxMTkgOCA4IDExOSA4IDI1NnMxMTEgMjQ4IDI0OCAyNDggMjQ4LTExMSAyNDgtMjQ4UzM5MyA4IDI1NiA4em0xMTUuNyAyNzJsLTE3NiAxMDFjLTE1LjggOC44LTM1LjctMi41LTM1LjctMjFWMTUyYzAtMTguNCAxOS44LTI5LjggMzUuNy0yMWwxNzYgMTA3YzE2LjQgOS4yIDE2LjQgMzIuOSAwIDQyeiIvPjwvc3ZnPg==" alt=""/>
                            <span class="WatchVideoButton-text WatchVideoButton-text--blue">Watch the Video</span>
                        </button>
                      </div>
                      <div className="description-banner-container">
                          <div className="description-banner-articles-container">
                            <svg className="articles-svg"><ArticleIcon id="articlesIcon"/></svg>
                            <h3>Develop your writting skills</h3>
                            <p>In Mate Crunch we give the chance to students and graduates to be able to post and write articles about their passions, interests, and hobbies. Something that can apport to themselves as future professionals, and also to other academic communities.</p>
                          </div>
                          <div className="description-banner-projects-container">
                            <svg className="articles-svg"><ProjectsIcon/></svg>
                            <h3>Develop your ideas or your projects to further stages of development</h3>
                            <p>We incentive students to become something more than just entrepreneurs. We aim for people that can apport ideas and projects with a real impact on different fields.</p>
                          </div>
                          <div className="description-banner-inquiries-container">
                            <svg className="articles-svg"><AnswerIcon/></svg>
                            <h3>Get answers to any kind of academic questions </h3>
                            <p>Homework review, problem solving, admissions, advices or other related topics</p>
                          </div>
                          <div className="description-banner-advisors-container">
                            <svg className="articles-svg"><VideoChatIcon/></svg>
                            <h3>One-to-one session meetings with local and foreign students </h3>
                            <p>We know how valuable is time for any student or any graduate emplyoee. That's why you can get paid by handling video chat meetings</p>
                          </div>
                          <div className="description-banner-workshops-container">
                            <svg className="articles-svg"><WorkShopIcon/></svg>
                            <h3>Become a Leader, a Mentor, or a Coach</h3>
                            <p>Share your knowledge and put on practice your communication skills with our workshop modality.</p>
                          </div>
                          <div className="description-banner-surveys-container">
                            <svg className="articles-svg"><SurveyIcon/></svg>
                            <h3>Create and post surveys for any purpose</h3>
                            <p>For data collection, feedback or market research. You can post and customize surveys</p>
                          </div>
                      </div>
                  </div>
              </div>
            </section>
            <section className="third-section">
              <div className="third-flex-container">
                  <div className="universities-container">
                      <h2>Peer Learning from top universities all around the world</h2>
                      <h4>Interactions with local and foreign students</h4>
                      < div className="universities-main-header-container">
                      </div>
                      < div className="universities-subheader-container">
                      </div>
                      < div className="universities-slider-container">
                          <div className="universities-slider-left-bound ">
                          </div>
                          < div className="universities-slider-first-row-container">
                              <div className="universities-slider-container-animation-1">
                                <div className="universities-slider-first-row-container-animation-1">
                                  <div className="universities-slider-img-container">
                                      <img src={a}/>
                                  </div>
                                  <div className="universities-slider-img-container">
                                      <img src={b}/>
                                  </div>
                                  <div className="universities-slider-img-container">
                                      <img src={c}/>
                                  </div>
                                  <div className="universities-slider-img-container">
                                      <img src={d}/>
                                  </div>
                                  <div className="universities-slider-img-container">
                                      <img src={e}/>
                                  </div>
                                </div>
                              </div>
                              <div className="universities-slider-container-animation-2">
                                <div className="universities-slider-first-row-container-animation-2">
                                  <div className="universities-slider-img-container">
                                    <img src={a}/>
                                  </div>
                                  <div className="universities-slider-img-container">
                                    <img src={b}/>
                                  </div>
                                  <div className="universities-slider-img-container">
                                    <img src={c}/>
                                  </div>
                                  <div className="universities-slider-img-container">
                                      <img src={d}/>
                                  </div>
                                  <div className="universities-slider-img-container">
                                      <img src={k}/>
                                  </div>
                                </div>
                              </div>
                            </div>
                          < div className="universities-slider-second-row-container">
                            <div className="universities-slider-container-animation2-1">
                              <div className="universities-slider-second-row-container-animation-1">
                                <div className="universities-slider-img-container">
                                  <img src={f}/>
                                </div>
                                <div className="universities-slider-img-container">
                                  <img src={g}/>
                                </div>
                                <div className="universities-slider-img-container">
                                  <img src={h}/>
                                </div>
                                <div className="universities-slider-img-container">
                                  <img src={i}/>
                                </div>
                                <div className="universities-slider-img-container">
                                  <img src={j}/>
                                </div>
                              </div>
                            </div>
                            <div className="universities-slider-container-animation2-2">
                              <div className="universities-slider-second-row-container-animation-2">
                                <div className="universities-slider-img-container">
                                  <img src={f}/>
                                </div>
                                <div className="universities-slider-img-container">
                                  <img src={g}/>
                                </div>
                                <div className="universities-slider-img-container">
                                  <img src={h}/>
                                </div>
                                <div className="universities-slider-img-container">
                                  <img src={l}/>
                                </div>
                                <div className="universities-slider-img-container">
                                  <img src={m}/>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="universities-slider-right-bound">

                          </div>
                      </div>
                  </div>
              </div>
            </section>
            <section className="fourth-section">
              <div className="fourth-flex-container">
                <div className="fourth-section-div">
                  <h2>A Better Way to Expand your Curriculum</h2>
                  <div className="fourth-section-cont product-f-l-text">
                    <ul >
                        <li style={{listStyleType:"square"}}><b>Industry Practices</b></li>
                        <li style={{listStyleType:"square"}}><b>Remote or Local Interships</b></li>
                        <li style={{listStyleType:"square"}}><b>Faculty Collaborations</b></li>
                        <li style={{listStyleType:"square"}}><b>Alumni Collaborations</b></li>
                        <li style={{listStyleType:"square"}}><b>Assistantships</b></li>
                        <li style={{listStyleType:"square"}}><b>Volunteering Programs</b></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section className="fiveth-section">
              <div className="fiveth-flex-container">
                <div className="fiveth-section-div">
                  <h2>By Collaborating With</h2>
                  <div className="fiveth-section-cont product-fiveth-l-text">
                      <div className=".col-fifth-sec bifold">
                        <div className="bifold-header-2-wrap">
                          <h2 className="header-2">Industry Professional</h2>
                        </div>
                        <div className="bifold-paragraph-wrap">
                          <p className="paragraph">From Tech to Financial Industries, and more.</p>
                        </div>
                      </div>
                      <div style={{width:"30px"}}/>
                      <div className=".col-fifth-sec bifold left-border top-border">
                        <div className="bifold-header-2-wrap">
                          <h2 className="header-2">Faculty and Alumni Members</h2>
                        </div>
                        <div className="bifold-paragraph-wrap">
                          <p className="paragraph">National and International Professors and Students.</p>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="sixth-section">
              <div className="sixth-flex-container product-f-l-text">
                <div className="sixth-section-div">
                    <div className="sixth-section-cont">
                      <div className="sixth-col bifold testimonial-right">
                        <div className="header-wrap-1 _3">
                          <h2>Paid and Rewarded For</h2>
                        </div>
                      </div>
                      <div className="sixth-col bifold testimonial-right">
                      <div class="content-slider">
                          <div class="slider">
                            <div class="mask">
                              <ul>
                                <li className="anim1">
                                  <div className="quote">Your Creativity</div>
                                </li>
                                <li className="anim2">
                                  <div className="quote">Sharing Experiences</div>
                                </li>
                                <li className="anim3">
                                  <div className="quote">Teaching and Mentoring</div>
                                </li>
                                <li className="anim4">
                                  <div className="quote">Building and Deploying Projects</div>
                                </li>
                                <li className="anim5">
                                  <div className="quote">Quality Content</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
            </section>
            <section className="seventh-section">
              <div className="seventh-flex-container">
                <div className="seventh-section-div">
                  <h2>Providing the Tools for Boosting your Resume</h2>
                  <div className="seventh-section-cont product-seventh-l-text">
                    <ul >
                        <li style={{listStyleType:"square"}}><b>Research Assistantships</b></li>
                        <li style={{listStyleType:"square"}}><b>Recommendation Letters</b></li>
                        <li style={{listStyleType:"square"}}><b>Soft and Hard Skills Continuous Training</b></li>
                        <li style={{listStyleType:"square"}}><b>Research Projects</b></li>
                        <li style={{listStyleType:"square"}}><b>Seed Grant</b></li>
                        <li style={{listStyleType:"square"}}><b>Project Management</b></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section id="languagesBannerId">
                <div style={{minHeight: "1100px"}}>
                  <div className="_3vkAz1C4EV3VjfiS5DNOpr _3Dj7vOAMysGLzPCHxA3lxJ">
                    <div className="_1TBpQomryh4JlZLsDwgQhi">
                        {/* <div className="__react_component_tooltip-304517788 __react_component_tooltip place-top type-dark" id="beta-label-tooltip" data-id="tooltip"></div>
                        <img className="_-7ll5shwmwWrOl8UX7DSr" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjkgMTI5IiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PHBhdGggZD0iTTEyMS40IDYxLjZsLTU0LTU0Yy0uNy0uNy0xLjgtMS4yLTIuOS0xLjJzLTIuMi41LTIuOSAxLjJsLTU0IDU0Yy0xLjYgMS42LTEuNiA0LjIgMCA1LjguOC44IDEuOCAxLjIgMi45IDEuMnMyLjEtLjQgMi45LTEuMmw0Ny00N3Y5OC4xYzAgMi4zIDEuOCA0LjEgNC4xIDQuMXM0LjEtMS44IDQuMS00LjFWMjAuNGw0NyA0N2MxLjYgMS42IDQuMiAxLjYgNS44IDBzMS41LTQuMiAwLTUuOHoiIGZpbGw9IiMwMjIwM2MiLz48L3N2Zz4=" alt="scroll to top arrow"/> */}
                        <div className="_3H-7Qe8fS74lhxCAFfSk73">
                          <div className="_3QBwXTWg8lgAS38IsfnHj9">
                              <h2 className="_1iY1U-UeTX5NTWGxWKzOs-">An International Community and Grwoing.</h2>
                              {/* <ul className="_1zfZj1jWUyrBmZI5wJ60oN">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 295.238 295.238" fill="currentColor" className="EkAr_bRMlAZr8uJYv58V2">
                                      <path d="M276.19 26.189H19.048C8.543 26.189 0 34.732 0 45.237v171.429c0 10.505 8.543 19.048 19.048 19.048h85.714v23.81H71.429v9.524h152.38v-9.524h-33.333v-23.81h85.714c10.505 0 19.048-8.543 19.048-19.048V45.237c0-10.505-8.543-19.048-19.048-19.048zm-95.238 233.334h-66.667v-23.81h66.667v23.81zm104.762-42.857c0 5.252-4.271 9.524-9.524 9.524H19.048c-5.252 0-9.524-4.271-9.524-9.524V45.237c0-5.252 4.271-9.524 9.524-9.524H276.19c5.252 0 9.524 4.271 9.524 9.524v171.429z"></path>
                                      <path d="M19.048 216.666H276.19V45.237H19.048v171.429zm9.523-161.904h238.095v152.381H28.571V54.762z"></path>
                                      <circle cx="42.857" cy="69.048" r="4.762"></circle>
                                      <circle cx="57.143" cy="69.048" r="4.762"></circle>
                                      <circle cx="71.429" cy="69.048" r="4.762"></circle>
                                      <path d="M38.095 140.476h66.667V83.333H38.095v57.143zm9.524-47.62h47.619v38.095H47.619V92.856zM114.286 140.476h66.667V83.333h-66.667v57.143zm9.524-47.62h47.619v38.095H123.81V92.856zM190.476 140.476h66.667V83.333h-66.667v57.143zM200 92.856h47.619v38.095H200V92.856zM38.095 149.999h142.857v9.524H38.095zM38.095 169.047h142.857v9.524H38.095zM38.095 188.094h142.857v9.524H38.095zM195.238 149.999h61.905v9.524h-61.905zM195.238 169.047h61.905v9.524h-61.905zM195.238 188.094h61.905v9.524h-61.905z"></path>
                                    </svg>
                                    <span className="_3XGzIBnongf7rs5ksZ13JI"><b>JavaScript</b></span>, for all you Front-End Developers
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="EkAr_bRMlAZr8uJYv58V2">
                                      <path d="M288 240a8 8 0 00-8 8 24 24 0 01-48 0 8 8 0 00-16 0 40 40 0 0080 0 8 8 0 00-8-8z"></path>
                                      <path d="M256 16C123.055 16 16 173.555 16 304c0 120.223 89.719 192 240 192s240-71.777 240-192c0-130.445-107.055-288-240-288zm0 16c73.358 0 138.265 52.017 179.078 120H400a8 8 0 00-8-8H280a8 8 0 00-8 8h-32a8 8 0 00-8-8H120a8 8 0 00-8 8H76.922C117.735 84.017 182.642 32 256 32zm32 136v-8h29.394l-11.757 41.149A39.991 39.991 0 01288 168zm46.035-8h15.719l-12 48H328a40.056 40.056 0 01-7.477-.711zm32.211 0H384v8a40.064 40.064 0 01-29.395 38.562zm-220.492 0l11.64 46.562A40.065 40.065 0 01128 168v-8zm28.492 48l-12-48h15.719l13.512 47.289A40.056 40.056 0 01184 208zm32.117-6.851L194.606 160H224v8a39.989 39.989 0 01-17.637 33.149zM256 480c-140.258 0-224-65.793-224-176 0-44.743 13.189-92.858 35.919-136H112a56.063 56.063 0 0055.869 56H184a56.064 56.064 0 0056-56h32a56.063 56.063 0 0056 56h16a56.063 56.063 0 0056-56h44.081C466.811 211.142 480 259.257 480 304c0 110.207-83.742 176-224 176z"></path>
                                    </svg>
                                    <span className="_3XGzIBnongf7rs5ksZ13JI"><b>TypeScript</b></span>, for all you Edgy JavaScripters
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 470" fill="currentColor" className="EkAr_bRMlAZr8uJYv58V2">
                                      <path d="M250.893 173.727l29.224 16.873a7.499 7.499 0 0010.245-2.745 7.5 7.5 0 00-2.745-10.245l-29.224-16.873a7.5 7.5 0 00-10.245 2.745 7.498 7.498 0 002.745 10.245zM166.489 210.628a7.5 7.5 0 00-7.5 7.5v33.745a7.5 7.5 0 0015 0v-33.745a7.5 7.5 0 00-7.5-7.5zM280.118 279.4l-29.224 16.873a7.5 7.5 0 007.5 12.99l29.224-16.873a7.5 7.5 0 00-7.5-12.99z"></path>
                                      <path d="M432.021 321.25c-7.437 0-14.19 2.973-19.145 7.786l-52.702-30.428c.545-2.156.837-4.411.837-6.733 0-12.563-8.472-23.178-20-26.452v-60.846c11.528-3.274 20-13.889 20-26.452 0-2.323-.292-4.578-.837-6.734l52.702-30.427c4.955 4.814 11.708 7.786 19.146 7.786 15.164 0 27.5-12.336 27.5-27.5s-12.336-27.5-27.5-27.5-27.5 12.336-27.5 27.5c0 2.323.292 4.578.837 6.734l-52.702 30.428c-4.955-4.814-11.708-7.786-19.145-7.786-7.437 0-14.19 2.973-19.145 7.786l-52.702-30.427c.545-2.156.837-4.411.837-6.733 0-12.563-8.472-23.178-20-26.452V7.5a7.5 7.5 0 00-15 0v87.298c-11.528 3.274-20 13.889-20 26.452 0 2.323.292 4.578.837 6.734l-52.702 30.427c-4.955-4.813-11.708-7.786-19.145-7.786s-14.19 2.973-19.145 7.786l-52.702-30.428c.545-2.156.837-4.411.837-6.733 0-15.164-12.336-27.5-27.5-27.5s-27.5 12.336-27.5 27.5 12.336 27.5 27.5 27.5c7.438 0 14.19-2.973 19.146-7.786l52.702 30.428a27.441 27.441 0 00-.837 6.734c0 12.563 8.472 23.178 20 26.452v60.846c-11.528 3.274-20 13.889-20 26.452 0 2.323.292 4.578.837 6.734l-52.702 30.428c-4.955-4.814-11.708-7.786-19.145-7.786-15.164 0-27.5 12.336-27.5 27.5s12.336 27.5 27.5 27.5 27.5-12.336 27.5-27.5c0-2.323-.292-4.578-.837-6.734l52.702-30.428c4.955 4.814 11.708 7.786 19.145 7.786s14.19-2.973 19.145-7.786l52.702 30.427a27.441 27.441 0 00-.837 6.734c0 12.563 8.472 23.178 20 26.452V462.5a7.5 7.5 0 0015 0v-87.298c11.528-3.274 20-13.889 20-26.452 0-2.323-.292-4.578-.837-6.734l52.702-30.427c4.955 4.814 11.708 7.786 19.145 7.786 7.438 0 14.19-2.973 19.146-7.786l52.702 30.428a27.441 27.441 0 00-.837 6.734c0 15.164 12.336 27.5 27.5 27.5s27.5-12.336 27.5-27.5-12.339-27.501-27.503-27.501zm0-212.5c6.893 0 12.5 5.607 12.5 12.5s-5.607 12.5-12.5 12.5-12.5-5.607-12.5-12.5 5.607-12.5 12.5-12.5zm-394.042 25c-6.893 0-12.5-5.607-12.5-12.5s5.607-12.5 12.5-12.5 12.5 5.607 12.5 12.5-5.607 12.5-12.5 12.5zm0 227.5c-6.893 0-12.5-5.607-12.5-12.5s5.607-12.5 12.5-12.5 12.5 5.607 12.5 12.5-5.607 12.5-12.5 12.5zM333.51 165.625c6.893 0 12.5 5.607 12.5 12.5s-5.607 12.5-12.5 12.5-12.5-5.607-12.5-12.5 5.608-12.5 12.5-12.5zM235 108.75c6.893 0 12.5 5.607 12.5 12.5s-5.607 12.5-12.5 12.5-12.5-5.607-12.5-12.5 5.607-12.5 12.5-12.5zm-111.01 69.375c0-6.893 5.607-12.5 12.5-12.5s12.5 5.607 12.5 12.5-5.607 12.5-12.5 12.5-12.5-5.607-12.5-12.5zm12.5 126.25c-6.893 0-12.5-5.607-12.5-12.5s5.607-12.5 12.5-12.5 12.5 5.607 12.5 12.5-5.608 12.5-12.5 12.5zM235 361.25c-6.893 0-12.5-5.607-12.5-12.5s5.607-12.5 12.5-12.5 12.5 5.607 12.5 12.5-5.607 12.5-12.5 12.5zm71.01-69.375c0 2.323.292 4.578.837 6.734l-52.702 30.427c-4.955-4.813-11.708-7.786-19.145-7.786s-14.19 2.973-19.145 7.786l-52.702-30.427c.545-2.156.837-4.411.837-6.734 0-12.563-8.472-23.178-20-26.452v-60.846c11.528-3.274 20-13.889 20-26.452 0-2.323-.292-4.578-.837-6.734l52.702-30.427c4.955 4.814 11.708 7.786 19.145 7.786 7.438 0 14.19-2.973 19.146-7.786l52.702 30.427a27.441 27.441 0 00-.837 6.734c0 12.563 8.472 23.178 20 26.452v60.846c-11.529 3.274-20.001 13.889-20.001 26.452zm27.5 12.5c-6.893 0-12.5-5.607-12.5-12.5 0-6.891 5.605-12.497 12.495-12.5 6.9.003 12.505 5.609 12.505 12.5 0 6.893-5.607 12.5-12.5 12.5zm98.511 56.875c-6.893 0-12.5-5.607-12.5-12.5s5.607-12.5 12.5-12.5 12.5 5.607 12.5 12.5-5.607 12.5-12.5 12.5z"></path>
                                    </svg>
                                    <span className="_3XGzIBnongf7rs5ksZ13JI"><b>Python</b></span>, for all you Data Scientists
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512" className="EkAr_bRMlAZr8uJYv58V2">
                                      <path d="M298.667 25.6h-85.333a8.536 8.536 0 00-8.533 8.533 8.536 8.536 0 008.533 8.533h85.333a8.536 8.536 0 008.533-8.533 8.536 8.536 0 00-8.533-8.533zM358.4 25.6h-8.533a8.536 8.536 0 00-8.533 8.533 8.536 8.536 0 008.533 8.533h8.533a8.536 8.536 0 008.533-8.533A8.536 8.536 0 00358.4 25.6zM266.598 435.2H245.41c-12.979 0-23.543 10.564-23.543 23.543v4.122c0 12.979 10.564 23.535 23.535 23.535h21.188c12.979 0 23.543-10.556 23.543-23.535v-4.122c0-12.979-10.564-23.543-23.535-23.543zm6.469 27.665a6.475 6.475 0 01-6.468 6.468H245.41c-3.575 0-6.477-2.901-6.477-6.468v-4.122a6.48 6.48 0 016.477-6.477h21.18a6.478 6.478 0 016.477 6.477v4.122z"></path>
                                      <path d="M370.227 0H141.781c-17.007 0-30.848 13.841-30.848 30.848v450.304c0 17.007 13.841 30.848 30.848 30.848h228.437c17.007 0 30.848-13.841 30.848-30.839V30.848C401.067 13.841 387.226 0 370.227 0zM384 481.152c0 7.595-6.178 13.781-13.773 13.781H141.781c-7.603 0-13.781-6.187-13.781-13.773V30.848c0-7.595 6.178-13.781 13.781-13.781h228.437c7.603 0 13.781 6.187 13.781 13.781v450.304z"></path>
                                      <path d="M392.533 51.2H119.467a8.536 8.536 0 00-8.533 8.533v358.4a8.536 8.536 0 008.533 8.533h273.067a8.536 8.536 0 008.533-8.533v-358.4c0-4.71-3.823-8.533-8.534-8.533zM384 409.6H128V68.267h256V409.6z"></path>
                                    </svg>
                                    <span className="_3XGzIBnongf7rs5ksZ13JI"><b>Swift</b></span>, for all you iOS Engineers
                                </li>
                                <li>
                                    <svg viewBox="-23 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="EkAr_bRMlAZr8uJYv58V2">
                                      <path d="M367.664 34.137a23.54 23.54 0 001.149-18.102c-2.047-5.988-6.301-10.824-11.985-13.613-11.734-5.754-25.957-.895-31.715 10.836L301.207 61.98c-20.227-10.765-43.289-16.878-67.758-16.878s-47.531 6.113-67.758 16.878l-23.906-48.722c-5.758-11.73-19.984-16.594-31.715-10.836-5.683 2.789-9.937 7.621-11.984 13.613-2.047 5.988-1.64 12.418 1.148 18.098l28.145 57.355c-23.965 25.832-38.64 60.39-38.64 98.32a7.565 7.565 0 007.566 7.567h274.289a7.564 7.564 0 007.562-7.566c0-37.93-14.676-72.489-38.636-98.32zm-28.969-14.219c2.078-4.238 7.227-6 11.47-3.918 4.241 2.082 6 7.227 3.917 11.473L328.094 80.43a145.111 145.111 0 00-13.875-10.633zM116.735 16c4.242-2.082 9.39-.324 11.468 3.918l24.477 49.879c-4.84 3.27-9.477 6.82-13.88 10.637l-25.984-52.961c-2.086-4.246-.324-9.391 3.918-11.473zm-12.65 166.246c3.93-67.945 60.45-122.02 129.364-122.02s125.434 54.075 129.363 122.02zm0 0M431.098 214.516c-19.739 0-35.797 16.058-35.797 35.8v121.008c0 19.742 16.058 35.801 35.797 35.801 19.742 0 35.8-16.059 35.8-35.8V250.315c0-19.742-16.058-35.8-35.8-35.8zm20.675 156.808c0 11.403-9.273 20.676-20.675 20.676-11.399 0-20.672-9.273-20.672-20.676V250.316c0-11.402 9.273-20.675 20.672-20.675 11.402 0 20.675 9.273 20.675 20.675zm0 0M370.594 214.516h-39.328a7.564 7.564 0 000 15.125h31.765v178.492h-32.773a7.561 7.561 0 00-7.563 7.562v60.508c0 11.399-9.273 20.672-20.672 20.672-11.402 0-20.675-9.273-20.675-20.672v-60.508a7.561 7.561 0 00-7.563-7.562h-80.672a7.561 7.561 0 00-7.562 7.562v60.508c0 11.399-9.274 20.672-20.676 20.672-11.398 0-20.672-9.273-20.672-20.672v-60.508a7.561 7.561 0 00-7.562-7.562h-32.774V229.64h190.59a7.562 7.562 0 100-15.125H96.305a7.561 7.561 0 00-7.563 7.562v193.617a7.559 7.559 0 007.563 7.563h32.773v52.945c0 19.738 16.059 35.797 35.797 35.797 19.742 0 35.8-16.059 35.8-35.797v-52.945h65.548v52.945c0 19.738 16.058 35.797 35.8 35.797 19.739 0 35.797-16.059 35.797-35.797v-52.945h32.774a7.559 7.559 0 007.562-7.563V222.078a7.564 7.564 0 00-7.562-7.562zm0 0M35.8 214.516c-19.741 0-35.8 16.058-35.8 35.8v121.008c0 19.742 16.059 35.801 35.8 35.801 19.74 0 35.798-16.059 35.798-35.8V250.315c0-19.742-16.059-35.8-35.797-35.8zm20.673 156.808C56.473 382.727 47.199 392 35.8 392c-11.403 0-20.676-9.273-20.676-20.676V250.316c0-11.402 9.273-20.675 20.676-20.675 11.398 0 20.672 9.273 20.672 20.675zm0 0"></path>
                                      <path d="M168.91 117.707c-13.066 0-23.7 10.633-23.7 23.7s10.634 23.698 23.7 23.698 23.7-10.632 23.7-23.699-10.633-23.699-23.7-23.699zm0 32.27c-4.726 0-8.57-3.844-8.57-8.57s3.844-8.571 8.57-8.571c4.727 0 8.57 3.844 8.57 8.57s-3.843 8.57-8.57 8.57zm0 0M297.988 117.707c-13.066 0-23.699 10.633-23.699 23.7s10.633 23.698 23.7 23.698c13.066 0 23.698-10.632 23.698-23.699s-10.632-23.699-23.699-23.699zm0 32.27c-4.726 0-8.57-3.844-8.57-8.57s3.844-8.571 8.57-8.571c4.727 0 8.57 3.844 8.57 8.57s-3.843 8.57-8.57 8.57zm0 0"></path>
                                    </svg>
                                    <span className="_3XGzIBnongf7rs5ksZ13JI"><b>Kotlin</b></span>, for all you Androiders
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 57" fill="currentColor" className="EkAr_bRMlAZr8uJYv58V2">
                                      <path d="M53.5 13.5c0-2.481-2.019-4.5-4.5-4.5h-1.551c-.503-5.046-4.773-9-9.949-9h-18c-5.177 0-9.446 3.954-9.949 9H8a4.505 4.505 0 00-4.5 4.5c0 1.951 1.255 3.599 2.995 4.222-.009 6.706-.029 30.277-.029 30.277a5.006 5.006 0 005 5.001h3.032v1.694A2.309 2.309 0 0016.804 57h23.389a2.308 2.308 0 002.305-2.306V53h2.968c2.757 0 5-2.243 5-4.999 0 0 .032-23.571.034-30.277 1.742-.621 3-2.271 3-4.224zM19.5 2h18c4.072 0 7.436 3.06 7.931 7H11.569c.495-3.94 3.859-7 7.931-7zm20.998 52.694a.306.306 0 01-.305.306H16.804a.307.307 0 01-.306-.306V53h24v1.694zM45.466 51h-34c-1.654 0-3-1.346-3-2.999 0 0 .019-22.942.028-30.001H48.5c-.002 7.063-.034 29.999-.034 29.999a3.004 3.004 0 01-3 3.001zm3.673-35.014c-3.7.019-37.633.017-41.289-.001A2.496 2.496 0 015.5 13.5C5.5 12.121 6.622 11 8 11h41c1.378 0 2.5 1.121 2.5 2.5a2.496 2.496 0 01-2.361 2.486z"></path>
                                      <path d="M38.876 23.303c-3.105 0-5.779 1.852-6.995 4.505a4.582 4.582 0 00-3.308-1.414c-1.299 0-2.47.546-3.308 1.414-1.216-2.654-3.89-4.505-6.995-4.505-4.244 0-7.697 3.453-7.697 7.697s3.453 7.697 7.697 7.697 7.697-3.453 7.697-7.697c0-1.438 1.169-2.606 2.606-2.606s2.606 1.169 2.606 2.606c0 4.244 3.453 7.697 7.697 7.697s7.697-3.453 7.697-7.697-3.452-7.697-7.697-7.697zM18.271 36.697c-3.142 0-5.697-2.556-5.697-5.697s2.556-5.697 5.697-5.697 5.697 2.556 5.697 5.697-2.556 5.697-5.697 5.697zm20.605 0c-3.142 0-5.697-2.556-5.697-5.697s2.556-5.697 5.697-5.697 5.697 2.556 5.697 5.697-2.555 5.697-5.697 5.697zM22.5 42a1 1 0 100 2c7.072 0 12 1.581 12 3a1 1 0 102 0c0-4.759-11.662-5-14-5z"></path>
                                      <path d="M18.126 21.197l6 3a1 1 0 00.895-1.79l-6-3a1.001 1.001 0 00-.895 1.79zM32.574 24.303c.15 0 .303-.034.446-.105l6-3a1 1 0 00-.895-1.789l-6 3a1 1 0 00.449 1.894z"></path>
                                    </svg>
                                    <span className="_3XGzIBnongf7rs5ksZ13JI"><b>C++</b></span>, for all you Old Schoolers
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="EkAr_bRMlAZr8uJYv58V2">
                                      <path d="M372.853 23.594C341.774 7.594 306.681 0 271.853 0 161.063 0 52.618 76.766 82.173 204.133l-19.469 23.555-34.406 62.984 33.469 26.609-1.383 44.734 13.367 19.172s-15.93 59.844 8.422 68.328c22.883 8 47.82 9.969 66.922 9.969 18.812 0 31.977-1.906 31.977-1.906L183.728 512H409.65s-22.344-112.828 11.594-160.766c33.968-47.937 144.718-228.226-48.391-327.64zm-271.29 111.007c4.024-18.304 12.102-35.195 24.016-50.187 15.352-19.32 37.109-35.359 62.922-46.391 25.555-10.922 54.375-16.688 83.352-16.688 32.703 0 64.266 7.336 91.234 21.227 28.266 14.555 50.781 31.656 66.938 50.828 13.922 16.523 23.453 35.031 28.344 55.008 7.422 30.43 4.531 65-8.609 102.867-4.031-6.031-9.891-12.852-19.125-19.117l-28.766-43.125 33.438-13.844-48.891-32.75 25.578-25.586-57.688-11.539 13.844-33.43-57.734 11.422V47.109l-48.97 32.641-13.844-33.43-32.75 48.898-25.586-25.586-11.539 57.703-33.43-13.844 11.422 57.727h-28.984c-16.445-13.492-23.93-26.203-26.281-30.812.328-1.945.688-3.891 1.109-5.805zm75.079 32.477l-3.68-18.625 20.594 8.531 5.094-25.461 3.719-18.617 15.766 15.758 14.445-21.578 10.57-15.773 8.523 20.594L273.282 97.5l15.797-10.531v22.297l25.477-5.039 18.625-3.688-8.531 20.594 25.469 5.094 18.609 3.719-15.766 15.766 21.594 14.445 15.766 10.562-20.594 8.531 14.391 21.609 10.547 15.797H392.4c-19.875-4.453-46.188-6.453-81.328-3.961-70.821 5.016-118.407-6.234-149.344-20.14h19.953l-5.039-25.477zm204.757 283.344c.594 15.141 1.969 29.109 3.375 40.25H204.048l-1.672-34.156-1.117-23.453-23.242 3.391c-.117.016-12.086 1.703-28.922 1.703-15.32 0-37.562-1.422-57.805-8.078-.914-2.719-2.039-9.625-.695-22.234 1.211-11.375 3.758-21.109 3.773-21.172l2.547-9.562-5.664-8.125-9.328-13.375 1.172-37.672.328-10.703-8.383-6.656-19.414-15.438 24.82-45.43 18.172-21.984 6.719-8.141-2.383-10.273c-1.961-8.438-3.25-16.719-3.891-24.812 6.578 7.055 15.164 14.75 26.219 22.203 5.82 3.93 12.008 7.57 18.516 10.914l.43.641 1.984.586c15.086 7.5 31.898 13.461 50.258 17.789 33.695 7.945 72.758 10.414 116.117 7.336 44.312-3.141 77.594.781 98.875 11.641 16.062 8.188 21.312 18.188 25.156 25.469 1.031 1.984 1.969 3.781 3.062 5.406-12.5 27.781-27.312 50.375-35.844 62.406-16.843 23.81-24.405 61.341-22.437 111.529z"></path>
                                    </svg>
                                    <span className="_3XGzIBnongf7rs5ksZ13JI"><b>Java</b></span>, for all you Masochists
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 291.346 291.346" fill="currentColor" className="EkAr_bRMlAZr8uJYv58V2">
                                      <path d="M117.547 266.156L0 249.141v-94.296h117.547v111.311z" data-original="#26A6D1" data-old_color="#26A6D1"></path>
                                      <path d="M291.346 136.51H136.31l.055-114.06L291.346.009V136.51z" data-original="#3DB39E" data-old_color="#3DB39E"></path>
                                      <path d="M291.346 291.337l-155.091-22.459.182-114.015h154.909v136.474z" data-original="#F4B459" className="active-path" data-old_color="#F4B459"></path>
                                      <path d="M117.547 136.51H0V42.205l117.547-17.024V136.51z" data-original="#E2574C" data-old_color="#E2574C"></path>
                                    </svg>
                                    <span className="_3XGzIBnongf7rs5ksZ13JI"><b>C#</b></span>, for all you Microsofters
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001" fill="currentColor" className="EkAr_bRMlAZr8uJYv58V2">
                                      <path d="M74.301 202.311l25.6-25.6a8.532 8.532 0 000-12.068 8.532 8.532 0 00-12.068 0l-25.6 25.6a8.534 8.534 0 0012.068 12.068zM328.933 333.73c-42.546 21.535-88.107 21.499-128.695.068-6.872-3.629-14.622 3.069-12.028 10.395 12.285 34.689 40.583 56.885 76.311 56.885 35.727 0 64.026-22.196 76.31-56.885 2.57-7.258-5.028-13.94-11.898-10.463zm-16.682 27.522c-11.676 14.452-28.262 22.759-47.731 22.759-20.596 0-37.965-9.295-49.708-25.329 32.268 11.125 66.539 11.016 99.664-.342l-2.225 2.912z"></path>
                                      <path d="M490.382 198.917c.272-1.588 1.243-4.686 3.025-7.663 2.538-4.239 5.74-6.496 10.275-6.61a8.533 8.533 0 008.318-8.531v-28.689a8.535 8.535 0 00-4.954-7.747c-1.411-.652-3.972-1.709-7.636-3.034-5.979-2.162-12.961-4.313-20.897-6.313-9.648-2.432-19.656-4.417-29.99-5.928l29.029-78.775c2.517-6.831-4.126-13.475-10.957-10.958L360.208 73.868c-29.178-14.676-61.786-22.659-95.69-22.659-33.898 0-66.501 7.981-95.678 22.654L62.455 34.673C55.624 32.157 48.981 38.8 51.498 45.63l28.303 76.822c-16.204 1.512-31.669 4.188-46.313 7.879-7.936 2-14.918 4.151-20.897 6.313-3.664 1.325-6.226 2.383-7.636 3.034A8.533 8.533 0 000 147.425v28.689a8.534 8.534 0 008.318 8.531c4.534.114 7.736 2.371 10.275 6.61 1.782 2.977 2.753 6.075 3.05 7.815 4.004 26.351 10.838 46.682 22.081 62.01-18.498 4.802-33.201 12.798-41.882 23.77a8.534 8.534 0 0013.384 10.59c6.508-8.224 19.393-14.841 36.336-18.708a213.293 213.293 0 004.99 35.376c-23.385 6.023-43.16 17.597-54.759 32.537a8.533 8.533 0 001.508 11.973 8.533 8.533 0 0011.973-1.508c9.196-11.846 25.765-21.433 45.723-26.531 27.197 86.563 108.061 149.297 203.524 149.297 93.626 0 173.156-60.314 201.876-144.205 12.997 5.372 23.625 12.803 30.33 21.439a8.533 8.533 0 0011.973 1.508 8.533 8.533 0 001.508-11.973c-8.871-11.427-22.528-20.882-38.921-27.395a212.855 212.855 0 005.857-35.294c8.735 3.644 15.481 8.237 19.632 13.484a8.534 8.534 0 0013.384-10.59c-7.127-9.007-18.305-16.012-32.312-20.891-.017-5.82-.294-11.703-.801-17.679 6.233-13.004 10.494-28.666 13.335-47.363zm-35.238-141.84l-24.053 65.273a322.98 322.98 0 00-8.21-.642 214.264 214.264 0 00-43.302-36.789l75.565-27.842zm-99.653 33.55c.058.032.107.073.166.104 15.46 8.124 29.766 18.344 42.575 30.32-31.685.304-65.761 5.018-101.818 15.224-.335.094-.669.185-1.004.281-1.905.544-3.817 1.11-5.733 1.685-.67.201-1.338.392-2.008.597-1.841.562-3.69 1.148-5.54 1.738-.617.197-1.231.38-1.849.58-7.866 2.542-16.07 3.843-24.278 3.843s-16.411-1.301-24.281-3.845a448.591 448.591 0 00-6.909-2.172c-.819-.251-1.633-.485-2.45-.73-1.339-.401-2.679-.807-4.014-1.193-30.906-8.964-60.369-13.888-88.14-15.46 12.956-12.211 27.471-22.617 43.184-30.873.071-.037.129-.085.198-.124 27.573-14.451 58.607-22.326 90.928-22.326 32.341-.001 63.391 7.885 90.973 22.351zM73.904 57.078l75.565 27.836a214.297 214.297 0 00-42.718 36.133c-3.09.034-6.148.123-9.191.24L73.904 57.078zM33.236 182.487c-3.873-6.468-9.265-11.28-16.169-13.52V153.18c.419-.156.862-.318 1.327-.486 5.453-1.972 11.892-3.955 19.264-5.813 16.509-4.161 34.146-6.974 52.807-8.155a8.537 8.537 0 001.785.096c6.049-.329 12.1-.499 18.216-.499.022 0 .043-.003.064-.003 31.857.023 65.299 4.514 100.075 14.284.376.106.75.208 1.126.315 1.796.51 3.599 1.045 5.402 1.584.736.22 1.469.431 2.206.656 1.62.493 3.247 1.011 4.873 1.528.752.239 1.5.466 2.254.71 9.564 3.091 19.538 4.673 29.533 4.673s19.97-1.582 29.53-4.672a445.083 445.083 0 017.426-2.327c1.732-.527 3.459-1.04 5.181-1.541.994-.288 1.986-.568 2.978-.848.843-.238 1.685-.474 2.526-.707 40.446-11.123 78.921-15.076 114.977-13.217h.007c5.852.306 11.573.764 17.222 1.372.527.057 1.049.06 1.563.021 12.856 1.494 25.181 3.768 36.932 6.73 7.373 1.858 13.811 3.841 19.264 5.813.466.168.908.331 1.327.486v15.787c-6.904 2.24-12.296 7.052-16.169 13.52-3.051 5.096-4.61 10.071-5.231 13.714-2.74 18.025-6.678 32.585-12.608 44.279-.055.098-.114.191-.166.293-11.7 22.742-31.968 35.426-68.226 40.595-.471.066-.939.134-1.416.197a219.546 219.546 0 01-6.183.752c-.24.026-.473.055-.714.081-10.19 1.073-19.772.651-28.647-1.002-15.929-2.967-29.567-9.913-40.29-19.376-14.044-12.395-23.09-29.102-25.734-46.831-1.812-12.123-6.178-21.173-12.553-27.282-.041-.039-.084-.074-.125-.113-.416-.394-.837-.78-1.269-1.149-.477-.407-.964-.8-1.46-1.177-6.322-4.804-12.845-6.391-18.141-6.254-5.296-.137-11.819 1.45-18.141 6.254-3.117 2.369-5.838 5.337-8.126 8.897-3.533 5.495-6.026 12.416-7.282 20.822-2.714 18.2-12.172 35.325-26.86 47.812-11.139 9.468-25.286 16.266-41.778 18.846-.163.025-.324.055-.487.079l-.104.014c-7.964 1.192-16.468 1.404-25.442.459-29.182-3.076-48.915-10.474-62.268-22.679a8.833 8.833 0 00-1.194-.91c-13.921-13.534-21.43-33.527-25.827-62.457-.645-3.793-2.204-8.768-5.255-13.864zm421.766 129.507c-11.608-2.949-24.09-4.539-36.905-4.485a8.533 8.533 0 00.072 17.067c11.167-.047 21.992 1.315 31.992 3.795-26.489 77.059-99.591 132.438-185.641 132.438-87.085 0-160.959-56.75-186.591-135.347a133.272 133.272 0 0115.901-.886 8.534 8.534 0 00.072-17.067c-6.991-.03-13.882.435-20.589 1.335a195.779 195.779 0 01-4.121-25.294c13.743 7.757 30.939 12.687 52.401 15.317l.082.01c1.424.174 2.859.342 4.321.495 10.089 1.061 19.695.868 28.747-.391 22.371-3.109 41.333-12.762 55.675-26.323 15.671-14.814 25.833-34.283 28.915-54.95.898-6.018 2.483-10.548 4.575-13.882 1.255-1.998 2.692-3.566 4.272-4.766 2.847-2.163 5.692-2.838 7.431-2.779 2.521-.059 5.363.616 8.209 2.778.262.199.521.409.775.629 3.83 3.315 6.723 8.994 8.069 18.019 2.964 19.873 12.475 38.637 27.134 53.221 14.509 14.437 34.066 24.77 57.314 28.032 9.093 1.277 18.747 1.478 28.888.411 30.925-3.257 53.337-10.977 69.501-24.616a8.486 8.486 0 003.464 1.635c.485.105.955.22 1.434.329a195.79 195.79 0 01-5.397 35.275z"></path>
                                    </svg>
                                    <span className="_3XGzIBnongf7rs5ksZ13JI"><b>Go</b></span>, for all you Kool Kidz
                                </li>
                              </ul>
                           */}
                            <div className="sphere-con">
                              <Sphere/>
                            </div>
                          </div>
                          {/* <div className="Z8yNIFJhCz-vSS3RtL1Jl">
                              <div className="cubeSpinnerContainer">
                                 <Sphere/>
                              </div>
                          </div> */}
                        </div>
                    </div>
                  </div>
              </div>
            </section>         
            
      </div>
      );
  }
}

export default ProductPage;