import React, { useState } from "react";

const Search = ({ onSearchChange }) => {
  const [term, setTerm] = useState("");

  const handleChange = (event) => {
    const newTerm = event.target.value;
    setTerm(newTerm);
    onSearchChange(newTerm);
  };

  return (
    <input
      className="category-search"
      placeholder="Search"
      value={term}
      onChange={handleChange}
    />
  );
};

export default Search;
