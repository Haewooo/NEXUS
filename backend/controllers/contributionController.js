// backend/controllers/contributionController.js
const Contribution = require('../models/Contribution');  
const { contributionScoring } = require('../services/aiService'); // AI 점수 평가 함수
const { rewardContributor } = require('../services/nearService.js'); // NEAR 보상 서비스 함수

// 기여도 제출 및 평가
async function submitContribution(req, res) {
    const { userId, task, type, contributionData, walletAddress } = req.body;
    
    try {
        // NEAR AI API 호출하여 기여도 평가
        const score = await contributionScoring(contributionData);

        const newContribution = new Contribution({
            userId,
            task,
            type,
            contributionData, 
            score, 
            reward: score * 0.1,
        });

        await newContribution.save();

        // NEAR 토큰 보상
        await rewardContributor(walletAddress, newContribution.reward);

        res.status(201).json(newContribution);
    } catch (error) {
        console.error('Error in submitting contribution:', error);
        res.status(500).json({ message: 'Failed to submit contribution' });
    }
}

module.exports = { submitContribution };