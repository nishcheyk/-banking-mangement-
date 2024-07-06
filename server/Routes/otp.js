const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

let otpStore = {}; // To store OTP temporarily

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email is required");

  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);

  otpStore[email] = hashedOtp;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      res.status(200).send("OTP sent successfully");
    }
  });
});

// Verify OTP
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).send("Email and OTP are required");

  const hashedOtp = otpStore[email];
  if (!hashedOtp) return res.status(400).send("OTP not found for this email");

  const isMatch = await bcrypt.compare(otp, hashedOtp);
  if (isMatch) {
    delete otpStore[email]; // Remove OTP after successful verification
    res.status(200).send("OTP verified successfully");
  } else {
    res.status(400).send("Invalid OTP");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
