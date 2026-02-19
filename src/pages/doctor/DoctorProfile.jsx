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
      <div className="doctor-profile-container">
        <h2>Please login first</h2>
      </div>
    );
  }

  if (loading) return <p className="doctor-profile-message">Loading profile...</p>;
  if (error) return <p className="doctor-profile-error">{error}</p>;
  if (!doctor) return <p className="doctor-profile-message">No doctor data found.</p>;

  return (
    <div className="doctor-profile-container">
      <div className="doctor-card">
        <div className="doctor-avatar">
          {(doctor.fullName || doctor.username || "D").charAt(0).toUpperCase()}
        </div>

        <h2 className="doctor-profile-title">My Profile</h2>

        <div className="doctor-profile-info">
          <p><strong>Full Name:</strong> {doctor.fullName || "Not set"}</p>
          <p><strong>Username:</strong> {doctor.username || "Not set"}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Specialty:</strong> {doctor.specialty || "Not set"}</p>
          <p><strong>Phone:</strong> {doctor.phone || "Not set"}</p>
          <p><strong>Gender:</strong> {doctor.gender || "Not set"}</p>
        </div>

        <button className="doctor-profile-btn" onClick={() => setShowModal(true)}>
          Edit Profile
        </button>
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
