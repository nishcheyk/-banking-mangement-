import React, { useState } from "react";
import "../App.css";
import Signup from "../components/signUp";
import Login from "../components/Login";
import PdfValidation from "../components/pdfValidation"; // Ensure correct import path and casing

function LoginPage() {
  const [isRegistered2, setIsRegistered2] = useState(false);
  const [isLoggedIn2, setIsLoggedIn2] = useState(false);

  const handleRegister2 = () => {
    setIsRegistered2(true);
  };

  const handleLogout2 = () => {
    setIsLoggedIn2(false);
  };

  const handleSuccessfulLogin2 = () => {
    setIsLoggedIn2(true);
    setIsRegistered2(false);
  };
  //   const [isRegistered, setIsRegistered] = useState(false);
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   const handleRegister = () => {
  //     setIsRegistered2(true);
  //   };

  //   const handleLogout = () => {
  //     setIsLoggedIn2(false);
  //   };

  //   const handleSuccessfulLogin = () => {
  //     setIsLoggedIn2(true);
  //     setIsRegistered2(false);
  //   };
  return (
    <div>
      <div className="App">
        <nav>
          {!isLoggedIn2 && (
            <>
              <button onClick={handleRegister2}>Signup</button>
              <button onClick={() => setIsRegistered2(false)}>Login</button>
            </>
          )}
          {isLoggedIn2 && <button onClick={handleLogout2}>Logout</button>}
        </nav>

        {!isLoggedIn2 && !isRegistered2 && (
          <Login onLogin={handleSuccessfulLogin2} />
        )}
        {!isLoggedIn2 && isRegistered2 && (
          <Signup onRegister={handleRegister2} />
        )}
        {isLoggedIn2 && <PdfValidation />}
      </div>
    </div>
  );
}

export default LoginPage;
