import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import UserContext from "../../context/UserContext";
import "./css/PatientRegister.css";
import Button from "../../components/ui/Button";

const PatientRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Basic validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!formData.gender) {
      setError("Please select gender");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/patient/register", formData);

      // Expected backend structure:
      // {
      //   success: true,
      //   data: { user: {}, accessToken: "" }
      // }

      const { user, accessToken } = response.data.data;

      // Ensure role exists so ProtectedRoute can validate
      const userWithRole = { ...user, role: "patient" };

      // ✅ Save to context
      setUser(userWithRole);

      // ✅ Save to localStorage
      localStorage.setItem("user", JSON.stringify(userWithRole));
      localStorage.setItem("token", accessToken);

      navigate("/patient/dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "Registration failed");
      } else if (err.request) {
        setError("Server not responding");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dragon-main">
      <div className="dragon-card">
        <h2 className="dragon-h2">Patient Registration</h2>

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
            min="1"
            className="dragon-selput"
            onChange={handleChange}
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

          <Button
            text={loading ? "Registering..." : "Register as Patient"}
            type="submit"
            className="dragon-button"
            disabled={loading}
          />
        </form>

        <p className="dragon-text">
          Already have an account?{" "}
          <Link to="/login/patient" className="dragon-log">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PatientRegister;
