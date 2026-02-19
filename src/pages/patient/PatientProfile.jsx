import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import EditProfileModal from "./EditProfileModal";
import "./css/PatientProfile.css";

const PatientProfile = () => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  if (!user) {
    return (
      <section className="patient-profile-page">
        <div className="patient-profile-shell">
          <p className="patient-profile-feedback">Please login first.</p>
        </div>
      </section>
    );
  }

  const profileFields = [
    { label: "Username", value: user.username || "Not set" },
    { label: "Full Name", value: user.fullName || "Not set" },
    { label: "Email", value: user.email || "Not set" },
    { label: "Role", value: user.role || "patient" },
    { label: "Gender", value: user.gender || "Not set" },
  ];

  return (
    <section className="patient-profile-page">
      <div className="patient-profile-shell">
        <div className="patient-profile-hero">
          <div>
            <p className="patient-profile-kicker">Patient Account</p>
            <h2 className="patient-profile-title">My Profile</h2>
            <p className="patient-profile-subtitle">
              Keep your profile details updated to receive accurate care and communication.
            </p>
          </div>

          <div className="patient-profile-avatar-card">
            <div className="patient-profile-avatar">
              {(user.fullName || user.username || "P").charAt(0).toUpperCase()}
            </div>
            <p>{user.fullName || user.username || "Patient"}</p>
            <small>{user.email || "No email"}</small>
          </div>
        </div>

        <div className="patient-profile-summary">
          <div className="patient-profile-summary-card">
            <span>{user.role || "patient"}</span>
            <small>Account type</small>
          </div>
          <div className="patient-profile-summary-card">
            <span>{user.gender || "Not set"}</span>
            <small>Gender</small>
          </div>
          <div className="patient-profile-summary-card">
            <span>{user.fullName ? "Complete" : "Partial"}</span>
            <small>Profile state</small>
          </div>
        </div>

        <div className="patient-profile-card">
          <div className="patient-profile-grid">
            {profileFields.map((field) => (
              <div key={field.label} className="patient-profile-item">
                <small>{field.label}</small>
                <p>{field.value}</p>
              </div>
            ))}
          </div>

          <button className="patient-profile-btn" onClick={() => setShowModal(true)}>
            Edit Profile
          </button>
        </div>
      </div>

      {showModal ? <EditProfileModal onClose={() => setShowModal(false)} /> : null}
    </section>
  );
};

export default PatientProfile;
