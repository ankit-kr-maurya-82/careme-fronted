import React, { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import UserContext from "../../context/UserContext";
import DoctorEditProfileModal from "./DoctorEditProfileModal";
import "./css/DoctorProfile.css";

const DoctorProfile = () => {
  const { user } = useContext(UserContext);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/doctors/${user?._id}`);
        setDoctor(response.data?.data?.doctor || null);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchDoctorProfile();
  }, [user?._id]);

  if (!user) {
    return (
      <div className="doctor-profile-page">
        <div className="doctor-profile-shell">
          <p className="doctor-profile-feedback">Please login first.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="doctor-profile-page">
        <div className="doctor-profile-shell">
          <p className="doctor-profile-feedback">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctor-profile-page">
        <div className="doctor-profile-shell">
          <p className="doctor-profile-feedback doctor-profile-error">{error}</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="doctor-profile-page">
        <div className="doctor-profile-shell">
          <p className="doctor-profile-feedback">No doctor data found.</p>
        </div>
      </div>
    );
  }

  const profileFields = [
    { label: "Full Name", value: doctor.fullName || "Not set" },
    { label: "Username", value: doctor.username || "Not set" },
    { label: "Email", value: doctor.email || "Not set" },
    { label: "Specialty", value: doctor.specialty || "Not set" },
    { label: "Phone", value: doctor.phone || "Not set" },
    { label: "Gender", value: doctor.gender || "Not set" },
  ];

  return (
    <div className="doctor-profile-page">
      <div className="doctor-profile-shell">
        <div className="doctor-profile-hero">
          <div>
            <p className="doctor-profile-kicker">Doctor Workspace</p>
            <h2 className="doctor-profile-title">My Profile</h2>
            <p className="doctor-profile-subtitle">
              Keep your details updated so patients receive accurate information.
            </p>
          </div>

          <div className="doctor-profile-avatar-card">
            <div className="doctor-avatar">
              {(doctor.fullName || doctor.username || "D").charAt(0).toUpperCase()}
            </div>
            <p>{doctor.fullName || doctor.username || "Doctor"}</p>
          </div>
        </div>

        <div className="doctor-profile-summary">
          <div className="doctor-profile-summary-card">
            <span>{doctor.specialty || "General"}</span>
            <small>Specialty</small>
          </div>
          <div className="doctor-profile-summary-card">
            <span>{doctor.gender || "Not set"}</span>
            <small>Gender</small>
          </div>
          <div className="doctor-profile-summary-card">
            <span>{doctor.phone ? "Added" : "Missing"}</span>
            <small>Phone status</small>
          </div>
        </div>

        <div className="doctor-card">
          <div className="doctor-profile-info-grid">
            {profileFields.map((field) => (
              <div key={field.label} className="doctor-profile-info-item">
                <small>{field.label}</small>
                <p>{field.value}</p>
              </div>
            ))}
          </div>

          <button className="doctor-profile-btn" onClick={() => setShowModal(true)}>
            Edit Profile
          </button>
        </div>
      </div>

      {showModal ? (
        <DoctorEditProfileModal
          doctor={doctor}
          onClose={() => setShowModal(false)}
          onUpdated={(updatedDoctor) => setDoctor(updatedDoctor)}
        />
      ) : null}
    </div>
  );
};

export default DoctorProfile;
