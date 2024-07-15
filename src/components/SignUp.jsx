import React, { useState } from "react";
import axios from "axios";
import DatePicker from "../components/DatePicker";
import OtpInput from "../components/OtpInput";
import "../css/SignUp.css";

const Signup = ({ onContinue }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(false);
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const validatePassword = (password) => {
    const passwordLengthValid = password.length >= 8 && password.length <= 20;
    const passwordNumberOrSpecialValid =
      /[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);
    const passwordUppercaseValid = /[A-Z]/.test(password);
    const passwordNoSeqValid =
      !/(.)\1{2,}|012|123|234|345|456|567|678|789/.test(password);
    setIsPasswordValid(
      passwordLengthValid &&
        passwordNumberOrSpecialValid &&
        passwordUppercaseValid &&
        passwordNoSeqValid
    );
  };

  const validateEmail = (email) => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (setIsOtpVerified) {
      setIsEmailValid(emailValid);
    }
  };

  const validateMobileNumber = (mobileNumber) => {
    const mobileNumberValid = /^[0-9]{10}$/.test(mobileNumber);
    setIsMobileNumberValid(mobileNumberValid);
  };

  const handleSendOtp = async () => {
    if (isEmailValid) {
      try {
        await axios.post("http://localhost:5050/api/emailOtp/send-otp-signup", {
          email,
        });
        setMessage("OTP sent to your email.");
        setIsOtpSent(true);
      } catch (error) {
        console.error("Error sending OTP:", error);
        setMessage("Error  email already exist ");
      }
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post("http://localhost:5050/api/emailOtp/verify-otp", {
        email,
        otp,
      });
      setIsOtpVerified(true);
      setMessage("OTP verified successfully.");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Invalid OTP.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isConfirmPasswordValid = password === confirmPassword;
    setIsConfirmPasswordValid(isConfirmPasswordValid);

    if (
      isPasswordValid &&
      isConfirmPasswordValid &&
      isEmailValid &&
      isMobileNumberValid &&
      isOtpVerified
    ) {
      try {
        await axios.post("http://localhost:5050/api/auth/signup", {
          username: name,
          password,
          email,
          mobileNumber,
        });
        setMessage("User registered successfully!");
        onContinue();
      } catch (error) {
        console.error("Error registering user:", error);
        setMessage(
          "Error registering user: " +
            (error.response?.data?.message || error.message)
        );
      }
    } else {
      setMessage("Please fill out all fields correctly.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <div className="register-border">
          <div className="register-card-body">
            <h5 className="register-card-title">Personal Details</h5>
            <p className="register-card-subtitle mb-2 text-body-secondary">
              Tell us about yourself
            </p>
            <hr />
            <label className="register-form-label">First and last name</label>
            <div className="register-input-group mb-3">
              <input
                type="text"
                aria-label="Firstname"
                className="register-form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                aria-label="Last name"
                className="register-form-control"
                required
              />
            </div>
            <DatePicker />
            <div className="mb-1">
              <label className="register-form-label">Email</label>
              <input
                type="email"
                className={`register-form-control ${
                  isEmailValid ? "is-valid" : "is-invalid"
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                required
              />
              {!isOtpVerified && (
                <>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="otp-button"
                  >
                    Send OTP
                  </button>
                  {isOtpSent && (
                    <div className="verifyy">
                      <OtpInput length={4} onOtpChange={setOtp} />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="otp-button"
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="mb-1">
              <label className="register-form-label">Mobile Number</label>
              <input
                type="text"
                className={`register-form-control ${
                  isMobileNumberValid ? "is-valid" : "is-invalid"
                }`}
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  validateMobileNumber(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-1">
              <label className="register-form-label">Password</label>
              <input
                type="password"
                className={`register-form-control ${
                  isPasswordValid ? "is-valid" : "is-invalid"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-1">
              <label className="register-form-label">Confirm Password</label>
              <input
                type="password"
                className={`register-form-control ${
                  isConfirmPasswordValid ? "is-valid" : "is-invalid"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {message && <p className="errormess">{message}</p>}
          </div>
          <button type="submit" className="submittt" disabled={!isOtpVerified}>
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="circle-text">Continue</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
