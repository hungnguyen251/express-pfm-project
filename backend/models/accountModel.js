const mongoose = require('mongoose');
const baseSchema = require('./baseSchema');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    type: {
        type: String,
    },
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    ...baseSchema
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;