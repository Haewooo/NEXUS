// backend/utils/rewardContributors.js
const { connect, keyStores, Account } = require('near-api-js');
const Contribution = require('../models/Contribution');
const nearConfig = require('../config/nearConfig'); // NEAR 설정 파일 
const BN = require('bn.js');

async function rewardContributors() {
    try {
        // NEAR 네트워크 연결
        const keyStore = new keyStores.InMemoryKeyStore(); 
        const near = await connect({
            ...nearConfig,
            keyStore,
            headers: {},
        });
        
        // 계약을 호출할 NEAR 계정
        const account = await near.account('near-ai-nexus.testnet'); 
        
        // 모든 기여 데이터를 불러옴
        const contributions = await Contribution.find({}); 

        for (let contribution of contributions) {
            const recipient = contribution.userId;  // 수령자 계정 (userId에서 적절한 NEAR 계정으로 변환 필요)
            const rewardAmount = contribution.reward; // 계산된 보상 NEAR 개수
            
            // NEAR 스마트 컨트랙트로 보상 지급
            await account.functionCall({
                contractId: nearConfig.contractName,
                methodName: 'send_reward',  // 스마트 컨트랙트의 보상 지급 함수
                args: { recipient, amount: new BN(rewardAmount) },  // BN으로 보상 금액 전달
                gas: new BN('30000000000000'),  // 가스 비용 설정
                attachedDeposit: new BN(rewardAmount),  // 보상 금액
            });
        }
    } catch (error) {
        console.error('Error in rewarding contributors:', error);
        throw new Error('Failed to reward contributors');
    }
}

module.exports = { rewardContributors };