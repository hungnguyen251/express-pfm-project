const userService = require('../services/userService');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const token = await userService.registerUser(name, email, password);

        res.status(201).json({ message: 'Đăng ký thành công', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService.loginUser(email, password);
        res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};