import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  ariaLabel = "Search",
  wrapperClassName = "",
  iconClassName = "",
  inputClassName = "",
}) => {
  return (
    <div className={wrapperClassName}>
      <FiSearch className={iconClassName} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClassName}
        aria-label={ariaLabel}
      />
    </div>
  );
};

export default SearchBar;
