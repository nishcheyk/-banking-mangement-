const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // Assuming you have this model
const Customer = require("./models/Data"); // Assuming you have this model
const PORT = 5050;

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Bank-Management");

// Signup Route
// Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password, email, mobileNumber } = req.body;

    // Check if the username, email, or mobile number already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { mobileNumber }],
    });
    if (existingUser) {
      let message = "Username";
      if (existingUser.email === email) message += " and email";
      if (existingUser.mobileNumber === mobileNumber)
        message += " and mobile number";
      message += " already exists";
      return res.status(400).json({ message });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      mobileNumber,
    });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

//login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Customer API Route
app.post("/api/customer", async (req, res) => {
  try {
    const { name, email, address, contactNumber, dateOfBirth } = req.body;

    // Create a new customer
    const newCustomer = new Customer({
      name,
      email,
      address,
      contactNumber,
      dateOfBirth,
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Error creating customer" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
