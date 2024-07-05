const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
     required: true,
  },
  email: {
    type: String,
 required: true,
    unique: true,
    match: [/^.+@.+\..+$/, 'Please enter a valid email address']
  },
  address: {
   
    street: {
      type: String

    },
    city: {
      type: String

    },
    state: {
      type: String

    },
    postalCode: {
      type: String

    }
  },
  contactNumber: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
     required: true,
  }
});

module.exports = mongoose.model('Customer', customerSchema);
