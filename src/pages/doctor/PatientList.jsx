import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./css/PatientList.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/problems");
      const problems = res.data?.data || [];

      const uniquePatientsMap = new Map();
      problems.forEach((problem) => {
        const patient = problem?.patient;
        if (patient?._id && !uniquePatientsMap.has(patient._id)) {
          uniquePatientsMap.set(patient._id, patient);
        }
      });

      setPatients(Array.from(uniquePatientsMap.values()));
    } catch (err) {
      console.log("Fetch Error:", err);
      setError(err.response?.data?.message || "Failed to load connected patients");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3 className="doctor-patient-list-loading">Loading patients...</h3>;

  return (
    <div className="doctor-patient-list-page">
      <h2>Connected Patients</h2>
      {error ? <p className="doctor-patient-list-error">{error}</p> : null}

      {patients.length === 0 ? (
        <p className="doctor-patient-list-empty">
          Abhi tak koi connected patient nahi hai.
        </p>
      ) : (
        patients.map((patient) => (
          <div key={patient._id} className="doctor-patient-list-card">
            <p>
              <strong>Name:</strong> {patient.fullName || patient.username}
            </p>

            <p>
              <strong>Email:</strong> {patient.email}
            </p>

            <p>
              <strong>Registered on:</strong>{" "}
              {new Date(patient.createdAt).toLocaleDateString()}
            </p>

            <button
              className="doctor-patient-list-btn"
              onClick={() => navigate(`/doctor/problems?patient=${patient._id}`)}
            >
              View Problems
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientList;
