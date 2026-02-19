import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import UserContext from "../../context/UserContext";
import "./css/Header.css";

const DoctorHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/"); // ✅ logout ke baad home
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          Careme
        </Link>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={`nav-section ${menuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <NavLink to="/doctor/dashboard" className="nav-link">
              Dashboard
            </NavLink>

            <NavLink to="/doctor/patients" className="nav-link">
              My Patients
            </NavLink>

            <NavLink to="/doctor/appointments" className="nav-link">
              Appointments
            </NavLink>

            <NavLink to="/doctor/advice" className="nav-link">
              Advice
            </NavLink>

            <NavLink to="/doctor/profile" className="nav-link">
              Profile
            </NavLink>
          </ul>

          <div className="user-profile">
            <FaUserCircle className="profile-icon" />
            <span className="username">
              {user?.username} (Doctor)
            </span>

            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DoctorHeader;
