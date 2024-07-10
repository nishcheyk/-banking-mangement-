import React from "react";
import DatePicker from "./DatePicker";

function Form() {
  const containerStyle = {
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
  };

  const cardStyle = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputGroupStyle = {
    marginBottom: "20px",
  };

  const inputStyle = {
    backgroundColor: "#555",
    color: "#fff",
    border: "1px solid #777",
  };

  return (
    <div className="container" style={containerStyle}>
      <div className="card col-8 mx-auto" style={cardStyle}>
        <div className="card-body">
          <h5 className="card-title">Personal Details</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Tell us about yourself
          </h6>
          <hr />
          <form>
            <div className="input-group mb-3" style={inputGroupStyle}>
              <span className="input-group-text">First and last name</span>
              <input
                type="text"
                aria-label="First name"
                className="form-control"
                required
                style={inputStyle}
              />
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
                required
                style={inputStyle}
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
