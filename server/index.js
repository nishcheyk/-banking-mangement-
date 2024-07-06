const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const authRoutes = require("./Routes/auth");
const transactionRoutes = require("./Routes/transactions");
const customerRoutes = require("./Routes/customer");
const accountRoutes = require("./Routes/accounts");
const download = require("./Routes/download-statement.js");
require("dotenv").config();
const PORT = 5050;

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/Bank-Management")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", download);
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/accounts", accountRoutes);
app.get("/test", (req, res) => {
  res.send("Server is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
