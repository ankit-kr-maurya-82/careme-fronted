import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import "./css/MedicineDiclaimer.css";

const MedicalDisclaimer = () => (
  <div className="medicine-disclaimer">
    <FiAlertTriangle className="medicine-disclaimer-icon" />
    <p>
      <strong>Educational information only</strong> - consult a licensed doctor before making any medical decisions.
      CareMe does not provide medical diagnoses or prescriptions.
    </p>
  </div>
);

export default MedicalDisclaimer;
