
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Function to generate PDF from transaction data
const generatePDF = (customerId, balance, transactions) => {
  const doc = new PDFDocument();
  const fileName = `TransactionStatement_${customerId}.pdf`;
  const filePath = `./pdfs/${fileName}`; // Adjust path as needed

  doc.pipe(fs.createWriteStream(filePath));

  // Add content to PDF
  doc.fontSize(20).text(`Customer ID: ${customerId}`);
  doc.fontSize(16).text(`Balance: $${balance}`);
  doc.moveDown();

  doc.fontSize(18).text('Transaction History');
  doc.moveDown();

  transactions.forEach((transaction) => {
    doc.fontSize(12).text(`Date: ${transaction.date}`);
    doc.text(`Description: ${transaction.description}`);
    doc.text(`Amount: $${transaction.amount}`);
    doc.text(`Status: ${transaction.status}`);
    doc.moveDown();
  });

  doc.end();

  return fileName;
};

module.exports = generatePDF;
