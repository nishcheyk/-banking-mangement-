// routes/accounts.js
const express = require('express');
const Account = require('../models/Account');
const router = express.Router();

// Get Account Balance by Customer ID
router.get("/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    const account = await Account.findOne({ customerId });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching account balance' });
  }
});

module.exports = router;
