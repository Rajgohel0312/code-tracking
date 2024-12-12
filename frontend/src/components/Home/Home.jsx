import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import Hero from "../Hero/Hero";
import About from "../About/About";
import Language from "../Language/Language";
import Projects from "../Projects/Projects";
import Info from "../Info/Info";
import ContactInfo from "../ContactInfo/ContactInfo";
import ContactForm from "../ContactForm/ContactForm";
import Footer from "../Footer/Footer";
const Home = () => {
  return (
    <div className="mainHero">
      <Navbar />
      <div id="home" className="hero-sec">
        <Hero />
      </div>
      <div id="about" className="about-sec">
        <About />
      </div>
      <div id="language" className="language-sec">
        <Language />
      </div>
      <div id="projects" className="projects-sec">
        <Projects />
      </div>
      <div id="info" className="info-sec ">
        <Info />
      </div>
      <div id="contact" className="contact-info">
        <ContactInfo />
      </div>
      <div className="contact-form">
        <ContactForm />
      </div>
      <div className="footer-sec">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
