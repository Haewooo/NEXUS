const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// 새로운 챌린지 생성
router.post('/', async (req, res) => {
    try {
        const challenge = new Challenge(req.body);
        await challenge.save();
        res.status(201).json(challenge);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create challenge' });
    }
});

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