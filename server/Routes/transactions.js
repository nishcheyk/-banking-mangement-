// routes/transactions.js
const express = require('express');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const router = express.Router()
const generatePDF = require('../models/pdfGenerator');;

// Create Transaction
router.post("/", async (req, res) => {
  const { customerId, amount, type } = req.body;
  try {
    let account = await Account.findOne({ customerId });
    if (!account) {
      account = new Account({ customerId, balance: 0 });
    }

    if (type === 'credit') {
      account.balance += amount;
    } else if (type === 'debit') {
      if (account.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
      account.balance -= amount;
    } else {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    const transaction = new Transaction({ customerId, amount, type });
    await transaction.save();
    await account.save();

    res.status(201).json({ transaction, account });
  } catch (error) {
    res.status(400).json({ message: 'Error processing transaction' });
  }
});

// Get Transactions by Customer ID
router.get("/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    const transactions = await Transaction.find({ customerId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

module.exports = router;
