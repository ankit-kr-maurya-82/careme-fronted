import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./css/AddProblem.css";

const initialFormData = {
  doctor: "",
  title: "",
  description: "",
  severity: "",
  date: new Date().toISOString().slice(0, 10),
};

const AddProblem = () => {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const res = await api.get("/doctors");
        setDoctors(res.data?.data?.doctors || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load doctors");
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.post("/problems", formData);
      alert("Problem added successfully");
      setFormData(initialFormData);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
      } else {
        const message = err.response?.data?.message || "Error occurred";
        setError(message);
        alert(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-problem-wrapper">
      <div className="add-problem-container">
        <h2>Add Medical Problem</h2>
        {error ? <p className="add-problem-help-text">{error}</p> : null}

        <form onSubmit={handleSubmit}>
          <label htmlFor="doctor">Assign Doctor</label>
          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
            disabled={loadingDoctors || submitting}
          >
            <option value="">
              {loadingDoctors ? "Loading doctors..." : "Select doctor"}
            </option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.fullName || doctor.username} ({doctor.specialty || "General"})
              </option>
            ))}
          </select>

          <input
            type="text"
            name="title"
            placeholder="Problem Title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={submitting}
          />

          <textarea
            name="description"
            placeholder="Describe your problem..."
            value={formData.description}
            onChange={handleChange}
            required
            disabled={submitting}
          />

          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            required
            disabled={submitting}
          >
            <option value="">Select Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            disabled={submitting}
          />

          <button type="submit" disabled={submitting || loadingDoctors}>
            {submitting ? "Submitting..." : "Submit Problem"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProblem;
