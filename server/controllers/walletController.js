const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');

// @desc    Get user wallet balance
// @route   GET /api/wallet
// @access  Private
const getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ user: req.user._id });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        res.json(wallet);
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
        const wallet = await Wallet.findOne({ user: req.user._id });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
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

// @desc    Withdraw funds from wallet
// @route   POST /api/wallet/withdraw
// @access  Private
const withdrawFunds = async (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    try {
        const wallet = await Wallet.findOne({ user: req.user._id });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        if (wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        wallet.balance -= Number(amount);
        await wallet.save();

        // Create transaction record
        await Transaction.create({
            sender: req.user._id,
            amount,
            type: 'debit',
            status: 'completed',
            description: 'Withdrawn funds from wallet',
        });

        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Receive money simulation (from mock account)
// @route   POST /api/wallet/receive
// @access  Private
const receiveFunds = async (req, res) => {
    const { amount, senderName } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    try {
        const wallet = await Wallet.findOne({ user: req.user._id });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        wallet.balance += Number(amount);
        await wallet.save();

        // Create transaction record
        await Transaction.create({
            receiver: req.user._id,
            amount,
            type: 'credit', // 'credit' is used for receiving
            status: 'completed',
            description: `Received from ${senderName || 'External Account'}`,
        });

        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getWallet, addFunds, withdrawFunds, receiveFunds };
