import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBox ({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      navigate('/');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="search-box">
      <input 
        type="search" 
        placeholder="Search" 
        value={searchTerm} 
        onChange={handleSearchChange} 
      />
      <button onClick={handleSearchSubmit} className="search-button">Search</button>
    </div>
  );
};

