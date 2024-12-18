import React from "react";
import "./Info.css";
const Info = () => {
  return (
    <div className="container-fluid info-main-container bg-dark py-5 ">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12 col-lg-6 info-left">
            <div className="info-title text-center text-lg-start">
              <h1>
                Achieve Your Career and Learning Aspirations with Spectech
              </h1>
            </div>
            <div className="info-para text-center text-lg-start">
              Unlock new opportunities with hands-on internships and
              expert-guided projects. Build real-world skills and create
              impactful solutions that shape your future.
            </div>
            <div className="info-btn align-self-center align-self-lg-start my-3">
              <a href="#contact-form" className="btn btn-primary">
                Contact us
              </a>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 info-right">
            <div className="info-img">
              <img src="/image_1.JPG" className="img-fluid" alt="" />
            </div>
            <div className="info-img">
              <img src="/image_2.JPG" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;