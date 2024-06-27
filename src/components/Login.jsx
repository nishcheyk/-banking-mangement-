import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'; // Import your external CSS file

const Login = ({ onLogin, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        const response = await axios.post('http://localhost:5050/api/login', { username, password });
        if (response.status === 200) {
          onLogin(); // Notify App component of successful login
        } else {
          setErrorMessage('Login failed');
        }
      } catch (error) {
        setErrorMessage('Error logging in: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleForgotPassword = () => {
    onForgotPassword(username); // Notify App component that user forgot password
  };

  return (
    <div className="container">
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
