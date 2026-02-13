const express = require('express');
const router = express.Router();
const { sendMoney, getHistory, verifyRecipient } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send', protect, sendMoney);
router.post('/verify', protect, verifyRecipient);
router.get('/history', protect, getHistory);

module.exports = router;
