import React, { useState } from "react";
import "../css/Homeaddress.css";

const Homeaddress = ({ onContinue }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedCountry && formData.addressLine1 && formData.city && formData.state && formData.postalCode) {
      console.log("Form data:", { selectedCountry, ...formData });
      alert("Form submitted successfully!");
      onContinue(); // Call the onContinue prop when form is completed
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <div className="homeaddress-form">
      <h2>Home Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Country:</label>
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
          </select>
        </div>
        <div className="form-group">
          <label>Address Line 1:</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Address Line 2:</label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Homeaddress;
