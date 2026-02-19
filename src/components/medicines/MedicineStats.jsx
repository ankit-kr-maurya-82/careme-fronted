import React from "react";
import { FiActivity, FiHeart, FiShield } from "react-icons/fi";
import "./css/MedicineStats.css";

const MedicineStats = ({ medicineCount, categoryCount, safeInfo }) => {
  return (
    <div className="medicine-stats-row">
      <article className="medicine-stat-card">
        <div className="medicine-stat-icon medicine-stat-icon-blue">
          <FiActivity />
        </div>
        <h3>{medicineCount}</h3>
        <p>Medicines</p>
      </article>

      <article className="medicine-stat-card">
        <div className="medicine-stat-icon medicine-stat-icon-rose">
          <FiHeart />
        </div>
        <h3>{categoryCount}</h3>
        <p>Categories</p>
      </article>

      <article className="medicine-stat-card">
        <div className="medicine-stat-icon medicine-stat-icon-green">
          <FiShield />
        </div>
        <h3>{safeInfo}</h3>
        <p>Safe Info</p>
      </article>
    </div>
  );
};

export default MedicineStats;
