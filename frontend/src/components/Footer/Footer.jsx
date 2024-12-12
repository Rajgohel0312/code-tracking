import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          {/* About Us Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-uppercase mb-3">About Us</h5>
            <p className="text-primary">
              Spectech IT Solution bridges innovation and learning, offering
              hands-on internships and top-notch website creation services.
              Build skills, gain experience, and create impactful digital
              solutions with us!
            </p>
            <p className="d-flex align-items-center mb-2">
              <i className="fas fa-map-marker-alt me-3"></i>
              Sardar Patel Education Campus, Vidyanagar - Vadtal Road, Bakrol,
              Anand, Gujarat - 388 315
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-uppercase mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-2">
                <i className="fas fa-phone-alt me-3"></i>
                <a
                  href="tel:+916351939325"
                  className="text-light text-decoration-none"
                >
                  +91 6351939325 (SPEC)
                </a>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="fas fa-phone-alt me-3"></i>
                <a
                  href="tel:+916351939325"
                  className="text-light text-decoration-none"
                >
                  +91 6351939325 (Jeet Parmar)
                </a>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="fas fa-phone-alt me-3"></i>
                <a
                  href="tel:+916351939325"
                  className="text-light text-decoration-none"
                >
                  +91 6351939325 (Raj Gohel)
                </a>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="fas fa-envelope me-3"></i>
                <a
                  href="mailto:info@spectechitsolution.com"
                  className="text-light text-decoration-none"
                >
                  info@spectechitsolution.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="col-lg-4 col-md-12 mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="#projects" className="text-light text-decoration-none">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-light text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <hr className="border-light" />
        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; 2024 Spectech IT Solution. All Rights Reserved.
          </p>
          <p className="mb-0">
            Crafted with <i className="fas fa-heart text-danger"></i> by
            Spectech Team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
