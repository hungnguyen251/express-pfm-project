
import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import AuthService from '../services/auth';
import { HTTP_RESPONSES } from '../utils/http/response';

@Service()
export default class AuthController {
  @Inject() authService: AuthService;

  register = async (req: Request, res: Response) => {
    const registerUser = await this.authService.register(req);

    return res.success(
      HTTP_RESPONSES.SUCCESS.CREATED.message, 
      HTTP_RESPONSES.SUCCESS.CREATED.code,
      registerUser
    );
  }

  login = async (req: Request, res: Response) => {
    await this.authService.login(req);

    return res.success(
      HTTP_RESPONSES.SUCCESS.LOGIN.message, 
      HTTP_RESPONSES.SUCCESS.LOGIN.code,
    );
  }

  verifyCode = async (req: Request, res: Response) => {
    const result = await this.authService.verify2FACode(req);

    return res.success(
      HTTP_RESPONSES.SUCCESS.LOGIN.message, 
      HTTP_RESPONSES.SUCCESS.LOGIN.code,
      result
    );
  }

  passwordReset = async (req: Request, res: Response) => {
    const { email } = req.body;    
    await this.authService.passwordReset(email);

    return res.success(
      HTTP_RESPONSES.SUCCESS.COMMON.message, 
      HTTP_RESPONSES.SUCCESS.COMMON.code,
    );
  }

  changePasswordWithToken = async (req: Request, res: Response) => {
    await this.authService.register(req);

    return res.success(
      HTTP_RESPONSES.SUCCESS.COMMON.message, 
      HTTP_RESPONSES.SUCCESS.COMMON.code,
    );
  }
}
