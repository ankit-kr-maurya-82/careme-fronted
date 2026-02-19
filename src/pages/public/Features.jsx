import React from "react";
import "./css/Features.css";
import featuresImage from "../../assets/Objectives.png";

const coreFeatures = [
  {
    title: "Patient Problem Submission",
    description:
      "Patients can submit symptoms, history, and concerns in a structured format so doctors get complete context quickly.",
  },
  {
    title: "Doctor Advice Workflow",
    description:
      "Doctors review reported problems and provide medicines, tests, and diet recommendations from one dashboard.",
  },
  {
    title: "Medicine Intelligence",
    description:
      "Patients can search medicines and view usage details, side effects, interactions, and alternatives.",
  },
  {
    title: "Smart Reminders",
    description:
      "Medication and care reminders help patients stay on schedule and reduce missed follow-ups.",
  },
  {
    title: "Appointment Coordination",
    description:
      "Patients can discover doctors, request appointments, and track consultation status without manual back-and-forth.",
  },
  {
    title: "Protected Access",
    description:
      "Role-based route protection keeps patient and doctor workflows separated and secured inside the app.",
  },
];

const roleBenefits = [
  {
    role: "For Patients",
    points: [
      "Simple interface to report health issues and view doctor advice",
      "Clear medication details before taking any medicine",
      "Central profile for medical context and follow-up continuity",
    ],
  },
  {
    role: "For Doctors",
    points: [
      "Unified problem queue with patient-specific context",
      "Faster treatment suggestions with structured guidance fields",
      "Cleaner digital record flow than paper-based coordination",
    ],
  },
];

const trustHighlights = [
  "Educational medicine information with safety-first disclaimers",
  "Consistent digital records reduce communication gaps",
  "Scalable architecture for future hospital integrations",
];

const Features = () => {
  return (
    <section className="features-page">
      <div className="features-hero">
        <p className="features-kicker">CareMe Features</p>
        <h1>Complete hospital-care workflow in one website.</h1>
        <p className="features-sub">
          CareMe connects patients and doctors through a practical digital flow:
          report problems, review advice, manage medicines, and maintain secure
          records.
        </p>
      </div>

      <div className="features-graph">
        <img
          src={featuresImage}
          alt="CareMe feature objectives"
          className="features-image"
        />
      </div>

      <div className="features-list">
        {coreFeatures.map((item) => (
          <article key={item.title} className="feature-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="feature-sections">
        <div className="feature-role-grid">
          {roleBenefits.map((group) => (
            <article key={group.role} className="feature-role-card">
              <h3>{group.role}</h3>
              <ul>
                {group.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <article className="feature-trust-card">
          <h3>Why this matters</h3>
          <ul>
            {trustHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Features;
