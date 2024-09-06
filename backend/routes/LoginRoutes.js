// backend/routes/LoginRoutes.js
// backend/routes/LoginRoutes.js
const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/metamask-login', async (req, res) => {
    const { walletAddress } = req.body;  // 입력받은 MetaMask 지갑 주소

    try {
        let user = await User.findOne({ walletAddress });

        if (!user) {
            user = new User({ walletAddress });
            await user.save();
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to login with MetaMask' });
    }
});

router.post('/near-login', async (req, res) => {
    const { nearAccountId } = req.body;  // 클라이언트에서 받은 NEAR 계정 ID

    try {
        let user = await User.findOne({ nearAccountId });

        if (!user) {
            user = new User({ nearAccountId });
            await user.save();
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to login with NEAR' });
    }
});

module.exports = router;