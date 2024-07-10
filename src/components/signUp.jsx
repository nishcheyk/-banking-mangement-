import React, { useState } from "react";
import axios from "axios";
import DatePicker from "../components/DatePicker";
// Ensure you import DatePicker if you're using it
// import DatePicker from 'path-to-date-picker';

const Signup = ({ onRegister }) => {
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
    <div className="container">
      {!isRegistered ? (
        <>
          <h2>Create your login details</h2>
          <form onSubmit={handleSubmit}>
            <div className="card mx-auto">
              <div className="card-body">
                <h5 className="card-title">Personal Details</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Tell us about yourself
                </h6>
                <hr />
                <div className="input-group mb-3">
                  <span className="input-group-text">First and last name</span>
                  <input
                    type="text"
                    aria-label="First name"
                    className="form-control"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    aria-label="Last name"
                    className="form-control"
                    required
                  />
                </div>
                {/* Assuming DatePicker is correctly imported and used */}
                <DatePicker />
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className={`form-control ${
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
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
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
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      isConfirmPasswordValid ? "is-valid" : "is-invalid"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
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
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className={`form-control ${
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
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
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
          </form>
          {message && <p className="mt-3">{message}</p>}
        </>
      ) : (
        <>
          <p className="success-message mt-3">{message}</p>
        </>
      )}
    </div>
  );
};

export default Signup;
