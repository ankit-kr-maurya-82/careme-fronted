import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import UserContext from "../../context/UserContext";
import { createAppointment } from "../../utils/appointments";
import "./css/DoctorList.css";

const DoctorList = () => {
  const { user } = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingDoctorId, setBookingDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await api.get("/doctors");
        setDoctors(res.data?.data?.doctors || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchText) {
      setSearchText(urlSearch);
    }
  }, [searchParams, searchText]);

  const filteredDoctors = useMemo(() => {
    const term = searchText.trim().toLowerCase();
    if (!term) return doctors;

    return doctors.filter((doctor) => {
      const fullName = doctor.fullName || doctor.username || "";
      const specialty = doctor.specialty || "";
      const email = doctor.email || "";

      return [fullName, specialty, email].some((value) =>
        value.toLowerCase().includes(term)
      );
    });
  }, [doctors, searchText]);

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    setSearchText(nextValue);

    const trimmed = nextValue.trim();
    if (trimmed) {
      setSearchParams({ search: nextValue });
      return;
    }

    setSearchParams({});
  };

  const clearSearch = () => {
    setSearchText("");
    setSearchParams({});
  };

  const resetBookingForm = () => {
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentReason("");
  };

  const handleBookClick = (doctorId) => {
    setBookingMessage("");
    setBookingError("");

    if (bookingDoctorId === doctorId) {
      setBookingDoctorId("");
      resetBookingForm();
      return;
    }

    setBookingDoctorId(doctorId);
    resetBookingForm();
  };

  const handleBookAppointment = async (doctor) => {
    if (!appointmentDate || !appointmentTime) {
      setBookingError("Please choose both date and time.");
      setBookingMessage("");
      return;
    }

    const chosenDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    const now = new Date();

    if (Number.isNaN(chosenDateTime.getTime())) {
      setBookingError("Please select a valid appointment date and time.");
      setBookingMessage("");
      return;
    }

    if (chosenDateTime < now) {
      setBookingError("Appointment must be scheduled in the future.");
      setBookingMessage("");
      return;
    }

    try {
      setBookingSubmitting(true);
      await createAppointment({
        doctorId: doctor._id || doctor.id || "",
        date: appointmentDate,
        time: appointmentTime,
        reason: appointmentReason,
      });

      setBookingError("");
      setBookingMessage("Appointment booked. Check My Appointments.");
      setBookingDoctorId("");
      resetBookingForm();
    } catch (err) {
      setBookingMessage("");
      setBookingError(err.response?.data?.message || "Failed to book appointment");
    } finally {
      setBookingSubmitting(false);
    }
  };

  if (loading) return <h3 className="patient-doctor-list-loading">Loading doctors...</h3>;

  return (
    <section className="patient-doctor-list-page">
      <div className="patient-doctor-list-hero">
        <div>
          <h2>Find Your Doctor</h2>
          <p className="patient-doctor-list-subtitle">
            Browse specialists and filter by name, specialty, or email.
          </p>
        </div>
        <span className="patient-doctor-list-count">
          {filteredDoctors.length} result{filteredDoctors.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="patient-doctor-list-toolbar">
        <input
          type="text"
          className="patient-doctor-list-search"
          placeholder="Search by name, specialty, or email"
          value={searchText}
          onChange={handleSearchChange}
          aria-label="Search doctors"
        />
        {searchText.trim() ? (
          <button
            type="button"
            className="patient-doctor-list-clear-btn"
            onClick={clearSearch}
          >
            Clear
          </button>
        ) : null}
      </div>

      {error ? <p className="patient-doctor-list-error">{error}</p> : null}

      {filteredDoctors.length === 0 ? (
        <div className="patient-doctor-list-empty">
          <h3>No matching doctors</h3>
          <p>Try a different name, specialty, or clear your search.</p>
        </div>
      ) : (
        <div className="patient-doctor-list-grid">
          {filteredDoctors.map((doctor) => (
            <article key={doctor._id} className="patient-doctor-list-card">
              <div className="patient-doctor-list-card-head">
                <span className="patient-doctor-list-avatar">
                  {(doctor.fullName || doctor.username || "D")
                    .trim()
                    .charAt(0)
                    .toUpperCase()}
                </span>
                <div>
                  <h3>{doctor.fullName || doctor.username}</h3>
                  <span className="patient-doctor-list-specialty">
                    {doctor.specialty || "General"}
                  </span>
                </div>
              </div>

              <div className="patient-doctor-list-meta">
                <p>
                  <span>Email</span>
                  <strong>{doctor.email}</strong>
                </p>
                <p>
                  <span>Phone</span>
                  <strong>{doctor.phone || "Not provided"}</strong>
                </p>
              </div>

              <div className="patient-doctor-list-actions">
                <button
                  type="button"
                  className="patient-doctor-list-book-btn"
                  onClick={() => handleBookClick(doctor._id)}
                >
                  {bookingDoctorId === doctor._id ? "Close" : "Book Appointment"}
                </button>
              </div>

              {bookingDoctorId === doctor._id ? (
                <div className="patient-doctor-list-book-panel">
                  <label>
                    Date
                    <input
                      type="date"
                      value={appointmentDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(event) => setAppointmentDate(event.target.value)}
                    />
                  </label>
                  <label>
                    Time
                    <input
                      type="time"
                      value={appointmentTime}
                      onChange={(event) => setAppointmentTime(event.target.value)}
                    />
                  </label>
                  <label>
                    Reason (optional)
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your concern"
                      value={appointmentReason}
                      onChange={(event) => setAppointmentReason(event.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    className="patient-doctor-list-confirm-btn"
                    onClick={() => handleBookAppointment(doctor)}
                    disabled={bookingSubmitting}
                  >
                    {bookingSubmitting ? "Booking..." : "Confirm Appointment"}
                  </button>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}

      {bookingMessage ? <p className="patient-doctor-list-success">{bookingMessage}</p> : null}
      {bookingError ? <p className="patient-doctor-list-error">{bookingError}</p> : null}
    </section>
  );
};

export default DoctorList;
