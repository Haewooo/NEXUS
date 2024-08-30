// src/pages/Home.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaSearch } from 'react-icons/fa';
import './Home.css';

function Home() {
  const [placeholderText, setPlaceholderText] = useState("The next step in AI, personalized AI");

  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <div className="nexus-title">
          <span>N</span>
          <span>E</span>
          <span>X</span>
          <span>U</span>
          <span>S</span>
        </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder={placeholderText} 
            onFocus={() => setPlaceholderText('')} 
            onBlur={() => setPlaceholderText("The next step in AI, personalized AI")} 
          />
        </div>
      </div>
    </div>
  );
}

export default Home;