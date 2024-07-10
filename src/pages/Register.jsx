import React from "react";
import Homeadress from "../components/Homeadress";
import EmploymentForm from "../components/Employment";
import SignUp from "../components/SignUp";
import Document_upload from "../components/Document_upload";

function Registration() {
  return (
    <div className=" bg-black">

      <SignUp/>
      <EmploymentForm/>
      <Homeadress />
      <Document_upload/>

          </div>
  );
}

export default Registration;
