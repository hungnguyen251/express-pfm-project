import { NextFunction, Request, RequestHandler, Response } from "express";
import AppError from "../utils/config/error";
import logger from "../utils/config/logger";
import { IBaseResponse } from "../interfaces/common";
import { ResponseStatusEnum } from "../utils/enums/common";
import { HTTP_RESPONSES } from './../utils/http/response';

export const handleRequest = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}

export const requestNotFound = (req: Request, res: Response, next: NextFunction) => {
  const message = `Route ${req.originalUrl} not found`;
  return next(
    new AppError(HTTP_RESPONSES.ERROR.NOT_FOUND.code, message)
  );
};

export const requestError = (error: AppError, req: Request, res: Response, next: NextFunction): void => {
  const response: IBaseResponse = {
    status: error.status || ResponseStatusEnum.ERROR,
    message: error.message,
    code: error.code || HTTP_RESPONSES.ERROR.SERVER_ERROR.code,
  };

  if (error.data && Object.keys(error.data).length > 0) {
    response.data = error.data;
  }

  res.status(error.statusCode || HTTP_RESPONSES.ERROR.SERVER_ERROR.code).json(response);
};

