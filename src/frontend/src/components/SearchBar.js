// src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ placeholder }) {
  return (
    <div className="search-bar">
      <input type="text" placeholder={placeholder} />
    </div>
  );
}

export default SearchBar;