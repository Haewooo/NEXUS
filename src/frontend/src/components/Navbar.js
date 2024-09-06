// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaSearch } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar({ onSearch }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSearch = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="navbar">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/community">Community</Link>
        <Link to="/market">Market</Link>
        <Link to="/contribution">Contribution</Link>
        <Link to="/more">More</Link>
      </nav>
      <div className="nav-right">
        {location.pathname === '/community' || location.pathname === '/market' ? (
          <div className="navbar-search-bar">
            <FaSearch className="search-icon" />
            <input 
              id="title"
              type="text" 
              placeholder="Search..." 
              className="navbar-search-input" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        ) : null}
        <button onClick={handleLogin} style={{ backgroundColor: 'transparent', border: 'none' }}>
          <FaUserAlt style={{ color: 'white', backgroundColor: 'black', borderRadius: '50%', padding: '5px', fontSize: '24px' }} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;