import React from "react";
import { Layout, Menu, Breadcrumb, Button, Icon, Avatar, Alert, Input, Dropdown, Row, Col, Tooltip } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

import "../assets/collaboration.css";
class CustomLayoutContainer extends React.Component {
  state = {
    collapsed: true,
    current: '1',
    profileInfoModal: false,
  };

  handleLoginModal = () => {
    this.setState({loginModal: true})
  }

  handleCloseModal = () => {
    this.setState({loginModal: false, loading: false})
  }

  render() {
    return(
      
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


  
const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    username: state.auth.username,
    token: state.auth.token,
    is_active: state.auth.is_active_user,
    is_student: state.auth.is_student,
    is_teacher: state.auth.is_teacher,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayoutContainer)
);
