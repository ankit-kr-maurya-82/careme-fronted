import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiX,
  FiMenu,
  FiHome,
  FiBookOpen,
  FiUser,
  FiFileText,
  FiBarChart2,
  FiUsers,
} from "react-icons/fi";
import "./css/PatientSidebar.css";

const MOBILE_BREAKPOINT = 900;

const PatientSidebar = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobile && isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <button className="sidebar-toggle" onClick={() => setIsOpen(true)} aria-label="Open sidebar">
          <FiMenu size={24} />
        </button>
      )}

      {isMobile && isOpen && <button className="sidebar-overlay" onClick={closeSidebar} aria-label="Close sidebar overlay" />}

      <aside className={`patient-sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <Link to="/patient/dashboard" className="sidebar-brand" onClick={closeSidebar}>
            CareMe
          </Link>
          <button className="close-btn" onClick={closeSidebar} aria-label="Close sidebar">
            <FiX size={22} />
          </button>
        </div>

        <ul className="menu-list">
          <li>
            <NavLink to="/patient/dashboard" onClick={closeSidebar}>
              <FiHome className="menu-icon" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/patient/appointments" onClick={closeSidebar}>
              <FiBookOpen className="menu-icon" />
              Appointments
            </NavLink>
          </li>
          <li>
            <NavLink to="/patient/profile" onClick={closeSidebar}>
              <FiUser className="menu-icon" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/patient/add-problem" onClick={closeSidebar}>
              <FiFileText className="menu-icon" />
              Add Problem
            </NavLink>
          </li>
          <li>
            <NavLink to="/patient/advice" onClick={closeSidebar}>
              <FiFileText className="menu-icon" />
              Doctor Advice
            </NavLink>
          </li>
          <li>
            <NavLink to="/patient/reminder" onClick={closeSidebar}>
              <FiBarChart2 className="menu-icon" />
              Reminders
            </NavLink>
          </li>
          <li>
            <NavLink to="/patient/medicines" onClick={closeSidebar}>
              <FiBookOpen className="menu-icon" />
              Medicine
            </NavLink>
          </li>
          <li>
            <NavLink to="/patient/my-problems" onClick={closeSidebar}>
              <FiFileText className="menu-icon" />
              My Problems
            </NavLink>
          </li>
        </ul>

        <div className="menu-divider" />

        <div className="menu-section-title">Following</div>
        <ul className="menu-list">
          <li>
            <NavLink to="/patient/doctors" onClick={closeSidebar}>
              <FiUsers className="menu-icon" />
              Find Doctors
              <span className="status-dot" />
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default PatientSidebar;
