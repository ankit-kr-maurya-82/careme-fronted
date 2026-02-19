// src/pages/doctor/DoctorRegister.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import UserContext from "../../context/UserContext";
import Button from "../../components/ui/Button";
import "./css/DoctorRegister.css";

const DoctorRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    nmcNumber: "", // NMC registration number
    specialty: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/doctors/register", formData);
      console.log("Registration Response:", response.data);

      // Backend returns { data: { user, accessToken, refreshToken } }
      const userData = response.data.data.user;
      const token = response.data.data.accessToken;

      console.log("User Data:", userData);
      console.log("Token:", token);

      // ✅ Save in context and localStorage
      if (!userData) {
        throw new Error("No user data in response");
      }

      // Ensure role exists so ProtectedRoute can validate
      const userWithRole = { ...userData, role: "doctor" };

      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));
      localStorage.setItem("token", token);

      console.log("Navigating to /doctor/dashboard");
      navigate("/doctor/dashboard");
    } catch (err) {
      console.error("Full Error:", err);
      console.error("Error Response:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dragon-main">
      <div className="dragon-card">
        <h2 className="dragon-h2">Doctor Registration</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="dragon-form">
          

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="dragon-selput"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="dragon-selput"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="dragon-selput"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            required
            onChange={handleChange}
            className="dragon-selput"
          />

          <select
            name="gender"
            required
            onChange={handleChange}
            className="dragon-selput"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="nmcNumber"
            placeholder="NMC Registration Number"
            required
            onChange={handleChange}
            className="dragon-selput"
          />

          <input
            type="text"
            name="specialty"
            placeholder="Specialization"
            required
            onChange={handleChange}
            className="dragon-selput"
          />

          <Button
            text={loading ? "Registering..." : "Register as Doctor"}
            type="submit"
            className="dragon-button"
            disabled={loading}
          />
        </form>

        <p className="dragon-text">
          Already have an account?{" "}
          <Link to="/login/doctor" className="dragon-log">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DoctorRegister;
