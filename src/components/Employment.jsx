import React, { useState } from "react";
import "../css/Emp.css";

const EmploymentForm = () => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState("");
  const [showCitizenship, setShowCitizenship] = useState(false);
  const [selectedCitizenship, setSelectedCitizenship] = useState("");
  const [formData, setFormData] = useState({});

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
    setShowCitizenship(false); // Reset citizenship section visibility
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

  return (
    <div className="employment-form">
      <h2>Employment details</h2>
      <div className="buttons">
        {employmentStatuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusClick(status)}
            className={selectedStatus === status ? "active" : ""}
          >
            {status}
          </button>
        ))}
      </div>
      {selectedStatus && (
        <div className="questions">
          {questions[selectedStatus].map((question, index) => (
            <div key={index}>
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
            <div className="Inp">
              <label>What&apos;s your annual income?</label>
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
        <button className="submit-btn" onClick={handleContinueClick}>
          Continue
        </button>
      ) : (
        <div className="citizenship">
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
        </div>
      )}
    </div>
  );
};

export default EmploymentForm;
