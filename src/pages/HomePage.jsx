// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AboutUs from '../components/AboutUsCard';
import ApplyNow from '../components/ApplyNowButton';
import ReadDocText from '../components/DocumentsToReview';
import DocsToRead from '../components/DocsToRead';
import NeedHelp from '../components/NeedHelp';
import SomeText from '../components/SomeText';
import StartApplication from '../components/StartApplicationButton';
import Form from '../components/Form';
import ProgressBar from '../components/ProgressBar';
import Dashboard from './Dashboard';
import Loader from '../components/Loader';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/startup.css';

function HomePage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="appContainer">
      <Navbar />
      {isLoggedIn ? (
        <>
          <Dashboard />
          <br />
        </>
      ) : (
        <>
          <AboutUs />
          <SomeText />
          <ApplyNow />
          <ReadDocText />
          <DocsToRead />
          <StartApplication />
          <NeedHelp />

          <ProgressBar />
          <Form />
        </>
      )}
    </div>
  );
}

export default HomePage;
