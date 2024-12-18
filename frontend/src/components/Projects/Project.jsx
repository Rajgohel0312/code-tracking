import React from "react";

const Project = ({ img, link, description, title }) => {
  return (
    <div className="col-sm-12  col-lg-4">
      <div className="projectCard">
        <div className="project-img">
          <img className="img-fluid" src={img} alt={title} />
        </div>
        <div className="project-title">{title}</div>
        <div className="project-description">{description}</div>
        <div className="project-source">
          <a className="btn btn-primary project-btn" href={link} target="blank">
            Source Code<i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Project;
