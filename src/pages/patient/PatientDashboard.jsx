import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import "./css/PatientDashboard.css";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  if (!user) return <h2>Please login first</h2>;
  if (user.role?.toLowerCase() !== "patient")
    return <h2>Access Denied</h2>;

  return (
    <div className="patient-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Welcome {user.username ?? "Patient"} 👋</h1>
        <div className="role">Your role: {user.role ?? "Patient"}</div>
      </div>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search doctors, appointments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <div className="quick-link" onClick={() => navigate("/patient/add-problem")}>
          Add Problem
        </div>
        <div className="quick-link" onClick={() => navigate("/patient/my-problems")}>
          My Problems
        </div>
        <div className="quick-link" onClick={() => navigate("/patient/appointments")}>
          Appointments
        </div>
        <div className="quick-link" onClick={() => navigate("/patient/medicines")}>
          Medicines
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
