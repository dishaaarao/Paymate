const express = require('express');
const router = express.Router();
const { getWallet, addFunds } = require('../controllers/walletController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getWallet);
router.post('/add-funds', protect, addFunds);

module.exports = router;
