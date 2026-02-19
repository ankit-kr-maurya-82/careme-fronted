import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import UserContext from "../../context/UserContext";
import "./css/DoctorDashboard.css";

const DoctorDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasConnectedPatients, setHasConnectedPatients] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user?._id) return;
 
      try {
        setLoading(true);
        setError("");

        const problemsRes = await api.get("/problems");
        const assignedProblems = problemsRes.data?.data || [];
        const connectedPatients = new Set(
          assignedProblems
            .map((problem) => problem?.patient?._id || problem?.patient)
            .filter(Boolean)
        );
        setHasConnectedPatients(connectedPatients.size > 0);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user?._id]);

  if (!user) return <h2>Please login first</h2>;
  if (loading) return <h3 className="doctor-dashboard-loading">Loading dashboard...</h3>;

  return (
    <div className="doctor-dashboard">
      <div>
        <h1>Welcome Dr. {user?.fullName}</h1>
        <p>Email: {user?.email}</p>
        <p>Specialty: {user?.specialty}</p>
        {error ? <p className="doctor-dashboard-error">{error}</p> : null}
        <hr />

        <div className="dashboard-buttons">
          <button onClick={() => navigate("/doctor/patients")}>Patient List</button>
          <button onClick={() => navigate("/doctor/appointments")}>Appointments</button>
          <button onClick={() => navigate("/doctor/problems")}>View Problems</button>
          <button onClick={() => navigate("/doctor/profile")}>Update Profile</button>
        </div>

        {!hasConnectedPatients ? (
          <section className="doctor-dashboard-patient-section">
            <h2>No Connected Patients Yet</h2>
            <p>
              Jab tak patient aapse connect nahi hota (problem assign nahi hoti),
              dashboard me patient list show nahi hogi.
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default DoctorDashboard;
