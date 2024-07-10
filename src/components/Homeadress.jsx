import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/HomeAddress.css";

const MainForm = () => {
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
        setData(response.data);
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
    <div className="container">
      <div className="card mx-auto">
        <div className="card-body">
          <h2 className="card-title">02 Home address</h2>
          <p className="card-subtitle mb-2 text-body-secondary">
            Please provide your current Indian residence address
          </p>

          {savedAddress && (
            <div id="savedAddress" className="mb-3">
              <p className="card-text">{savedAddress}</p>
              <a className="btn btn-link" onClick={handleRemoveAddress}>
                Remove address
              </a>
              <a className="btn btn-link" onClick={handleEditAddress}>
                Change address
              </a>
            </div>
          )}

          {!savedAddress && (
            <div id="searchAddressGroup" className="mb-3">
              <label htmlFor="address" className="form-label">
                SEARCH FOR YOUR ADDRESS
              </label>
              <input
                type="text"
                placeholder="Type an address..."
                className="form-control"
                value={query}
                onChange={handleInputChange}
              />
              <p className="form-text">
                Please enter an address or enter manually using the link below
              </p>
              <a
                className="btn btn-link"
                onClick={() => setShowAddressForm(true)}
              >
                Prefer to enter address manually
              </a>
              <p id="addressError" className="text-danger">
                {errors.addressError}
              </p>
              {data && (
                <div className="list-group">
                  {data.output.map((address, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddressClick(address)}
                      className="list-group-item list-group-item-action"
                    >
                      {address}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mb-3">
            <p className="card-text">
              HOW LONG HAVE YOU LIVED AT THIS ADDRESS?
            </p>
            <p className="card-text">
              If less than 6 months, we&apos;ll also need details of your
              previous address.
            </p>
            <div className="btn-group" role="group">
              <button
                className={`btn ${
                  duration === "6 months or more"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => handleSelectDuration("6 months or more")}
              >
                6 months or more
              </button>
              <button
                className={`btn ${
                  duration === "Less than 6 months"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => handleSelectDuration("Less than 6 months")}
              >
                Less than 6 months
              </button>
            </div>
            <p id="durationError" className="text-danger">
              {errors.durationError}
            </p>
          </div>

          <p className="text-warning">
            Please check your details above. You won&apos;t be able to change
            them once you click continue.
          </p>

          <button
            className="btn btn-primary"
            onClick={handleValidateAndContinue}
          >
            Continue
          </button>
        </div>
      </div>

      {showAddressForm && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Manual Address Entry</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddressForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="houseName" className="form-label">
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
                    className="form-control"
                  />
                  <p id="houseNameError" className="text-danger">
                    {errors.houseNameError}
                  </p>
                </div>
                <div className="mb-3">
                  <label htmlFor="houseNumber" className="form-label">
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
                    className="form-control"
                  />
                  <p id="houseNumberError" className="text-danger">
                    {errors.houseNumberError}
                  </p>
                </div>
                <div className="mb-3">
                  <label htmlFor="street" className="form-label">
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
                    className="form-control"
                  />
                  <p id="streetError" className="text-danger">
                    {errors.streetError}
                  </p>
                </div>
                <div className="mb-3">
                  <label htmlFor="townCity" className="form-label">
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
                    className="form-control"
                  />
                  <p id="townCityError" className="text-danger">
                    {errors.townCityError}
                  </p>
                </div>
                <div className="mb-3">
                  <label htmlFor="postcode" className="form-label">
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
                    className="form-control"
                  />
                  <p id="postcodeError" className="text-danger">
                    {errors.postcodeError}
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddressForm(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveAddress}
                >
                  Save Address
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainForm;
