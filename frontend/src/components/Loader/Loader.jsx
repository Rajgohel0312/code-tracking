import React from 'react';
import './Loader.css'; // Ensure the CSS file is imported

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader book">
        <figure className="page"></figure>
        <figure className="page"></figure>
        <figure className="page"></figure>
      </div>
      <h1 className="loader-title">SPECTECH IT SOLUTION</h1>
    </div>
  );
};

export default Loader;
