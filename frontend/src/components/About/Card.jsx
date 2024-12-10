import React from "react";

const Card = ({ icon, title, description }) => {
  return (
    <div className="about-card col-lg-6 col-md-6 col-sm-12 p-3">
      <div className="about-card-icon">
        <i className={`${icon}`}></i>
      </div>
      <div className="about-card-title">{title}</div>
      <div className="about-card-para">{description}</div>
    </div>
  );
};

export default Card;
