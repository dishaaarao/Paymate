const express = require('express');
const router = express.Router();
const { getWallet, addFunds, withdrawFunds, receiveFunds } = require('../controllers/walletController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getWallet);
router.post('/add-funds', protect, addFunds);
router.post('/withdraw', protect, withdrawFunds);
router.post('/receive', protect, receiveFunds);

module.exports = router;
