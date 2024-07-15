import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Transfer.css";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader_transaction.jsx";

const Transfer = () => {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const data = useAuth();
  const customerId = data.customerId;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleTransfer = async (event) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/transactions/transfer`,
          {
            receiverId,
            senderId: customerId,
            amount: parseFloat(amount),
          }
        );
        setMessage("Transfer successful!");
      } catch (error) {
        setMessage(
          "Error processing transfer: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <>
      <h2 className="tr-head-text">Transfer Money</h2>
      <div className="tr-loadermain">
        {loading && (
          <div className="tr-loader-container">
            <Loader />
          </div>
        )}
      </div>
      {!loading && (
        <div className="tr-container">
          <form onSubmit={handleTransfer}>
            <div className="tr-form-group">
              <label>Receiver ID</label>
              <input
                type="text"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                required
              />
            </div>
            <div className="tr-form-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              Transfer
            </button>
            {message && <p>{message}</p>}
          </form>
        </div>
      )}
    </>
  );
};

export default Transfer;
