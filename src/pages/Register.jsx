import React, { useState } from "react";
import Homeaddress from "../components/Homeaddress";
import EmploymentForm from "../components/Employment";
import SignUp from "../components/SignUp";
import DocumentUpload from "../components/DocumentUpload";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [currentForm, setCurrentForm] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentForm((prevForm) => prevForm + 1);
  };

  const handleDocumentUploadSuccess = () => {
    navigate("/login");
  };

  return (
    <div className="bg-black">
      {currentForm === 0 && <SignUp onContinue={handleNext} />}
      {currentForm === 1 && <EmploymentForm onContinue={handleNext} />}
      {currentForm === 2 && <Homeaddress onContinue={handleNext} />}
      {currentForm === 3 && (
        <DocumentUpload onSuccess={handleDocumentUploadSuccess} />
      )}
    </div>
  );
}

export default Registration;
