import React, { useContext, useMemo, useState } from "react";
import UserContext from "../../context/UserContext";
import "./css/EditProfile.css";

const EditProfile = () => {
  const { user } = useContext(UserContext);

  const initialValues = useMemo(
    () => ({
      fullName: user?.fullName || "",
      email: user?.email || "",
      specialty: user?.specialty || "",
    }),
    [user?.email, user?.fullName, user?.specialty]
  );

  const [formData, setFormData] = useState(initialValues);

  const isDirty =
    formData.fullName !== initialValues.fullName ||
    formData.email !== initialValues.email ||
    formData.specialty !== initialValues.specialty;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
  };

  if (!user) return <h2>Please login first</h2>;

  return (
    <section className="edit-profile-page">
      <div className="edit-profile-shell">
        <div className="edit-profile-hero">
          <div>
            <p className="edit-profile-kicker">Doctor Workspace</p>
            <h2>Edit Profile</h2>
            <p className="edit-profile-subtitle">
              Keep your professional details accurate for patient trust and clean records.
            </p>
          </div>

          <div className="edit-profile-avatar-card">
            <div className="edit-profile-avatar">
              {(user?.fullName || user?.username || "D").charAt(0).toUpperCase()}
            </div>
            <p>{user?.fullName || user?.username || "Doctor"}</p>
            <small>{user?.specialty || "General"}</small>
          </div>
        </div>

        <div className="edit-profile-summary">
          <div className="edit-profile-summary-card">
            <span>{formData.fullName || "Not set"}</span>
            <small>Display name</small>
          </div>
          <div className="edit-profile-summary-card">
            <span>{formData.specialty || "Not set"}</span>
            <small>Current specialty</small>
          </div>
          <div className="edit-profile-summary-card">
            <span>{isDirty ? "Unsaved" : "Saved"}</span>
            <small>Form state</small>
          </div>
        </div>

        <div className="edit-profile-card">
          <form onSubmit={handleSubmit}>
            <h3>Professional Information</h3>

            <div className="edit-profile-grid">
              <div className="form-group">
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

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialty">Specialty</label>
              <input
                id="specialty"
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
              />
            </div>

            <p className="edit-profile-note">
              Changes are local right now. Connect this form to your update API when ready.
            </p>

            <div className="edit-profile-actions">
              <button
                type="button"
                className="reset-btn"
                onClick={() => setFormData(initialValues)}
                disabled={!isDirty}
              >
                Reset
              </button>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
