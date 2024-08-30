import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CommunityPage from './pages/CommunityPage';
import MarketPage from './pages/MarketPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/market" element={<MarketPage />} />
      </Routes>
    </Router>
  );
}

export default App;