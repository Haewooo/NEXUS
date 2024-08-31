// src/pages/MarketPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/MarketPage.css';

function MarketPage() {
  const [aiModels, setAiModels] = useState([]);

  useEffect(() => {
    // Example
    const mockModels = [
      { id: 1, name: 'AI Model', description: 'A powerful AI model for image recognition', price: '10 NEAR', imageUrl: '/images/ai.png' },
      { id: 2, name: 'AI Model', description: 'AI model for predictive analytics', price: '15 NEAR', imageUrl: '/images/ai.png' },
      { id: 3, name: 'AI Model', description: 'Natural Language Processing AI model', price: '12 NEAR', imageUrl: '/images/ai.png' }
    ];
    setAiModels(mockModels);
  }, []);

  return (
    <div className="market-page">
      <Navbar />
      <div className="market-content">
        <h1>Discover your own AI</h1>
        <div className="model-list">
          {aiModels.map((model) => (
            <div key={model.id} className="model-item">
              <img src={model.imageUrl} alt={model.name} className="model-image" />
              <h2>{model.name}</h2>
              <p>{model.description}</p>
              <p className="price">{model.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketPage;