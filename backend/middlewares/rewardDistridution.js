// backend/middlewares/rewardDistribution.js
const { connect, keyStores, WalletConnection } = require('near-api-js');
const fetch = require('node-fetch');

// NEAR API로 기여자에게 보상을 지급
async function distributeRewards(userId, rewardAmount) {
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

  const accountId = wallet.getAccountId(); // 현재 사용자

  // 스마트 컨트랙트를 통해 보상 분배
  try {
    const result = await wallet.account().functionCall({
      contractId: "near-ai-nexus.testnet",
      methodName: "distribute_rewards",
      args: { account_id: userId, reward: rewardAmount },
      gas: "300000000000000",  // 300 Tgas
      attachedDeposit: "0",   // 보상 예치금
    });

    console.log('Rewards distributed:', result);
  } catch (error) {
    console.error('Error distributing rewards:', error);
  }
}

module.exports = { distributeRewards };