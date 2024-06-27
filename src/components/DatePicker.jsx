import React, { useState } from "react";
import moment from "moment"; // Import moment.js

function DatePicker() {
  var [selectedDate, setSelectedDate] = useState(null);

  var handleDateChange = (date) => {
    setSelectedDate(date);
  };

  var calculateAge = (dateOfBirth) => {
    var today = new Date();
    var birthYear = dateOfBirth.getFullYear();
    var age = today.getFullYear() - birthYear;

    // Account for months/days if birthday hasn't passed this year
    var birthMonth = dateOfBirth.getMonth();
    var currentMonth = today.getMonth();
    var birthDay = dateOfBirth.getDate();
    var currentDay = today.getDate();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }

    return age;
  };

  var isEighteenOrOlder = selectedDate && calculateAge(selectedDate) >= 18;

  return (
    <div className="container">
      <div className="row mb-3 mx-auto">
        <label for="dateOfBirth" className="col-sm-2 col-form-label">
          Date of Birth
        </label>
        <div className="col-sm-6">
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            value={
              selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : ""
            } // Format using moment.js
            onChange={(event) => handleDateChange(new Date(event.target.value))}
            required
          />
          {isEighteenOrOlder ? null : (
            <div className="invalid-feedback d-block">
              You must be 18 years or older to proceed.
            </div>
          )}
        </div>
      </div>
      {!isEighteenOrOlder ? null : (
        <button type="submit" class="btn btn-primary btn-lg my-2">
          go
        </button>
      )}
    </div>
  );
}

export default DatePicker;
