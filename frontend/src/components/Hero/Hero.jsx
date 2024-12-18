import React from "react";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center ">
        <div className="hero-top-title w-auto py-2 px-4 my-2">
          <h4>Empowering Ideas, Crafting Websites, Shaping Careers</h4>
        </div>
        <div className="hero-main-title ">
          <h1 className="fs-lg-4">
            Launch Your Career with Spectech <br /> Exceptional Websites &
            Transformative Internships!
          </h1>
        </div>
        <div className="hero-para">
          <p>
            Spectech IT Solution bridges innovation and learning, offering
            hands-on internships and top-notch website creation services. Build
            skills, gain experience, and create impactful digital solutions with
            us!
          </p>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <a href="#contact-form" className="btn btn-primary btn-lg px-4 py-2">
            Get a Discovery Call now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
