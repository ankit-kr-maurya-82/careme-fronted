import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import EditProfileModal from "./EditProfileModal";
import "./css/PatientProfile.css";

const PatientProfile = () => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  if (!user) {
    return (
      <div className="profile-container">
        <h2>Please login first</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-avatar">
          {user.username?.charAt(0).toUpperCase()}
        </div>

        <h2 className="profile-title">My Profile</h2>

        <div className="profile-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Gender:</strong> {user.gender || "Not set"}</p>
        </div>

        <button
          className="profile-btn"
          onClick={() => setShowModal(true)}
        >
          Edit Profile
        </button>

      </div>

      {showModal && (
        <EditProfileModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default PatientProfile;
