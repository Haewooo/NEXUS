// backend/models/User.js
const mongoose = require('mongoose');

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        unique: true,
        sparse: true, 
    },
    nearAccountId: {
        type: String,
        unique: true,
        sparse: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;