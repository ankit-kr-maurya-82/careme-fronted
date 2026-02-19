import React, { useEffect, useState } from "react";
import { FiActivity, FiAlertTriangle, FiBookOpen, FiRepeat, FiShield, FiX, FiZap } from "react-icons/fi";
import "./css/MedicineModal.css";

const TABS = [
  { id: "overview", label: "Overview", icon: FiBookOpen },
  { id: "uses", label: "Uses", icon: FiActivity },
  { id: "side-effects", label: "Effects", icon: FiAlertTriangle },
  { id: "interactions", label: "Interact.", icon: FiZap },
  { id: "alternatives", label: "Altern.", icon: FiRepeat },
];

const MedicineModal = ({ medicine, open, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (open) {
      setActiveTab("overview");
    }
  }, [open, medicine]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !medicine) return null;

  return (
    <div className="medicine-modal-overlay" onClick={onClose} role="presentation">
      <div className="medicine-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="medicine-modal-header">
          <div className="medicine-modal-title-wrap">
            <span className="medicine-modal-pill-icon">
              <FiActivity />
            </span>
            <div>
              <h2>{medicine.name}</h2>
              <p>{medicine.category}</p>
            </div>
          </div>
          <button type="button" className="medicine-modal-close" onClick={onClose} aria-label="Close modal">
            <FiX />
          </button>
        </div>

        <div className="medicine-modal-tabs">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                className={`medicine-modal-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="medicine-modal-content">
          {activeTab === "overview" && (
            <div className="medicine-modal-pane">
              <p>{medicine.description || "No description available."}</p>

              {medicine.dosage_info && (
                <div className="medicine-box medicine-box-blue">
                  <h4>Dosage Reference</h4>
                  <p>{medicine.dosage_info}</p>
                </div>
              )}

              {medicine.warnings?.length > 0 && (
                <div className="medicine-box medicine-box-rose">
                  <h4>
                    <FiShield /> Warnings
                  </h4>
                  <ul>
                    {medicine.warnings.map((warning, index) => (
                      <li key={`${warning}-${index}`}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "uses" && (
            <div className="medicine-modal-pane">
              {medicine.uses.map((useItem, index) => (
                <div key={`${useItem}-${index}`} className="medicine-list-item medicine-list-item-green">
                  <span>{index + 1}</span>
                  <p>{useItem}</p>
                </div>
              ))}

              {medicine.effects?.length > 0 && (
                <div className="medicine-box">
                  <h4>Mechanism of Action</h4>
                  <div className="medicine-chip-wrap">
                    {medicine.effects.map((effect, index) => (
                      <span key={`${effect}-${index}`} className="medicine-chip">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "side-effects" && (
            <div className="medicine-modal-pane">
              {medicine.side_effects.map((item, index) => (
                <div key={`${item}-${index}`} className="medicine-list-item medicine-list-item-rose">
                  <FiAlertTriangle />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "interactions" && (
            <div className="medicine-modal-pane">
              {medicine.interactions.length > 0 ? (
                medicine.interactions.map((item, index) => (
                  <div key={`${item}-${index}`} className="medicine-list-item medicine-list-item-amber">
                    <FiZap />
                    <p>{item}</p>
                  </div>
                ))
              ) : (
                <p className="medicine-muted">No known interactions listed.</p>
              )}
            </div>
          )}

          {activeTab === "alternatives" && (
            <div className="medicine-modal-pane">
              {medicine.alternatives.length > 0 ? (
                medicine.alternatives.map((item, index) => (
                  <div key={`${item}-${index}`} className="medicine-list-item medicine-list-item-teal">
                    <FiRepeat />
                    <p>{item}</p>
                  </div>
                ))
              ) : (
                <p className="medicine-muted">No alternatives listed.</p>
              )}
              <p className="medicine-note">Always consult your doctor before switching medications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineModal;
