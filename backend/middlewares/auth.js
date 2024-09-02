// backend/middlewares/auth.js
const { connect, keyStores, WalletConnection } = require('near-api-js');
const { ethers } = require('ethers');
const User = require('../models/User');  

async function loginWithNEAR(req, res) {
    const nearConfig = {
        networkId: "testnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };

    const near = await connect(nearConfig);
    const wallet = new WalletConnection(near, null);

    if (!wallet.isSignedIn()) {
        wallet.requestSignIn("near-ai-nexus.testnet");
    } else {
        const accountId = wallet.getAccountId();
        await handleAuth(accountId, 'NEAR', res);
    }
}

async function loginWithMetaMask(req, res) {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            const walletAddress = accounts[0];
            await handleAuth(walletAddress, 'MetaMask', res);
        } catch (error) {
            console.error('MetaMask login error:', error);
            res.status(500).json({ error: 'MetaMask login error' });
        }
    } else {
        console.error('MetaMask is not installed');
        res.status(400).json({ error: 'MetaMask is not installed' });
    }
}

async function handleAuth(walletId, method, res) {
    try {
        const user = await User.findOneAndUpdate(
            { walletId, method },
            { walletId, method },
            { new: true, upsert: true }
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed' });
    }
}

module.exports = { loginWithNEAR, loginWithMetaMask };