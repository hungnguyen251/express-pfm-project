import rateLimit from 'express-rate-limit';
import { LOGIN_ATTEMPTS_KEY_PREFIX, LOGIN_MAX_ATTEMPTS, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_TIME_MS } from '../utils/constants/common';
import { HTTP_RESPONSES } from '../utils/http/response';
import { logWarn } from '../utils/config/logger';
import { NextFunction, Request, Response } from 'express';
import { redisClient } from '../utils/config/redis';

export const rateLimiter = rateLimit({
  windowMs: RATE_LIMIT_TIME_MS,
  max: RATE_LIMIT_MAX_REQUESTS,
  message: {
    status: HTTP_RESPONSES.ERROR.RATE_LIMIT.code,
    error:  HTTP_RESPONSES.ERROR.RATE_LIMIT.message,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    logWarn(`Rate limit hit: IP ${req.ip} on path ${req.originalUrl}`);

    res.rateLimit(HTTP_RESPONSES.ERROR.RATE_LIMIT.message, HTTP_RESPONSES.ERROR.RATE_LIMIT.code);
  },
});

export const loginRateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const key = `${LOGIN_ATTEMPTS_KEY_PREFIX}${ip}`;

  const attempts = await redisClient.get(key);

  if (attempts && parseInt(attempts, 10) >= LOGIN_MAX_ATTEMPTS) {
    const ttl = await redisClient.ttl(key);
    const message =  `Too many failed login attempts. Please try again in ${ttl} seconds.`;

    logWarn(`Rate limit hit: IP ${req.ip} on path ${req.originalUrl}`);

    res.rateLimit(message, HTTP_RESPONSES.ERROR.RATE_LIMIT.code);

  }

  next();
};