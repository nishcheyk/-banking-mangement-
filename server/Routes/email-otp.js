const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model

let otpStore = {}; // To store OTP temporarily

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thaparbankingsolutions@gmail.com",
    pass: "blsfjufhejrhszba",
  },
});

// Generate OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send("Username is required");
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const email = user.email; // Get the user's email

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    otpStore[username] = { hashedOtp, email };

    const mailOptions = {
      from: "thaparbankingsolutions@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).send("Error sending OTP");
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { username, otp } = req.body;
  if (!username || !otp) {
    return res.status(400).send("Username and OTP are required");
  }

  console.log(`Verifying OTP for user: ${username}, OTP: ${otp}`);

  try {
    const otpData = otpStore[username];
    if (!otpData) {
      return res.status(400).send("OTP not found for this username");
    }

    const isMatch = await bcrypt.compare(otp, otpData.hashedOtp);
    if (isMatch) {
      delete otpStore[username];
      res.status(200).send("OTP verified successfully");
    } else {
      res.status(400).send("Invalid OTP");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send("Error verifying OTP");
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.status(400).send("Username and new password are required");
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ username }, { password: hashedPassword });
    res.status(200).send("Password reset successfully");
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send("Error resetting password");
  }
});

module.exports = router;
