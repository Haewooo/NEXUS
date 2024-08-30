import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <nav className="nav-links">
        <a href="#plugins">Plugins</a>
        <Link to="#community">Community</Link>
        <Link to="#market">Market</Link>
        <a href="#news">News</a>
        <a href="#more">More</a>
      </nav>
      <div className="nav-right">
        <button className="lang-btn">En</button>
        <button className="profile-btn">Profile</button>
      </div>
    </header>
  );
}

export default Navbar;