import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import Hero from "../Hero/Hero";
import About from "../About/About";
import Language from "../Language/Language";
import Projects from "../Projects/Projects";
import Info from "../Info/Info";
const Home = () => {
  return (
    <div className="mainHero">
      <Navbar />
      <div className="hero-sec">
        <Hero />
      </div>
      <div className="about-sec">
        <About />
      </div>
      <div className="language-sec">
        <Language />
      </div>
      <div className="projects-sec">
        <Projects />
      </div>
      <div className="info-sec ">
        <Info />
      </div>
    </div>
  );
};

export default Home;
