import React from "react";

import "../assets/landing.css";

class LandingPage extends React.PureComponent {
  render() {
    return (
      <body id="landing-page">
        <div className="main-flex-container">
            <div className="top-banner-container">
                <div className="top-banner-container">
                    <div className="top-banner-text-container">
                      <div className="top-banner-text-container-2">
                        <h1>Mate Crunch</h1>
                        <p>Guidance, interaction, and socialization from within and outside academic life</p>
                      </div>
                    </div>
                    <div className="top-banner-image-container">
                    </div>
                </div>
            </div>
            <section className="second-section">
              <div className="second-flex-container">
                  <div className="description-container">
                    <h2>What is Mate Crunch?</h2>
                      <div className="description-banner-container">
                          <div className="description-banner-articles-container">
                            <svg className="articles-svg"></svg>
                            <h3>Develop your writting skills</h3>
                            <p>In Mate Crunch we give the chance to students and graduates to be able to post and write about their passions, interests, and hobbies. Something that can apport to themselves and to other academic communities or just to help them to chart the path to their professional development</p>
                          </div>
                          <div className="description-banner-projects-container">
                            <svg></svg>
                            <h3>Develop your ideas or your projects to further stages of development</h3>
                            <p>We incentive students to become something more than just entrepreneurs. We aim for people that can apport ideas and projects with a real impact on different fields.</p>
                          </div>
                          <div className="description-banner-inquiries-container">
                            <svg></svg>
                            <h3>Get answers to any kind of academic questions </h3>
                            <p>Homework review, problem solving, admissions, advices or other related fields</p>
                          </div>
                          <div className="description-banner-advisors-container">
                            <svg></svg>
                            <h3>One-to-one session meetings with either local and foreign students </h3>
                            <p>We know how valuable is time for any student or for any graduate worker. That's why you can choose a your own for handling a video chat meeting</p>
                          </div>
                          <div className="description-banner-surveys-container">
                            <svg></svg>
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
                      <h2>From Top Universities Around the Globe</h2>
                      <h4>Interactions with local and foreign students</h4>
                      < div className="universities-main-header-container">
                      </div>
                      < div className="universities-subheader-container">
                      </div>
                      < div className="universities-slider-container">
                          <div className="universities-slider-left-bound ">
                          </div>
                          < div className="universities-slider-first-row-container">
                            < div className="universities-slider-first-row-container-animation-1">
                              <div className="universities-slider-img-container">
                                  <img src="https://assets.algoexpert.io/ge79b3403bc-prod/dist/images/google.noinline.png?80f53e83"/>
                              </div>
                            </div>
                            < div className="universities-slider-first-row-container-animation-2">
                            </div>
                          </div>
                          < div className="universities-slider-second-row-container">
                            < div className="universities-slider-first-row-container-animation-1">
                              <div className="universities-slider-img-container">
                                  <img src="https://assets.algoexpert.io/ge79b3403bc-prod/dist/images/google.noinline.png?80f53e83"/>
                              </div>
                            </div>
                            < div className="universities-slider-first-row-container-animation-2">
                              <div className="universities-slider-img-container">
                                  <img src="https://assets.algoexpert.io/ge79b3403bc-prod/dist/images/google.noinline.png?80f53e83"/>
                              </div>
                            </div>
                          </div>
                          <div className="universities-slider-right-bound">

                          </div>
                      </div>
                  </div>
              </div>
            </section>
        </div>
      </body>
      );
  }
}

export default LandingPage;