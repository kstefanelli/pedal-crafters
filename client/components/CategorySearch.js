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
      <p className='font-bold mt-4 mb-2.5 pl-0 text-lg md:text-2xl'>
        CATEGORIES
      </p>
      <ul className='p-0'>
        {categories.map((category) => (
          <li
            key={`cat-${category.toLowerCase()} shop-cat`}
            className={`text-base md:text-xl mb-2.5 font-semibold hover:text-[#FFA364] hover:cursor-pointer transition duration-500 ${
              filtered === category ? "active text-[#FFA364]" : ""
            }`}
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
