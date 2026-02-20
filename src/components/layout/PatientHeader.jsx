import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import UserContext from "../../context/UserContext";
import userAvatar from "../../assets/user.png";
import "./css/PatientHeader.css";

const PatientHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const displayName = user?.fullName || user?.username || "Patient";
  const avatarInitial = displayName.charAt(0).toUpperCase();
  const avatarSrc = user?.avatar || userAvatar;

  useEffect(() => {
    setAvatarLoadFailed(false);
  }, [user?.avatar]);

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
            {!avatarLoadFailed ? (
              <img
                src={avatarSrc}
                alt={`${displayName} avatar`}
                className="profile-avatar"
                onError={() => setAvatarLoadFailed(true)}
              />
            ) : (
              <div className="profile-avatar-fallback" aria-hidden="true">
                {avatarInitial}
              </div>
            )}
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
