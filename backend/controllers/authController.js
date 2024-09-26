const authService = require('../services/authService');
const { responseSuccess200, responseError400 } = require('../helpers/common');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const token = await authService.registerUser(name, email, password);

        return responseSuccess200(res, 'Đăng ký thành công', { access_token: token });
    } catch (error) {
        return responseError400(res, error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        await authService.loginUser(email, password);

        return responseSuccess200(res, 'Nhập email và mật khẩu thành công');
    } catch (error) {
        return responseError400(res, error.message);
    }
};

exports.verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        const data = await authService.verify2FACode(email, code);

        return responseSuccess200(res, 'Nhập email và mật khẩu thành công', data);
    } catch (error) {
        return responseError400(res, error.message);
    }
};

exports.passwordReset = async (req, res) => {
    try {
        const { email } = req.body;
        await authService.passwordReset(email);

        return responseSuccess200(res, 'Xác nhận yêu cầu thành công');
    } catch (error) {
        return responseError400(res, error.message);
    }
};