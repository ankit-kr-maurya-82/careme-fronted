import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import api from "../../api/axios";
import "./css/EditProfileModal.css";

const EditProfileModal = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    fullName: user?.fullName || "",
    gender: user?.gender || "",
    avatar: user?.avatar || "",
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("username", formData.username);
      payload.append("fullName", formData.fullName);
      payload.append("gender", formData.gender?.toLowerCase() || "");
      payload.append("avatarUrl", formData.avatar);
      if (avatarFile) payload.append("avatar", avatarFile);

      const res = await api.put("/patient/update", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedUser = res.data?.data?.patient;

      if (!updatedUser) {
        throw new Error("Invalid update response from server");
      }

      const userWithRole = { ...updatedUser, role: user?.role || "patient" };
      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));
      onClose();
    } catch (error) {
      console.error(error);
      setSubmitError(error.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-modal-overlay" onClick={onClose}>
      <div className="patient-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="patient-modal-head">
          <h2>Edit Profile</h2>
          <p>Update your account details to keep your profile accurate.</p>
        </div>

        <form onSubmit={handleSubmit} className="patient-modal-form">
          <div className="patient-modal-grid">
            <div className="patient-modal-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="patient-modal-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="patient-modal-field">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="patient-modal-field">
            <label htmlFor="avatar">Avatar URL</label>
            <input
              id="avatar"
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="patient-modal-field">
            <label htmlFor="avatarFile">Avatar Image (From Device)</label>
            <input
              id="avatarFile"
              type="file"
              name="avatarFile"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleAvatarFileChange}
            />
          </div>

          {submitError ? <p className="patient-modal-error">{submitError}</p> : null}

          <div className="patient-modal-buttons">
            <button type="button" className="patient-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="patient-modal-submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
