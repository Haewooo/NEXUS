// src/frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CommunityPage from './pages/CommunityPage';
import MarketPage from './pages/MarketPage';
import UploadPage from './pages/UploadPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/community" 
          element={<CommunityPage onSearch={handleSearch} searchQuery={searchQuery} />} 
        />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/challenge/:id" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;