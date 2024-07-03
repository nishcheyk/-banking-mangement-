const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Account', accountSchema);
