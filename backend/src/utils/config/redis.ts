import Redis from 'ioredis';
import { logError, logInfo } from './logger';

export const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

export const flushRedisDb = async (): Promise<void> => {
  try {
    await redisClient.flushdb();
    logInfo('Redis database has been flushed.');

  } catch (error:any) {
    logError(`Error flushing Redis database: ${error.message}`);
  }
};