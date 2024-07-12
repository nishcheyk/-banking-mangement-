import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/EditProfile.css";
import EditNavbar from "../components/EditNavbar";
const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    dob: "",
    username: "",
    mobile: "",
  });
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    // Fetch the current user data from the backend
    axios
      .get("/api/user/profile")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the updated email and password to the backend
    const updatedData = {
      email: newEmail || userData.email,
      password: newPassword,
    };

    axios
      .put("/api/user/profile", updatedData)
      .then((response) => {
        alert("Profile updated successfully!");
        setUserData({ ...userData, email: updatedData.email });
        setNewEmail("");
        setNewPassword("");
      })
      .catch((error) => {
        console.error("There was an error updating the profile!", error);
      });
  };

  return (
    <div >
    <EditNavbar/>
    <div className="edit-container">

      <h1>Edit Profile</h1>
      <div className="detail-group">
        <label>Name:</label>
        {/* {userData.name} render it in the next div */}
        <div className="detail-value">{userData.name}</div>
      </div>
      <div className="detail-group">
        <label>Username:</label>
        <div className="detail-value">{userData.username}</div>
      </div>
      <div className="detail-group">
        <label>Date of Birth:</label>
        <div className="detail-value">{userData.dob}</div>
      </div>
      <div className="detail-group">
        <label>Mobile Number:</label>
        <div className="detail-value">{userData.mobile}</div>
      </div>
      <div className="detail-group">
        <label>Current Email:</label>
        <div className="detail-value">{userData.email}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Email:</label>
          <input
            className="inpEditProf"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">
          Update Profile
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditProfile;
