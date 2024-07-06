const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const Transaction = require("../models/Transaction");

async function generatePDF(customerId) {
    try {
        const transactions = await Transaction.find({ customerId });

        const doc = new PDFDocument();
        const filePath = path.join(__dirname, 'transaction_report.pdf');
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        doc.fontSize(25).text('Transaction Report', { align: 'center' }).moveDown();

        doc.fontSize(14).text('Index', 50, doc.y, { continued: true })
            .text('Transaction ID', 100, doc.y, { continued: true })
            .text('Amount', 250, doc.y, { continued: true })
            .text('Type', 350, doc.y, { continued: true })
            .text('Date', 450, doc.y);

        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

        transactions.forEach((transaction, index) => {
            doc.fontSize(12)
                .text(index + 1, 50, doc.y, { continued: true })
                .text(transaction._id, 100, doc.y, { continued: true });

            if (transaction.amount > 0) {
                doc.fillColor('green');
            } else {
                doc.fillColor('red');
            }
            doc.text(transaction.amount, 250, doc.y, { continued: true });

            doc.fillColor('black')
                .text(transaction.type, 350, doc.y, { continued: true })
                .text(transaction.createdAt.toLocaleString(), 450, doc.y);

            doc.moveDown();
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();
        });

        doc.end();

        return filePath;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

async function sendEmailWithAttachment(toEmail, attachmentPath) {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: "Your Transaction Report",
            text: "Dear Customer, Greetings from Thapar Bank! Kindly find attached the monthly statement of your accounts.",
            attachments: [
                {
                    filename: path.basename(attachmentPath),
                    path: attachmentPath,
                },
            ],
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

router.post("/download-statement", async (req, res) => {
    const { customerId, email } = req.body;

    try {
        const filePath = await generatePDF(customerId);
        await sendEmailWithAttachment(email, filePath);

        fs.unlinkSync(filePath);

        res.status(200).send({ message: "Statement sent to your email." });
    } catch (error) {
        console.error("Error downloading statement:", error);
        res.status(500).send({ error: "Failed to send statement." });
    }
});

module.exports = router;
