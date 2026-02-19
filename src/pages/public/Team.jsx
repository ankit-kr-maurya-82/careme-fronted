import React from "react";
import members from "./teamData.json";
import "./css/Team.css";
import userAvatar from "../../assets/user.png";

const assetImages = import.meta.glob("../../assets/*", {
  eager: true,
  import: "default",
});

const findAssetByFileName = (imgPath) => {
  const normalized = imgPath.replace(/\\/g, "/");
  const fileName = normalized.split("/").pop();
  const matchKey = Object.keys(assetImages).find((key) =>
    key.endsWith(`/${fileName}`)
  );
  return matchKey ? assetImages[matchKey] : null;
};

const getMemberImage = (img) => {
  if (!img) return userAvatar;
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  return findAssetByFileName(img) || userAvatar;
};

const Team = () => {
  return (
    <section className="team">
      <h2 className="team-title">Our Team</h2>

      <div className="team-container">
        {members.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={getMemberImage(member.img)} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
