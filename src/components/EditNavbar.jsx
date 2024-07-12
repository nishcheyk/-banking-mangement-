import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../css/navbar.css";
import logo from "../javascript-39406.png"; // Adjust the path to your logo

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary mb-5"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isLoggedIn ? (
              <li className="nav-item mx-4">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
            ) : (
              <li className="nav-item mx-4">
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </li>
            )}
            {!isLoggedIn ? (
              <li className="nav-item mx-5">
                <a
                  className="nav-link"
                  href="/login"
                  onClick={handleLoginClick}
                >
                  Login
                </a>
              </li>
            ) : (
              <li className="nav-item mx-5">
                <a className="nav-link" href="/" onClick={handleLogoutClick}>
                  Logout
                </a>
              </li>
            )}
            <li className="nav-item dropdown mx-5">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More Actions
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#!">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <form className="form">
            <label htmlFor="search">
              <input
                required
                autoComplete="off"
                placeholder="Search"
                id="search"
                type="text"
              />
              <div className="icon-search">
                <svg
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="swap-on"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <svg
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="swap-off"
                >
                  <path
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
              <button type="reset" className="close-btn">
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </label>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
