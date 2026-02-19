import React from "react";
import "./css/About.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-shell">
        <div className="about-hero">
          <div className="about-hero-text">
            <p className="about-kicker">About CareMe</p>
            <h1>Digital care designed for real hospitals and real people.</h1>
            <p className="about-sub">
              CareMe connects patients and doctors through a simple, secure
              system that mirrors hospital workflows without paperwork delays.
            </p>
          </div>

          <div className="about-hero-panel">
            <h3>One Platform. Full Care Journey.</h3>
            <p>
              From symptoms to prescriptions and follow-up guidance, every step
              is organized in one clear workflow.
            </p>
            <ul>
              <li>Patient-friendly records</li>
              <li>Doctor-ready case timelines</li>
              <li>Reliable follow-up and communication</li>
            </ul>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-box">
            <span>24/7</span>
            <p>Digital access</p>
          </div>
          <div className="stat-box">
            <span>120+</span>
            <p>Specialists onboard</p>
          </div>
          <div className="stat-box">
            <span>15k</span>
            <p>Patients supported</p>
          </div>
          <div className="stat-box">
            <span>99%</span>
            <p>Record consistency</p>
          </div>
        </div>

        <div className="about-block">
          <h2>How CareMe Helps</h2>
          <div className="about-grid">
            <div className="about-card">
              <h3>Our Mission</h3>
              <p>
                Make healthcare easier to access, understand, and manage through
                smart digital tools.
              </p>
            </div>
            <div className="about-card">
              <h3>What We Do</h3>
              <p>
                Patients submit problems, doctors review histories, and guidance
                is delivered as medicines, tests, and diet advice.
              </p>
            </div>
            <div className="about-card">
              <h3>Why It Matters</h3>
              <p>
                Clear medical instructions reduce confusion and improve outcomes
                for both patients and care teams.
              </p>
            </div>
            <div className="about-card">
              <h3>Built for Trust</h3>
              <p>
                We focus on secure data handling, structured records, and a
                clean experience across devices.
              </p>
            </div>
          </div>
        </div>

        <div className="about-block">
          <h2>Our Values</h2>
          <div className="values-row">
            <div className="value-card">
              <h4>Clarity</h4>
              <p>Simple medical guidance that patients can follow.</p>
            </div>
            <div className="value-card">
              <h4>Compassion</h4>
              <p>Technology should feel human and respectful.</p>
            </div>
            <div className="value-card">
              <h4>Reliability</h4>
              <p>Consistent systems doctors can trust every day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
 
export default About;
