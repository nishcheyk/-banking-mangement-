import React from "react";
import axios from "axios";
import "../css/Dashboard.css"; // Import your CSS file for styling

const Dashboard = () => {
  const userName = "John Doe"; // Replace with actual user data
  const balance = 1000; // Replace with actual account data
  const credit = 500;
  const debit = 200;
  const customerId = "customer123"; // Replace with actual logged-in user's customer ID

  const transactions = [
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
    {
      id: 2,
      date: "2024-06-30",
      description: "Utility bill",
      amount: -100,
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-06-30",
      description: "Utility bill",
      amount: 100,
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-06-30",
      description: "Utility bill",
      amount: 100,
      status: "Completed",
    },

    // Add more transactions
  ];

  const handlePayNow = () => {
    // Implement pay now functionality
    console.log("Processing payment...");
  };

  const handleDownloadStatement = async () => {
    try {
      // Make GET request to download statement
      const response = await axios.get(`/api/transactions/generateStatement/${customerId}`, {
        responseType: "blob", // Ensure response is treated as blob (for binary data)
      });

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary <a> element to initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "statement.pdf");
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading statement:", error);
      // Handle error: display an error message or alert
    }
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
            <div className="balance">Balance: ₹{balance}</div>
            <div className="credit">Credit: ₹{credit}</div>
            <div className="debit">Debit: ₹{debit}</div>
          </div>

          <div className="pay-now">
            <button onClick={handlePayNow}>Pay Now</button>
          </div>

          <div className="transaction-history">
            <h2>Transaction History</h2>
            <ul>
              {transactions.map((transaction) => (
                <li key={transaction.id}>
                  <span className="date">{transaction.date}</span>
                  <span className="description">{transaction.description}</span>
                  <span className={getAmountClass(transaction.amount)}>₹{transaction.amount}</span>
                  <span className="status">{transaction.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="right-nav">
          <h2>Options</h2>
          <ul>
            <li>
              <button onClick={handleDownloadStatement}>Download Your Statement</button>
            </li>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
