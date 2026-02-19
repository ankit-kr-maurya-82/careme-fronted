import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./css/PatientList.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredPatients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return patients;

    return patients.filter((patient) => {
      const name = (patient.fullName || patient.username || "").toLowerCase();
      const email = (patient.email || "").toLowerCase();
      return name.includes(query) || email.includes(query);
    });
  }, [patients, searchTerm]);

  if (loading) return <h3 className="doctor-patient-list-loading">Loading patients...</h3>;

  return (
    <div className="doctor-patient-list-page">
      <div className="doctor-patient-list-shell">
        <div className="doctor-patient-list-hero">
          <div>
            <p className="doctor-patient-list-kicker">Doctor Workspace</p>
            <h2>Connected Patients</h2>
            <p className="doctor-patient-list-sub">
              Review your assigned patients and open their reported problems in one click.
            </p>
          </div>
          <div className="doctor-patient-list-stat">
            <span>{patients.length}</span>
            <small>Total connected</small>
          </div>
        </div>

        <div className="doctor-patient-list-toolbar">
          <input
            type="text"
            className="doctor-patient-list-search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by patient name or email"
            aria-label="Search connected patients"
          />
        </div>

        {error ? <p className="doctor-patient-list-error">{error}</p> : null}

        {patients.length === 0 ? (
          <p className="doctor-patient-list-empty">
            Abhi tak koi connected patient nahi hai.
          </p>
        ) : filteredPatients.length === 0 ? (
          <p className="doctor-patient-list-empty">
            No patient matches your search.
          </p>
        ) : (
          <div className="doctor-patient-list-grid">
            {filteredPatients.map((patient) => (
              <article key={patient._id} className="doctor-patient-list-card">
                <h3>{patient.fullName || patient.username}</h3>

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
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
