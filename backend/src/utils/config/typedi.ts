import Container from "typedi";
import AuthController from "../../controllers/auth";
import { PrismaService } from "../../services/prisma";

const controllers = {
  auth: Container.get(AuthController),
};

const services = {
  prismaMongo: Container.get(PrismaService),
};

export { controllers, services };
