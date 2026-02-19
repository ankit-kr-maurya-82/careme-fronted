import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import UserContext from "../../context/UserContext";
import "./css/Header.css";

const Header = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowRegister(false);
        setShowLogin(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          Careme
        </Link>

        <button
          type="button"
          className="menu-icon"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {menuOpen && <button className="menu-overlay" onClick={closeMenu} aria-label="Close menu overlay" />}

        <div className={`nav-section ${menuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <NavLink to="/" end className="nav-link" onClick={closeMenu}>
              Home
            </NavLink>

            {!user && (
              <>
                <NavLink to="/about" className="nav-link" onClick={closeMenu}>
                  About
                </NavLink>
                <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
                  Contact
                </NavLink>
                <NavLink to="/team" className="nav-link" onClick={closeMenu}>
                  Developer Team
                </NavLink>
              </>
            )}
          </ul>

          <div className="auth-buttons" ref={dropdownRef}>
            {!user ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn primary"
                    onClick={() => {
                      setShowRegister(!showRegister);
                      setShowLogin(false);
                    }}
                  >
                    Register
                  </button>
                  {showRegister && (
                    <div className="dropdown-menu">
                      <Link to="/register/patient" onClick={closeMenu}>
                        Patient Register
                      </Link>
                      <Link to="/register/doctor" onClick={closeMenu}>
                        Doctor Register
                      </Link>
                    </div>
                  )}
                </div>

                <div className="dropdown">
                  <button
                    className="btn outline"
                    onClick={() => {
                      setShowLogin(!showLogin);
                      setShowRegister(false);
                    }}
                  >
                    Login
                  </button>
                  {showLogin && (
                    <div className="dropdown-menu">
                      <Link to="/login/patient" onClick={closeMenu}>
                        Patient Login
                      </Link>
                      <Link to="/login/doctor" onClick={closeMenu}>
                        Doctor Login
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="user-profile">
                <FaUserCircle className="profile-icon" />
                <span className="username">
                  {user.username} ({user.role === "doctor" ? "Doctor" : "Patient"})
                </span>
                <button className="btn logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
