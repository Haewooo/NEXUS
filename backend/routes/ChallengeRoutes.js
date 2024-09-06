// backend/routes/ChallengeRoutes.js
const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// 모든 챌린지 목록을 가져오는 라우트
router.get('/', async (req, res) => {
  const searchQuery = req.query.search || '';
  let filter = {
    $or: [
      { title: { $regex: searchQuery, $options: 'i' } },
      { tags: { $regex: searchQuery, $options: 'i' } }
    ]
  };

  try {
    const challenges = await Challenge.find(filter);  // 데이터베이스에서 챌린지 검색
    res.json(challenges);  // 클라이언트로 응답 전송
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 챌린지 생성 라우트
router.post('/', async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.status(201).json(challenge);  // 챌린지가 생성되었음을 클라이언트로 응답
  } catch (error) {
    res.status(400).json({ error: 'Failed to create challenge' });
  }
});

// Get vote status for a specific challenge
router.get('/:id/vote-status', async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    const voteStatus = challenge.approved ? 'finished' : 'ongoing';
    res.status(200).json({ voteStatus });
  } catch (error) {
    res.status(404).json({ error: 'Challenge not found' });
  }
});

module.exports = router;