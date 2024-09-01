const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

router.get('/', async (req, res) => {
  const searchQuery = req.query.search || '';
  let filter = {
    $or: [
      { title: { $regex: searchQuery, $options: 'i' } },
      { tags: { $regex: searchQuery, $options: 'i' } }
    ]
  };

  try {
    const challenges = await Challenge.find(filter);
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new challenge
router.post('/', async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.status(201).json(challenge);
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