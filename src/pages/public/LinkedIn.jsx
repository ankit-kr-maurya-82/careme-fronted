import React from "react";
import "./css/LinkedIn.css";

const profiles = [
  {
    id: 1,
    name: "Ankit Kumar Maurya",
    role: "Web Developer",
    company: "CareMe Team",
    profileUrl: "https://www.linkedin.com/in/ankit-kumar-maurya-ba4390334/",
  },
  {
    id: 2,
    name: "Bhrantik Nagar",
    role: "UI/UX Designer",
    company: "CareMe Team",
    profileUrl: "https://www.linkedin.com/in/bhrantik-nagar-08a310321/",
  },

  {
    id: 3,
    name: "Harsh Tiwari",
    role: "Database Designer",
    company: "CareMe Team",
    profileUrl: "https://www.linkedin.com/in/harsh-tiwari-7b3837388/",
  },
];

const LinkedIn = () => {
  return (
    <section className="linkedin">
      <h2 className="linkedin-title">LinkedIn Profiles</h2>
      <p className="linkedin-subtitle">
        Connect with our core contributors and follow their professional
        updates.
      </p>

      <div className="linkedin-grid">
        {profiles.map((profile) => (
          <article key={profile.id} className="linkedin-card">
            <p className="linkedin-company">{profile.company}</p>
            <h3>{profile.name}</h3>
            <p className="linkedin-role">{profile.role}</p>
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="linkedin-link"
            >
              View LinkedIn
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LinkedIn;
