const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const pdfkit = require('pdfkit');
const fs = require('fs');
const Transaction = require('./models/Transaction');

const authRoutes = require("./Routes/auth");
const customerRoutes = require("./Routes/customer");
const transactionRoutes = require("./Routes/transactions");
const accountRoutes = require("./Routes/accounts");

const PORT = 5050;

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Bank-Management")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/accounts", accountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
