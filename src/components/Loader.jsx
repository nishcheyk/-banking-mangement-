import React from 'react';
import '../css/loader.css';
import loaderImage from '../javascript-39406.png'; // Update the path to your image

function Loader() {
  return (
    <div className='main-load'>
      <div className="load">

        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="image-container">
      <img src={loaderImage} alt="Loader" className="loader-image" />
    </div>
    </div>
  );
}

export default Loader;
