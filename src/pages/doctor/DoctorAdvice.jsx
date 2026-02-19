import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import "./css/DoctorAdvice.css";

const DoctorAdvice = () => {
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [loadingAdvice, setLoadingAdvice] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sentAdvice, setSentAdvice] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    patientId: "",
    title: "",
    message: "",
    followUpDate: "",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoadingPatients(true);
        const res = await api.get("/patient");
        const data = res.data?.data?.patients || [];
        setPatients(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load patients");
      } finally {
        setLoadingPatients(false);
      }
    };

    const fetchDoctorAdvice = async () => {
      try {
        setLoadingAdvice(true);
        const res = await api.get("/advice/doctor");
        const data = res.data?.data || [];
        setSentAdvice(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load advice list");
      } finally {
        setLoadingAdvice(false);
      }
    };

    fetchPatients();
    fetchDoctorAdvice();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.patientId || !form.message.trim()) {
      setError("Please select a patient and write advice.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        patient: form.patientId,
        title: form.title.trim(),
        message: form.message.trim(),
        followUpDate: form.followUpDate || null,
      };

      const res = await api.post("/advice", payload);
      const createdAdvice = res.data?.data;

      setSentAdvice((prev) => [createdAdvice, ...prev]);
      setForm((prev) => ({
        ...prev,
        title: "",
        message: "",
        followUpDate: "",
      }));
      setSuccess("Advice added for patient.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create advice");
    } finally {
      setSubmitting(false);
    }
  };

  const adviceSummary = useMemo(() => {
    const withFollowUp = sentAdvice.filter((advice) => Boolean(advice.followUpDate)).length;
    const upcomingFollowUps = sentAdvice.filter((advice) => {
      if (!advice.followUpDate) return false;
      return new Date(advice.followUpDate) >= new Date();
    }).length;

    return {
      total: sentAdvice.length,
      withFollowUp,
      upcomingFollowUps,
    };
  }, [sentAdvice]);

  const filteredAdvice = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return sentAdvice;

    return sentAdvice.filter((advice) => {
      const patientName = (advice.patient?.fullName || advice.patient?.username || "").toLowerCase();
      const title = (advice.title || "").toLowerCase();
      const message = (advice.message || "").toLowerCase();

      return (
        patientName.includes(query) ||
        title.includes(query) ||
        message.includes(query)
      );
    });
  }, [sentAdvice, searchTerm]);

  if (loadingPatients) return <h3 className="doctor-advice-loading">Loading patients...</h3>;

  return (
    <div className="doctor-advice-page">
      <div className="doctor-advice-shell">
        <div className="doctor-advice-hero">
          <div>
            <p className="doctor-advice-kicker">Doctor Workspace</p>
            <h2>Advice to Patients</h2>
            <p className="doctor-advice-subtitle">
              Select a patient and provide clear medical guidance.
            </p>
          </div>
          <div className="doctor-advice-hero-stat">
            <span>{adviceSummary.total}</span>
            <small>Total advice notes</small>
          </div>
        </div>

        <div className="doctor-advice-summary">
          <div className="doctor-advice-summary-card">
            <span>{patients.length}</span>
            <small>Patients loaded</small>
          </div>
          <div className="doctor-advice-summary-card">
            <span>{adviceSummary.withFollowUp}</span>
            <small>With follow-up</small>
          </div>
          <div className="doctor-advice-summary-card">
            <span>{adviceSummary.upcomingFollowUps}</span>
            <small>Upcoming follow-ups</small>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="doctor-advice-form">
          <div className="doctor-advice-form-grid">
            <div className="doctor-advice-field">
              <label htmlFor="patientId" className="doctor-advice-label">
                Patient
              </label>
              <select
                id="patientId"
                name="patientId"
                value={form.patientId}
                onChange={handleChange}
                className="doctor-advice-input"
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.fullName || patient.username} ({patient.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="doctor-advice-field">
              <label htmlFor="followUpDate" className="doctor-advice-label">
                Follow-up Date (optional)
              </label>
              <input
                id="followUpDate"
                name="followUpDate"
                type="date"
                value={form.followUpDate}
                onChange={handleChange}
                className="doctor-advice-input"
              />
            </div>
          </div>

          <div className="doctor-advice-field">
            <label htmlFor="title" className="doctor-advice-label">
              Advice Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Diet and Hydration Plan"
              className="doctor-advice-input"
            />
          </div>

          <div className="doctor-advice-field">
            <label htmlFor="message" className="doctor-advice-label">
              Advice Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Write patient advice here..."
              className="doctor-advice-input doctor-advice-textarea"
            />
          </div>

          {error ? <p className="doctor-advice-error">{error}</p> : null}
          {success ? <p className="doctor-advice-success">{success}</p> : null}

          <button type="submit" className="doctor-advice-submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Advice"}
          </button>
        </form>

        <div className="doctor-advice-list">
          <div className="doctor-advice-list-head">
            <h3>Sent Advice</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="doctor-advice-search"
              placeholder="Search by patient, title, or message"
              aria-label="Search sent advice"
            />
          </div>

          {loadingAdvice ? (
            <p className="doctor-advice-empty">Loading advice history...</p>
          ) : sentAdvice.length === 0 ? (
            <p className="doctor-advice-empty">No advice sent yet.</p>
          ) : filteredAdvice.length === 0 ? (
            <p className="doctor-advice-empty">No advice matches your search.</p>
          ) : (
            <div className="doctor-advice-grid">
              {filteredAdvice.map((advice) => (
                <div key={advice._id} className="doctor-advice-card">
                  <h4>{advice.title || "General Advice"}</h4>
                  <p>
                    <strong>Patient:</strong>{" "}
                    {advice.patient?.fullName || advice.patient?.username || "Unknown Patient"}
                  </p>
                  <p>
                    <strong>Advice:</strong> {advice.message}
                  </p>
                  <p>
                    <strong>Given On:</strong>{" "}
                    {new Date(advice.createdAt).toLocaleString()}
                  </p>
                  {advice.followUpDate ? (
                    <p>
                      <strong>Follow-up:</strong>{" "}
                      {new Date(advice.followUpDate).toLocaleDateString()}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAdvice;
