import React from "react";
import "./Language.css";
import LanguageComponent from "./LanguageComponent";
const Language = () => {
  return (
    <div className="container">
      <div className="languageTitle">
        <h2 className="text-center ">
          Master In-Demand Skills: Internships in Top Programming Languages
        </h2>
      </div>
      <div className="languages my-5">
        <div className="row">
          <LanguageComponent icon={"fa-brands fa-python"} title={"PYTHON"} />
          <LanguageComponent icon={"fa-brands fa-php"} title={"PHP"} />
          <LanguageComponent icon={"fa-brands fa-laravel"} title={"LARAVEL"} />
          <LanguageComponent icon={"fa-solid fa-database"} title={"SQL"} />
          <LanguageComponent icon={"fa-brands fa-html5"} title={"HTML"} />
          <LanguageComponent icon={"fa-brands fa-css"} title={"CSS"} />
          <LanguageComponent icon={"fa-brands fa-js"} title={"JAVASCRIPT"} />
          <LanguageComponent icon={"fa-brands fa-react"} title={"REACT"} />
          <LanguageComponent icon={"fa-brands fa-node-js"} title={"NODE JS"} />
          <LanguageComponent icon={"fa-brands fa-android"} title={"ANDROD"} />
          <LanguageComponent
            icon={"fa-brands fa-microsoft"}
            title={"ASP.NET"}
          />
          <LanguageComponent icon={"fa-brands fa-java"} title={"JAVA"} />
        </div>
      </div>
    </div>
  );
};

export default Language;
