const express = require("express");
const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const router = express.Router();
const generatePDF = require("../models/pdfGenerator");

// Create Transaction
router.post("/", async (req, res) => {
  const { customerId, amount, type } = req.body;
  try {
    let account = await Account.findOne({ customerId });
    if (!account) {
      account = new Account({ customerId, balance: 0 });
    }
    if (type === "credit") {
      account.balance += amount;
    } else if (type === "debit") {
      if (account.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      account.balance -= amount;
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }
    const transaction = new Transaction({ customerId, amount, type });
    await transaction.save();
    await account.save();
    res.status(201).json({ transaction, account });
  } catch (error) {
    res.status(400).json({ message: "Error processing transaction" });
  }
});
router.post("/transfer", async (req, res) => {
  const { senderId, receiverId, amount } = req.body;
  console.log(senderId,receiverId, amount);
  try {
    let senderAccount = await Account.findOne({ customerId: senderId });
    let receiverAccount = await Account.findOne({ customerId: receiverId });

    if (!senderAccount) {
      return res.status(400).json({ message: "Sender account not found" });
    }

    if (!receiverAccount) {
      return res.status(400).json({ message: "Receiver account not found" });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Debit the sender's account
    senderAccount.balance -= amount;
    await senderAccount.save();

    // Credit the receiver's account
    receiverAccount.balance += amount;
    await receiverAccount.save();

    // Create transaction records for both accounts
    const senderTransaction = new Transaction({ customerId: senderId, amount, type: "debit" });
    const receiverTransaction = new Transaction({ customerId: receiverId, amount, type: "credit" });

    await senderTransaction.save();
    await receiverTransaction.save();

    res.status(201).json({ senderTransaction, receiverTransaction, senderAccount, receiverAccount });
  } catch (error) {
    res.status(400).json({ message: "Error processing transfer" });
  }
});



// Get Transactions by Customer ID
router.get('/:customerId', async (req, res) =>{
   const { customerId } = req.params;
try {
  const transactions = await Transaction.find({ customerId });
  if (transactions.length === 0) {
    return res.status(404).json({ message: 'No transactions found' });
  }
  res.status(200).json(transactions);
} catch (error) {
  console.error('Error fetching transactions:', error);
  res.status(500).json({ message: 'Error fetching transactions' });
}
});
module.exports = router;
