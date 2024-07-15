const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const Transaction = require("../models/Transaction");

async function generatePDF(customerId) {
    try {
        // Fetch transactions for the customer
        const transactions = await Transaction.find({ customerId });

        // Create a PDF document
        const doc = new PDFDocument();

        // Pipe its output to a file
        const filePath = path.join(__dirname, 'transaction_report.pdf');
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // Add content to the PDF
        doc.fontSize(25).text('Transaction Report', { align: 'center' });

        transactions.forEach(transaction => {
            doc
                .fontSize(12)
                .text(`Transaction ID: ${transaction._id}`, { continued: true })
                .text(`Amount: ${transaction.amount}`, { continued: true })
                .text(`Type: ${transaction.type}`, { continued: true })
                .text(`Date: ${transaction.createdAt}`, { continued: false });
        });

        // Finalize the PDF and end the stream
        doc.end();

        // Return the file path once PDF is generated
        return filePath;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error; // Propagate the error to handle it in the calling function
    }
}

async function sendEmailWithAttachment(toEmail, attachmentPath) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "thaparbankingsolutions@gmail.com",
              pass: "blsfjufhejrhszba",
            },
          });

          // Email options




        // Email options
        const mailOptions = {
            from: 'thaparbankingsolutions@gmail.com',
            to: toEmail,
            subject: 'Your Transaction Report',
            text: 'Please find attached your transaction report.',
            attachments: [
                {
                    filename: path.basename(attachmentPath),
                    path: attachmentPath
                }
            ]
        };

        // Send the email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Propagate the error to handle it in the calling function
    }
}

router.post('/download-statement', async (req, res) => {
    const { customerId, email } = req.body;

    try {
        const filePath = await generatePDF(customerId);
        await sendEmailWithAttachment(email, filePath);

        // Optionally, clean up the generated PDF file
        fs.unlinkSync(filePath);

        res.status(200).send({ message: 'Statement sent to your email.' });
    } catch (error) {
        console.error('Error downloading statement:', error);
        res.status(500).send({ error: 'Failed to send statement.' });
    }
});

module.exports = router;



















