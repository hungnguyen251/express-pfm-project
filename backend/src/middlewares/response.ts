import { NextFunction, Request, Response } from 'express';
import { HTTP_RESPONSES } from '../utils/http/response';
import { ResponseStatusEnum } from '../utils/enums/common';
import { rateLimiter } from './rate-limiter';

const response = (req: Request, res: Response, next: NextFunction) => {
  res.success = (message: string, code: string, data?: object) => {
    return res.status(HTTP_RESPONSES.SUCCESS.COMMON.code).json({
      status: ResponseStatusEnum.SUCCESS,
      message,
      code,
      data,
    });
  };

  res.created = (message: string, code: string, data?: object) => {
    return res.status(HTTP_RESPONSES.SUCCESS.CREATED.code).json({
      status: ResponseStatusEnum.SUCCESS,
      message,
      code,
      data,
    });
  };

  res.badRequest = (message: string, code: string, data?: object) => {
    return res.status(HTTP_RESPONSES.ERROR.BAD_REQUEST.code).json({
      status: ResponseStatusEnum.FAILED,
      message,
      code,
      data,
    });
  };

  res.unauthorized = (message: string, code: string) => {
    return res.status(HTTP_RESPONSES.ERROR.UNAUTHORIZED.code).json({
      status: ResponseStatusEnum.FAILED,
      message,
      code,
    });
  };

  res.forbidden = (message: string, code: string) => {
    return res.status(HTTP_RESPONSES.ERROR.FORBIDDEN.code).json({
      status: ResponseStatusEnum.FAILED,
      message,
      code,
    });
  };

  res.notFound = (message: string, code: string) => {
    return res.status(HTTP_RESPONSES.ERROR.NOT_FOUND.code).json({
      status: ResponseStatusEnum.FAILED,
      message,
      code,
    });
  };

  res.internalServer = (message: string, code: string) => {
    return res.status(HTTP_RESPONSES.ERROR.SERVER_ERROR.code).json({
      status: ResponseStatusEnum.ERROR,
      message,
      code,
    });
  };

  res.rateLimit = (message: string, code: string) => {
    return res.status(HTTP_RESPONSES.ERROR.RATE_LIMIT.code).json({
      status: ResponseStatusEnum.FAILED,
      message,
      code,
    });
  };

  return next();
};

export default response;
