import React, { useContext, useEffect, useMemo, useState } from "react";
import UserContext from "../../context/UserContext";
import { getDoctorAppointments, updateAppointmentStatus } from "../../utils/appointments";
import "./css/DoctorAppointments.css";

const DoctorAppointments = () => {
  const { user } = useContext(UserContext);
  const [filter, setFilter] = useState("All");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDoctorAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?._id) return;
    loadAppointments();
  }, [user?._id]);

  const filteredAppointments = useMemo(() => {
    if (filter === "All") return appointments;
    return appointments.filter((appointment) => appointment.status === filter);
  }, [appointments, filter]);

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await updateAppointmentStatus(appointmentId, status);
      loadAppointments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  if (!user) return <h2>Please login first</h2>;
  if (loading) return <h3 className="doctor-appointments-loading">Loading appointments...</h3>;

  return (
    <section className="doctor-appointments-page">
      <div className="doctor-appointments-head">
        <h2>Appointments</h2>
        <span className="doctor-appointments-count">
          {filteredAppointments.length} appointment
          {filteredAppointments.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="doctor-appointments-filters">
        {["All", "Scheduled", "Confirmed", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            type="button"
            className={`doctor-appointments-filter-btn ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {error ? <p className="doctor-appointments-error">{error}</p> : null}

      {filteredAppointments.length === 0 ? (
        <div className="doctor-appointments-empty">
          <h3>No appointments found</h3>
          <p>Booked appointments from patients will appear here.</p>
        </div>
      ) : (
        <div className="doctor-appointments-list">
          {filteredAppointments.map((appointment) => (
            <article key={appointment._id} className="doctor-appointments-card">
              <div className="doctor-appointments-card-head">
                <h3>{appointment.patient?.fullName || appointment.patient?.username || "Patient"}</h3>
                <span
                  className={`doctor-appointments-status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="doctor-appointments-grid">
                <p>
                  <span>Date</span>
                  <strong>{new Date(appointment.dateTime).toLocaleDateString()}</strong>
                </p>
                <p>
                  <span>Time</span>
                  <strong>
                    {new Date(appointment.dateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </strong>
                </p>
                <p>
                  <span>Patient Name</span>
                  <strong>{appointment.patient?.fullName || appointment.patient?.username || "Patient"}</strong>
                </p>
                <p>
                  <span>Specialty</span>
                  <strong>{user?.specialty || "General"}</strong>
                </p>
              </div>

              {appointment?.reason ? (
                <p className="doctor-appointments-reason">
                  <span>Reason:</span> {appointment.reason}
                </p>
              ) : null}

              <div className="doctor-appointments-actions">
                {appointment.status === "Scheduled" ? (
                  <button
                    type="button"
                    className="doctor-appointments-confirm-btn"
                    onClick={() => handleStatusChange(appointment._id, "Confirmed")}
                  >
                    Confirm
                  </button>
                ) : null}

                {(appointment.status === "Scheduled" || appointment.status === "Confirmed") ? (
                  <button
                    type="button"
                    className="doctor-appointments-complete-btn"
                    onClick={() => handleStatusChange(appointment._id, "Completed")}
                  >
                    Mark Completed
                  </button>
                ) : null}

                {appointment.status !== "Cancelled" && appointment.status !== "Completed" ? (
                  <button
                    type="button"
                    className="doctor-appointments-cancel-btn"
                    onClick={() => handleStatusChange(appointment._id, "Cancelled")}
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorAppointments;
