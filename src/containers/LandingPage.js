import React from "react";
import { Link, withRouter } from "react-router-dom";

// https://py3-test-app-bucket.s3.amazonaws.com/media/assets/universities/Oxford-Logo.png
// https://py3-test-app-bucket.s3.amazonaws.com/media/assets/universities/University-Cambridge-Logo.png
import logo from "../assets2/mate-crunch-logo-5.png"
import GoogleLogin from '../components/GoogleLogin';
import FacebookLogin from '../components/FacebookLogin';
import LPLogin from "./LPLogin";
import Signup from "./Register";
import RecoverPassword from "./LPPForgot";
import "../assets/authentication.css"
import "../assets/landing.css";
import { Spin, Icon } from "antd";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class LandingPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { 
      loginModal: false,
      register: false,
      forgotPass: false,
      loading: false,
      username: '',
    };
    this.teamRef = React.createRef()
    this.prodRef = React.createRef()
  }

  handleClickOutside = event => {
    if (this.prodRef && this.prodRef.current.contains(event.target)) {
      document.getElementsByClassName('nb_first_mi')[0].style.borderBottom= "1px solid #fff";
    }
    else if (!this.prodRef.current.contains(event.target)){
      document.getElementsByClassName('nb_first_mi')[0].style.borderBottom= "";
    }
    if (this.teamRef && this.teamRef.current.contains(event.target)) {
      document.getElementsByClassName('nb_thrd_mi')[0].style.borderBottom= "1px solid #fff";
    }
    else if (!this.teamRef.current.contains(event.target)){
      document.getElementsByClassName('nb_thrd_mi')[0].style.borderBottom= "";
    }
  };

  componentDidMount(){
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleLoginModal = () => {
    this.setState({loginModal: true})
  }

  handleCloseModal = () => {
    this.setState({loginModal: false, loading: false})
  }

  handleRegister = (val) => {
    this.setState({register: val})
  }
  handlePF = (val) => {
    this.setState({forgotPass: val})
  }
  handleLoading = (val) => {
    this.setState({loading: val})
  }

  handleLoadingCounter = async (val) => {
    setTimeout(
      function() {
          this.setState({ loading: !val });
      }
      .bind(this),
      5000
  );
  }

  render() {
    const { loginModal, register, loading, forgotPass } = this.state
    console.log("CACAS: ", this.props)
    return (
      <body id="landing-page">
        <div className="main-flex-container">
            {loginModal === true ? 
                <div className="login_modal_cover_container">
                  <div className="login_modal_cover">
                    <div className="login_modal_cover">
                      <div className="login_modal_wrapper">
                        <div className="login_modal_container">
                          <div className="login_modal_container_2">
                            <div onClick={() => this.handleCloseModal()} className="login_modal_container_close_button">
                            </div>
                            {loading === true ?
                              this.handleLoadingCounter(loading) &&
                              <div className="loading_spinner_con">
                                <div className="auth_loader">
                                </div>
                              </div>
                              :
                            forgotPass === true ?
                             <RecoverPassword handlePF={this.handlePF} />
                            :
                            register === true ? 
                                <div>
                                  <h3>Sign up</h3>
                                    <div className="login-row">
                                      <Signup hl={this.handleLoading} register={this.handleRegister}/>
                                    </div>
                                </div>
                              :
                                <div>
                                  <h3>Sign in</h3>
                                  <div className="login-row">
                                          <FacebookLogin/>
                                          <GoogleLogin/>
                                    <div className="login-hl-con">
                                      <div className="login-hl-l"/>
                                        <span className="login-inner-hl">or</span>
                                      <div className="login-hl-r"/>
                                    </div>
                                    <LPLogin hl={this.handleLoading}/>
                                    <div className="sign_up_con">
                                      <div onClick={() => this.handlePF(true)}>
                                        <a>¿Forgot password?</a>
                                      </div>
                                      <div onClick={() => this.handleRegister(true)}>
                                        <a>Register</a>
                                      </div>
                                    </div>
                                  </div> 
                                </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                    : null 
            }
              <div className="top-header-container">
                <div className="lp_header">
                  <Link to="/product">
                    <div id="logo">
                      <div className="logo_container">
                        <div className="lc_first_row">
                          <img className="logo-img" src={logo}></img>
                          <h1>Mate Crunch</h1>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="nav_bar">
                    <div ref={this.prodRef} className="nb_first_mi">
                      <Link to="/product">
                        What is Mate Crunch?
                      </Link>
                    </div>
                    {/* <div className="nb_snd_mi">
                      <a>Content</a>
                      <div className="nb_snd_mi_tooltip_con">
                        <div className="nb_snd_mi_tooltip">
                          <div className="tooltip_item">
                            <h4>Qué?</h4>
                          </div>
                        </div>
                      </div>
                    </div>*/}
                    <div ref={this.teamRef}  className="nb_thrd_mi">
                      <Link to="/team">
                        Meet the Team
                      </Link>
                    </div>
                  </div> 
                  <div className="login_container">
                    <div className="login_button_con">
                      <div className="tooltip">
                      </div>
                      <button onClick={() => this.handleLoginModal()} className="button-style">
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {this.props.children}
              {/* <div className="top-banner-container">
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
                  <div className="description-container">
                    <h2>What is Mate Crunch?</h2>
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
         */}
        </div>
      </body>
      );
  }
}

// ReactDOM.render(
//   <LandingPage />
// );
export default withRouter(LandingPage);