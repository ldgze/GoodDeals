import React, { useState } from 'react';

export function SearchBox ({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search Deal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

