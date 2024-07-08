const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    documentType: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Document', DocumentSchema);
