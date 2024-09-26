const { body, validationResult } = require('express-validator');

const register = [
  body('name')
    .isString().withMessage('Tên phải là một chuỗi')
    .isLength({ min: 2 }).withMessage('Tên phải có từ 2 ký tự'),

  body('email')
    .isEmail().withMessage('Email không hợp lệ'),

  body('password')
    .isString().withMessage('Mật khẩu phải là một chuỗi')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự')
];

const login = [
  body('email')
    .isEmail().withMessage('Email không hợp lệ'),

  body('password')
    .isString().withMessage('Mật khẩu phải là một chuỗi')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự')
];

const verifyCode = [
  body('email')
    .isEmail().withMessage('Email không hợp lệ'),

  body('code')
    .isString().withMessage('Mã xác thực là một chuỗi')
    .isLength({ min: 1 }).withMessage('Mã xác thực không được để trống')
];

const passwordReset = [
  body('email')
    .isEmail().withMessage('Email không hợp lệ'),
];

const changePasswordWithToken = [
  body('token')
    .isString().withMessage('Token là một chuỗi')
    .isLength({ min: 1 }).withMessage('Token không được để trống'),

  body('new_password')
    .isString().withMessage('Mật khẩu mới phải là một chuỗi')
    .isLength({ min: 6 }).withMessage('Mật khẩu mới phải có ít nhất 6 ký tự')
];

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  login,
  register,
  handleErrors,
  verifyCode,
  passwordReset,
  changePasswordWithToken
};