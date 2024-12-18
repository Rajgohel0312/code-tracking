import React from "react";
import ContactCard from "./ContactCard";
import "./ContactInfo.css";
const ContactInfo = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="contactInfoTitle text-center text-lg-start">
            <h1>Contact Us</h1>
          </div>
          <div className="contactInfoPara  text-center text-lg-start">
            Have questions or need assistance? Reach out to us today and let’s
            work together to achieve your goals effortlessly
          </div>
          <div className="contactCard">
            <ContactCard
              icon={<i className="fa fa-phone" />}
              title="Contact Us"
              para={[
                "+91 76848 88427 (SPEC)",
                "+91 70164 36815 (Jeet Parmar)",
                "+91 63519 39325 (Raj Gohel)",
              ]}
            />
            <ContactCard
              icon={<i className="fa fa-envelope" />} // Example icon
              title="Email Us"
              para={["info@spectechitsolution"]}
            />
            <ContactCard
              icon={<i className="fa-solid fa-location-dot"></i>} // Example icon
              title="Reach Us"
              para={[
                "Sardar Patel Education Campus,Vidyanagar - Vadtal Road, Bakrol,Anand, Gujarat - 388 315.",
              ]}
            />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="contactInfoMap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1938065023237!2d72.89344807342175!3d22.571853633001304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e51df1dff7b9d%3A0xc89d372a643c8154!2sSardar%20Patel%20Education%20Campus%2C%20Anand!5e0!3m2!1sen!2sin!4v1733902184064!5m2!1sen!2sin"
              width="500"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
