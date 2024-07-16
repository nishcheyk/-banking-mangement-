// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null); // Ensure username state is initialized properly

  const login = (email, customerId, userId, username) => {
    setIsLoggedIn(true);
    setEmail(email);
    setCustomerId(customerId);
    setUserId(userId);
    setUsername(username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmail(null);
    setCustomerId(null);
    setUserId(null);
    setUsername(null);
  };
 
  return (
    <AuthContext.Provider value={{ isLoggedIn, email, customerId, userId, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
