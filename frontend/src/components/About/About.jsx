import React from "react";
import "./About.css";
import Card from "./Card";
const About = () => {
  return (
    <div className="container ">
      <div className="row ">
        <div className="col-lg-5 col-md-12">
          <div className="about-left">
            <div className="about-left-title text-center  text-lg-start">
              <h1>Build Your Future with Spectech: Websites & Internships</h1>
            </div>
            <div className="about-left-desc text-center text-lg-start">
              <p>
                Gain hands-on web development experience through internships
                while creating custom, responsive websites that drive growth and
                innovation for your career and business.
              </p>
            </div>
            <div className="about-left-img">
              <img className="img-fluid" src="/model_2.JPG" alt="" />
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-md-12">
          <div className="about-right ">
            <div className="about-top-Btn col-12">
              <h5>Know More About Us </h5>
            </div>
            <div className="about-card-container">
              <div className="row gx-4 gy-4 my-3 justify-content-center align-items-center">
                {/* Card 1 */}
                <Card
                  icon="fa-solid fa-laptop"
                  title="Real-World Experience"
                  description="Gain hands-on experience with live projects, enhancing your
                    skills in web development while contributing to meaningful
                    solutions."
                />
                <Card
                  icon="fa-solid fa-gear"
                  title="Mentorship & Guidance"
                  description=" Our experts will guide you every step of the way, helping
                    you build a strong foundation in both website creation and
                    professional growth."
                />
                <Card
                  icon="fa-solid fa-lightbulb"
                  title="Creative Solutions"
                  description="Whether you’re developing a website or learning through
                    internships, expect cutting-edge, creative solutions
                    tailored to meet industry standards."
                />
                <Card
                  icon="fa-solid fa-briefcase"
                  title="Career Growth"
                  description="Boost your career with real-world work experience and the
                    chance to network with industry professionals, preparing you
                    for future job opportunities."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
