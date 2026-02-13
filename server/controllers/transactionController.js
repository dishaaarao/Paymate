const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const User = require('../models/User');

// @desc    Verify a recipient exists and return their name
// @route   POST /api/transactions/verify
// @access  Private
const verifyRecipient = async (req, res) => {
    const { identifier } = req.body;
    const cleanId = identifier ? identifier.trim().toLowerCase() : '';

    try {
        let user = await User.findOne({ upiId: cleanId });
        if (!user) {
            user = await User.findOne({ email: cleanId });
        }

        if (user) {
            res.json({ username: user.username, upiId: user.upiId, email: user.email });
        } else {
            // If it's an external email, we can say it's new
            if (cleanId.includes('@') && !cleanId.endsWith('@paymate')) {
                res.json({ username: 'New User (Invite)', isNew: true });
            } else {
                res.status(404).json({ message: 'Recipient not found' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send money to another user
// @route   POST /api/transactions/send
// @access  Private
const sendMoney = async (req, res) => {
    const { receiverEmail, amount, description } = req.body;

    // Normalize input
    const identifier = receiverEmail ? receiverEmail.trim().toLowerCase() : '';

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    try {
        const senderWallet = await Wallet.findOne({ user: req.user._id });
        if (!senderWallet) {
            return res.status(400).json({ message: 'Sender wallet not found' });
        }

        let receiverUser;

        // Try finding by UPI ID first
        receiverUser = await User.findOne({ upiId: identifier });

        // If not found, try finding by Email
        if (!receiverUser) {
            receiverUser = await User.findOne({ email: identifier });
        }

        // If STILL not found, check if we should auto-create (External Emails ONLY)
        if (!receiverUser && identifier.includes('@') && !identifier.endsWith('@paymate')) {
            const defaultUsername = identifier.split('@')[0];
            const suffix = Math.floor(1000 + Math.random() * 9000);
            const defaultUpiId = `${defaultUsername.replace(/\s+/g, '')}${suffix}@paymate`;

            receiverUser = await User.create({
                username: defaultUsername,
                email: identifier,
                password: 'password123', // Static password for ghost users
                upiId: defaultUpiId
            });
            await Wallet.create({ user: receiverUser._id, balance: 0 });
        }

        if (!receiverUser) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        if (req.user._id.toString() === receiverUser._id.toString()) {
            return res.status(400).json({ message: 'Cannot send money to yourself' });
        }

        if (senderWallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        let receiverWallet = await Wallet.findOne({ user: receiverUser._id });
        if (!receiverWallet) {
            receiverWallet = await Wallet.create({ user: receiverUser._id, balance: 0 });
        }

        // Perform transaction
        senderWallet.balance -= Number(amount);
        receiverWallet.balance += Number(amount);

        // Rewards System: Every 10 payments = 50 Points
        senderWallet.paymentCount = (senderWallet.paymentCount || 0) + 1;
        if (senderWallet.paymentCount >= 10) {
            senderWallet.points = (senderWallet.points || 0) + 50;
            senderWallet.paymentCount = 0;
        }

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
            .populate('sender', 'username email upiId')
            .populate('receiver', 'username email upiId')
            .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendMoney, getHistory, verifyRecipient };
