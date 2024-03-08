import { container } from "tsyringe";
import { FileRepository } from "../domain/repositories/FileRepository";
import { PrismaFileRepository } from "../implementations/prisma/repositories/PrismaFileRepository";

container.registerSingleton<FileRepository>(
  "FileRepository",
  PrismaFileRepository
);
