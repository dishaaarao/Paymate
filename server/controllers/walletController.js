const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Get user wallet balance
// @route   GET /api/wallet
// @access  Private
const getWallet = async (req, res) => {
    try {
        let wallet = await Wallet.findOne({ user: req.user._id });

        if (!wallet) {
            wallet = await Wallet.create({ user: req.user._id, balance: 0 });
        }

        const user = await User.findById(req.user._id);

        // Ensure UPI ID exists
        if (!user.upiId) {
            const cleanedUsername = user.username.replace(/\s+/g, '').toLowerCase();
            const suffix = Math.floor(1000 + Math.random() * 9000);
            user.upiId = `${cleanedUsername}${suffix}@paymate`;
            await user.save();
        }

        res.json({
            balance: wallet.balance,
            points: wallet.points,
            paymentCount: wallet.paymentCount,
            currency: wallet.currency,
            upiId: user.upiId,
            username: user.username
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add funds to wallet
// @route   POST /api/wallet/add-funds
// @access  Private
const addFunds = async (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    try {
        let wallet = await Wallet.findOne({ user: req.user._id });

        if (!wallet) {
            // Auto-create wallet if missing
            wallet = await Wallet.create({ user: req.user._id, balance: 0 });
        }

        wallet.balance += Number(amount);
        await wallet.save();

        // Create transaction record
        await Transaction.create({
            receiver: req.user._id,
            amount,
            type: 'deposit',
            status: 'completed',
            description: 'Added funds to wallet',
        });

        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getWallet, addFunds };
