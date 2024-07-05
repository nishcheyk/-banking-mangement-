const express = require('express');
const Customer = require('../models/Customer');
const User = require('../models/User');
const router = express.Router();

// Create Customer
router.post("/", async (req, res) => {
  try {
    const { name, email, address, contactNumber, dateOfBirth, userId } = req.body;

    const newCustomer = new Customer({
      userId,
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

// Fetch user data
router.get('/user', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is available in req.user (e.g., from a middleware that handles authentication)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const customer = await Customer.findOne({ userId: userId });

    res.status(200).json({
      user,
      customer
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details' });
  }
});

module.exports = router;
