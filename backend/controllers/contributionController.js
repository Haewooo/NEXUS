// backend/controllers/contributionController.js
const Contribution = require('../models/Contribution');
const { contributionScoring } = require('../services/aiService');
const { rewardContributors } = require('../utils/rewardContributors');

async function submitContribution(req, res) {
    const { userId, task, type, dataset, model } = req.body;

    try {
        const score = await contributionScoring({ dataset, model });

        const newContribution = new Contribution({
            userId,
            task,
            type,
            dataset,  // 업로드된 데이터셋 경로
            model,    // 업로드된 모델 경로
            score, 
            reward: score * 0.1,
        });

        await newContribution.save();

        await rewardContributors();

        res.status(201).json(newContribution);
    } catch (error) {
        console.error('Error in submitting contribution:', error);
        res.status(500).json({ message: 'Failed to submit contribution' });
    }
}

module.exports = { submitContribution };