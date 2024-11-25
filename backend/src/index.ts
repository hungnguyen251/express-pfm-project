import 'reflect-metadata';
import http from 'http';
import createApp from './app';
import logger from './utils/config/logger';
import { PrismaService } from './services/prisma';
import { flushRedisDb } from './utils/config/redis';

const startServer = async () => {
  try {
    const server = http.createServer(await createApp());
    const port = process.env.PORT;

    const prismaService = new PrismaService()
    await prismaService.connect();

    flushRedisDb();

    server.listen(port, () => {
      logger.info(`Server listening on port ${port || '8000'}`);
    });
  } catch (error: any) {
    logger.error(`Server crashed due to cause ${error.message}`);
    process.exit(1);
  }
};

startServer();
