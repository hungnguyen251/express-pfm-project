import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { services } from '../utils/config/typedi';
import { HTTP_RESPONSES } from '../utils/http/response';

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req?.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.unauthorized(HTTP_RESPONSES.ERROR.UNAUTHORIZED.message, HTTP_RESPONSES.ERROR.UNAUTHORIZED.code);
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (!decoded.id) {
      return res.unauthorized(HTTP_RESPONSES.ERROR.UNAUTHORIZED.message, HTTP_RESPONSES.ERROR.UNAUTHORIZED.code);
    }

    const user = await services.prismaMongo.user.findUnique({ where: {id: decoded.id} });
    if (!user) {
      return res.notFound(HTTP_RESPONSES.ERROR.NOT_FOUND.message, HTTP_RESPONSES.ERROR.NOT_FOUND.code);
    }

    req.session.user = user;
    next();

  } catch (err) {
    return res.unauthorized(HTTP_RESPONSES.ERROR.UNAUTHORIZED.message, HTTP_RESPONSES.ERROR.UNAUTHORIZED.code);
  }
};
