const mongoose = require('mongoose');

const verifyCodeSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
    },
    expiredAt: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        ref: 'User',
        unique: true,
    }
});

const VerifyCode = mongoose.model('Verify_Code', verifyCodeSchema);

module.exports = VerifyCode;