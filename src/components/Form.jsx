import React from "react";

import DatePicker from "./DatePicker";

function Form() {
  return (
    <div className="container">
      <div class="card col-8 mx-auto">
        <div class="card-body">
          <h5 class="card-title">Personal Details</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Tell us about yourself
          </h6>
          <hr />
          <form>
            <div class="input-group mb-3">
              <span class="input-group-text">First and last name</span>
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                required
              />
              <input
                type="text"
                aria-label="Last name"
                class="form-control"
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
