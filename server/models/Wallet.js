const mongoose = require('mongoose');

const walletSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            unique: true,
        },
        balance: {
            type: Number,
            required: true,
            default: 0.0,
        },
        currency: {
            type: String,
            required: true,
            default: 'INR',
        },
        points: {
            type: Number,
            default: 0
        },
        paymentCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;
