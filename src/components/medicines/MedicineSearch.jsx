import React from "react";
import SearchBar from "../common/SearchBar";
import "./css/MedicineSearch.css";

const MedicineSearch = ({ value, onChange, placeholder }) => {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      ariaLabel="Search medicines"
      wrapperClassName="medicine-search-wrap"
      iconClassName="medicine-search-icon"
      inputClassName="medicine-search-input"
    />
  );
};

export default MedicineSearch;
