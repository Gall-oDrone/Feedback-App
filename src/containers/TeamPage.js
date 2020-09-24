import React from "react";
import "../assets/landing.css";
import tp from "../assets2/team-pic.png"
import "../assets/landing.css";

class TeamPage extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="top-banner-container" id="team">
          <div className="first-section-meet-team-sec"> 
            <div className="first-section-meet-team-con">
                <h1>Meet the team</h1>
            </div>
          </div>
        </div>
          <section className="snd_section">
            <div className="snd_s_con">
              <div className="snd_s_fb">
                <div className="member_con">
                  <h2>Diego Gallo</h2>
                  <h4>Founder</h4>
                  <a>
                    <picture>
                      <source></source>
                      <img className="team_pic" src={tp}></img>
                    </picture>
                    <svg className="svg_sm_logo"></svg>
                  </a>
                  <p>Graduated in Economics from the Center of Research and Teaching in Economics (CIDE).</p>
                </div>
              </div>
            </div>
          </section>
      </div>
      );
  }
}

export default TeamPage;