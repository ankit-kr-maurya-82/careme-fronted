import React from "react";
import { FiActivity, FiAlertTriangle, FiBookOpen, FiRepeat, FiZap } from "react-icons/fi";
import "./css/MedicineCard.css";

const MedicineCard = ({ medicine, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(medicine)}
      className="medicine-card"
    >
      <div className="medicine-card-top">
        <span className="medicine-card-pill-icon">
          <FiActivity />
        </span>
        <div className="medicine-card-heading">
          <h3>{medicine.name}</h3>
          <p>{medicine.category}</p>
        </div>
        <FiBookOpen className="medicine-card-book" />
      </div>

      <p className="medicine-card-description">
        {medicine.description || "No description available."}
      </p>

      <div className="medicine-card-tags">
        <span className="medicine-tag medicine-tag-rose">
          <FiAlertTriangle /> {medicine.side_effects.length} side effects
        </span>
        <span className="medicine-tag medicine-tag-amber">
          <FiZap /> {medicine.interactions.length} interactions
        </span>
        <span className="medicine-tag medicine-tag-teal">
          <FiRepeat /> {medicine.alternatives.length} alternatives
        </span>
      </div>
    </button>
  );
};

export default MedicineCard;
