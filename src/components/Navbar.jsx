import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../css/navbar.css";

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
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-5">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            {!isLoggedIn ? (
              <li className="nav-item mx-5">
                <a className="nav-link" href="/login" onClick={handleLoginClick}>
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
                  <a className="dropdown-item" >
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" >
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" >
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <div className="InputContainer">
            <input
              placeholder="Search.."
              id="input"
              className="input"
              name="text"
              type="text"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
