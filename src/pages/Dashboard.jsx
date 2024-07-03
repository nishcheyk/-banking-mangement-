import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Dashboard.css"; // Import your CSS file for styling

const Dashboard = () => {
  const [userName, setUserName] = useState("nishchey");
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2024-07-02",
      description: "Payment received",
      amount: 200,
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-06-30",
      description: "Utility bill",
      amount: -100,
      status: "Completed",
    },
    // Add more transactions
  ]);
  const [customerId, setCustomerId] = useState("66848876161a6b786f251692");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await axios.get(`http://localhost:5050/api/transactions/${customerId}`);
        setTransactions(transactionResponse.data);
        console.log("Transactions:", transactionResponse.data);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [customerId]);


  const handlePayNow = () => {
    // Implement pay now functionality
    console.log("Processing payment...");
  };

  const getAmountClass = (amount) => {
    return amount >= 0 ? "amount positive" : "amount negative";
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="left-content">
          <div className="account-summary">
            <div className="username">{userName}</div>
            <h2>Account Summary</h2>

            {/* Display your account summary details here */}
          </div>

          <div className="pay-now">
            <button onClick={handlePayNow}>Pay Now</button>
          </div>

          <div className="transaction-history">
            <h2>Transaction History</h2>
            <ul>
              {transactions.map((transaction) => (
                <li key={transaction.id}>
              
                  <span className="date">{transaction.updatedAt}</span>
                  <span className="description">{transaction.description}</span>
                  <span className={getAmountClass(transaction.amount)}>₹{transaction.amount}</span>
                  <span className="status">{transaction.type}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="right-nav">
          <h2>Options</h2>
          <ul>
            <li>
              <button>Download Your Statement</button>
            </li>
            {/* Add more options as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
