import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../components/signUp";
import Login from "../components/Login";


function LoginPage() {
  const [isRegistered2, setIsRegistered2] = useState(false);
  const [isLoggedIn2, setIsLoggedIn2] = useState(false);
  const navigate = useNavigate(); // Hook from react-router-dom for navigation

  const handleRegister2 = () => {
    setIsRegistered2(true);
  };

  const handleLogout2 = () => {
    setIsLoggedIn2(false);
  };

  const handleSuccessfulLogin2 = () => {
    setIsLoggedIn2(true);
    setIsRegistered2(false);
    navigate("/"); // Redirect to "/" route after successful login
  };

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

      </div>
    </div>
  );
}

export default LoginPage;
