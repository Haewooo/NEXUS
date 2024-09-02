// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
    walletAddress: { type: String, unique: true },
    nearAccountId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;