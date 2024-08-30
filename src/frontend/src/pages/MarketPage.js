// src/pages/MarketPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './MarketPage.css';

function MarketPage() {
  const [aiModels, setAiModels] = useState([]);

  useEffect(() => {
    // Mock data: Replace with actual data fetching logic
    const mockModels = [
      { id: 1, name: 'AI Model 1', description: 'A powerful AI model for image recognition', price: '10 NEAR', imageUrl: '/images/ai1.png' },
      { id: 2, name: 'AI Model 2', description: 'AI model for predictive analytics', price: '15 NEAR', imageUrl: '/images/ai2.png' },
      { id: 3, name: 'AI Model 3', description: 'Natural Language Processing AI model', price: '12 NEAR', imageUrl: '/images/ai3.png' }
    ];
    setAiModels(mockModels);
  }, []);

  const handlePurchase = (modelId) => {
    // Handle the purchase logic with NEAR smart contract
    console.log(`Purchasing model with ID: ${modelId}`);
    // Example: interact with NEAR smart contract to complete purchase
  };

  return (
    <div className="market-page">
      <Navbar />
      <div className="market-content">
        <h1>Discover and Purchase AI Models</h1>
        <div className="model-list">
          {aiModels.map((model) => (
            <div key={model.id} className="model-item">
              <img src={model.imageUrl} alt={model.name} className="model-image" />
              <h2>{model.name}</h2>
              <p>{model.description}</p>
              <p className="price">{model.price}</p>
              <button onClick={() => handlePurchase(model.id)}>Purchase</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketPage;