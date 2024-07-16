import React, { useState} from "react";
import axios from "axios";
import "../css/DepositForm.css"; // Ensure you create this CSS file
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader_transaction.jsx"; // Import the Loader component

const DepositForm = () => {
  const [amount, setAmount] = useState("");
  const [type] = useState("credit");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Initialize loading state to false
  const { customerId } = useAuth(); // Assuming useAuth returns an object with customerId



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when starting the deposit

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/transactions`, {
        customerId,
        amount: parseFloat(amount),
        type,
      });
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
