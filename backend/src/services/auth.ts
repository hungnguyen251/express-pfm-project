import { Inject, Service } from "typedi";
import { IPayloadChangePasswordWithToken, IPayloadLogin, IPayloadRegister, IPayloadVerifyCode } from "../interfaces/auth";
import { Request } from "express";
import jwt from 'jsonwebtoken';
import AppError from "../utils/config/error";
import { HTTP_RESPONSES } from "../utils/http/response";
import bcryptService from '../utils/helpers/bcrypt';
import { services } from "../utils/config/typedi";
import logger from "../utils/config/logger";
import MailService from "./mail";
import { EmailSubjectEnum, EmailTemplateEnum, VerificationTypeEnum } from "../utils/enums/common";
import { v4 as uuidv4 } from 'uuid';
import { User } from "@prisma/client";

@Service()
export default class AuthService {
  @Inject() mailService: MailService;

  register = async (req: Request) => {
    const payload: IPayloadRegister = req.body;

    try {
      const existingUser = await services.prismaMongo.user.findUnique({
        where: { email: payload.email },
        select: {
          id: true,
          email: true
        }
      });
      
      if (existingUser) {
        throw new AppError(
          HTTP_RESPONSES.ERROR.ALREADY_EXISTS.code,
          HTTP_RESPONSES.ERROR.ALREADY_EXISTS.message,
        );
      }
 
      const hashedPassword = await bcryptService.hashPassword(payload.password);
      payload.password = hashedPassword;

      const userCreated = await services.prismaMongo.user.create({
        data: payload,
        select: {
          id: true,
          email: true,
          name: true,
          type: true,
          created_at: true
        }
      });

      //Send registration success email
      const context = {
        name: payload.name,
        email: payload.email,
        url: process.env.FRONTEND_URL,
      }

      this.mailService.sendEmail(payload.email, EmailSubjectEnum.REGISTER_SUCCESS, EmailTemplateEnum.REGISTER_SUCCESS, context);
  
      // Create jwt token
      const token = await this.createJwtToken(userCreated.id);
      
      return {
        access: token,
        user: userCreated,
      };

    } catch (error: any) {      
      logger.error("Error:", error.message);
      throw new AppError(
        error.statusCode,
        error.message,
      );
    }
  }

  findUserByEmail = async (email: string): Promise<Pick<User, 'id' | 'email' | 'name' | 'type'>> => {
    const user = await services.prismaMongo.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        type: true,
      }
    });
    
    if (!user) {
      throw new AppError(
        HTTP_RESPONSES.ERROR.NOT_FOUND.code,
        HTTP_RESPONSES.ERROR.NOT_FOUND.message,
      );
    }

    return user;
  }

  login = async (req: Request) => {
    const payload: IPayloadLogin = req.body;

    try {
      const verifyUser = await services.prismaMongo.user.findUnique({
        where: { email: payload.email },
        select: {
          id: true,
          email: true,
          password: true,
        }
      });
      
      if (!verifyUser) {
        throw new AppError(
          HTTP_RESPONSES.ERROR.NOT_FOUND.code,
          HTTP_RESPONSES.ERROR.NOT_FOUND.message,
        );
      }
 
      const isMatchPassword = await bcryptService.comparePassword(payload.password, verifyUser.password);
      if (!isMatchPassword) {
        throw new AppError(
          HTTP_RESPONSES.ERROR.BAD_REQUEST.code,
          HTTP_RESPONSES.ERROR.BAD_REQUEST.message,
        );
      }

      return await this.sendVerificationCode(payload.email);

    } catch (error: any) {      
      logger.error("Error:", error.message);
      throw new AppError(
        error.statusCode,
        error.message,
      );
    }
  }

  sendVerificationCode = async (email: string) => {
    const verifyCode = Math.floor(100000 + Math.random() * 900000);
    const expiredAt = new Date(Date.now() + 300 * 1000); // 5 minute

    const data = {
      email: email,
      token: String(verifyCode),
      expiredAt: expiredAt,
      type: VerificationTypeEnum.TWO_FACTOR_AUTH,
    }

    await services.prismaMongo.verificationCode.upsert({
      where: { email: email },
      create: data,
      update: data,      
    });

    //Send verification 2FA email
    const context = {
      code: verifyCode,
    }

    this.mailService.sendEmail(email, EmailSubjectEnum.TWO_FACTOR_VERIFICATION, EmailTemplateEnum.TWO_FACTOR_VERIFICATION, context);

    return verifyCode;
  }

  verify2FACode = async (req: Request) => {
    const payload: IPayloadVerifyCode = req.body;
    
    const check2FACode = await services.prismaMongo.verificationCode.findFirst({
      where: {
        email: payload.email,
        token: payload.code,
        expiredAt: { gt: new Date() },
      }
    });

    if (!check2FACode) {
      throw new AppError(
        HTTP_RESPONSES.ERROR.BAD_REQUEST.code,
        HTTP_RESPONSES.ERROR.BAD_REQUEST.message,
      );
    }

    const user = await this.findUserByEmail(payload.email);

    // Create jwt token
    const token = await this.createJwtToken(user.id);

    return {
      access: token,
      user: user,
    };
  }

  passwordReset = async (email: string) => {
    const user = await this.findUserByEmail(email);
    const token = uuidv4();
    const data = {
      email: email,
      token: token,
      expiredAt: new Date(Date.now() + 60 * 1000), // 5 minute
      type: VerificationTypeEnum.PASSWORD_RESET,
    }

    await services.prismaMongo.verificationCode.upsert({
      where: { email: user.email },
      create: data,
      update: data,      
    });

    const passwordChangeUrl = `${process.env.FRONTEND_URL}/password-reset/${token}`

    //Send password reset email
    const context = {
      token: token,
      url: passwordChangeUrl,
    }

    return this.mailService.sendEmail(email, EmailSubjectEnum.PASSWORD_RESET_REQUEST, EmailTemplateEnum.PASSWORD_RESET_REQUEST, context);
  }

  changePasswordWithToken = async (req: Request) => {
    const payload: IPayloadChangePasswordWithToken = req.body;

    const checkToken = await services.prismaMongo.verificationCode.findFirst({
      where: {
        token: payload.token,
        expiredAt: { gt: new Date() },
      }
    });

    if (!checkToken) {
      throw new AppError(
        HTTP_RESPONSES.ERROR.BAD_REQUEST.code,
        HTTP_RESPONSES.ERROR.BAD_REQUEST.message,
      );
    }

    const hashedPassword = await bcryptService.hashPassword(payload.newPassword);

    return await services.prismaMongo.user.update({
      where: { email: checkToken.email },
      data: { password: hashedPassword },
    });
  }

  createJwtToken = async (userId: string): Promise<String> => {
    if (!process.env.JWT_SECRET) {
      throw new AppError(
        HTTP_RESPONSES.ERROR.SERVER_ERROR.code,
        'JWT secret is not configured'
      );
    }

    return jwt.sign(
      { id: userId }, 
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TTL }
    );
  }
}