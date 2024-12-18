import React from "react";
import "./Project.css";
import Project from "./Project";
const Projects = () => {
  return (
    <div className="container ">
      <div className="projects-main-title">
        Explore Mini Projects with Source Code
      </div>
      <div className="projects-description">
        Boost your learning with ready-to-use mini projects complete with source
        code. Perfect for hands-on practice and understanding real-world
        development concepts!
      </div>
      <div className="projects">
        <div className="row">
          <Project
            title={"Expense Tracker using Laravel"}
            description={
              "Laravel Expense Tracker: Secure, user-friendly app to manage, categorize, and track expenses effortlessly on any device"
            }
            link={"https://github.com/Rajgohel0312/expense-tracker-laravel"}
            img={"/expense-tracker.png"}
          />
          <Project
            title={"Diya Using CSS , HTML"}
            description={
              "Beautifully crafted CSS Diya: A glowing symbol of tradition, designed purely with CSS to celebrate creativity and culture in web development!"
            }
            link={"https://github.com/Rajgohel0312/Diya-using-css"}
            img={"/diya.png"}
          />
          <Project
            title={"3d Plane using Threejs"}
            description={
              "Create a stunning 3D website with HTML, CSS, and JavaScript, featuring smooth animations, hover effects, and responsive design for an engaging experience."
            }
            link={"https://github.com/Rajgohel0312/3d-Plane"}
            img={"/plane.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
