import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import OtpInput from "../components/OtpInput";
import "../css/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateUsername = (username) => {
    const isValid = username.length >= 8 && username.length <= 20;
    setIsUsernameValid(isValid);
  };

  const validatePassword = (password) => {
    setIsPasswordValid(password.length >= 8 && password.length <= 20);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isUsernameValid && isPasswordValid) {
      try {
        const response = await axios.post(
          "http://localhost:5050/api/auth/login",
          { username, password }
        );
        if (response.status === 200) {
          login();
          navigate("/");
        } else {
          setErrorMessage("Login failed");
        }
      } catch (error) {
        setErrorMessage(
          "Error logging in: " +
            (error.response?.data?.message || error.message)
        );
      }
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5050/api/emailOtp/send-otp",
        { username: resetUsername }
      );
      setShowOtpInput(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Error sending OTP: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleOtpChange = (otp) => {
    if (otp.length === 4) {
      verifyOtp(otp);
    }
    setOtp(otp);
  };

  const verifyOtp = async (otp) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/emailOtp/verify-otp",
        {
          username: resetUsername,
          otp,
        }
      );
      setIsOtpVerified(true);
      setErrorMessage("");
    } catch (error) {
      setIsOtpVerified(false);
      setErrorMessage(
        "Error verifying OTP: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleNewPasswordSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "http://localhost:5050/api/emailOtp/reset-password",
        {
          username: resetUsername,
          newPassword,
        }
      );

      setIsOtpVerified(false);
      setErrorMessage("");
      login();
      navigate("/");
    } catch (error) {
      setErrorMessage(
        "Error resetting password: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="loginWrapper">
      <div className="e-card playing">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="infotop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="icon"
          >

          </svg>


      <div className={`loginContainer ${isOtpVerified ? "hide" : ""}`}>
        {forgotPassword ? (
          <>
            <h2>
              {showOtpInput
                ? <h2>Verify OTP </h2>
                : <h2>Forgot Password</h2>}
            </h2>
            {!showOtpInput ? (
              <form onSubmit={handleResetPassword}>
                <div className="group">
                  <input
                    className="input"
                    id="resetUsername"
                    type="text"
                    autoComplete="username"
                    value={resetUsername}
                    onChange={(e) => setResetUsername(e.target.value)}
                    required
                    placeholder="Enter your Username"
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            ) : (
              <>
                <OtpInput length={4} onOtpChange={handleOtpChange} />
              </>
            )}
          </>
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="group">
                <input
                  className="input"
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    validateUsername(e.target.value);
                  }}
                  required
                  placeholder="Username"
                />
              </div>
              <div className="group">
                <input
                  className="input"
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  required
                  placeholder="Password"
                />
              </div>
              <button type="submit">Login</button>
            </form>
            <div className="forgotPassword" onClick={handleForgotPassword}>
              Forgot Password?
            </div>
          </>
        )}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
      {isOtpVerified && (
        <div className="resetPassword">
          <h2>Reset Password</h2>
          <form onSubmit={handleNewPasswordSubmit}>
            <div className="group">
              <input
                className="input"
                id="newPassword"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="New Password"
              />
            </div>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      )}
    </div>
    </div>
      </div>
  );
};

export default Login;
