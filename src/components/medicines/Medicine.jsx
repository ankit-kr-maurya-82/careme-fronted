import React, { useMemo, useState } from "react";
import { FiMessageCircle, FiShield } from "react-icons/fi";
import MedicineSearch from "./MedicineSearch";
import MedicineStats from "./MedicineStats";
import MedicineCard from "./MedicineCard";
import MedicineModal from "./MedicineModal";
import MedicalDisclaimer from "./MedicalDisclaimer";
import MEDICINES from "./data/medicines.json";
import "./css/Medicine.css";

const Medicine = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMedicines = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return MEDICINES;

    return MEDICINES.filter((item) => {
      const name = item.name.toLowerCase();
      const category = item.category.toLowerCase();
      return name.includes(query) || category.includes(query);
    });
  }, [searchTerm]);

  const totalMedicines = MEDICINES.length;
  const totalCategories = new Set(MEDICINES.map((item) => item.category)).size;

  const openMedicineModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeMedicineModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  return (
    <section className="medicine-page">
      <div className="medicine-hero">
       
        <h1>Understand Your Medicines</h1>
        <p>Search any medicine to learn about uses, side effects, interactions, and safer alternatives.</p>

        <MedicineSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search medicines by name or category..."
        />
      </div>

      <MedicineStats
        medicineCount={totalMedicines}
        categoryCount={totalCategories}
        safeInfo="100%"
      />

      <div className="medicine-content">
        <MedicalDisclaimer />

        <div className="medicine-grid">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} onClick={openMedicineModal} />
            ))
          ) : (
            <div className="medicine-empty-state">
              <h3>No medicines found</h3>
              <p>Try a different name or category keyword.</p>
            </div>
          )}
        </div>
      </div>

      {/* <button type="button" className="medicine-float-help" aria-label="Open support">
        <FiMessageCircle />
      </button> */}

      <MedicineModal medicine={selectedMedicine} open={isModalOpen} onClose={closeMedicineModal} />
    </section>
  );
};

export default Medicine;
