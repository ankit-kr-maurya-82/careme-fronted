import React from "react";
import "./css/Instagram.css";

const profiles = [
  {
    id: 1,
    name: "Ankit Kumar Maurya",
    role: "Web Developer",
    handle: "@ankit_kumar",
    profileUrl: "#",
  },
  {
    id: 2,
    name: "Bhrantik Nagar",
    role: "UI/UX Designer",
    handle: "@bhrantik_nagar",
    profileUrl: "#",
  },
  {
    id: 3,
    name: "Harsh Tiwari",
    role: "Database Designer",
    handle: "@harsh_tiwari",
    profileUrl: "#",
  },
];

const Instagram = () => {
  return (
    <section className="instagram">
      <h2 className="instagram-title">Instagram Profiles</h2>
      <p className="instagram-subtitle">
        Follow the team for product updates and design snapshots.
      </p>

      <div className="instagram-grid">
        {profiles.map((profile) => (
          <article key={profile.id} className="instagram-card">
            <p className="instagram-handle">{profile.handle}</p>
            <h3>{profile.name}</h3>
            <p className="instagram-role">{profile.role}</p>
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="instagram-link"
            >
              View Instagram
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Instagram;
