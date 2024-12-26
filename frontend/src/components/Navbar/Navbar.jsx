import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
          currentSection = section.id;
        }
      }
    });

    setActiveSection(currentSection);
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="container mt-2">
      <nav
        className={`navbar navbar-expand-lg fixed-top rounded-5 my-3 ${
          isScrolled ? "glassmorphism" : ""
        }`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#home">
            <img className="nav-logo" src="/Logo.png" alt="Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto row-gap-3 mb-2 mb-lg-0">
              {sections.map((section) => (
                <li className="nav-item" key={section.id}>
                  <a
                    className={`nav-link ${
                      activeSection === section.id ? "active" : ""
                    }`}
                    href={section.href}
                  >
                    {section.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
