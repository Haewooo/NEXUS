// src/frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CommunityPage from './pages/CommunityPage';
import MarketPage from './pages/MarketPage';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/challenge/:id" component={UploadPage} />
      </Routes>
    </Router>
  );
}

export default App;