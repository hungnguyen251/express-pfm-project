import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { handleRequest } from './request';
import logger from '../utils/config/logger';
import { HTTP_RESPONSES } from '../utils/http/response';

const pick = (schema: any, keys: string[]): object => {
  const data = keys.reduce((object: any, key: any) => {
    if (schema && Object.prototype.hasOwnProperty.call(schema, key)) object[key] = schema[key];

    return object;
  }, {});

  return data;
};

const validateSchema = (schema: any) => handleRequest((req: Request, res: Response, next: NextFunction) => {
  const pickSchema = pick(schema, ['params', 'query', 'body']);
  const pickRequest = pick(req, Object.keys(pickSchema));

  const { value, error } = Joi.compile(pickSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(pickRequest);

  if (error) {
    const message = `Schema invalid: ${error.message}`;
    logger.error(`${message}`);
    return res.badRequest(message, HTTP_RESPONSES.ERROR.NOT_FOUND.code);
  }

  Object.assign(req, value);
  return next();
});

export default validateSchema;
