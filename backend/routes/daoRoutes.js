const express = require('express');
const router = express.Router();
const daoController = require('../controllers/daoController');

router.get('/daoDetails', daoController.getDaoDetails);

module.exports = router;