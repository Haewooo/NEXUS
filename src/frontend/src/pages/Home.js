// src/pages/Home.js
import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

function Home() {
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
          <input type="text" placeholder="The new generation of your own AI" />
        </div>
      </div>
    </div>
  );
}

export default Home;