import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Dashboard.css";
import TransactionHistory from "../components/Transactionhistory";
import { useAuth } from "../contexts/AuthContext";
import DepositForm from "../components/DepositForm";
import Transfer from "../components/Transfer";

const Dashboard = () => {
  const { email, customerId, username } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeButton, setActiveButton] = useState("transaction");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/accounts/${customerId}`
        );
        setBalance(balanceResponse.data.balance);
        const transactionResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/transactions/${customerId}`
        );
        setTransactions(transactionResponse.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();

    // Update balance and transactions every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [customerId]);

  function formatDateTime(date) {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} ${formattedTime}`;
  }

  const handleDownloadStatement = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/download-statement`,
        {
          customerId,
          email,
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to download statement.");
    }
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="dashboard-container">
      {loading ? (
        <div className='l'>
        <div className="loader">

            <ul>
              {[...Array(5)].map((_, index) => (
                <li key={index}>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                  </svg>
                </li>
              ))}
            </ul>
          </div>
          <span>Loading</span>
        </div>
      ) : (
        <div className="dashboard-content">
          <div className="left-content">
            <div className="account-summary">
              <div className="dashboard-card">
                <div className="content">
                  <div className="username">Welcome {username}</div>
                  <div className="customer-id">
                    <span className="label">Customer ID:</span> {customerId}
                  </div>
                  <div className="balance">
                    <span className="balance-label">Available Balance: ₹ </span>{" "}
                    {balance}
                  </div>
                  <div className="time">{formatDateTime(currentTime)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="right-nav">
              <ul>
                <div className="side_menu">
                  <button
                    className={`side_button ${
                      activeButton === "transaction" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("transaction")}
                  >
                    Transaction
                  </button>
                  <button
                    className={`side_button ${
                      activeButton === "transfer" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("transfer")}
                  >
                    Transfer funds
                  </button>
                  <button
                    className={`side_button ${
                      activeButton === "deposit" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("deposit")}
                  >
                    Deposit fund
                  </button>
                  <button
                    className="side_button"
                    onClick={() => {
                      handleDownloadStatement();
                    }}
                  >
                    Download Your Statement
                  </button>
                </div>
              </ul>
            </div>
            <div className="main-content">
              {activeButton === "transaction" && (
                <TransactionHistory transactions={transactions} />
              )}
              {activeButton === "deposit" && <DepositForm />}
              {activeButton === "transfer" && <Transfer />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
