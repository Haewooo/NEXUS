// backend/routes/contributionRoutes.js
const express = require('express');
const { contributionScoring } = require('../services/aiService');
const { calculatePercentiles } = require('../utils/evaluateContributions');
const { rewardContributors } = require('../utils/rewardContributors');
const Contribution = require('../models/Contribution');

const router = express.Router();

// 기여도 평가 및 보상 지급 API
router.post('/submit', async (req, res) => {
  try {
    const contributionData = req.body;  // 클라이언트로부터 받은 기여 데이터
    const score = await contributionScoring(contributionData);  // NEAR AI API로 점수 계산

    // 기여도 데이터 저장
    const contribution = new Contribution({
      userId: req.user.id,
      task: contributionData.task,
      type: contributionData.type,
      score: score,  // AI로부터 받은 점수 저장
    });
    
    await contribution.save();

    // 기여 데이터 저장 후 백분위 계산 및 보상 지급
    await calculatePercentiles();
    await rewardContributors();

    res.status(200).json({ message: 'Contribution submitted and rewarded successfully.' });
  } catch (error) {
    console.error('Error in contribution submission:', error);
    res.status(500).json({ message: 'Failed to submit and reward contribution.' });
  }
});

module.exports = router;