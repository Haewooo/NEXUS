// backend/routes/marketRoutes.js
const express = require('express');
const router = express.Router();
const MarketModel = require('../models/MarketModel'); // Model representing items in the market

// Add model to the market
router.post('/add-to-market', async (req, res) => {
  try {
    const { modelId, name, description, price } = req.body;
    
    const newMarketModel = new MarketModel({
      modelId,
      name,
      description,
      price,
    });

    await newMarketModel.save();
    res.status(200).json({ message: 'Model added to market successfully!' });
  } catch (error) {
    console.error('Error adding model to market:', error);
    res.status(500).json({ message: 'Failed to add model to market' });
  }
});
router.get('/get-models', async (req, res) => {
  try {
    const models = await MarketModel.find();
    res.status(200).json(models);
  } catch (error) {
    console.error('Error fetching models from market:', error);
    res.status(500).json({ message: 'Failed to fetch models' });
  }
});

module.exports = router;

