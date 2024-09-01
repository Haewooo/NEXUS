// src/components/SearchBar.js
import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ placeholder, onSearch }) {
  const [query, setQuery] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar">
      <input 
        id="title"
        type="text" 
        placeholder={placeholder} 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress} 
      />
    </div>
  );
}

export default SearchBar;