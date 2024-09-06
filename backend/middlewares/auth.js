// backend/middlewares/auth.js
const User = require('../models/User');  

// MetaMask 로그인 처리
async function loginWithMetaMask(req, res) {
    const { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ error: 'MetaMask wallet address is required' });
    }

    try {
        await handleAuth(walletAddress, 'MetaMask', res);
    } catch (error) {
        console.error('MetaMask login error:', error);
        res.status(500).json({ error: 'MetaMask login error' });
    }
}

// NEAR 로그인 처리 (프론트엔드에서 계정 ID를 받아 처리)
async function loginWithNEAR(req, res) {
    const { nearAccountId } = req.body;

    if (!nearAccountId) {
        return res.status(400).json({ error: 'NEAR account ID is required' });
    }

    try {
        await handleAuth(nearAccountId, 'NEAR', res);
    } catch (error) {
        console.error('NEAR login error:', error);
        res.status(500).json({ error: 'NEAR login error' });
    }
}

// 사용자 인증 처리 (NEAR 및 MetaMask 공통 처리)
async function handleAuth(accountId, method, res) {
    try {
        const query = method === 'MetaMask' ? { walletAddress: accountId } : { nearAccountId: accountId };
        const update = method === 'MetaMask' ? { walletAddress: accountId } : { nearAccountId: accountId };

        const user = await User.findOneAndUpdate(
            query,
            update,
            { new: true, upsert: true }
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed' });
    }
}

module.exports = { loginWithMetaMask, loginWithNEAR };