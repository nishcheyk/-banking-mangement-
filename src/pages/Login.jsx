import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import OtpInput from "../components/OtpInput";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const isValid = email.includes("@") && email.includes(".");
    setIsEmailValid(isValid);
  };

  const validatePassword = (password) => {
    setIsPasswordValid(password.length >= 8 && password.length <= 20);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post(
          "http://localhost:5050/api/auth/login",
          { email, password }
        );
        if (response.status === 200) {
          const { userId, customerId, email ,username } = response.data;
          login(email, customerId, userId,username);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("customerId", customerId);
          localStorage.setItem("userId", userId);
          localStorage.setItem("username",username);
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
      setErrorMessage("Invalid email or password");
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
        { email: resetEmail }
      );
      setShowOtpInput(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Error sending OTP: " + (error.response?.data?.message || error.message)
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
          email: resetEmail,
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
      await axios.post("http://localhost:5050/api/emailOtp/reset-password", {
        email: resetEmail,
        newPassword,
      });

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
          ></svg>
          <div className={`loginContainer ${isOtpVerified ? "hide" : ""}`}>
            {forgotPassword ? (
              <>
                <h2>
                  {showOtpInput ? (
                    <h2>Verify OTP</h2>
                  ) : (
                    <h2>Forgot Password</h2>
                  )}
                </h2>
                {!showOtpInput ? (
                  <form onSubmit={handleResetPassword}>
                    <div className="group">
                      <input
                        className="input"
                        id="resetEmail"
                        type="email"
                        autoComplete="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        placeholder="Enter your Email"
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
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                      }}
                      required
                      placeholder="Email"
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
