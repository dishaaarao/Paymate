const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const User = require('../models/User');

// @desc    Send money to another user
// @route   POST /api/transactions/send
// @access  Private
const sendMoney = async (req, res) => {
    const { recipientEmail, amount, description } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    try {
        const senderWallet = await Wallet.findOne({ user: req.user._id });
        let receiverUser = await User.findOne({ email: recipientEmail });

        // Auto-create receiver if not found (for DEMO ONLY)
        if (!receiverUser) {
            // Use email username before @ as default username
            const defaultUsername = receiverEmail.split('@')[0] + Math.floor(Math.random() * 10000);
            const defaultPassword = 'changeme123';
            receiverUser = await User.create({ username: defaultUsername, email: receiverEmail, password: defaultPassword });
            await Wallet.create({ user: receiverUser._id, balance: 0 });
        }

        if (senderWallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        if (req.user.email === receiverEmail) {
            return res.status(400).json({ message: 'Cannot send money to yourself' });
        }

        const receiverWallet = await Wallet.findOne({ user: receiverUser._id });

        // Perform transaction
        senderWallet.balance -= Number(amount);
        receiverWallet.balance += Number(amount);

        await senderWallet.save();
        await receiverWallet.save();

        const transaction = await Transaction.create({
            sender: req.user._id,
            receiver: receiverUser._id,
            amount,
            type: 'transfer',
            status: 'completed',
            description,
        });

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get transaction history
// @route   GET /api/transactions/history
// @access  Private
const getHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ sender: req.user._id }, { receiver: req.user._id }],
        })
            .populate('sender', 'username email')
            .populate('receiver', 'username email')
            .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendMoney, getHistory };
