import * as bcrypt from 'bcryptjs';
import { HTTP_RESPONSES } from '../http/response';
import AppError from '../config/error';

export default class BcryptHelper {
  static hashPassword = (password: string) => {
    try {
      return bcrypt.hashSync(password, +(process.env.BCRYPT_SALT_ROUND || 10));
    } catch (error: any) {
      throw new AppError(
        HTTP_RESPONSES.ERROR.BAD_REQUEST.code,
        HTTP_RESPONSES.ERROR.BAD_REQUEST.message,
      );
    }
  };

  static comparePassword = (password: string, hashPassword: string) => {
    try {
      return bcrypt.compareSync(password, hashPassword);
    } catch (error: any) {
      return false;
    }
  };
}
