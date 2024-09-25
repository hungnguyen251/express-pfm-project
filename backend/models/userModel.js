const mongoose = require('mongoose');
const baseSchema = require('./baseSchema');
const bcrypt = require('bcryptjs');
const { USER_TYPES } = require('./../config/constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        default: USER_TYPES.USER,
        required: false,
    },
    refesh: {
        type: String,
        required: false,
    },
    ...baseSchema
});

// Hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Check password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;