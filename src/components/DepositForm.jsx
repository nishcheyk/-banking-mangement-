import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/DepositForm.css"; // Ensure you create this CSS file
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader_transaction.jsx"; // Import the Loader component

const DepositForm = () => {
  const [amount, setAmount] = useState("");
  const [type, setTransactionType] = useState("credit");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // State to manage loading
  const data = useAuth();
  const customerId = data.customerId;

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when starting the deposit

    // Simulate delay before API call
    setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:5050/api/transactions/",
          {
            customerId,
            amount: parseFloat(amount),
            type,
          }
        );
        setMessage(
          `Transaction successful! New balance: ${response.data.account.balance}`
        );
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Error processing transaction"
        );
      } finally {
        setLoading(false); // Set loading to false after API call completes
      }
    }, 1500); // Simulate delay of 1500 milliseconds (1.5 seconds)
  };

  return (
    <>
      <h2 className="tr-head-text">Deposit Money</h2>
      <div className="tr-loadermain">
        {loading && <div className="tr-loader-container"><Loader /></div>}
      </div>
      {!loading && (
        <div className="tr-deposit-form">
          <form onSubmit={handleSubmit}>
            <div className="tr-form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="tr-submit-btn" disabled={loading}>
              Submit
            </button>
          </form>
          {message && <p className="tr-message">{message}</p>}
        </div>
      )}
    </>
  );
};

export default DepositForm;
