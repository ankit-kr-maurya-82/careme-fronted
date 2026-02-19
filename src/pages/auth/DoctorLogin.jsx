import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import api from "../../api/axios"; // your axios instance
import "./css/DoctorLogin.css";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    certificateNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const verifyCertificate = async (certificateNumber) => {
    // simulate NMC verification
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(certificateNumber.startsWith("NMC"));
      }, 500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!data.email || !data.password || !data.certificateNumber) {
        throw new Error("Please fill in all fields.");
      }

      const isValidCert = await verifyCertificate(data.certificateNumber);
      if (!isValidCert) {
        throw new Error("Certificate number not verified with NMC. Login denied.");
      }

      // ✅ call backend login
      const response = await api.post("/doctors/login", {
        email: data.email,
        password: data.password,
        nmcNumber: data.certificateNumber,
      });

      const userData = response.data.data.user;
      const token = response.data.data.accessToken || response.data.token;

      // Ensure role exists so ProtectedRoute can validate
      const userWithRole = { ...userData, role: "doctor" };

      // save in context + localStorage
      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));
      localStorage.setItem("token", token);

      navigate("/doctor/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="main-form">
        <h2 className="main-heading">Doctor Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
          className="main-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={data.password}
          onChange={handleChange}
          className="main-input"
        />

        <input
          type="text"
          name="certificateNumber"
          placeholder="Medical Certificate Number"
          required
          value={data.certificateNumber}
          onChange={handleChange}
          className="main-input"
        />

        <button className="main-button" disabled={loading}>
          {loading ? "Logging in..." : "Login as Doctor"}
        </button>

        <p className="login-text">
          Don't have an account? <Link to="/register/doctor">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default DoctorLogin;
