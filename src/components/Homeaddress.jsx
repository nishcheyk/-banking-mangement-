import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/HomeAddress.css';

function MainForm({ onContinue }) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savedAddress, setSavedAddress] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [houseName, setHouseName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [street, setStreet] = useState('');
  const [townCity, setTownCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [duration, setDuration] = useState('');
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);

  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.everythinglocation.com/address/complete', {
          params: {
            lqtkey: 'HE59-YH98-MP91-ZJ44',
            query: query,
            country: 'INDIA',
          },
        });
        setData(response.data); // Set the fetched data into state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (query.trim() !== '') {
      fetchData();
    }
  }, [query]); // Fetch data whenever query state changes

  const handleInputChange = (event) => {
    setQuery(event.target.value); // Update query state as user types
  };

  const handleAddressClick = (address) => {
    setQuery(address); // Set selected address as the input value
    setData(null); // Clear the data to hide suggestions
  };

  const handleSaveAddress = () => {
    const alphaPattern = /^[A-Za-z\s]+$/;
    const houseNumberPattern = /^[A-Za-z0-9\s\-#]+$/;
    const alphaNumericPattern = /^[A-Za-z0-9\s]+$/;
    const numericPattern = /^\d{6}$/;

    let isValid = true;
    const newErrors = {};

    if (!houseName || !alphaPattern.test(houseName)) {
      newErrors.houseNameError = 'House name must be alphabetical only';
      isValid = false;
    }

    if (!houseNumber || !houseNumberPattern.test(houseNumber)) {
      newErrors.houseNumberError = 'House number must be alphanumeric or special characters';
      isValid = false;
    }

    if (!street || !alphaNumericPattern.test(street)) {
      newErrors.streetError = 'Street name must be alphanumeric';
      isValid = false;
    }

    if (!townCity || !alphaPattern.test(townCity) || townCity.length < 3) {
      newErrors.townCityError = 'Town or city must be alphabetical and at least 3 characters long';
      isValid = false;
    }

    if (!postcode || !numericPattern.test(postcode)) {
      newErrors.postcodeError = 'Postcode must be exactly 6 digits';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const address = `${houseName}, ${houseNumber}, ${street}, ${townCity}, ${postcode}`;
      setSavedAddress(address);
      setShowAddressForm(false);
      setAddressInput('');
      onContinue();
    }
  };

  const handleRemoveAddress = () => {
    setSavedAddress('');
  };

  const handleEditAddress = () => {
    setShowAddressForm(true);
  };

  const handleSelectDuration = (duration) => {
    setDuration(duration);
    clearError('durationError');
  };

  const handleValidateAndContinue = () => {
    let isValid = true;
    const newErrors = {};

    if (!duration) {
      newErrors.durationError = 'Please select a duration';
      isValid = false;
    }

    if (!savedAddress && !addressInput) {
      newErrors.addressError = 'Please enter or search for an address';
      isValid = false;
    }

    setErrors(newErrors);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <div className="address-backend">
      <div className="address-container">
        <h2 className="address-heading">Home address</h2>
        <p className="address-paragraph">
          Please provide your current Indian residence address
        </p>

        {savedAddress && (
          <div id="savedAddress" className="saved-address">
            <p className="address-paragraph">{savedAddress}</p>
            <button className="address-manual-entry-link" onClick={handleRemoveAddress}>
              Remove address
            </button>
            <button className="address-manual-entry-link" onClick={handleEditAddress}>
              Change address
            </button>
          </div>
        )}

        {!savedAddress && (
          <div className="address-form-group" id="searchAddressGroup">
            <label className="address-label" htmlFor="address">
              SEARCH FOR YOUR ADDRESS
            </label>
            <input
              type="text"
              id="address"
              className="address-input"
              value={query}
              placeholder="Type address or postcode"
              onChange={(e) => {
                setAddressInput(e.target.value); // Set addressInput state
                handleInputChange(e);
              }}
            />
            <div className="input-container">
              {data ? (
                <div className="suggestions-container">
                  {data.output.map((address, index) => (
                    <div
                      key={index}
                      onClick={() => handleAddressClick(address)}
                      className="suggestion"
                    >
                      {address}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          
            <button className="address-manual-button" onClick={() => setShowAddressForm(true)}>
              Prefer to enter address manually
            </button>
            <p className="address-error-message" id="addressError">
              {errors.addressError}
            </p>
          </div>
        )}

        <div className="address-form-group">
          <p className="address-paragraph">
            HOW LONG HAVE YOU LIVED AT THIS ADDRESS?
          </p>
          <p className="address-paragraph">
            If less than 6 months, well also need details of your previous address.
          </p>
          <div className="address-duration-buttons">
            <button
              className={`address-duration-button ${duration === '6 months or more' ? 'address-selected' : ''
                }`}
              onClick={() => handleSelectDuration('6 months or more')}
            >
              6 months or more
            </button>
            <button
              className={`address-duration-button ${duration === 'Less than 6 months' ? 'address-selected' : ''
                }`}
              onClick={() => handleSelectDuration('Less than 6 months')}
            >
              Less than 6 months
            </button>
          </div>
          <p className="address-error-message" id="durationError">
            {errors.durationError}
          </p>
        </div>

        <p className="address-warning">
          Please check your details above. You wont be able to change them once you click continue.
        </p>

        <button className="address-continue-button" onClick={handleValidateAndContinue}>
          Continue
        </button>

        {showAddressForm && (
          <>
            <div className="address-overlay" />
            <div className="address-address-form">
              <h2 className="address-heading">Manual Address Entry</h2>
              <div className="address-form-group">
                <label className="address-label" htmlFor="houseName">
                  House Name
                </label>
                <input
                  type="text"
                  id="houseName"
                  className="address-input"
                  value={houseName}
                  onChange={(e) => {
                    setHouseName(e.target.value);
                    clearError('houseNameError');
                  }}
                />
                <p className="address-error-message" id="houseNameError">
                  {errors.houseNameError}
                </p>
              </div>
              <div className="address-form-group">
                <label className="address-label" htmlFor="houseNumber">
                  House Number
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  className="address-input"
                  value={houseNumber}
                  onChange={(e) => {
                    setHouseNumber(e.target.value);
                    clearError('houseNumberError');
                  }}
                />
                <p className="address-error-message" id="houseNumberError">
                  {errors.houseNumberError}
                </p>
              </div>
              <div className="address-form-group">
                <label className="address-label" htmlFor="street">
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  className="address-input"
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                    clearError('streetError');
                  }}
                />
                <p className="address-error-message" id="streetError">
                  {errors.streetError}
                </p>
              </div>
              <div className="address-form-group">
                <label className="address-label" htmlFor="townCity">
                  Town/City
                </label>
                <input
                  type="text"
                  id="townCity"
                  className="address-input"
                  value={townCity}
                  onChange={(e) => {
                    setTownCity(e.target.value);
                    clearError('townCityError');
                  }}
                />
                <p className="address-error-message" id="townCityError">
                  {errors.townCityError}
                </p>
              </div>
              <div className="address-form-group">
                <label className="address-label" htmlFor="postcode">
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  className="address-input"
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                    clearError('postcodeError');
                  }}
                />
                <p className="address-error-message" id="postcodeError">
                  {errors.postcodeError}
                </p>
              </div>
              <div className="address-button-group">
                <button className="address-close-button" onClick={() => setShowAddressForm(false)}>
                  Close
                </button>
                <button className="address-submit-button" onClick={handleSaveAddress}>
                  Save Address
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MainForm;
