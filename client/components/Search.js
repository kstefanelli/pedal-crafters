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
      className='h-2 w-28 lg:w-32 rounded-md px-4 py-3 bg-gray-200 outline-none border border-transparent text-base text-gray-700 transition duration-200'
      placeholder='Search'
      value={term}
      onChange={handleChange}
    />
  );
};

export default Search;
