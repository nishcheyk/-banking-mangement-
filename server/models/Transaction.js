const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  }
}, {
  timestamps: true // Automatically add `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Transaction', transactionSchema);
