const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a unique UPI ID: username + random 4 digits + @paymate
        const cleanedUsername = username.replace(/\s+/g, '').toLowerCase();
        const suffix = Math.floor(1000 + Math.random() * 9000); // Random 4 digits
        const upiId = `${cleanedUsername}${suffix}@paymate`;

        const user = await User.create({
            username,
            email,
            password,
            upiId
        });

        if (user) {
            // Create a wallet for the user
            await Wallet.create({
                user: user._id,
                balance: 0,
            });

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                upiId: user.upiId,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Check if user has a UPI ID, if not, generate one (for old users)
            if (!user.upiId) {
                const cleanedUsername = user.username.replace(/\s+/g, '').toLowerCase();
                const suffix = Math.floor(1000 + Math.random() * 9000);
                user.upiId = `${cleanedUsername}${suffix}@paymate`;
                await user.save();
            }

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                upiId: user.upiId,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Ensure legacy accounts get a UPI ID
            if (!user.upiId) {
                const cleanedUsername = user.username.replace(/\s+/g, '').toLowerCase();
                const suffix = Math.floor(1000 + Math.random() * 9000);
                user.upiId = `${cleanedUsername}${suffix}@paymate`;
                await user.save();
            }

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                upiId: user.upiId,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, authUser, getUserProfile };
