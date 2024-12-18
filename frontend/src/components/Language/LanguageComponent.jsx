import React from "react";

const LanguageComponent = ({ icon, title }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 language-container">
      <div className="language">
        <div className="language-icon">
          <i className={`${icon}`}></i>
        </div>
        <div className="language-title">{title}</div>
      </div>
    </div>
  );
};

export default LanguageComponent;
