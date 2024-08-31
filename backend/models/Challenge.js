// models/Challenge.js
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    votesFor: { type: Number, default: 0 },
    votesAgainst: { type: Number, default: 0 },
    approved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Challenge', challengeSchema);