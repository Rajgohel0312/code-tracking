import React from "react";
import "./About.css";
const About = () => {
  return (
    <div className="container ">
      <div className="about-row d-flex justify-content-center align-center ">
        <div className="about-left">
          <div className="about-left-title">
            <h1>Build Your Future with Spectech: Websites & Internships</h1>
          </div>
          <div className="about-left-desc">
            <p>
              Gain hands-on web development experience through internships while
              creating custom, responsive websites that drive growth and
              innovation for your career and business.
            </p>
          </div>
          <div className="about-left-img">
            <img className="img-fluid" src="/model.png" alt="" />
          </div>
        </div>
        <div className="about-right">
          <div className="about-top-Btn">
            <h5>Know More About Us </h5>
          </div>
          <div className="about-card-container">
            <div className="d-flex justify-content-center column-gap-3 align-items-center my-3">
              <div className="about-card p-3">
                <div className="about-card-icon">
                  <i class="fa-solid fa-laptop"></i>
                </div>
                <div className="about-card-title">Real-World Experience</div>
                <div className="about-card-para">
                  Gain hands-on experience with live projects, enhancing your
                  skills in web development while contributing to meaningful
                  solutions.
                </div>
              </div>
              <div className="about-card p-3">
                <div className="about-card-icon">
                  <i className="fa-solid fa-gear"></i>
                </div>
                <div className="about-card-title">Mentorship & Guidance</div>
                <div className="about-card-para">
                  Our experts will guide you every step of the way, helping you
                  build a strong foundation in both website creation and
                  professional growth.
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center column-gap-3 align-items-center ">
              <div className="about-card p-3">
                <div className="about-card-icon">
                  <i className="fa-solid fa-lightbulb"></i>
                </div>
                <div className="about-card-title">Creative Solutions</div>
                <div className="about-card-para">
                  Whether you’re developing a website or learning through
                  internships, expect cutting-edge, creative solutions tailored
                  to meet industry standards.
                </div>
              </div>
              <div className="about-card p-3">
                <div className="about-card-icon">
                  <i className="fa-solid fa-briefcase"></i>
                </div>
                <div className="about-card-title">Career Growth</div>
                <div className="about-card-para">
                  Boost your career with real-world work experience and the
                  chance to network with industry professionals, preparing you
                  for future job opportunities.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
