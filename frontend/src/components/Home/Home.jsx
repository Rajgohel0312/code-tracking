import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import Hero from "../Hero/Hero";
import About from "../About/About";
const Home = () => {
  return (
    <div className="mainHero">
      <Navbar />
      <div className="hero-sec">
        <Hero />
      </div>
      <div className="about-sec py-5">
        <About />
      </div>
    </div>
  );
};

export default Home;
