import React, { useState } from "react";
import Search from "./Search";

const categories = ["All", "Track", "Tracklocross", "Gravel", "Road"];

const CategorySearch = ({ onSearchChange, onFilterClick, filtered }) => {
  const [term, setTerm] = useState("");

  const handleFilterClick = (categoryName) => {
    onFilterClick(categoryName);
  };

  const handleSearchChange = (searchTerm) => {
    setTerm(searchTerm);
    onSearchChange(searchTerm);
  };

  return (
    <div>
      <Search onSearchChange={handleSearchChange} />
      <p className='grid-section-left-category-bold'>Categories</p>
      <ul className='all-categories-list'>
        {categories.map((category) => (
          <li
            key={`cat-${category.toLowerCase()} shop-cat`}
            className={`cat-list${filtered === category ? " active" : ""}`}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySearch;
