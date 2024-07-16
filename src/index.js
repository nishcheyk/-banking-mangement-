import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes,Router } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import EditProfile from "./pages/EditProfile";
require('dotenv').config();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Registeration" element={<Register />} />
          <Route path="/EditProfile" element={<EditProfile />} />
        </Routes>
      </ BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
