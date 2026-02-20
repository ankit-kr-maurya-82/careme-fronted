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

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const LinkedIn = () => {
  return (
    <section className="linkedin" aria-label="LinkedIn team profiles">
      <div className="linkedin-head">
        <p className="linkedin-kicker">Team Network</p>
        <h2 className="linkedin-title">Meet Us on LinkedIn</h2>
        <p className="linkedin-subtitle">
          Connect with our core contributors and follow their professional
          updates.
        </p>
      </div>

      <div className="linkedin-grid" role="list">
        {profiles.map((profile) => (
          <article key={profile.id} className="linkedin-card" role="listitem">
            <div className="linkedin-card-top">
              <div className="linkedin-avatar" aria-hidden="true">
                {getInitials(profile.name)}
              </div>
              <span className="linkedin-brand">in</span>
            </div>

            <h3 className="linkedin-name">{profile.name}</h3>
            <p className="linkedin-role">{profile.role}</p>
            <p className="linkedin-company">{profile.company}</p>

            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="linkedin-link"
            >
              View Profile
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LinkedIn;
