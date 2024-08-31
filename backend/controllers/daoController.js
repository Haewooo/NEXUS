const { connect, keyStores, WalletConnection } = require('near-api-js');
const nearConfig = require('../config/nearConfig');

const getDaoDetails = async (req, res) => {
    try {
        const near = await connect({
            networkId: nearConfig.networkId,
            nodeUrl: nearConfig.nodeUrl,
            walletUrl: nearConfig.walletUrl,
            keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        });

        const account = await near.account('near-ai-nexus.testnet'); 
        const daoContract = new nearAPI.Contract(account, nearConfig.contractName, {
            viewMethods: ['getDaoDetails'],
            changeMethods: [],
        });

        const daoDetails = await daoContract.getDaoDetails();
        res.json(daoDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDaoDetails,
};