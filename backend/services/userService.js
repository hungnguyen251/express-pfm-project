const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

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
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });
    
    return token;
};
