// server.js or app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const auth = require("../server/routes/auth");
const transaction = require("../server/routes/transactions");
const customer = require("../server/routes/customer");
const account = require("../server/routes/accounts");
const emailOtp = require("../server/routes/email-otp");
const download = require("../server/routes/download-statement");
const uploadRoutes = require("../server/routes/uploadRoutes");

const app = express();
const PORT = 5050;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("uploads"));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/Bank-Management", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", auth);
app.use("/api/customers", customer);
app.use("/api/transactions", transaction);
app.use("/api/accounts", account);
app.use("/api/emailOtp", emailOtp);
app.use("/api", download);
app.use("/api/uploads", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
