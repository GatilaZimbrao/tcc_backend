import { container } from "tsyringe";
import { ExtensionRepository } from "../domain/repositories/ExtensionRepository";
import { PrismaExtensionRepository } from "../implementations/prisma/repositories/PrismaExtensionRepository";

container.registerSingleton<ExtensionRepository>(
  "ExtensionRepository",
  PrismaExtensionRepository
);
