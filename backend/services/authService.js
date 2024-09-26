const User = require('../models/userModel');
const VerifyCode = require('../models/verifyCodeModel');
const jwt = require('jsonwebtoken');
const mailService = require('./mailService');

exports.registerUser = async (name, email, password) => {
    // Check email existence
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('Email đã được sử dụng');
    }
    
    const user = new User({ name, email, password });
    await user.save();
    
    // Create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });
    
    return token;
};

exports.loginUser = async (email, password) => {
    // Check email existence
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }
    
    return this.sendVerificationCode(user.email);
};

exports.sendVerificationCode = async (email) => {
    const verifyCode = Math.floor(100000 + Math.random() * 900000);
    const expiredAt = new Date(Date.now() + 120 * 1000); // 2 minute

    await User.findOneAndUpdate(
        { email: email },
        { code: verifyCode, expiredAt: expiredAt },
        { new: true, upsert: true }
    );

    //Send email notification
    mailService.send2FACode(email, { code: verifyCode });

    return verifyCode;
}

exports.verify2FACode = async (email, code) => {
    const userSelectField = 'email name type createdAt updatedAt';
    const check2FACode = await VerifyCode.findOne({
        email: email,
        code: Number(code),
        expiredAt: { $gt: new Date() }
    });
    
    if (!check2FACode) {
        throw new Error('Mã xác thực không đúng hoặc đã hết hạn');
    }

    const user = await User.findOne({ email: email }, userSelectField);

    if (!user) {
        throw new Error('Email không tồn tại');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });

    return {
        access_token: token,
        user: user
    };
}
