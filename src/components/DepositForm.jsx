import React, { useState } from "react";
import axios from "axios";
import "../css/DepositForm.css";
import { useAuth } from "../contexts/AuthContext";

const DepositForm = () => {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("credit");
  const [message, setMessage] = useState("");
  const data = useAuth();
    const customerId = data.customerId;
  const handleSubmit = async (event) => {
    console.log("dtat", customerId);
    event.preventDefault();
    try {
      const response = await axios.post("/api/transactions", {
        customerId,
        amount: parseFloat(amount),
        type:" credit",
      });
      setMessage(
        `Transaction successful! New balance: ${response.data.account.balance}`
      );
    } catch (error) {
      setMessage(error.response.data.message || "Error processing transaction");
    }
  };

  return (
    <div className="deposit-form">
      <h2>Deposit Money</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Transaction Type:</label>
          <div className="radio-group">
            <input
              type="radio"
              id="credit"
              name="transactionType"
              value="credit"
              checked={transactionType === "credit"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="credit">Credit</label>
            <input
              type="radio"
              id="debit"
              name="transactionType"
              value="debit"
              checked={transactionType === "debit"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="debit">Debit</label>
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DepositForm;
