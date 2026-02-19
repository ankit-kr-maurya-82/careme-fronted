import React from "react";
import "./css/Twitter.css";

const profiles = [
  {
    id: 1,
    name: "Ankit Kumar Maurya",
    role: "Web Developer",
    handle: "@ankitkumar",
    profileUrl: "https://x.com/AnkitKu12131641",
  },
  {
    id: 2,
    name: "Bhrantik Nagar",
    role: "UI/UX Designer",
    handle: "@bhrantiknagar",
    profileUrl: "https://x.com/Bhrantik_nagar",
  },
  {
    id: 3,
    name: "Harsh Tiwari",
    role: "Database Designer",
    handle: "@harshtiwari",
    profileUrl: "#",
  },
];

const Twitter = () => {
  return (
    <section className="twitter">
      <h2 className="twitter-title">X Profiles</h2>
      <p className="twitter-subtitle">
        Follow the team for quick announcements and feature updates.
      </p>

      <div className="twitter-grid">
        {profiles.map((profile) => (
          <article key={profile.id} className="twitter-card">
            <p className="twitter-handle">{profile.handle}</p>
            <h3>{profile.name}</h3>
            <p className="twitter-role">{profile.role}</p>
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="twitter-link"
            >
              View X
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Twitter;
