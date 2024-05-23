import { container } from "tsyringe";
import { PageRepository } from "../domain/repositories/PageRepository";
import { PrismaPageRepository } from "../implementations/prisma/repositories/PrismaPageRepository";

container.registerSingleton<PageRepository>(
  "PageRepository",
  PrismaPageRepository
);
