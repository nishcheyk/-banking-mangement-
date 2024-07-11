import React, { useState } from "react";
import axios from "axios";
import DatePicker from "../components/DatePicker";
import "../css/SignUp.css";

const Signup = ({ onContinue }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const validateUsername = (username) => {
    const usernameLengthValid = username.length >= 8 && username.length <= 20;
    const usernameCharsValid = /^[A-Za-z0-9]+$/.test(username);
    setIsUsernameValid(usernameLengthValid && usernameCharsValid);
  };

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
    setIsEmailValid(emailValid);
  };

  const validateMobileNumber = (mobileNumber) => {
    const mobileNumberValid = /^[0-9]{10}$/.test(mobileNumber);
    setIsMobileNumberValid(mobileNumberValid);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("here");

    const isConfirmPasswordValid = password === confirmPassword;
    setIsConfirmPasswordValid(isConfirmPasswordValid);

    if (
      isUsernameValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isEmailValid &&
      isMobileNumberValid
    ) {
      try {
        console.log("API Call: /api/auth/signup");
        await axios.post("http://localhost:5050/api/auth/signup", {
          username,
          name,
          password,
          email,
          mobileNumber,
        });
        setMessage("User registered successfully!");
        setIsRegistered(true);
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
      {!isRegistered ? (
        <>
          <form onSubmit={handleSubmit}>
          <div className="register-border">
            <div className="register-card-body">
              <h5 className="register-card-title">Personal Details</h5>
              <h6 className="register-card-subtitle mb-2 text-body-secondary">
                Tell us about yourself
              </h6>
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
              <div className="mb-3">
                <label className="register-form-label">Username</label>
                <input
                  type="text"
                  className={`register-form-control ${
                    isUsernameValid ? "is-valid" : "is-invalid"
                  }`}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    validateUsername(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
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
            </div>

            <button
              type="submit"
              className= "submittt"
              disabled={
                !isUsernameValid ||
                !isPasswordValid ||
                !isConfirmPasswordValid ||
                !isEmailValid ||
                !isMobileNumberValid
              }
            >
              Continue
            </button>
            </div>
          </form>
          {message && <p className="mt-3">{message}</p>}
        </>
      ) : (
        <>
          <p className="register-success-message mt-3">{message}</p>
        </>
      )}
    </div>
  );
};

export default Signup;
