const express = require('express');
const router = express.Router();
const { sendMoney, getHistory } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send', protect, sendMoney);
router.get('/history', protect, getHistory);

module.exports = router;
