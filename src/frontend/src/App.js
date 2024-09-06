// src/frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CommunityPage from './pages/CommunityPage';
import MarketPage from './pages/MarketPage';
import UploadPage from './pages/UploadPage';
import ContributionPage from './pages/ContributionPage';
import LoginPage from './pages/LoginPage'; 

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<CommunityPage onSearch={handleSearch} searchQuery={searchQuery} />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/challenge/:id" element={<UploadPage />} />
        <Route path="/contribution" element={<ContributionPage />} />
        <Route path="/login" element={<LoginPage />} />  
      </Routes>
    </Router>
  );
}

export default App;