import express from 'express';
import AuthValidation from '../validations/auth';
import validateSchema from '../middlewares/validate';
import { handleRequest } from '../middlewares/request';
import { controllers } from '../utils/config/typedi';
import { loginRateLimiter } from '../middlewares/rate-limiter';

const router = express.Router();

/**Auth API */
router.post('/register', validateSchema(AuthValidation.register), handleRequest(controllers.auth.register));
router.post('/login', validateSchema(AuthValidation.login), loginRateLimiter, handleRequest(controllers.auth.login));
router.post('/verify-code', validateSchema(AuthValidation.verifyCode), handleRequest(controllers.auth.verifyCode));
router.post('/password-reset-request', validateSchema(AuthValidation.passwordResetRequest), handleRequest(controllers.auth.passwordReset));
router.post('/password-reset-confirmation', validateSchema(AuthValidation.changePasswordWithToken), handleRequest(controllers.auth.changePasswordWithToken));

export default router;
