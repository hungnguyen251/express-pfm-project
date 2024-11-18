import Joi from "joi";

export default class AuthValidation {
  static register = {
    body: Joi.object().keys({
      name: Joi.string().max(256).required(),
      email: Joi.string().email().max(256).required(),
      password: Joi.string().max(64).required(),
    }),
  };

  static login = {
    body: Joi.object().keys({
      email: Joi.string().email().max(256).required(),
      password: Joi.string().max(64).required(),
    }),
  };

  static verifyCode = {
    body: Joi.object().keys({
      email: Joi.string().email().max(256).required(),
      code: Joi.string().max(6).required(),
    }),
  };

  static passwordResetRequest = {
    body: Joi.object().keys({
      email: Joi.string().email().max(256).required(),
    }),
  };

  static changePasswordWithToken = {
    body: Joi.object().keys({
      token: Joi.string().email().max(256).required(),
      newPassword: Joi.string().required(),
    }),
  };
}
