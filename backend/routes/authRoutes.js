// backend/routes/authRoutes.js 
const express = require('express');
const { loginWithNEAR, loginWithMetaMask } = require('../middlewares/auth');
const router = express.Router();

router.post('/near-login', loginWithNEAR);
router.post('/metamask-login', loginWithMetaMask);

module.exports = router;