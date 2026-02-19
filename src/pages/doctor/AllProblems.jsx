import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import "./css/AllProblems.css";

const AllProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lastFetchedPatientId = useRef(undefined);

  const patientId = searchParams.get("patient"); // optional filter

  useEffect(() => {
    // Prevent duplicate API calls in React StrictMode (development only)
    if (lastFetchedPatientId.current === patientId) return;
    lastFetchedPatientId.current = patientId;
    fetchProblems();
  }, [patientId]);
     
  const fetchProblems = async () => {
    try {
      const query = patientId ? `?patient=${patientId}` : "";
      const res = await api.get(`/problems${query}`);
      setProblems(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login/doctor");
        return;
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3 className="doctor-problems-loading">Loading problems...</h3>;

  return (
    <section className="doctor-problems-page">
      <div className="doctor-problems-shell">
        <div className="doctor-problems-hero">
          <div>
            <p className="doctor-problems-kicker">Doctor Workspace</p>
            <h2>All Problems</h2>
            <p className="doctor-problems-subtitle">
              Review submitted patient cases and track their current status.
            </p>
            {patientId ? (
              <p className="doctor-problems-filter">
                Filtered by patient: <strong>{patientId}</strong>
              </p>
            ) : null}
          </div>
          <div className="doctor-problems-count-card">
            <span>{problems.length}</span>
            <small>Cases found</small>
          </div>
        </div>

        {problems.length === 0 ? (
          <p className="doctor-problems-empty">No problems found.</p>
        ) : (
          <div className="doctor-problems-grid">
            {problems.map((p) => (
              <article key={p._id} className="doctor-problems-card">
                <div className="doctor-problems-card-head">
                  <h3>{p.title || "Untitled Problem"}</h3>
                  <span className={`doctor-problems-status ${String(p.status || "").toLowerCase()}`}>
                    {p.status || "Unknown"}
                  </span>
                </div>

                <p>
                  <strong>Patient:</strong> {p.patient?.fullName || p.patient?.username || "Unknown Patient"}
                </p>
                <p>
                  <strong>Patient Email:</strong> {p.patient?.email || "Not available"}
                </p>
                <p>
                  <strong>Description:</strong> {p.description || "No description provided."}
                </p>
                <p className="doctor-problems-date">
                  Submitted on: {new Date(p.createdAt).toLocaleDateString()}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProblems;
