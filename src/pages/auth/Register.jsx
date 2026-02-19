import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Register Data:", formData);

    // 👉 Later connect API
    // await axios.post("/api/auth/register", formData)

    navigate("/login");
  };

  return (
    <div className="">
      <div className="">

        <h2 className="">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className=""
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className=""
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className=""
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className=""
          />

          <select
            name="gender"
            onChange={handleChange}
            className=""
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            name="role"
            onChange={handleChange}
            className=""
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <button
            type="submit"
            className=""
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
