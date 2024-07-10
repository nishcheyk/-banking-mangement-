const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const Document = require('./models/document');
const app = express();
const port = 5000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern_file_upload')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

// Middleware
app.use(cors());
app.use(express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
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
app.post('/upload', (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).send('File size exceeds the 2MB limit.');
                }
            } else if (err.message) {
                return res.status(400).send(err.message);
            }
            return res.status(400).send('File upload failed.');
        }
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const { documentType } = req.body;

        // Save document info to MongoDB
        const newDocument = new Document({
            documentType,
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`
        });

        try {
            await newDocument.save();
            res.json({ message: 'File uploaded successfully!', document: newDocument });
        } catch (err) {
            res.status(500).send('Server error');
        }
    });
});

// Endpoint to get all uploaded documents
app.get('/documents', async (req, res) => {
    try {
        const documents = await Document.find();
        res.json(documents);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
