// routes/customers.js
const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

// Create Customer
router.post("/", async (req, res) => {
  try {
    const { name, email, address, contactNumber, dateOfBirth } = req.body;

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

module.exports = router;
