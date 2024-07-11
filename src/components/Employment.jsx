// src/components/EmploymentForm.js
import React, { useState } from "react";
import "../css/EmploymentForm.css";

const EmploymentForm = ({ onContinue }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState("");
  const [showCitizenship, setShowCitizenship] = useState(false);
  const [selectedCitizenship, setSelectedCitizenship] = useState("");
  const [formData, setFormData] = useState({});
  const [isFinalStep, setIsFinalStep] = useState(false);

  const employmentStatuses = [
    "Full-time employed",
    "Part-time employed",
    "Self-employed",
    "Retired",
    "Student",
    "Not in employment",
  ];

  const questions = {
    "Full-time employed": [
      "What industry do you work in?",
      "What's your occupation?",
    ],
    "Part-time employed": [
      "What industry do you work in?",
      "What's your occupation?",
    ],
    "Self-employed": [
      "What industry do you work in?",
      "What's your occupation?",
    ],
    Retired: [
      "What was your previous occupation?",
      "What's your annual pension?",
    ],
    Student: [
      "What's your field of study?",
      "What's your expected graduation year?",
    ],
    "Not in employment": [
      "What's your last held occupation?",
      "When did you last work?",
    ],
  };

  const salaryRanges = [
    "0-5 Lac",
    "5-10 Lac",
    "10-15 Lac",
    "15-20 Lac",
    "20+ Lac",
  ];

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    setFormData({});
    setSelectedSalary("");
    setShowCitizenship(false);
  };

  const handleInputChange = (event, question) => {
    setFormData({
      ...formData,
      [question]: event.target.value,
    });
  };

  const handleSalaryChange = (event) => {
    setSelectedSalary(event.target.value);
  };

  const validateForm = () => {
    if (selectedStatus) {
      const requiredQuestions = questions[selectedStatus];
      for (let question of requiredQuestions) {
        if (!formData[question]) {
          return false;
        }
      }
      if (
        (selectedStatus === "Full-time employed" ||
          selectedStatus === "Part-time employed" ||
          selectedStatus === "Self-employed") &&
        !selectedSalary
      ) {
        return false;
      }
      return true;
    }
    return false;
  };

  const handleContinueClick = () => {
    if (validateForm()) {
      setShowCitizenship(true);
    } else {
      alert("Please fill out all fields before continuing.");
    }
  };

  const handleCitizenshipChange = (event) => {
    setSelectedCitizenship(event.target.value);
  };

  const handleFinalContinueClick = () => {
    if (selectedCitizenship) {
      console.log("Form data:", { ...formData, selectedStatus, selectedSalary, selectedCitizenship });

      setIsFinalStep(true);
      onContinue(); // Call the onContinue prop when form is completed
    } else {
      alert("Please select your citizenship.");
    }
  };

  return (
    <div className="employment-container overflow-y-hidden overflow-x-hidden h-screen w-screen">
    <div className="employment-border">
    <div className="employment-form">
      <h2>Employment details</h2>
      <div className="employment-buttons">
        {employmentStatuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusClick(status)}
            className={selectedStatus === status ? "employment-button active" : "employment-button"}
          >
            {status}
          </button>
        ))}
      </div>
      {selectedStatus && (
        <div className="employment-questions">
          {questions[selectedStatus].map((question, index) => (
            <div key={index} className="employment-question">
              <label>{question}</label>
              <input
                type="text"
                value={formData[question] || ""}
                onChange={(e) => handleInputChange(e, question)}
              />
            </div>
          ))}
          {(selectedStatus === "Full-time employed" ||
            selectedStatus === "Part-time employed" ||
            selectedStatus === "Self-employed") && (
            <div className="employment-salary">
              <label>What is your annual income?</label>
              {salaryRanges.map((range, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`salary-${index}`}
                    name="salary"
                    value={range}
                    checked={selectedSalary === range}
                    onChange={handleSalaryChange}
                  />
                  <label htmlFor={`salary-${index}`}>{range}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {!showCitizenship ? (
        <button className="employment-submit-btn" onClick={handleContinueClick}>
          Continue
        </button>
      ) : (
        !isFinalStep && (
          <div className="employment-citizenship">
            <label>Citizenship/Nationality:</label>
            <div>
              <input
                type="radio"
                id="citizenship-indian"
                name="citizenship"
                value="Indian"
                checked={selectedCitizenship === "Indian"}
                onChange={handleCitizenshipChange}
              />
              <label htmlFor="citizenship-indian">Indian</label>
            </div>
            <div>
              <input
                type="radio"
                id="citizenship-others"
                name="citizenship"
                value="Others"
                checked={selectedCitizenship === "Others"}
                onChange={handleCitizenshipChange}
              />
              <label htmlFor="citizenship-others">Others</label>
            </div>
            <button className="employment-submit-btn" onClick={handleFinalContinueClick}>
              Continue
            </button>
          </div>

        )
      )}
      </div>

    </div>
    </div>

  );
};

export default EmploymentForm;
