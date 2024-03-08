import { container } from "tsyringe";
import { UserRepository } from "../domain/repositories/UserRepository";
import { PrismaUserRepository } from "../implementations/prisma/repositories/PrismaUserRepository";

container.registerSingleton<UserRepository>(
  "UserRepository",
  PrismaUserRepository
);
