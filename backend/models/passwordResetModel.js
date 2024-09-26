const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
    token: {
        type: String,
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

const PasswordReset = mongoose.model('Password_Reset', passwordResetSchema);

module.exports = PasswordReset;