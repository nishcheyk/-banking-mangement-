import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../css/OtpInput.css";

const OtpInput = ({ length = 4, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [isValidating, setIsValidating] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // State to manage OTP verification
  const [password, setPassword] = useState(""); // State to capture new password
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (index, e) => {
    const { value } = e.target;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      setIsValidating(true);
      verifyOtp(combinedOtp); // Call backend to verify OTP
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/emailOtp/verify-otp",
        { email: "nishcheycapture2014@gmail.com", otp }
      );
      setIsVerified(true); // Mark OTP as verified
      console.log(response.data); // Handle successful verification
    } catch (error) {
      setErrorMessage("Error verifying OTP: " + (error.response?.data || error.message));
      console.error("Error verifying OTP:", error.response.data); // Handle error
    } finally {
      setIsValidating(false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      await onOtpSubmit(password); // Pass newPassword to parent component
    } catch (error) {
      setErrorMessage("Error submitting OTP: " + (error.response?.data?.message || error.message));
      console.error("Error submitting OTP:", error.response.data); // Handle error
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/emailOtp/send-otp",
        { email: "nishcheycapture2014@gmail.com" }
      );
      console.log(response.data); // Handle successful OTP resend
    } catch (error) {
      setErrorMessage("Error sending OTP: " + (error.response?.data || error.message));
      console.error("Error sending OTP:", error.response.data); // Handle error
    }
  };

  return (
    <div>
      <div className="otpContainer">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
            disabled={isVerified} // Disable inputs once OTP is verified
          />
        ))}
        {!isValidating && !isVerified && (
          <button onClick={handleResend} className="resendButton">
            Resend OTP
          </button>
        )}
        {isValidating && <span>Validating OTP...</span>}
        {isVerified && (
          <div className="verifiedContainer">
            <span className="greenTick">✓</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="passwordInput"
            />
            <button
              className="continueButton"
              onClick={handleOtpSubmit}
            >
              Continue
            </button>
          </div>
        )}
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default OtpInput;
