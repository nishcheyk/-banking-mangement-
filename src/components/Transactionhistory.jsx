import React from "react";
import "../css/TransactionHistory.css";

const TransactionHistory = ({ transactions }) => {
  const getAmountClass = (amount) => {
    return amount >= 0 ? "amount positive" : "amount negative";
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="transaction-history">
      <h2 className="head_text">Transaction History</h2>
      <div className="head">
        <span className="head serial-number">#</span>
        <span className="head amount">Amount</span>
        <span className="head date">Date</span>
        <span className="head time-tran">Time</span>
        <span className="head status">Status</span>
      </div>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={transaction.id}>
            <span className="serial-number">{index + 1}</span>
            <span className={getAmountClass(transaction.amount)}>
              ₹{transaction.amount}
            </span>
            <span className="date">{formatDate(transaction.updatedAt)}</span>
            <span className="time-tran">{formatTime(transaction.updatedAt)}</span>
            <span className="status">{transaction.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
