import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";

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

  if (loading) return <h3>Loading problems...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Problems {patientId && `(Patient ID: ${patientId})`}</h2>
      {problems.length === 0 ? (
        <p>No problems found.</p>
      ) : (
        problems.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "8px",
              background: "#f9f9f9",
            }}
          >
            <p><strong>Patient:</strong> {p.patient?.fullName || p.patient?.username}</p>
            <p><strong>Patient Email:</strong> {p.patient?.email}</p>
            <p><strong>Title:</strong> {p.title}</p>
            <p><strong>Description:</strong> {p.description}</p>
            <p><strong>Status:</strong> {p.status}</p>
            <small>Submitted on: {new Date(p.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default AllProblems;
