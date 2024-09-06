// backend/models/Market.js
const mongoose = require('mongoose');

const MarketModelSchema = new mongoose.Schema({
  modelId: String,
  name: String,
  description: String,
  price: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MarketModel', MarketModelSchema);