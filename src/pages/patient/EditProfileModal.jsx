import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import api from "../../api/axios";
import "./css/EditProfileModal.css";

const EditProfileModal = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    fullName: user?.fullName || "",
    gender: user?.gender || "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        username: formData.username,
        fullName: formData.fullName,
        gender: formData.gender?.toLowerCase() || "",
      };

      const res = await api.put("/patient/update", payload);
      const updatedUser = res.data?.data?.patient;

      if (!updatedUser) {
        throw new Error("Invalid update response from server");
      }

      const userWithRole = { ...updatedUser, role: user?.role || "patient" };
      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));

      alert("Profile updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>

            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
