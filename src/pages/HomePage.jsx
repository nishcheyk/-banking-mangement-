import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import AboutUs from "../components/AboutUsCard";
import SomeText from "../components/SomeText";
import ReadDocText from "../components/DocumentsToReview";
import DocsToRead from "../components/DocsToRead";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Dashboard from "./Dashboard";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/startup.css";

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
          <Footer/>
        </>
      ) : (
        <>
          <Banner />
          <AboutUs />
          <SomeText />
          <DocsToRead />
          <Form />
            <Footer/>
        </>
      )}
    </div>
  );
}

export default HomePage;
