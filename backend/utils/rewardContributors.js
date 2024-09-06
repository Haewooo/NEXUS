// backend/utils/rewardContributors.js
const { connect, keyStores, Account } = require('near-api-js');
const Contribution = require('../models/Contribution');
const nearConfig = require('../config/nearConfig');
const BN = require('bn.js');

async function rewardContributors() {
    try {
        const keyStore = new keyStores.InMemoryKeyStore(); 
        const near = await connect({ ...nearConfig, keyStore, headers: {} });
        const account = await near.account('near-ai-nexus.testnet');

        const contributions = await Contribution.find({}); 

        for (let contribution of contributions) {
            const recipient = contribution.userId; 
            const rewardAmount = contribution.reward; 

            await account.functionCall({
                contractId: nearConfig.contractName,
                methodName: 'send_reward',
                args: { recipient, amount: new BN(rewardAmount) },
                gas: new BN('30000000000000'),
                attachedDeposit: new BN(rewardAmount),
            });
        }
    } catch (error) {
        console.error('Error in rewarding contributors:', error);
        throw new Error('Failed to reward contributors');
    }
}

module.exports = { rewardContributors };