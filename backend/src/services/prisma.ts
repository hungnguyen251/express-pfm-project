import { PrismaClient } from '@prisma/client';
import logger from '../utils/config/logger';
import { Service } from 'typedi';

@Service()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_MONGO,
        },
      },
    });
  }

  connect = async () => {
    try {
      await this.$connect();
      logger.info("Connected to MongoDB via Prisma");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
  }

  disconnect = async () => {
    await this.$disconnect();
  }
}
