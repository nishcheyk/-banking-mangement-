import React, { useState } from "react";
import axios from "axios";

import "../css/Login.css"; // Import your external CSS file

import { Navigate } from "react-router-dom"; // Import Redirect from react-router-dom

const Login = ({ onLogin, onForgotPassword }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status and redirect

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
        console.log("API Call: /api/auth/login");
        const response = await axios.post(
          "http://localhost:5050/api/auth/login",
          { username, password }
        );
        if (response.status === 200) {
          setLoggedIn(true); // Set login status to true
          onLogin(); // Notify App component of successful login
        } else {
          setErrorMessage("Login failed");
        }
      } catch (error) {
        console.error("Error logging in:", error);
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
    onForgotPassword(username);
  };

  // Redirect to startup page if logged in
  if (loggedIn) {
    Navigate("/login");
  }

  return (
    <div className="containe">
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
