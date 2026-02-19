import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { cancelAppointment, getPatientAppointments } from "../../utils/appointments";
import "./css/PatientAppointments.css";

const PatientAppointments = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPatientAppointments();
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

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      loadAppointments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel appointment");
    }
  };

  if (!user) return <h2>Please login first</h2>;
  if (loading) return <h3 className="patient-appointments-loading">Loading appointments...</h3>;

  return (
    <section className="patient-appointments-page">
      <div className="patient-appointments-head">
        <h2>My Appointments</h2>
        <span className="patient-appointments-count">
          {appointments.length} appointment{appointments.length === 1 ? "" : "s"}
        </span>
      </div>

      {error ? <p className="patient-appointments-error">{error}</p> : null}

      {appointments.length === 0 ? (
        <div className="patient-appointments-empty">
          <h3>No appointments yet</h3>
          <p>Go to Find Doctors and book your first appointment.</p>
        </div>
      ) : (
        <div className="patient-appointments-list">
          {appointments.map((appointment) => (
            <article key={appointment._id} className="patient-appointments-card">
              <div className="patient-appointments-card-head">
                <h3>{appointment.doctor?.fullName || appointment.doctor?.username || "Doctor"}</h3>
                <span
                  className={`patient-appointments-status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="patient-appointments-grid">
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
                  <span>Specialty</span>
                  <strong>{appointment.doctor?.specialty || "General"}</strong>
                </p>
                <p>
                  <span>Email</span>
                  <strong>{appointment.doctor?.email || "Not provided"}</strong>
                </p>
              </div>

              {appointment.reason ? (
                <p className="patient-appointments-reason">
                  <span>Reason:</span> {appointment.reason}
                </p>
              ) : null}

              {appointment.status !== "Cancelled" ? (
                <button
                  type="button"
                  className="patient-appointments-cancel-btn"
                  onClick={() => handleCancel(appointment._id)}
                >
                  Cancel Appointment
                </button>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PatientAppointments;
