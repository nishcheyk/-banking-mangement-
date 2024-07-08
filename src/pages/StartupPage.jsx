import React from "react";
import Navbar from "../components/Navbar";
import AboutUs from '../components/AboutUsCard';
import ApplyNow from '../components/ApplyNowButton';
import ReadDocText from '../components/DocumentsToReview';
import DocsToRead from '../components/DocsToRead';
import NeedHelp from '../components/NeedHelp';
import SomeText from '../components/SomeText';
import StartApplication from '../components/StartApplicationButton';
import Form from '../components/Form';
import ProgressBar from '../components/ProgressBar';
import "../css/startup.css"
function HomePage() {
  return (
    <div>
      <div className="App">
        <Navbar />
        <AboutUs />
        <SomeText />
        <ApplyNow />
        <ReadDocText />
        <DocsToRead />
        <StartApplication />
        <NeedHelp />
        <br />
        <ProgressBar />
        <Form />
      </div>
    </div>
  );
}

export default HomePage;
