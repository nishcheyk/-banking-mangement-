import React, { useState, useEffect } from "react";
import "../css/TransactionHistory.css";
import Loader from "../components/Loader_transaction.jsx";
const TransactionHistory = ({ transactions }) => {
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const getAmountClass = (amount, type) => {
    return type === "credit" ? "amount positive credit" : "amount negative debit";
  };

  const getStatusClass = (type) => {
    return type === "credit" ? "status positive" : "status negative";
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

  const formatAmount = (amount) => {
    return Math.abs(amount).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="transaction-history">
      <h5 className="head_text">Transaction History</h5>
      {loading ? (
        <div className="loadermain">

          <Loader/>


        </div>
      ) : (
        <>
          <div className="head">
            <span className="serial-number">#</span>
            <span className="amo">Amount</span>
            <span className="date">Date</span>
            <span className="time-tran">Time</span>
            <span className="status">Status</span>
          </div>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={transaction.id}>
                <span className="serial-number">{index + 1}</span>
                <span className={getAmountClass(transaction.amount, transaction.type)}>
                  {formatAmount(transaction.amount)}
                </span>
                <span className="date">{formatDate(transaction.updatedAt)}</span>
                <span className="time-tran">{formatTime(transaction.updatedAt)}</span>
                <span className={getStatusClass(transaction.type)}>{transaction.type}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
