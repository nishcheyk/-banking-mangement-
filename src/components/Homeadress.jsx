import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/HomeAddress.css";

function MainForm() {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savedAddress, setSavedAddress] = useState("");
  const [houseName, setHouseName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [townCity, setTownCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [duration, setDuration] = useState("");
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.everythinglocation.com/address/complete",
          {
            params: {
              lqtkey: "HE59-YH98-MP91-ZJ44",
              query: query,
              country: "INDIA",
            },
          }
        );
        setData(response.data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (query.trim() !== "") {
      fetchData();
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleAddressClick = (address) => {
    setQuery(address);
    setData(null);
  };

  const handleSaveAddress = () => {
    const alphaPattern = /^[A-Za-z\s]+$/;
    const houseNumberPattern = /^[A-Za-z0-9\s\-#]+$/;
    const alphaNumericPattern = /^[A-Za-z0-9\s]+$/;
    const numericPattern = /^\d{6}$/;
    let isValid = true;
    const newErrors = {};

    if (!houseName || !alphaPattern.test(houseName)) {
      newErrors.houseNameError = "House name must be alphabetical only";
      isValid = false;
    }

    if (!houseNumber || !houseNumberPattern.test(houseNumber)) {
      newErrors.houseNumberError =
        "House number must be alphanumeric or special characters";
      isValid = false;
    }

    if (!street || !alphaNumericPattern.test(street)) {
      newErrors.streetError = "Street name must be alphanumeric";
      isValid = false;
    }

    if (!townCity || !alphaPattern.test(townCity) || townCity.length < 3) {
      newErrors.townCityError =
        "Town or city must be alphabetical and at least 3 characters long";
      isValid = false;
    }

    if (!postcode || !numericPattern.test(postcode)) {
      newErrors.postcodeError = "Postcode must be exactly 6 digits";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const address = `${houseName}, ${houseNumber}, ${street}, ${townCity}, ${postcode}`;
      setSavedAddress(address);
      setShowAddressForm(false);
    }
  };

  const handleRemoveAddress = () => {
    setSavedAddress("");
  };

  const handleEditAddress = () => {
    setShowAddressForm(true);
  };

  const handleSelectDuration = (duration) => {
    setDuration(duration);
    clearError("durationError");
  };

  const handleValidateAndContinue = () => {
    let isValid = true;
    const newErrors = {};

    if (!duration) {
      newErrors.durationError = "Please select a duration";
      isValid = false;
    }

    if (!savedAddress) {
      newErrors.addressError = "Please enter or search for an address";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="address-container">
      <h2 className="address-heading">02 Home address</h2>
      <p className="address-paragraph">
        Please provide your current Indian residence address
      </p>

      {savedAddress && (
        <div id="savedAddress" className="address-saved-address">
          <p className="address-paragraph">{savedAddress}</p>
          <a
            className="address-manual-entry-link"
            onClick={handleRemoveAddress}
          >
            Remove address
          </a>
          <a className="address-manual-entry-link" onClick={handleEditAddress}>
            Change address
          </a>
        </div>
      )}

      {!savedAddress && (
        <div className="address-form-group" id="searchAddressGroup">
          <label htmlFor="address" className="address-label">
            SEARCH FOR YOUR ADDRESS
          </label>
          <input
            type="text"
            placeholder="Type an address..."
            className="address-input"
            value={query}
            onChange={handleInputChange}
          />
          <p className="address-hint">
            Please enter an address or enter manually using the link below
          </p>
          <a
            className="address-manual-entry-link"
            onClick={() => setShowAddressForm(true)}
          >
            Prefer to enter address manually
          </a>
          <p id="addressError" className="address-error-message">
            {errors.addressError}
          </p>
          {data && (
            <div className="address-suggestions-container">
              {data.output.map((address, index) => (
                <div
                  key={index}
                  onClick={() => handleAddressClick(address)}
                  className="address-suggestion"
                >
                  {address}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="address-form-group">
        <p className="address-paragraph">
          HOW LONG HAVE YOU LIVED AT THIS ADDRESS?
        </p>
        <p className="address-paragraph">
          If less than 6 months, we&apos ll also need details of your previous
          address.
        </p>
        <div className="address-duration-buttons">
          <button
            className={`address-duration-button ${
              duration === "6 months or more" ? "address-selected" : ""
            }`}
            onClick={() => handleSelectDuration("6 months or more")}
          >
            6 months or more
          </button>
          <button
            className={`address-duration-button ${
              duration === "Less than 6 months" ? "address-selected" : ""
            }`}
            onClick={() => handleSelectDuration("Less than 6 months")}
          >
            Less than 6 months
          </button>
        </div>
        <p id="durationError" className="address-error-message">
          {errors.durationError}
        </p>
      </div>

      <p className="address-warning">
        Please check your details above. You won &apos t be able to change them
        once you click continue.
      </p>

      <button
        className="address-continue-button"
        onClick={handleValidateAndContinue}
      >
        Continue
      </button>

      {showAddressForm && (
        <>
          <div className="address-overlay"></div>
          <div className="address-address-form">
            <h2 className="address-heading">Manual Address Entry</h2>
            <div className="address-form-group">
              <label htmlFor="houseName" className="address-label">
                House Name
              </label>
              <input
                type="text"
                id="houseName"
                value={houseName}
                onChange={(e) => {
                  setHouseName(e.target.value);
                  clearError("houseNameError");
                }}
                className="address-input"
              />
              <p id="houseNameError" className="address-error-message">
                {errors.houseNameError}
              </p>
            </div>
            <div className="address-form-group">
              <label htmlFor="houseNumber" className="address-label">
                House Number
              </label>
              <input
                type="text"
                id="houseNumber"
                value={houseNumber}
                onChange={(e) => {
                  setHouseNumber(e.target.value);
                  clearError("houseNumberError");
                }}
                className="address-input"
              />
              <p id="houseNumberError" className="address-error-message">
                {errors.houseNumberError}
              </p>
            </div>
            <div className="address-form-group">
              <label htmlFor="street" className="address-label">
                Street
              </label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                  clearError("streetError");
                }}
                className="address-input"
              />
              <p id="streetError" className="address-error-message">
                {errors.streetError}
              </p>
            </div>
            <div className="address-form-group">
              <label htmlFor="townCity" className="address-label">
                Town/City
              </label>
              <input
                type="text"
                id="townCity"
                value={townCity}
                onChange={(e) => {
                  setTownCity(e.target.value);
                  clearError("townCityError");
                }}
                className="address-input"
              />
              <p id="townCityError" className="address-error-message">
                {errors.townCityError}
              </p>
            </div>
            <div className="address-form-group">
              <label htmlFor="postcode" className="address-label">
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                value={postcode}
                onChange={(e) => {
                  setPostcode(e.target.value);
                  clearError("postcodeError");
                }}
                className="address-input"
              />
              <p id="postcodeError" className="address-error-message">
                {errors.postcodeError}
              </p>
            </div>
            <div className="address-button-group">
              <button
                className="address-close-button"
                onClick={() => setShowAddressForm(false)}
              >
                Close
              </button>
              <button
                className="address-submit-button"
                onClick={handleSaveAddress}
              >
                Save Address
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MainForm;
