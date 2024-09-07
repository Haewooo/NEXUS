// backend/models/Contribution.js
const mongoose = require('mongoose');

// Define the Contribution Schema
const ContributionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },  
  type: { type: String, required: true },  // Type of contribution
  reward: { type: Number, default: 0 },    // Reward amount (tokens)
  score: { type: Number, default: 0 },     // AI contribution score
  createdAt: { type: Date, default: Date.now },
});

const Contribution = mongoose.model('Contribution', ContributionSchema);

module.exports = Contribution;