import React from "react";

import DatePicker from "./DatePicker";

function Form() {
  return (
    <div className="container">
      <div className="card col-8 mx-auto">
        <div className="card-body">
          <h5 className="card-title">Personal Details</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Tell us about yourself
          </h6>
          <hr />
          <form>
            <div className="input-group mb-3">
              <span className="input-group-text">First and last name</span>
              <input
                type="text"
                aria-label="First name"
                className="form-control"
                required
              />
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
                required
              />
            </div>
            <DatePicker />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
