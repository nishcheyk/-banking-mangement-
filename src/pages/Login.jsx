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

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateUsername = (username) => {
    setIsUsernameValid(username.length >= 8 && username.length <= 20);
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
        { email: "nishcheycapture2014@gmail.com" }
      );
      setShowOtpInput(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Error resetting password: " +
        (error.response?.data?.message || error.message)
      );
    }
  };

  const handleOtpSubmit = async (newPassword) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/emailOtp/reset-password",
        {
          email: "nishcheycapture2014@gmail.com",
          otp,
          newPassword,
        }
      );
      setShowOtpInput(false);
      login();
      navigate("/");
    } catch (error) {
      setErrorMessage(
        "Error resetting password: " +
        (error.response?.data?.message || error.message)
      );
    }
  };

  if (forgotPassword) {
    return (
      <div className="loginContainer">
        {!showOtpInput ? (
          <>
            <h2>Forgot Password</h2>
            <form onSubmit={handleResetPassword}>
              <div className="input-group">
                <label htmlFor="resetUsername" className="label-text">
                  Username
                </label>
                <input
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
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </>
        ) : (
          <>
            <h2>Verify OTP to Reset Password</h2>
            <OtpInput length={4} onOtpSubmit={handleOtpSubmit} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="loginContainer">
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username" className="label-text">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateUsername(e.target.value);
            }}
            required
            placeholder="Enter your Username"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="label-text">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
            placeholder="Enter your Password"
          />
        </div>
        <span className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </span>

        <button type="submit">Login</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
