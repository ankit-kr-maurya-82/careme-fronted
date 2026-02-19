import React from "react";
import "./css/About.css";
// import aboutImage from "../../../assets/Hospital_workflow_in_digital _form.png";
// import aboutImage from "./assets/Hospital_workflow_in_digital";

const About = () => {
  return (
    <section className="about">
      <div className="about-hero">
        <div className="about-hero-text">
          <p className="about-kicker">About CareMe</p>
          <h1>Digital care designed for real hospitals and real people.</h1>
          <p className="about-sub">
            CareMe connects patients and doctors through a simple, secure system
            that mirrors hospital workflows — without the paperwork.
          </p>
        </div>
        {/* <img
          src={aboutImage}
          alt="Hospital workflow in digital form"
          className="about-image"
        /> */}
      </div>

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
            We focus on secure data handling, structured records, and a clean
            experience across devices.
          </p>
        </div>
      </div>

      <div className="about-values">
        <h2>Our Values</h2>
        <div className="values-row">
          <div>
            <h4>Clarity</h4>
            <p>Simple medical guidance that patients can follow.</p>
          </div>
          <div>
            <h4>Compassion</h4>
            <p>Technology should feel human and respectful.</p>
          </div>
          <div>
            <h4>Reliability</h4>
            <p>Consistent systems doctors can trust every day.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

