// backend/routes/contributionRoutes.js
const express = require('express');
const { submitContribution } = require('../controllers/contributionController');

const router = express.Router();

router.post('/submit', submitContribution);

module.exports = router;