import React, { useContext, useState } from "react";
import "./css/Home.css";
import heathtechImages from "./heathtechImages.json";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const assetImages = import.meta.glob("../../assets/*", {
  eager: true,
  import: "default",
});

const findAssetByFileName = (imgPath) => {
  if (!imgPath) return null;
  const normalized = imgPath.replace(/\\/g, "/");
  const fileName = normalized.split("/").pop();
  const matchKey = Object.keys(assetImages).find((key) =>
    key.endsWith(`/${fileName}`)
  );
  return matchKey ? assetImages[matchKey] : null;
};

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const heroImageData = heathtechImages[0] || null;
  const heroImageSrc = findAssetByFileName(heroImageData?.img);
  const heroImageAlt = heroImageData?.title || "Health technology";
  const canSearchDoctors = user?.role === "patient";
  const findDoctorPath = canSearchDoctors ? "/patient/doctors" : "/login/patient";

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();

    if (!canSearchDoctors) {
      navigate("/login/patient");
      return;
    }

    navigate(
      query
        ? `/patient/doctors?search=${encodeURIComponent(query)}`
        : "/patient/doctors"
    );
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-kicker">CareMe Hospital Network</p>
          <h1>Care that feels personal, powered by smart systems.</h1>
          <p className="hero-sub">
            A hospital-grade platform where patients submit problems and doctors
            deliver medicines, tests, and diet guidance with clarity.
          </p>

          <form className="hero-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="hero-search-input"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search doctor by name, specialty, or email"
              aria-label="Search doctors"
            />
            <button type="submit" className="hero-search-btn">
              Search
            </button>
          </form>

          {!canSearchDoctors ? (
            <p className="hero-search-hint">
              Login as a patient to search and view available doctors.
            </p>
          ) : null}

          <div className="hero-actions">
            <Link to={findDoctorPath} className="primary-btn">
              Book Appointment
            </Link>
            <Link to={findDoctorPath} className="secondary-btn">
              Find a Doctor
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <span>24/7</span>
              <small>Virtual care</small>
            </div>
            <div>
              <span>120+</span>
              <small>Specialists</small>
            </div>
            <div>
              <span>15k</span>
              <small>Patients served</small>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          {heroImageSrc && (
            <img src={heroImageSrc} alt={heroImageAlt} className="hero-image" />
          )}
          <div className="panel-card">
            <h3>Quick Access</h3>
            <p>Get prescriptions, labs, and diet plans in one place.</p>
            <div className="panel-list">
              <span>Tele-consultation</span>
              <span>Lab reports</span>
              <span>Medicine reminders</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-header">
          <h2>Hospital-grade features</h2>
          <p>Designed for patients, doctors, and care teams.</p>
        </div>

        <div className="feature-grid">
          <div className="card">
            <h3>Patient Health Tracking</h3>
            <p>Track symptoms, vitals, and habits with structured timelines.</p>
          </div>
          <div className="card">
            <h3>Doctor Advice</h3>
            <p>Evidence-based medicines, tests, and personalized diet plans.</p>
          </div>
          <div className="card">
            <h3>Digital Workflow</h3>
            <p>Real hospital-style patient-doctor collaboration.</p>
          </div>
          <div className="card">
            <h3>Secure Records</h3>
            <p>Access patient history and prescriptions securely.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="section-header">
          <h2>Patient stories</h2>
          <p>Trust earned through consistent care.</p>
        </div>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            "Easy to book appointments and track health digitally."
            <span>- Riya, 28</span>
          </div>
          <div className="testimonial-card">
            "Clear medicine and diet plans, no confusion."
            <span>- Arjun, 34</span>
          </div>
          <div className="testimonial-card">
            "Doctors respond fast and reports are organized."
            <span>- Salim, 41</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
