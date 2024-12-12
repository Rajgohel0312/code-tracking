import React from "react";
const ContactCard = ({ icon, title, para }) => {
  return (
    <div className="contactInfoDetails">
      <div className="row justify-content-center align-items-center">
        <div className="col-2 iconRow">
          <div className="contactInfoIcon">{icon}</div>
        </div>
        <div className="col-10">
          <div className="contactInfoDetailsTitle">{title}</div>
          <div className="contactInfoDetailsPara">
            {para.map((text, index) => (
              <div key={index}>{text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
