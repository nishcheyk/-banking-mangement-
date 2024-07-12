import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import AboutUs from "../components/AboutUsCard";
import SomeText from "../components/SomeText";
import DocsToRead from "../components/DocsToRead";
import Footer from "../components/Footer";
import Dashboard from "./Dashboard";
import Loader from "../components/Loader";
import History from "../components/History";
import Support from "../components/Support";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import "../css/startup.css";


function HomePage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="appContainer overflow-y-hidden overflow-x-hidden h-screen w-screen">
      <Navbar />
      {isLoggedIn ? (
        <>
        <Dashboard />
        <Support/>
          <br />
          <Footer/>
        </>
      ) : (
        <>
          <Banner />
          <AboutUs />
          <SomeText />
          <DocsToRead />
          <History/>
          <Support/>

            <Footer/>
        </>
      )}
    </div>
  );
}

export default HomePage;
