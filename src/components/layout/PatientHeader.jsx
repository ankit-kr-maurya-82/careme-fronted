import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import UserContext from "../../context/UserContext";
import "./css/PatientHeader.css";

const PatientHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">
            Careme
          </Link>
        </div>

        {/* <div className="nav-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div> */}

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={`nav-section ${menuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <NavLink to="/patient/dashboard" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/patient/appointments" className="nav-link">
              Appointments
            </NavLink>
            <NavLink to="/patient/profile" className="nav-link">
              Profile
            </NavLink>
          </ul>

          <div className="user-profile">
            <FaUserCircle className="profile-icon" />
            <span className="username">{user?.username}</span>
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default PatientHeader;
