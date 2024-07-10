import React from 'react';
import '../css/Footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer text-white text-center text-lg-start">
        <div className="footer-content container">
          <div className="row mt-4">
            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4 text-center">About Company</h5>
              <p >
              Our mission: delivering excellence, one satisfied customer at a time.
              </p>
              <p>
              If we have not exceeded your expectations, we have not finished our job.
              </p>
              <div className="mt-4">
               
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4 pb-1 text-center">Contact Us</h5>
              <div className="form-outline form-white mb-4">
              </div>
              <ul className="fa-ul">
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-home"></i></span><span className="ms-2">JS banking solution ,TIET,149007,India</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-envelope"></i></span><span className="ms-2">jsbankingsolution@gmail.com</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-phone"></i></span><span className="ms-2">+ 91 123456789</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><i className="fas fa-print"></i></span><span className="ms-2">+ 91 0987654321</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4 text-center">Customer Care Hours</h5>
              <div className="opening-hours">
                <p><span>Mon - Thu:</span> 8am - 9pm</p>
                <p><span>Fri - Sat:</span> 8am - 1am</p>
                <p><span> Sunday:</span> 9am - 10pm</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
