import React, { useState, useEffect } from "react";
import "./Navbar.css"; // Assuming you have a separate CSS file for custom styles

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home"); // Default to home section
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event
  const handleScroll = () => {
    const sections = [
      "home",
      "about",
      "language",
      "projects",
      "info",
      "contact",
    ];
    let currentSection = "";

    // Find the section that is currently in the viewport
    for (let section of sections) {
      const element = document.getElementById(section);
      const rect = element.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= 0) {
        currentSection = section;
        break;
      }
    }

    // Update the active section in the navbar
    setActiveSection(currentSection);

    // Set isScrolled to true if the user has scrolled down
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeSection === "home" ? "active" : ""
                  }`}
                  aria-current="page"
                  href="#home"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeSection === "about" ? "active" : ""
                  }`}
                  href="#about"
                >
                  About Us
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeSection === "projects" ? "active" : ""
                  }`}
                  href="#projects"
                >
                  Projects
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeSection === "contact" ? "active" : ""
                  }`}
                  href="#contact"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
