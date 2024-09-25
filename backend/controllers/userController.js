const userService = require('../services/userService');
const { responseSuccess200, responseError400 } = require('../helpers/common');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const token = await userService.registerUser(name, email, password);

        return responseSuccess200(res, 'Đăng nhập thành công', { access_token: token });
    } catch (error) {
        return responseError400(res, error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userService.loginUser(email, password);

        return responseSuccess200(res, 'Đăng nhập thành công', response);
    } catch (error) {
        return responseError400(res, error.message);
    }
};