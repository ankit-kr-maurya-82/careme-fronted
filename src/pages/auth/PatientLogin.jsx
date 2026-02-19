import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Axios instance
import UserContext from "../../context/UserContext";
import "./css/PatientLogin.css";

const PatientLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!data.email || !data.password) {
        throw new Error("Please fill in all fields.");
      }

      // Call backend login
      const response = await api.post("/patient/login", data);

      // Backend must return user with username and role
      const userData = response.data?.data?.user;
      const token = response.data?.data?.accessToken;

      if (!userData || !token) {
        throw new Error("Invalid login response from server");
      }

      // Ensure role exists so ProtectedRoute can validate
      const userWithRole = { ...userData, role: "patient" };

      // Save in context & localStorage
      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));
      localStorage.setItem("token", token);

      // Redirect to patient dashboard
      navigate("/patient/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="main-form">
        <h2 className="main-heading">Patient Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="main-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="main-input"
        />

        <button className="main-button" disabled={loading}>
          {loading ? "Logging in..." : "Login as Patient"}
        </button>

        <p className="login-text">
          Don't have an account? <Link to="/register/patient">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default PatientLogin;
