// backend/config/nearConfig.js
const nearAPI = require('near-api-js');

const nearConfig = {
    networkId: 'testnet',  
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
    contractName: 'near-ai-nexus.testnet' 
};

module.exports = nearConfig;