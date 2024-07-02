const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  console.log("API Call: /api/auth/signup");
  try {
    const { username, password, email, mobileNumber } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { mobileNumber }],
    });

    if (existingUser) {
      let message = "Username";
      if (existingUser.email === email) message += " and email";
      if (existingUser.mobileNumber === mobileNumber) message += " and mobile number";
      message += " already exists";
      console.log("Error: ", message);
      return res.status(400).json({ message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      mobileNumber,
    });
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  console.log("API Call: /api/auth/login");
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      const message = "User not found";
      console.log("Error: ", message);
      return res.status(404).json({ message });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const message = "Invalid credentials";
      console.log("Error: ", message);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
