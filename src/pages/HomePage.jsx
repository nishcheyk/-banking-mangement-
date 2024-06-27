import React from "react";
import Navbar from "../components/Navbar";import AboutUs from '../components/AboutUs'; 
import ApplyNow from '../components/ApplyNow';
import ReadDocText from '../components/ReadDocText';
import DocsToRead from '../components/DocsToRead';
import NeedHelp from '../components/NeedHelp';
import SomeText from '../components/SomeText';
import StartApplication from '../components/StartApplication';
import Form from '../components/Form';
import ProgressBar from '../components/ProgressBar';

function HomePage() {
  return (
    <div>
      <div className="App">
        <Navbar />
        <br />
        <br />
        <h2>Welcome. Namaste. Grüezi. Bonjour. Buongiorno. Allegra.</h2>
        <br />
        <br />
        <AboutUs />
        <SomeText />
        <ApplyNow />
        <br />
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
