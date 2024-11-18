import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

export const logInfo = (message: string) => {
  logger.info(message);
};

export const logWarn = (message: string) => {
  logger.warn(message);
};

export const logError = (message: string) => {
  logger.error(message);
};

export default logger;