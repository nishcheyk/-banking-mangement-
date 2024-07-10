// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Document = require('../models/Documents');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPG, and PNG are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: fileFilter
});

// Endpoint to handle file upload
router.post('/upload', (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).send('File size exceeds the 2MB limit.');
            }
            return res.status(400).send(err.message || 'File upload failed.');
        }
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const { documentType } = req.body;

        const newDocument = new Document({
            documentType,
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`
        });

        try {
            await newDocument.save();
            res.json({
                message: 'File uploaded successfully!',
                document: newDocument
            });
        } catch (err) {
            res.status(500).send('Server error');
        }
    });
});

// Endpoint to get all uploaded documents
router.get('/documents', async (req, res) => {
    try {
        const documents = await Document.find();
        res.json(documents);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
