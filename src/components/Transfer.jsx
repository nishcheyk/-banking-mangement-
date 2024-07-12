import React, { useState } from "react";
import axios from "axios";
import "../css/Transfer.css"; // Ensure you create this CSS file
import { useAuth } from "../contexts/AuthContext";
const Transfer = () => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const data = useAuth();
  const customerId = data.customerId;

  const handleTransfer = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/api/transactions/transfer", {
        receiverId,
        senderId:customerId,
        amount: parseFloat(amount),
      });
      setMessage("Transfer successful!");
    } catch (error) {
      setMessage("Error processing transfer: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="transfer-container">
      <form onSubmit={handleTransfer}>
        <h2>Transfer Money</h2>

        <div className="form-group">
          <label>Receiver ID</label>
          <input
            type="text"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Transfer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Transfer;
