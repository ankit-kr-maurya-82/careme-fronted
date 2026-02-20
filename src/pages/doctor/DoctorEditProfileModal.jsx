import React, { useContext, useState } from "react";
import api from "../../api/axios";
import UserContext from "../../context/UserContext";
import "./css/DoctorEditProfileModal.css";

const DoctorEditProfileModal = ({ doctor, onClose, onUpdated }) => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: doctor?.fullName || "",
    specialty: doctor?.specialty || "",
    phone: doctor?.phone || "",
    avatar: doctor?.avatar || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("specialty", formData.specialty);
      payload.append("phone", formData.phone);
      payload.append("avatarUrl", formData.avatar);
      if (avatarFile) payload.append("avatar", avatarFile);

      const res = await api.put("/doctors/update", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedDoctor = res.data?.data?.doctor;
      if (!updatedDoctor) {
        throw new Error("Invalid update response");
      }

      const userWithRole = { ...updatedDoctor, role: user?.role || "doctor" };
      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));

      if (onUpdated) onUpdated(updatedDoctor);
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-modal-overlay" onClick={onClose}>
      <div className="doctor-modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Doctor Profile</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="doctor-fullName">Full Name</label>
          <input
            id="doctor-fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="doctor-specialty">Specialty</label>
          <input
            id="doctor-specialty"
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
          />

          <label htmlFor="doctor-phone">Phone</label>
          <input
            id="doctor-phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="doctor-avatar">Avatar URL</label>
          <input
            id="doctor-avatar"
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
          />

          <label htmlFor="doctor-avatarFile">Avatar Image (From Device)</label>
          <input
            id="doctor-avatarFile"
            type="file"
            name="avatarFile"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleAvatarFileChange}
          />

          <div className="doctor-modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="doctor-cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorEditProfileModal;
